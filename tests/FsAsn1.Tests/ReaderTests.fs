﻿[<NUnit.Framework.TestFixture>]
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
    "02 01 02" |> shouldReadAs (&Integer 2I)

[<Test>]
let ``read long integer``() = 
    "02 08 5D 90 88 88 52 28 73 30" |> shouldReadAs (&Integer(bigint.Parse "6742038761248944944"))

[<Test>]
let ``read smallest integer represented by 2 bytes``() =
    "02 02 00 80" |> shouldReadAs (&Integer 128I)

[<Test>]
let ``read negative integer``() =
    "02 01 80" |> shouldReadAs (&Integer -128I)

[<Test>]
let ``read object identifier``() = 
    "06 09 2A 86 48 86 F7 0D 01 01 0B" |> shouldReadAs (&ObjectIdentifier ([|1;2;840;113549;1;1;11|] |> Array.map bigint))

[<Test>]
let ``read printable string``() = 
    "13 02 55 53 " |> shouldReadAs (&PrintableString "US")

[<Test>]
let ``read octet string``() = 
    "04 02 30 00 " |> shouldReadAs (&OctetString [|0x30uy; 0x00uy|])

[<Test>]
let ``read UTC time``() = 
    "17 0D 31 36 30 35 31 38 31 31 32 31 34 32 5A" |> shouldReadAs (&UTCTime(DateTimeOffset(2016, 5, 18, 11, 21, 42, 0, TimeSpan.Zero)))

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
    "01 01 FF" |> shouldReadAs (&AsnValue.Boolean(AsnBoolean.True(255uy)))

[<Test>]
let ``X.690 8.6.4.2 Example - Bitstring primitive encoding``() =
    "03 07 040A3B5F291CD0" 
    |> shouldReadAs (&AsnValue.BitString(
                         { Data = [| 0x0Auy; 0x3Buy; 0x5Fuy; 0x29uy; 0x1Cuy; 0xD0uy |];
                           NumberOfUnusedBits = 4uy } ))

//TODO add example of bitstring with constructed encoding (it is not supported now)

[<Test>]
let ``X.690 8.8.2 Example - NULL``() =
    "05 00" |> shouldReadAs &AsnValue.Null

let parseTypes str : FsAsn1.Schema.ModuleDefinition = 
    let ta = parse FsAsn1.SchemaParser.typeAssignments str |> List.map (fun ta -> (ta.Name, ta)) |> Map.ofList

    {
        Identifier = "TEST"
        Oid = [||]
        TagDefault = None
        ExtensibilityImplied = false
        TypeAssignments = ta
        ValueAssignments = Map.empty
        Imports = []
        Range = None
        ElementsDefinedByOid = Map.empty
    }

let parseTypesImplicitTags str : FsAsn1.Schema.ModuleDefinition = 
    let ta = parseImplicitTags FsAsn1.SchemaParser.typeAssignments str |> List.map (fun ta -> (ta.Name, ta)) |> Map.ofList

    {
        Identifier = "TEST"
        Oid = [||]
        TagDefault = Some(FsAsn1.Schema.TagDefault.ImplicitTags)
        ExtensibilityImplied = false
        TypeAssignments = ta
        ValueAssignments = Map.empty
        Imports = []
        Range = None
        ElementsDefinedByOid = Map.empty
    }

[<Test>]
let ``X.690 8.9.3 Example SEQUENCE``() =
    let schema = parseTypes "T ::= SEQUENCE {name IA5String, ok BOOLEAN}"
    ("30 0A | 16 05 536D697468 | 01 01 FF", schema)
    |> shouldReadAsType "T" 
        {
            Header = makeHeader(Universal, Constructed, int UniversalTag.Sequence, Definite(10, 1))
            Value = AsnValue.Sequence 
                        [| { Header = makeHeader(Universal, Primitive, int UniversalTag.IA5String, Definite(5, 1))
                             Value = AsnValue.IA5String("Smith")
                             Offset = 2
                             SchemaType = Some(toComponentType "name" (FsAsn1.Schema.ReferencedType("IA5String"))) }
                           { Header = makeHeader(Universal, Primitive, int UniversalTag.Boolean, Definite(1, 1))
                             Value = AsnValue.Boolean(AsnBoolean.True(255uy))
                             Offset = 9                            
                             SchemaType = Some(toComponentType "ok" FsAsn1.Schema.BooleanType) } |]
            Offset = 0
            SchemaType = schema.TryFindType "T"
        }

