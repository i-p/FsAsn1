[<NUnit.Framework.TestFixture>] 
module FsAsn1.Tests.ParserTests

open FsUnit
open FParsec
open FsAsn1.Schema
open FsAsn1.SchemaParser
open NUnit.Framework
open FsAsn1.Tests.Utils
       
let referencedType name = name |> ReferencedType |> toType
let defaultValue v = v |> Default |> Some
let optional = Optional |> Some

[<Test>]
let ``parse string``() =  
    "a" |> shouldParseAs (str_ws "a") "a"

[<Test>]
let ``parse string with whitespace``() = 
    "a       " |> shouldParseAs (str_ws "a") "a"

type T = Case1 | Case2

[<Test>]
let ``parse case``() = 
    "a" |> shouldParseAs (case "a" Case1) Case1

[<Test>]
let ``parse string in parentheses``() =
    "(a)" |> shouldParseAs (inParentheses (pstring "a")) "a"

[<Test>]
let ``parse string in brackets``() =
    "[a]" |> shouldParseAs (inBrackets (pstring "a")) "a"

[<Test>]
let ``parse string in braces``() =
    "{a}" |> shouldParseAs (inBraces (pstring "a")) "a"
    
[<Test>]
let ``parse type reference``() =
    "TypeReference" |> shouldParseAs typeReference "TypeReference"

[<Test>]
let ``parse identifier``() =
    "identifier" |> shouldParseAs identifier "identifier"

[<Test>]
let ``parse tag``() = 
    "[123]" |> shouldParseAs tag (None, 123)

[<Test>]
let ``parse tagged type``() = 
    "[123] EXPLICIT SomeType" 
    |> shouldParseAs (taggedType) 
        (TaggedType
            (None, 
             123,
             Some Explicit, 
             referencedType("SomeType")))

[<Test>]
let ``parse signed number > 0``() =
    "123" |> shouldParseAs signedNumber (bigint.Parse("123"))

[<Test>]
let ``parse named number``() =
    "v1(1)" |> shouldParseAs namedNumber ("v1", SignedNumber(bigint.Parse("1")))

[<Test>]
let ``parse named number list``() =
    let [n1;n2;n3] = parse namedNumberList "v1(1), v2(2),v3(3)" 

    equal n1 ("v1", SignedNumber(bigint.Parse("1")))
    equal n2 ("v2", SignedNumber(bigint.Parse("2")))
    equal n3 ("v3", SignedNumber(bigint.Parse("3")))
    
[<Test>]
let ``parse comment ended by a newline`` () =
    "-- asdasdasdasdasd\n" |> shouldParseAs comment ()

[<Test>]
let ``parse comment with explicit end works`` () =
    "-- asdasdasdasd --   " |> shouldParseAs comment ()

[<Test>]
let ``parse comment inside SEQUENCE definition`` () =
    @"SEQUENCE { -- a comment -- }" 
    |> shouldParseAs ptypeKind (AsnTypeKind.SequenceType([]))

[<Test>]        
let ``parse SET OF type`` () =
    "SET OF AttributeValue" 
    |> shouldParseAs ptypeKind
        (AsnTypeKind.SetOfType(None, SetOfType(referencedType("AttributeValue"))))

[<Test>]
let ``parse simple component`` () =
    "issuer Name" 
    |> shouldParseAs componentType
        (ComponentType("issuer", referencedType("Name"), None))

[<Test>]
let ``parse optional component with value range`` () =
    "comp INTEGER (0..MAX) OPTIONAL" 
    |> shouldParseAs componentType 
        (ComponentType("comp", 
            IntegerType([]) 
            |> toConstrainedType            
                (ValueRange(
                    LowerEndpoint.Value(IntegerValue(bigint 0)),
                    UpperEndpoint.Max)), 
            optional))

[<Test>]
let ``parse explitly tagged component with default value`` () =
    "version [0] EXPLICIT Version DEFAULT v1" 
    |> shouldParseAs componentType
        (ComponentType("version", 
            TaggedType(None, 0, Some Explicit, referencedType("Version")) |> toType, 
            defaultValue(ReferencedValue("v1"))))
            
[<Test>]
let ``parse implictly tagged optional component`` () =
    "issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL" 
    |> shouldParseAs componentType
        (ComponentType("issuerUniqueID", 
            TaggedType(None, 1, Some Implicit, referencedType("UniqueIdentifier")) |> toType, 
            optional))

[<Test>]    
let ``parse BIT STRING component`` () =
    "signatureValue BIT STRING" 
    |> shouldParseAs componentType
        (ComponentType("signatureValue", BitStringType |> toType, None))
    
