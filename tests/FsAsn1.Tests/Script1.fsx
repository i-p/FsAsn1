#r "../../packages/NUnit/lib/net45/nunit.framework.dll"
#r "../../packages/FParsec-Big-Data-Edition/lib/net45/FParsecCS.dll"
#r "../../packages/FParsec-Big-Data-Edition/lib/net45/FParsec.dll"

#load "load-tp-assemblies.fsx"

[<Literal>]
let ss = @"
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

open System.IO
open FsAsn1.Reader
open NUnit.Framework


let s = FsAsn1.SchemaParser.parseTypeAssignments ss |> dict

let ctx = AsnContext(AsnArrayStream(File.ReadAllBytes(__SOURCE_DIRECTORY__ + "\Data\google_ssl.cer"), 0), (fun str -> if s.ContainsKey str then Some s.[str] else None ))
let element = readElement ctx (Some s.["Certificate"]) 

type F = FsAsn1.Provided.AsnProvider<ss>

let c = F.Certificate.fromElement(element)

c.signatureAlgorithm
c.signatureValue

Assert.AreEqual(bigint 2, c.tbsCertificate.version)





