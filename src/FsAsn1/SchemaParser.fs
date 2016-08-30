module FsAsn1.SchemaParser

open FParsec
open Schema

type UserState = 
    { Offset: int32; 
      UseRanges: bool }

let makeRange (fromPos: Position) (toPos: Position) state =    
    if state.UseRanges then
        Some(state.Offset + int fromPos.Index, 
             state.Offset + int toPos.Index)
    else
        None

let str_ws s = pstring s .>> spaces

let case str value = str_ws str >>% value

let inParentheses p = between (str_ws "(") (str_ws ")") p
let inBrackets p = between (str_ws "[") (str_ws "]") p
let inBraces p = between (str_ws "{") (str_ws "}") p

// 12.2.1  A "typereference" shall consist of an arbitrary number (one or more) of letters, digits, and hyphens. The initial
// character shall be an upper-case letter. A hyphen shall not be the last character. A hyphen shall not be immediately
// followed by another hyphen.

//TODO
// A "typereference" shall not be one of the reserved character sequences listed in 12.38
let typeReference = 
    many1Satisfy2L 
        isAsciiUpper 
        (fun c -> isAsciiLetter c || isDigit c || c = '-') 
        "typereference"
        .>> spaces

let moduleReference = typeReference

let identifier = 
    many1Satisfy2L 
        isAsciiLower 
        (fun c -> isAsciiLetter c || isDigit c || c = '-') 
        "identifier"
        .>> spaces

let identifierNoSpace = 
    many1Satisfy2L 
        isAsciiLower 
        (fun c -> isAsciiLetter c || isDigit c || c = '-') 
        "identifier"        

let ptype, ptypeRef = createParserForwardedToRef<AsnType, UserState>()
let definedValue, definedValueRef = createParserForwardedToRef<Value, UserState>()
let value, valueRef = createParserForwardedToRef<Value, UserState>()

let tagClass = 
    case "UNIVERSAL" Universal
    <|> case "APPLICATION" Application
    <|> case "PRIVATE" Private    

let tag = inBrackets (opt tagClass .>>. pint32)

let tagKind = 
    case "EXPLICIT" Explicit
    <|> case "IMPLICIT" Implicit    

let taggedType = pipe3 tag (opt tagKind) ptype (fun (c,n) t ty -> TaggedType(c, n, t, ty))
let prefixedType = taggedType

let pnull = case "NULL" NullType
let bitString = case "BIT STRING" BitStringType

let signedNumber = 
    numberLiteral NumberLiteralOptions.AllowMinusSign "signedNumber" 
    |>> fun nl -> bigint.Parse(nl.String)

let namedNumber = 
    identifier .>>. inParentheses
        ((signedNumber |>> NamedNumberValue.SignedNumber) 
         <|> (definedValue |>> NamedNumberValue.DefinedValue))

let namedNumberList = sepBy namedNumber (str_ws ",")

let integer = 
    str_ws "INTEGER" 
    >>. ((inBraces namedNumberList) <|>% []) |>> IntegerType

let objectIdentifierType = str_ws "OBJECT IDENTIFIER" >>% ObjectIdentifierType
let booleanType = str_ws "BOOLEAN" >>% BooleanType
let octetStringType = str_ws "OCTET STRING" >>% OctetStringType
let anyType = 
    str_ws "ANY" 
    >>. (opt (str_ws "DEFINED BY" >>. identifier) |>> AnyType)

let booleanValue = 
    let ptrue = str_ws "TRUE" >>% BooleanValue true
    let pfalse = str_ws "FALSE" >>% BooleanValue false
    ptrue <|> pfalse

let integerValue = signedNumber |>> IntegerValue

// TODO it should be unsigned number
let oidComponent =
    (signedNumber) |>> (fun x -> (None, Some x))
    <|> ((identifierNoSpace |>> Some) .>>. opt (inParentheses signedNumber))

// X.680 32.11 an object identifier value shall contain at least two arcs
let oidValue = inBraces (pipe3 (oidComponent .>> spaces) (oidComponent .>> spaces) (many (oidComponent .>> spaces)) (fun c1 c2 rest -> c1 :: c2 :: rest |> OidValue))

let namedType = identifier .>>. ptype
let valueReference = identifier



let lowerEndpoint = (str_ws "MIN" >>% Min) <|> (value |>> LowerEndpoint.Value)
let upperEndpoint = (str_ws "MAX" >>% Max) <|> (value |>> UpperEndpoint.Value)

let pconstraint, pconstraintRef = createParserForwardedToRef<Constraint, UserState>()