[<Test>]    
let ``parse BOOLEAN component with default value`` () =
    "critical    BOOLEAN DEFAULT FALSE" 
    |> shouldParseAs componentType
        (ComponentType("critical", BooleanType |> toType, defaultValue(BooleanValue(false))))

[<Test>]
let ``parse non-empty sequence`` () =
   @"SEQUENCE  {
        tbsCertificate       TBSCertificate,
        signatureAlgorithm   AlgorithmIdentifier,
        signatureValue       BIT STRING  }" 
    |> shouldParseAs sequenceType
        (SequenceType
            [ComponentType("tbsCertificate", referencedType "TBSCertificate", None)
             ComponentType("signatureAlgorithm", referencedType "AlgorithmIdentifier", None)
             ComponentType("signatureValue", BitStringType |> toType, None)])

[<Test>]
let ``parse type assignment``()=
    @"Certificate  ::=  SEQUENCE  {
        tbsCertificate       TBSCertificate,
        signatureAlgorithm   AlgorithmIdentifier }"
    |> shouldParseAs typeAssignment
        ("Certificate", SequenceType
            ( [ComponentType("tbsCertificate", referencedType("TBSCertificate"), None);
               ComponentType("signatureAlgorithm", referencedType("AlgorithmIdentifier"), None)] )
            |> toNamedType "Certificate")

[<Test>]
let ``parse type assignments`` () =
    @"Certificate ::= SEQUENCE { }
    
      TBSCertificate  ::=  SEQUENCE { }"
    |> shouldParseAs typeAssignments
        [ ("Certificate", SequenceType([]) |> toNamedType "Certificate");
          ("TBSCertificate", SequenceType([]) |> toNamedType "TBSCertificate") ]

[<Test>]
let ``parse sequence type with comments between components`` () =
    @"SEQUENCE  {
        -- comment1
        extnID      OBJECT IDENTIFIER,
        -- comment2        
        critical    BOOLEAN DEFAULT FALSE
        -- comment3
        }" 
    |> shouldParseAs ptypeKind
            (SequenceType(
               [ComponentType("extnID", ObjectIdentifierType |> toType, None)
                ComponentType("critical", BooleanType |> toType, defaultValue(BooleanValue(false)))]))

[<Test>]
let ``parse choice type with comments between components`` () =
    @"CHOICE  {
        -- comment1
        extnID      OBJECT IDENTIFIER,
        -- comment2        
        critical    BOOLEAN
        -- comment3
        }" 
    |> shouldParseAs ptypeKind
        (ChoiceType(
            [ ("extnID", ObjectIdentifierType |> toType);
              ("critical", BooleanType |> toType) ]))

[<Test>]
let ``parse choice type with constrained alternative`` () =
    @"CHOICE  {
        teletexString TeletexString (SIZE (1..MAX))       
      }" 
    |> shouldParseAs ptypeKind
        (ChoiceType
            ( [ ("teletexString", 
                 referencedType("TeletexString") 
                 |> constrain 
                    (SizeConstraint(
                        ValueRange(
                            LowerEndpoint.Value(IntegerValue(bigint 1)), 
                            UpperEndpoint.Max)))) ] ))
            
[<Test>]
let ``parse INTEGER type`` () = 
    "INTEGER" |> shouldParseAs ptypeKind (IntegerType [])

[<Test>]
let ``parse ANY type`` () = 
    "ANY" |> shouldParseAs ptypeKind (AnyType None)

[<Test>]
let  ``parse ANY type defined by another component`` () =
    @"ANY DEFINED BY compName" 
    |> shouldParseAs ptypeKind (AnyType (Some "compName"))

[<Test>]
let ``parse OBJECT IDENTIFIER type`` () = 
    "OBJECT IDENTIFIER" |> shouldParseAs ptypeKind ObjectIdentifierType

[<Test>]
let ``parse OCTET STRING type`` () = 
    "OCTET STRING" |> shouldParseAs ptypeKind OctetStringType

[<Test>]
let ``parse INTEGER type with named values`` () =
    "INTEGER  {  v1(0), v2(1), v3(2)  }" 
    |> shouldParseAs ptypeKind
        (IntegerType 
            [ ("v1", SignedNumber(bigint 0))
              ("v2", SignedNumber(bigint 1))
              ("v3", SignedNumber(bigint 2)) ])

[<Test>]
let ``parse CHOICE type`` () = 
    @"CHOICE {
        i1    T1,
        i2    T2 }" 
    |> shouldParseAs ptypeKind
        (ChoiceType [ ("i1", referencedType "T1"); ("i2", referencedType "T2") ])