let schema = parseTypes """
                Type1 ::= VisibleString
                Type2 ::= [APPLICATION 3] IMPLICIT Type1
                Type3 ::= [2] Type2
                Type4 ::= [APPLICATION 7] IMPLICIT Type3
                Type5 ::= [2] IMPLICIT Type2 
                """ 
                
[<Test>]
let ``X.690 8.14 Example Type1``() =
    ("1A 05 4A6F6E6573", schema) 
    |> shouldReadAsType "Type1" 
        { Header = makeHeader(Universal, Primitive, int UniversalTag.VisibleString, Definite(5, 1))
          Value = AsnValue.VisibleString("Jones")
          Offset = 0
          SchemaType = schema.TryFindType "Type1" }

[<Test>]
let ``X.690 8.14 Example Type2``() =
    ("43 05 4A6F6E6573", schema) 
    |> shouldReadAsType "Type2" 
        { Header = makeHeader(Application, Primitive, 3, Definite(5, 1))
          Value = AsnValue.VisibleString("Jones")
          Offset = 0
          SchemaType = schema.TryFindType "Type2" }

[<Test>]
let ``X.690 8.14 Example Type3``() =
    ("A2 07 43 05 4A6F6E6573", schema)
    |> shouldReadAsType "Type3" 
        { Header = makeHeader(ContextSpecific, Constructed, 2, Definite(7, 1))
          Value = AsnValue.ExplicitTag
                    { Header = makeHeader(Application, Primitive, 3, Definite(5, 1))
                      Value = AsnValue.VisibleString("Jones")
                      Offset = 2
                      SchemaType = FsAsn1.Schema.ReferencedType("Type2") |> toType |> Some }
          Offset = 0
          SchemaType = schema.TryFindType "Type3" }

[<Test>]
let ``X.690 8.14 Example Type4``() =
    ("67 07 43 05 4A6F6E6573", schema)
    |> shouldReadAsType "Type4" 
         { Header = makeHeader(Application, Constructed, 7, Definite(7, 1))
           Value = AsnValue.ExplicitTag
                    { Header = makeHeader(Application, Primitive, 3, Definite(5, 1))
                      Value = AsnValue.VisibleString("Jones")
                      Offset = 2
                      SchemaType = FsAsn1.Schema.ReferencedType("Type2") |> toType |> Some }
           Offset = 0
           SchemaType = schema.TryFindType "Type4" }

[<Test>]
let ``X.690 8.14 Example Type5``() =
    ("82 05 4A6F6E6573", schema) 
    |> shouldReadAsType "Type5" 
        { Header = makeHeader(ContextSpecific, Primitive, 2, Definite(5, 1))
          Value = AsnValue.VisibleString("Jones")
          Offset = 0
          SchemaType = schema.TryFindType "Type5" }

[<Test>]
let ``X.690 8.19.5 Example OBJECT IDENTIFIER``() =
    ("06 03 883703") |> shouldReadAs &(AsnValue.ObjectIdentifier([|2I; 999I; 3I|]))

[<Test>]
let ``X.690 8.20.5 Example - Relative object identifier``() =
    ("0D 04 C27B0302") |> shouldReadAs &(AsnValue.RelativeObjectIdentifier([|8571I; 3I; 2I|]))

[<Test>]
let ``X.690 8.23.5.4 Example - VisibleString (primitive form)``() =
    ("1A 05 4A6F6E6573") |> shouldReadAs &(AsnValue.VisibleString("Jones"))

//TODO add additional examples for VisibleString with constructed form and definite/indefinite length (it is not supported now)

