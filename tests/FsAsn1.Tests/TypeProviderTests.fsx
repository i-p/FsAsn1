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

let rfc = File.ReadAllBytes(__SOURCE_DIRECTORY__ + "\Data\google_ssl.cer")

//TODO add utility method to ModuleDefinition
let md: FsAsn1.Schema.ModuleDefinition = 
    { Identifier = "Test"
      Oid = Array.empty
      TagDefault = None
      ExtensibilityImplied = false
      TypeAssignments = FsAsn1.SchemaParser.parseAssignments ss FsAsn1.Schema.TagKind.Explicit "Test" |> fst |> Seq.map (fun a -> a.Name, a) |> Map.ofSeq
      ValueAssignments = Map.empty
      Imports = []
      Range = None
      ElementsDefinedByOid = Map.empty }

let ctx = AsnContext(AsnArrayStream(File.ReadAllBytes(__SOURCE_DIRECTORY__ + "\Data\google_ssl.cer"), 0), [md])
//TODO add utility method to ModuleDefinition
let result = readElement ctx (Some (Map.find "Certificate" md.TypeAssignments).Type) 

type F = FsAsn1.Provided.AsnProvider<ss>

match result with
| FsAsn1.Types.AsnResult.Right(element) ->
    let c = F.Certificate.fromElement(element)

    c.signatureAlgorithm |> ignore
    c.signatureValue |> ignore

    Assert.AreEqual(bigint 2, c.tbsCertificate.version)
| _ ->
    failwithf "Unexpected result: %A" result





