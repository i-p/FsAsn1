[<NUnit.Framework.TestFixture>]
module FsAsn1.Tests.ReaderTests

open System
open NUnit.Framework
open FsAsn1.Tests.Utils
open FsAsn1.Reader
open FsAsn1.Types

[<Test>]
let ``read header of a constructed value with long length``() = 
    "30 82 04 85" |> shouldReadAsHeader (Universal, Constructed, (int)UniversalTag.Sequence, Definite(1157, 3))

[<Test>]
let ``read header of a primitive value with short length``() = 
    "02 01" |> shouldReadAsHeader (Universal, Primitive, (int)UniversalTag.Integer, Definite(1, 1))

[<Test>]
let ``read short integer``() = 
    "02 01 02" |> shouldReadAsValue (Integer(bigint 2))

[<Test>]
let ``read long integer``() = 
    "02 08 5D 90 88 88 52 28 73 30" |> shouldReadAsValue (Integer(bigint.Parse "6742038761248944944"))

[<Test>]
let ``read smallest integer represented by 2 bytes``() =
    "02 02 00 80" |> shouldReadAsValue (Integer(bigint(128)))

[<Test>]
let ``read negative integer``() =
    "02 01 80" |> shouldReadAsValue (Integer(bigint(-128)))

[<Test>]
let ``read object identifier``() = 
    "06 09 2A 86 48 86 F7 0D 01 01 0B" |> shouldReadAsValue (ObjectIdentifier ([|1;2;840;113549;1;1;11|] |> Array.map bigint))

[<Test>]
let ``read printable string``() = 
    "13 02 55 53 " |> shouldReadAsValue (PrintableString "US")

[<Test>]
let ``read octet string``() = 
    "04 02 30 00 " |> shouldReadAsValue (OctetString [|0x30uy; 0x00uy|])

[<Test>]
let ``read UTC time``() = 
    "17 0D 31 36 30  35 31 38 31 31 32 31 34 32 5A" |> shouldReadAsValue (UTCTime(DateTimeOffset(2016, 5, 18, 11, 21, 42, 0, TimeSpan.Zero)))

[<Test>]
let ``read long tag``() =
    "DF 82 03 05" |> shouldReadAsHeader (Private, Primitive, 259, Definite(5, 1)) 

[<Test>]
let ``X.690 8.1.3.4 Example - short length form``() =
    "26" |> shouldReadAsLength (Definite(38, 1))

[<Test>]
let ``X.690 8.1.3.5 Example - long length form``() =
    "81 C9" |> shouldReadAsLength (Definite(201, 2))

[<Test>]
let ``X.690 8.2.2 Example - TRUE``() =
    "01 01 FF" |> shouldReadAsValue (AsnValue.Boolean(AsnBoolean.True(255uy)))

[<Test>]
let ``X.690 8.6.4.2 Example - Bitstring primitive encoding``() =
    "03 07 040A3B5F291CD0" 
    |> shouldReadAsValue (AsnValue.BitString(
                            { Data = [| 0x0Auy; 0x3Buy; 0x5Fuy; 0x29uy; 0x1Cuy; 0xD0uy |];
                              NumberOfUnusedBits = 4uy } ))

//TODO X.690 contains also example of bitstring with constructed encoding, but it is not supported yet

[<Test>]
let ``X.690 8.8.2 Example - NULL``() =
    "05 00" |> shouldReadAsValue (AsnValue.Null)

//Array.map (fun b -> printf "%X" (int b)) (System.Text.Encoding.ASCII.GetBytes("Smith"))

[<Test>]
let ``X.690 8.9.3 Example SEQUENCE``() =
    let schema = parse FsAsn1.SchemaParser.typeAssignments "T ::= SEQUENCE {name IA5String, ok BOOLEAN}" |> Map.ofList
    ("30 0A | 16 05 536D697468 | 01 01 FF", schema)
    |> shouldReadAsValueOfType "T" (AsnValue.Sequence
                                        [| { Header = makeHeader(Universal, Primitive, int UniversalTag.IA5String, Definite(5, 1));
                                             Value = AsnValue.IA5String("Smith");
                                             Offset = 2;
                                             SchemaType = Some(toType (FsAsn1.Schema.ReferencedType("IA5String"))) }
                                           { Header = makeHeader(Universal, Primitive, int UniversalTag.Boolean, Definite(1, 1));
                                             Value = AsnValue.Boolean(AsnBoolean.True(255uy));
                                             Offset = 9;
                                             SchemaType = Some(toType FsAsn1.Schema.BooleanType) } |] )

let schema = FsAsn1.SchemaParser.parseTypeAssignments """
                Type1 ::= VisibleString
                Type2 ::= [APPLICATION 3] IMPLICIT Type1
                Type3 ::= [2] Type2
                Type4 ::= [APPLICATION 7] IMPLICIT Type3
                Type5 ::= [2] IMPLICIT Type2 
                """ 
                |> Map.ofList

[<Test>]
let ``X.690 8.14 Example Type1``() =
    ("1A 05 4A6F6E6573", schema) |> shouldReadAsValueOfType "Type1" (AsnValue.VisibleString("Jones"))

[<Test>]
let ``X.690 8.14 Example Type2``() =
    ("43 05 4A6F6E6573", schema) |> shouldReadAsValueOfType "Type2" (AsnValue.VisibleString("Jones"))

[<Test>]
let ``X.690 8.14 Example Type3``() =
    ("A2 07 43 05 4A6F6E6573", schema)
    |> shouldReadAsValueOfType "Type3" (AsnValue.ExplicitTag
                                            { Header = makeHeader(Application, Primitive, 3, Definite(5, 1));
                                              Value = AsnValue.VisibleString("Jones");
                                              Offset = 2;
                                              SchemaType = Map.tryFind "Type2" schema } )

[<Test>]
let ``X.690 8.14 Example Type4``() =
    ("67 07 43 05 4A6F6E6573", schema)
    |> shouldReadAsValueOfType "Type4" (AsnValue.ExplicitTag
                                            { Header = makeHeader(Application, Primitive, 3, Definite(5, 1));
                                              Value = AsnValue.VisibleString("Jones");
                                              Offset = 2;
                                              SchemaType = Map.tryFind "Type2" schema } )

[<Test>]
let ``X.690 8.14 Example Type5``() =
    ("82 05 4A6F6E6573", schema) |> shouldReadAsValueOfType "Type5" (AsnValue.VisibleString("Jones"))

[<Test>]
let ``X.690 8.19.5 Example OBJECT IDENTIFIER``() =
    ("06 03 883703") |> shouldReadAsValue (AsnValue.ObjectIdentifier([|bigint(2); bigint(999); bigint(3)|]))

[<Test>]
let ``X.690 8.20.5 Example - Relative object identifier``() =
    ("0D 04 C27B0302") |> shouldReadAsValue (AsnValue.RelativeObjectIdentifier([|bigint(8571); bigint(3); bigint(2)|]))