[<Test>]
let ``X.690 A.1 Example - description of a record structure``() =
    let recordSchema = parseTypes """
        PersonnelRecord ::= [APPLICATION 0] IMPLICIT SET {
            name Name,
            title [0] VisibleString,
            number  EmployeeNumber,
            dateOfHire [1] Date,
            nameOfSpouse  [2] Name,
            children  [3] IMPLICIT
                SEQUENCE OF ChildInformation DEFAULT {} }
        ChildInformation ::= SET { 
            name  Name,
            dateOfBirth  [0] Date }
        Name ::= [APPLICATION 1] IMPLICIT SEQUENCE { 
            givenName VisibleString,
            initial  VisibleString,
            familyName  VisibleString }
        EmployeeNumber ::= [APPLICATION 2] IMPLICIT INTEGER
        Date ::= [APPLICATION 3] IMPLICIT VisibleString -- YYYYMMDD """

    let input = 
        """60 8185 61 10 1A 04 4A6F686E
                         1A 01 50
                         1A 05 536D697468
                   A0 0A 1A 08 4469726563746F72
                   42 01 33
                   A1 0A 43 08 3139373130393137
                   A2 12 61 10 1A 04 4D617279
                               1A 01 54
                               1A 05 536D697468
                   A3 42 31 1F 61 11 1A 05 52616C7068
                                     1A 01 54
                                     1A 05 536D697468
                               A0 0A 43 08 3139353731313131
                         31 1F 61 11 1A 05 537573616E
                                     1A 01 42
                                     1A 05 4A6F6E6573
                               A0 0A 43 08 3139353930373137
                    """
    let makeName givenName initial familyName =
        AsnValue.Sequence
            [| &AsnValue.VisibleString givenName;
               &AsnValue.VisibleString initial;
               &AsnValue.VisibleString familyName |]

    (input, recordSchema)
    |> shouldReadAsType "PersonnelRecord" 
        (&AsnValue.Set
            [|  &makeName "John" "P" "Smith";
                &ExplicitTag(&VisibleString("Director"));
                &Integer 51I;
                &ExplicitTag(&VisibleString("19710917"));
                &ExplicitTag(&makeName "Mary" "T" "Smith");
                &Sequence(
                    [| &Set
                        [| &makeName "Ralph" "T" "Smith";
                           &ExplicitTag(&VisibleString("19571111")) |]
                       &Set
                        [| &makeName "Susan" "B" "Jones";
                           &ExplicitTag(&VisibleString("19590717")) |]
                    |])
               |])


let unknownElements =
    cataAsn 
        (fun el -> 
            match el.Value with 
            | AsnValue.Unknown(_) -> [el]
            | _ -> [])
        (fun _ children -> children |> List.concat)
        
let elementsWithoutSchemaType =
    cataAsn 
        (fun el -> 
            match el.SchemaType with 
            | None -> [el]
            | _ -> [])
        (fun _ children -> children |> List.concat)
        
#if !FABLE
[<Test>]
let ``read SSL certificate``() =
    let str = System.IO.File.ReadAllText(__SOURCE_DIRECTORY__ + @"\Data\rfc5280.txt")
    let md = FsAsn1.SchemaParser.parseModuleDefinition str 0
    
    let ctx = AsnContext(AsnArrayStream(System.IO.File.ReadAllBytes(__SOURCE_DIRECTORY__ + "\Data\google_ssl.cer"), 0), [md.Value])
    
    match readElement ctx (md.Value.TryFindType("Certificate")) with
    | Right(el) ->        
        CollectionAssert.IsEmpty(unknownElements el)    
        CollectionAssert.IsEmpty(elementsWithoutSchemaType el)
    | res ->
        failwithf "Unexpected result: %A" res
#endif

let elementsWithMissingComponentName (element: AsnElement) =
    let processElement (el: AsnElement) children = 
        let childrenResults = 
            children
            |> Array.toList
            |> List.map (fun f -> f [el])
            |> List.concat
                                
        fun (parents: AsnElement list) ->                   
            match parents with
            | { SchemaType = Some { Kind = FsAsn1.Schema.SequenceType(_) }} :: _
            | { SchemaType = Some { Kind = FsAsn1.Schema.SetType(_) }} :: _
            | { SchemaType = Some { Kind = FsAsn1.Schema.ChoiceType(_) }} :: _ ->                                 
                match componentName el.SchemaType with
                | None ->                            
                    el :: childrenResults
                | Some(_) -> childrenResults
            | _ -> childrenResults

    cataAsn 
        (fun el -> processElement el [||])            
        (fun el children -> processElement el children)                
        element
        []