let psingleValue = value |>> SingleValue
let pvalueRange = lowerEndpoint .>> pstring ".." .>>. upperEndpoint |>> ValueRange
let psizeConstraint = (str_ws "SIZE" >>. pconstraint) |>> SizeConstraint

let pconstraintElements, pconstraintElementsRef =  createParserForwardedToRef<Constraint, UserState>()

// singeValue is a prefix of valueRange, so it must come after the valueRange
let simpleElement = psizeConstraint <|> (attempt pvalueRange) <|> psingleValue

pconstraintElementsRef :=
    (pipe2 simpleElement (opt (str_ws "|" >>. pconstraintElements)) 
        (fun c1 c2 ->
            match c2 with
            | Some(c2') -> Union(c1, c2')
            | None -> c1 ))

pconstraintRef := 
    inParentheses pconstraintElements

definedValueRef := valueReference |>> ReferencedValue
let referencedValue = definedValue

let sequenceOfValue = inBraces (sepBy value (str_ws ",")) |>> SequenceOfValue

// oidValue and sequenceOfValue share prefix: "{ integerValue"
valueRef := booleanValue <|> integerValue <|> referencedValue <|> (attempt oidValue) <|> sequenceOfValue 


let namedTypeModifier = 
    (str_ws "OPTIONAL" >>% Optional) 
    <|> (str_ws "DEFAULT" >>. value |>> Default)

let componentType = 
    namedType .>>. opt namedTypeModifier
    |>> fun ((n,t), m) -> ComponentType(n, t, m)

let comment = 
    (pstring "--" >>. skipManyTill anyChar (skipString "--" <|> skipNewline) .>> spaces)
    <|> (getPosition >>= fun p -> if p.Column = 1L then skipRestOfLine true .>> spaces else fail "?")

let commaSepListWithComments p =
    many comment >>. sepBy p (str_ws "," .>> many comment) .>> many comment

let componentTypeList = 
    commaSepListWithComments componentType

let sequenceType = 
    (str_ws "SEQUENCE" >>. inBraces componentTypeList) |>> SequenceType

let setType =
    (str_ws "SET" >>. inBraces componentTypeList) |>> SetType

// .>>? before OF
let sequenceOfType = 
    attempt (str_ws "SEQUENCE" >>. opt (psizeConstraint) .>> str_ws "OF") 
    .>>. ((ptype |>> SequenceOfType) <|> (namedType |>> SequenceOfNamedType)) 
    |>> AsnTypeKind.SequenceOfType

let setOfType = 
    attempt (str_ws "SET" >>. opt (psizeConstraint) .>> str_ws "OF") 
    .>>. ((ptype |>> SetOfType) <|> (namedType |>> SetOfNamedType)) 
    |>> AsnTypeKind.SetOfType

let alternativeTypeList = commaSepListWithComments namedType
let alternativeTypeLists = alternativeTypeList
let choiceType = 
    (str_ws "CHOICE" >>. inBraces alternativeTypeLists) |>> ChoiceType

let withRange p = 
    pipe3 getPosition p (getPosition .>>. getUserState) 
        (fun s res (e,us) -> 
            (makeRange s e us, res))
       
let typeAssignment = 
    spaces 
    >>. withRange ((attempt (typeReference .>> pstring "::=" .>> spaces)) 
                   .>>. ptype)
    |>> fun (r, (n, ty)) -> { Name = n; Type = { ty with TypeName = Some n }; Range = r }

let valueAssignment = 
    spaces 
    >>. withRange ((attempt (valueReference .>>. (ptype .>> spaces) .>> str_ws "::=")) 
                   .>>. value)
    |>> fun (r, ((n, ty), v)) -> { Name = n; Type = ty; Value = v; Range = r }

//TODO choice doesn't work in JS yet
// sequenceOfType must be before sequenceType
// setOfType must be before setType
let ptypeKind = 
    (sequenceOfType
    <|> sequenceType
    <|> setOfType
    <|> setType
    <|> choiceType
    <|> pnull 
    <|> bitString
    <|> integer
    <|> prefixedType
    <|> objectIdentifierType
    <|> booleanType
    <|> octetStringType
    <|> anyType
    <|> (typeReference |>> ReferencedType))

ptypeRef :=
    withRange (ptypeKind .>>. opt pconstraint)  
    |>> (fun (r,(kind, cs)) -> 
          { Kind = kind; 
            SchemaName = ""; 
            Range = r; 
            TypeName = None;
            Constraint = cs })
                
let typeAssignments = many typeAssignment


let tagDefault =
    opt (case "EXPLICIT TAGS" ExplicitTags
         <|> case "IMPLICIT TAGS" ImplicitTags
         <|> case "AUTOMATIC TAGS" AutomaticTags)