[<Test>]
let ``parse SEQUENCE OF type with size constraint`` () =
    "SEQUENCE SIZE (1..MAX) OF Extension" 
    |> shouldParseAs ptypeKind
        (AsnTypeKind.SequenceOfType
            (SizeConstraint
                (ValueRange
                    (LowerEndpoint.Value(IntegerValue(bigint 1)), 
                     UpperEndpoint.Max)) 
                |> Some,
             SequenceOfType (referencedType "Extension")))

[<Test>]
let ``parse single named value constraint`` () =
    "(a-named-value)" 
    |> shouldParseAs pconstraint 
        (SingleValue(ReferencedValue("a-named-value")))

[<Test>]
let ``parse size constraint with single named value`` () =
    "(SIZE (a-named-value))" 
    |> shouldParseAs pconstraint 
        (SizeConstraint(SingleValue(ReferencedValue("a-named-value"))))

[<Test>]
let ``parse size constraint with value range (MIN..MAX)`` () =
    "(SIZE (MIN..MAX))" 
    |> shouldParseAs pconstraint 
        (SizeConstraint(ValueRange(Min, Max)))

[<Test>]
let ``parse size constraint with value range (IntegerValue..NamedValue)`` () =
    "(SIZE (0..a-named-value))" 
    |> shouldParseAs pconstraint 
        (SizeConstraint
            (ValueRange
                (LowerEndpoint.Value(IntegerValue(bigint 0)), 
                 UpperEndpoint.Value(ReferencedValue("a-named-value")))))

[<Test>]
let ``parse union of named value constraints`` () =
    "( a-named-value-1 | a-named-value-2 )" 
    |> shouldParseAs pconstraint 
        (Union
            (SingleValue(ReferencedValue("a-named-value-1")),
             SingleValue(ReferencedValue("a-named-value-2"))))

[<Test>]
let ``parse SET``() =
    "SET { name  Name, dateOfBirth  [0] Date }"
    |> shouldParseAs ptypeKind 
        (SetType(
            [ComponentType("name", ReferencedType "Name" |> toType, None)
             ComponentType("dateOfBirth", TaggedType(None, 0, None, ReferencedType "Date" |> toType) |> toType, None) ] ))

[<Test>]
let ``parse component with SEQUENCE OF type`` () =
    "children  [3] IMPLICIT SEQUENCE OF ChildInformation DEFAULT {}" 
    |> shouldParseAs componentType
        (ComponentType("children",
            (TaggedType(None, 3, Some TagKind.Implicit, 
                (AsnTypeKind.SequenceOfType
                    (None, SequenceOfType.SequenceOfType(referencedType("ChildInformation")))) |> toType)) |> toType,
            Some(Default(SequenceOfValue([])))))

[<Test>]
let ``parse start of module definition``() =
    "PKIX1Explicit88 { iso(1) identified-organization(3) dod(6) internet(1)
                       security(5) mechanisms(5) pkix(7) id-mod(0) id-pkix1-explicit(18) }
     DEFINITIONS EXPLICIT TAGS ::=     
     BEGIN"
    |> shouldParseAs moduleDefinitionBegin
        { Identifier = "PKIX1Explicit88"
          Oid = [| Some "iso", Some (bigint 1)
                   Some "identified-organization", Some (bigint 3)
                   Some "dod", Some (bigint 6)
                   Some "internet", Some (bigint 1)
                   Some "security", Some (bigint 5)
                   Some "mechanisms", Some (bigint 5)
                   Some "pkix", Some (bigint 7)
                   Some "id-mod", Some (bigint 0)
                   Some "id-pkix1-explicit", Some (bigint 18) |]
          TagDefault = Some ExplicitTags
          ExtensibilityImplied = false
          TypeAssignments = Map.empty
          ValueAssignments = Map.empty
          Range = None }

[<Test>]
let ``parse first module definition from RFC 5250``() =
    let str = System.IO.File.ReadAllText(__SOURCE_DIRECTORY__ + @"\Data\rfc5280.txt")
    let md = parseModuleDefinition str 0

    equal 82 md.Value.TypeAssignments.Count
    equal (312805, 341179) md.Value.Range.Value
    // TODO 90 value assignments

[<Test>]
let ``parse second module definition from RFC 5250``() =
    let str = System.IO.File.ReadAllText(__SOURCE_DIRECTORY__ + @"\Data\rfc5280.txt")
    let md = parseModuleDefinition str 341179
    
    equal 47 md.Value.TypeAssignments.Count
    equal (341258, 354788) md.Value.Range.Value

    // TODO 38 value assignments