let getPath (path: int list) (element: AsnElement) =
    let rec go path (element: AsnElement) acc =
        match element.Value, path with
        | SimpleValue(_), [] -> element, acc
        | SimpleValue(_), _ -> failwith "No collection element found"
        | Collection(_), [] -> element, acc
        | Collection(children), index :: rest -> go rest children.[index] (element :: acc)

    go path element []

let shouldHaveType expected (element: AsnElement, _) =
    let actual = element.SchemaType |> Option.bind (nameOfType)
    equal (Some expected) actual
        
let shouldHaveComponentName expected (element: AsnElement, _) =
    let actual = componentName element.SchemaType
    equal (Some expected) actual

#if !FABLE
[<Test>]
let ``read PSSSignDataSHA1.sig``() =
    let str = System.IO.File.ReadAllText(__SOURCE_DIRECTORY__ + @"\Data\rfc3852.txt")
    let md = FsAsn1.SchemaParser.parseModuleDefinition str 0

    let str2 = System.IO.File.ReadAllText(__SOURCE_DIRECTORY__ + @"\Data\rfc5280.txt")
    let md2 = FsAsn1.SchemaParser.parseModuleDefinition str2 0
    
    let content = System.IO.File.ReadAllBytes(__SOURCE_DIRECTORY__ + @"\Data\BouncyCastle\cms\sigs\PSSSignDataSHA1.sig")
    let ctx = AsnContext(AsnArrayStream(content, 0), [md.Value; md2.Value])
    
    match readElement ctx (md.Value.TryFindType "ContentInfo") with
    | Right(element) ->    
        CollectionAssert.IsEmpty(unknownElements element)    
        CollectionAssert.IsEmpty(elementsWithoutSchemaType element)    

        element |> getPath [1;0;1;0] |> shouldHaveType "DigestAlgorithmIdentifier"

        element |> getPath [1;0;1;0;0] |> shouldHaveComponentName "algorithm"

        element |> getPath [1;0;2;0] |> shouldHaveComponentName "eContentType"

        element |> getPath [1;0;3;0;0] |> shouldHaveComponentName "tbsCertificate"

        CollectionAssert.IsEmpty(elementsWithMissingComponentName element)
    | res ->
        failwithf "Unexpected result %A" res    
#endif
       
[<Test>]
let ``read CHOICE element and correctly assign schema types``() =
    let types = 
        parseTypes 
            @"Name ::= CHOICE { rdnSequence  RDNSequence }
              RDNSequence ::= SEQUENCE OF RelativeDistinguishedName
              RelativeDistinguishedName ::= SET SIZE (1..MAX) OF AttributeTypeAndValue
               AttributeTypeAndValue ::= SEQUENCE { type     AttributeType,
                                                    value    AttributeValue }
              AttributeType ::= OBJECT IDENTIFIER
              AttributeValue ::= ANY"
              
    let find name = types.FindType name |> Some    
    let referencedType name componentName = 
        let ty = FsAsn1.Schema.ReferencedType(name) |> toType
        { ty with ComponentName = componentName } |> Some

    (@"30 0D 31 0B 30 09 06 03 55 04 06 13 02 55 53", types)
    |> shouldReadAsType "Name" 
        { Header = makeHeader(Universal, Constructed , int UniversalTag.Sequence, Definite(13, 1))
          Value = AsnValue.Sequence
                    [| { Header = makeHeader(Universal, Constructed, int UniversalTag.Set, Definite(11, 1))
                         Value = AsnValue.Set 
                                    [| { Header = makeHeader(Universal, Constructed, int UniversalTag.Sequence, Definite(9, 1))
                                         Value = AsnValue.Sequence
                                                    [| { Header = makeHeader(Universal, Primitive, int UniversalTag.ObjectIdentifier, Definite(3, 1))
                                                         Value = AsnValue.ObjectIdentifier [| 2I; 5I; 4I; 6I |]
                                                         Offset = 6
                                                         SchemaType = referencedType "AttributeType" (Some "type") }
                                                       { Header = makeHeader(Universal, Primitive, int UniversalTag.PrintableString, Definite(2, 1))
                                                         Value = AsnValue.PrintableString "US"
                                                         Offset = 11                                                         
                                                         SchemaType = referencedType "AttributeValue" (Some "value") }
                                                    |]
                                         Offset = 4
                                         SchemaType = referencedType "AttributeTypeAndValue" None } |]
                         Offset = 2
                         SchemaType = referencedType "RelativeDistinguishedName" None }
                    |]          
          Offset = 0
          SchemaType = find "Name" }