let extensionDefault =
    (str_ws "EXTENSIBILITY IMPLIED" >>% true) <|> preturn false

let moduleDefinitionBegin = 
    pipe4
        moduleReference 
        (oidValue .>> str_ws "DEFINITIONS")
        tagDefault
        (extensionDefault .>> str_ws "::=" .>> str_ws "BEGIN")
        (fun ident (OidValue(cs)) tagDefault extDefault ->
            { Identifier = ident 
              Oid = Array.ofList cs
              TagDefault = tagDefault
              ExtensibilityImplied = extDefault
              TypeAssignments = Map.empty
              ValueAssignments = Map.empty
              Range = None } )

let parseSubstring p str start count =
    match runParserOnSubstring p { Offset = 0; UseRanges = true } "" str start count with
    | Success(result, _, _) -> result
    | Failure(errorMsg, _, _) -> failwith errorMsg

let parse p str = 
    parseSubstring p str 0 str.Length

let previousIndex (str: string) startIndex (f: char -> bool) =        
    let mutable index = startIndex
    while index >= 0 && not (f str.[index]) do
        index <- index - 1
        
    if index = -1 then None else Some index

let isNewline c = c = '\r' || c = '\n'
let isWhitespace c = c = ' ' || isNewline c

let parseAssignmentsInRange (str: string) fromIndex toIndex =           
    let rec parseNext (fromIndex: int) acc acc2 =         
        let mutable index = str.IndexOf("::=", fromIndex)
        
        let trimRangeEnd (range: (int * int)) =            
            let s,e = range            
            // subtract 1 since 'e' is an exclusive index
            match previousIndex str (e - 1) (isWhitespace >> not) with
            | Some(newEnd) ->                    
                (s, newEnd + 1)
            | None -> failwith "Incorrect initial range"
                    
        if index = -1 || index >= toIndex then
            acc, acc2
        else           
            let recurse = parseNext (index + "::=".Length)
            let start = defaultArg (previousIndex str index isNewline) 0
            
            let count = toIndex - start
            
            match (runParserOnSubstring typeAssignment { Offset = start; UseRanges = true } "" str start count) with
            | Success(typeAssignment, _, _) -> 
                recurse ({ typeAssignment with Range = typeAssignment.Range |> Option.map trimRangeEnd } :: acc) acc2
            | Failure(errorMsg, _, _) ->                
                match (runParserOnSubstring valueAssignment { Offset = start; UseRanges = true } "" str start count) with
                | Success(valueAssignment, _, _) ->                     
                    recurse acc ({ valueAssignment with Range = valueAssignment.Range |> Option.map trimRangeEnd } :: acc2)
                | Failure(errorMsg, _, _) ->
                    recurse acc acc2
         
    let types, values = parseNext fromIndex [] []

    (types |> List.rev, values |> List.rev)

let parseAssignments str = parseAssignmentsInRange str 0 (str.Length - 1)

let indexOf (value: string) (str: string) (startIndex: int) =
    match str.IndexOf(value, startIndex) with
    | -1 -> None
    | i -> Some i

let lastIndexOf (value: string) (str: string) (startIndex: int) =
    match str.LastIndexOf(value, startIndex) with
    | -1 -> None
    | i -> Some i

let lastIndexOfAny (anyOf: char[]) (str: string) (startIndex: int) =
    match str.LastIndexOfAny(anyOf, startIndex) with
    | -1 -> None
    | i -> Some i

let parseModuleDefinition (str: string) (start: int) =
    indexOf "DEFINITIONS" str start
    |> Option.bind(lastIndexOf "{" str)
    |> Option.bind(fun i -> previousIndex str (i - 1) (isWhitespace >> not))
    |> Option.bind(fun i -> previousIndex str (i - 1) (isWhitespace))    
    |> Option.map(fun lineStart -> 
                
        let (startPos, mdb, endPos) = 
            parseSubstring (spaces >>.  tuple3 getPosition moduleDefinitionBegin getPosition) str lineStart (str.Length - lineStart)

        //TODO check that there are only spaces between this position and previous line break
        let endIndex = str.IndexOf("END", lineStart + int startPos.Index)

        let types, values = parseAssignmentsInRange str (lineStart + int startPos.Index) endIndex

        { mdb with 
            TypeAssignments = types |> List.map (fun ta -> (ta.Name, ta)) |> Map.ofList
            ValueAssignments = values |> List.map (fun va -> (va.Name, va)) |> Map.ofList
            Range = Some(lineStart + int startPos.Index, endIndex + "END".Length) })