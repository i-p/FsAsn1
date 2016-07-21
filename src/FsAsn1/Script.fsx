#load @"Scripts\load-project-debug.fsx"

open System.IO
open System
open FParsec
open FsAsn1.Schema
open FsAsn1.Reader
open FsAsn1.SchemaParser

let schemaString = @"
    Certificate  ::=  SEQUENCE  {
        tbsCertificate       TBSCertificate,
        signatureAlgorithm   AlgorithmIdentifier,
        signatureValue       BIT STRING  }

   TBSCertificate  ::=  SEQUENCE  {
        version         [0]  EXPLICIT Version DEFAULT v1,
        serialNumber         CertificateSerialNumber,
        signature            AlgorithmIdentifier,
        issuer               Name,
        validity             Validity,
        subject              Name,
        subjectPublicKeyInfo SubjectPublicKeyInfo,
        issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,                             
        subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,                             
        extensions      [3]  EXPLICIT Extensions OPTIONAL                             
        }
        
    Version  ::=  INTEGER  {  v1(0), v2(1), v3(2)  }

    CertificateSerialNumber  ::=  INTEGER
        "

let schema = parse typeAssignments schemaString |> dict

let bytes = File.ReadAllBytes(__SOURCE_DIRECTORY__ + "\google_ssl.cer")

let ctx = AsnContext(AsnArrayStream(bytes, 0), (fun str -> if schema.ContainsKey str then Some schema.[str] else None ))

let el = readElement ctx (Some schema.["Certificate"])