let (|V|) (el: AsnElement) =
    match el with
    | { Value = v } -> v
   
let (|SV|_|) (el: AsnElement) =
    match el with
    | { Value = v; SchemaType = Some(ty) } -> Some(ty, v)
    | _ -> None
     
open FsAsn1.Schema

let (|Ref|_|) (ty: FsAsn1.Schema.AsnType) =
    match ty with
    | { Kind = ReferencedType n } -> Some n
    | _ -> None  


[<Test>]
let ``read CHOICE type component in implicitly tagged module``() =
    
    let md = 
        parseTypesImplicitTags
            "GeneralName ::= CHOICE { uniformResourceIdentifier       [6]     IA5String }
             GeneralNames ::= SEQUENCE SIZE (1..MAX) OF GeneralName
             DistributionPointName ::= CHOICE { fullName [0] GeneralNames }
             DistributionPoint ::= SEQUENCE { distributionPoint [0] DistributionPointName OPTIONAL }
             "
                 
    let data = "30 25 A0 23 A0 21 86 1F 68 74 74 70 3A 2F 2F 70 6B 69 2E 67 6F 6F 67 6C 65 2E 63 6F 6D 2F 47 49 41 47 32 2E 63 72 6C"
                    
    let ctx = AsnContext(data |> hexStringStream, [md])
    
    match readElement ctx (md.TryFindType("DistributionPoint")) with
    | Right (V(AsnValue.Sequence 
                    [| V(ExplicitTag(
                            V(Sequence 
                                [| SV(Ref("GeneralName"),
                                      IA5String "http://pki.google.com/GIAG2.crl") |]))) |])) ->
        ()    
    | result ->
        printfn "%A" result
        failwith "Unexpected ASN result"           

[<Test>]
let ``transform OID value name to type name``() =
    (oidValueNameToTypeName "id-ce-authorityKeyIdentifier") |> equal "AuthorityKeyIdentifier"
    (oidValueNameToTypeName "someTypeName") |> equal "SomeTypeName"
    
[<Test>]
let ``parse AuthorityKeyIdentifier certificate extension``() =
    let str = System.IO.File.ReadAllText(__SOURCE_DIRECTORY__ + @"\Data\rfc5280.txt")    
    let [md; md2] = FsAsn1.SchemaParser.parseAllModuleDefinitions str    
    
    let stream = (@"30 1F 06 03 55 1D 23 04 18 30 16 80 14 4A DD 06 16 1B BC F6 68 B5 76 F5 81 B6 BB 62 1A BA 5A 81 2F") |> hexStringStream

    let mdd = 
        { md with ElementsDefinedByOid = 
                    Map.ofList [("Extension", ("extnID", "extnValue"))] }

    let ctx = AsnContext(stream, [mdd; md2])
    
    match readElement ctx (mdd.TryFindType("Extension")) with
    | Right(V(AsnValue.Sequence(
                [|_;
                  V(ExplicitTag(
                     SV({ TypeName = Some "AuthorityKeyIdentifier" },
                        Sequence(
                          [| V(OctetString(_)) |])))) |]))) ->
        ()
    | res ->
        failwithf "Unexpected result: %A" res

