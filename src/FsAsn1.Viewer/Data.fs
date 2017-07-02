module FsAsn1.Viewer.Data

type SchemaInfo = 
    { Id: string
      DisplayName: string
      Url: string
      Overrides: Map<string, Map<string, string * string>> }

type KnownType =
    { TypeName: string option
      DisplayName: string
      Schemas: SchemaInfo list }

type ExampleFile = 
    { Path: string
      Description: string
      Type: KnownType }

module Schemas =
    let Cms = { Id = "rfc3852"
                DisplayName = "RFC3852: Cryptographic Message Syntax (CMS)"
                Url = "/Data/rfc3852.txt"
                Overrides = Map.empty }

    let X509 = { Id = "rfc5280"
                 DisplayName = "RFC5280: X.509 Certificate and Certificate Revocation List"
                 Url = "/Data/rfc5280.txt"
                 Overrides = 
                    Map.ofList 
                        [("PKIX1Explicit88", 
                            Map.ofList [("Extension", ("extnID", "extnValue"))])] }

module KnownTypes = 
    let X509Certificate = { TypeName = Some "Certificate"
                            DisplayName = "X.509 Certificate (RFC 5280)"
                            Schemas = [Schemas.X509] }

    let CmsSignedData = { TypeName = Some "ContentInfo"
                          DisplayName = "CMS Signed Data (RFC 3852)"
                          Schemas = [Schemas.Cms; Schemas.X509] }

    let None = { TypeName = None
                 DisplayName = "Unknown type"
                 Schemas = [] }

let exampleFiles =
    [ { Path = "google_ssl.cer"
        Description = "Google SSL certificate"
        Type = KnownTypes.X509Certificate }
      { Path = "BouncyCastle/cms/sigs/PSSSignDataSHA1.sig"
        Description = "Example CMS signed file (BouncyCastle test data)"
        Type = KnownTypes.CmsSignedData } ]

let knownTypes = [KnownTypes.X509Certificate; KnownTypes.CmsSignedData; KnownTypes.None]