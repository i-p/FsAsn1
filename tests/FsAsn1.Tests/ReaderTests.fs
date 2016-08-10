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