[<Test>]
let ``parse ExtKeyUsage certificate extension``() =
    let str = System.IO.File.ReadAllText(__SOURCE_DIRECTORY__ + @"\Data\rfc5280.txt")    
    let [md; md2] = FsAsn1.SchemaParser.parseAllModuleDefinitions str    
    
    let stream = (@"30 1D 06 03 55 1D 25 04 16 30 14 06 08 2B 06 01 05 05 07 03 01 06 08 2B 06 01 05 05 07 03 02") |> hexStringStream

    let mdd = 
        { md with ElementsDefinedByOid = 
                    Map.ofList [("Extension", ("extnID", "extnValue"))] }

    let ctx = AsnContext(stream, [mdd; md2])
    
    match readElement ctx (mdd.TryFindType("Extension")) with
    | Right(V(AsnValue.Sequence(
                [|_;
                  V(ExplicitTag(
                     SV({ TypeName = Some "ExtKeyUsageSyntax" },
                        Sequence(
                          [| SV(Ref("KeyPurposeId"),
                                ObjectIdentifier(_)); 
                             SV(Ref("KeyPurposeId"),
                                ObjectIdentifier(_))|]))))|]))) ->
        ()            
    | res ->
        printfn "%A" res
        failwith "Unexpected result"        


#if !FABLE
[<Test>]
let ``toExpectedTag can return every value of UniversalTag enumeration`` () =
    let examples = 
        Map.ofList [
            UniversalTag.Boolean, BooleanType
            UniversalTag.Integer, IntegerType([])
            UniversalTag.BitString, BitStringType
            UniversalTag.OctetString, OctetStringType
            UniversalTag.Null, NullType
            UniversalTag.ObjectIdentifier, ObjectIdentifierType
            UniversalTag.UTF8String, ReferencedType("UTF8String")
            UniversalTag.RelativeObjectIdentifier, ReferencedType("RelativeObjectIdentifier")
            UniversalTag.Sequence, SequenceType([])
            UniversalTag.Set, SetType([])
            UniversalTag.PrintableString, ReferencedType("PrintableString")
            UniversalTag.T61String, ReferencedType("T61String")
            UniversalTag.IA5String, ReferencedType("IA5String")
            UniversalTag.UTCTime, ReferencedType("UTCTime")
            UniversalTag.VisibleString, ReferencedType("VisibleString") ]
     
    let toTag = toExpectedTag (AsnContext.Empty)
    let allUniversalTags = Enum.GetValues(typeof<UniversalTag>) |> Seq.cast<UniversalTag>
    
    for expected in allUniversalTags do       
        match examples.TryFind expected with
        | Some typeKind ->            
            match toTag typeKind with
            | UniversalTag(AsnClass.Universal, tag) ->
                let actual = LanguagePrimitives.EnumOfValue<int,UniversalTag>(tag)
                Assert.AreEqual(actual, expected)
            | _ ->
                Assert.Fail(sprintf "Incorrect mapping for universal tag %A" expected)
        | None ->
            Assert.Fail(sprintf "Missing example mapping for universal tag %A" expected)
#endif

let validOctetString = "04 02 30 00 "
let validOctetStringHeader = 
    { AsnHeader.Class = AsnClass.Universal; 
      Encoding = Primitive; 
      Tag = int UniversalTag.OctetString; 
      Length = Definite(2,1) }

// WORKAROUND equal cannot be used everywhere because structural comparison 
// of exceptions doesn't work in Fable  

[<Test>]
let ``read primitive value - not long enough``() =     
    let res, _ = read validOctetString.[0..8]
          
    match res with
    | Left(InvalidValue
            { Offset = 0
              RealLength = 1
              Header = h
              SchemaType = None
              Value = { Exception = Some(EndOfAsnStreamException)
                        ChildrenErrors = [] }}) when h = validOctetStringHeader -> ()
    | _ -> failwithf "Unexpected result: %A" res
                                     
[<Test>]
let ``read primitive value - remaining byte``() = 
    validOctetString + "00 " |> shouldReadAs (&OctetString [|0x30uy; 0x00uy|])
    //TODO verify ctx remaining bytes

[<Test>]
let ``read from empty stream``() =
    let res, _ = read ""
    
    equal (Left(AsnElementError.NoData { Offset = 0 })) res
        
[<Test>]
let ``read incomplete header``() =
    let res, _ = read "04 "
    
    equal (Left(AsnElementError.InvalidHeader { Offset = 0 })) res
    
let exampleSchema = parseTypes "T ::= SEQUENCE {name IA5String, ok BOOLEAN}"
let exampleSequence = "30 0A | 16 05 536D697468 | 01 01 FF"

let sequenceHeader = makeHeader(AsnClass.Universal, Constructed, int UniversalTag.Sequence, Definite(10, 1))
let firstSequenceComponent: AsnElement = 
    { Header = makeHeader(AsnClass.Universal, Primitive, int UniversalTag.IA5String, Definite(5, 1))
      Value = AsnValue.IA5String("Smith")
      Offset = 2
      SchemaType = None } 
let secondSequenceComponent: AsnElement = 
    { Header = makeHeader(AsnClass.Universal, Primitive, int UniversalTag.Boolean, Definite(1, 1))
      Value = AsnValue.Boolean(AsnBoolean.True(255uy))
      Offset = 9                            
      SchemaType = None }

[<Test>]
let ``missing sequence component``() =    
    let res, _ = read "30 0A | 16 05 536D697468"
    
    let expectedEl: AsnElement =
        { Header = sequenceHeader
          Value = AsnValue.Sequence [| firstSequenceComponent |]
          Offset = 0
          SchemaType = None }
    let expectedErr =
        InvalidValue
            { Offset = 0
              RealLength = 7
              Header = sequenceHeader
              SchemaType = None
              Value = { Exception = None
                        ChildrenErrors = [ NoData { Offset = 9 } ]}}

    equal (Both(expectedErr, expectedEl)) res
            
[<Test>]
let ``following elements of sequence are read even if there is a previous element with an invalid value``() =    
    let res, _ = read "30 0A | 01 05 536D697468 | 01 01 FF"
    let firstSequenceComponent' = { firstSequenceComponent.Header with Tag = int UniversalTag.Boolean }

    equal (Some { AsnElement.Header = sequenceHeader
                  Value = AsnValue.Sequence [| secondSequenceComponent |]
                  Offset = 0
                  SchemaType = None }) (right res)

    match left res with
    | Some(InvalidValue
            { Offset = 0
              RealLength = 10
              Header = h
              SchemaType = None
              Value = { Exception = None; 
                        ChildrenErrors = [ 
                            InvalidValue 
                                { Offset = 2
                                  RealLength = 5
                                  Header = h2
                                  SchemaType = None
                                  Value = { 
                                      Exception = Some(AsnElementException("Invalid length of boolean value.")); 
                                      ChildrenErrors = []}}]}})
                                       
        when h = sequenceHeader && h2 = firstSequenceComponent' -> ()
    | errEl -> failwithf "Unexpected result: %A" errEl

[<Test>]
let ``incomplete value of last sequence component``() =    
    let res, _ = read "30 09 | 16 05 536D697468 | 01 01 "
    
    let sequenceHeader' = { sequenceHeader with Length = Definite(9, 1) }

    equal (Some {
            AsnElement.Header = sequenceHeader'
            Value = AsnValue.Sequence [| firstSequenceComponent |]
            Offset = 0
            SchemaType = None
        }) (right res)
    
    match left res with
    | Some(InvalidValue
            { Offset = 0
              RealLength = 9
              Header = h
              SchemaType = None
              Value = { 
                Exception = None; 
                ChildrenErrors = [
                    InvalidValue
                        { Offset = 9
                          RealLength = 0
                          Header = h2
                          SchemaType = None
                          Value = { Exception = Some(EndOfAsnStreamException); 
                                    ChildrenErrors = []}} ]}}) 
        when h = sequenceHeader' && h2 = secondSequenceComponent.Header -> ()
    | errEl -> failwithf "Unexpected result: %A" errEl


[<Test>]
let ``incomplete header of last sequence component``() =    
    let res, _ = read "30 08 | 16 05 536D697468 | 01 "
    
    let sequenceHeader' = { sequenceHeader with Length = Definite(8, 1) }

    equal (Some {
            AsnElement.Header = sequenceHeader'
            Value = AsnValue.Sequence [| firstSequenceComponent |]
            Offset = 0
            SchemaType = None
        }) (right res)
    
    equal 
        (Some(InvalidValue
                { Offset = 0
                  RealLength = 8
                  Header = sequenceHeader'
                  SchemaType = None
                  Value = { Exception = None; 
                            ChildrenErrors = [
                                InvalidHeader { Offset = 9 }] }})) (left res)

// TODO tests for incomplete long tag, complete tag missing length, incomplete length
