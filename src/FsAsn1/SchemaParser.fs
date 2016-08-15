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

let namedType = identifier .>>. ptype
let valueReference = identifier



let lowerEndpoint = (str_ws "MIN" >>% Min) <|> (value |>> LowerEndpoint.Value)
let upperEndpoint = (str_ws "MAX" >>% Max) <|> (value |>> UpperEndpoint.Value)

let pconstraint, pconstraintRef = createParserForwardedToRef<Constraint, UserState>()

let psingleValue = value |>> SingleValue
let pvalueRange = lowerEndpoint .>> pstring ".." .>>. upperEndpoint |>> ValueRange
let psizeConstraint = (str_ws "SIZE" >>. pconstraint) |>> SizeConstraint

// singeValue is a prefix of valueRange, so it must come after the valueRange
pconstraintRef := 
    inParentheses (psizeConstraint <|> (attempt pvalueRange) <|> psingleValue)

definedValueRef := valueReference |>> ReferencedValue
let referencedValue = definedValue

let sequenceOfValue = inBraces (sepBy value (str_ws ",")) |>> SequenceOfValue

valueRef := booleanValue <|> integerValue <|> referencedValue <|> sequenceOfValue


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
    |>> fun (r, (n, ty)) -> (n, { ty with TypeName = Some n; Range = r })

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

// TODO it should be unsigned number
let definitiveOidComponent =
    inParentheses signedNumber |>> (fun x -> (None, Some x))
    <|> ((identifier |>> Some) .>>. opt (inParentheses signedNumber))

let moduleDefinition = 
    pipe4
        moduleReference 
        (inBraces (many1 definitiveOidComponent) .>> str_ws "DEFINITIONS")
        tagDefault
        (extensionDefault .>> str_ws "::=" .>> str_ws "BEGIN" .>> str_ws "END")
        (fun ident oid tagDefault extDefault ->
            { Identifier = ident 
              Oid = Array.ofList oid
              TagDefault = tagDefault
              ExtensibilityImplied = extDefault
              TypeAssignments = Map.empty
              ValueAssignments = Map.empty } )

let parse p str =
    match runParserOnString p { Offset = 0; UseRanges = true } "" str with
    | Success(result, _, _) -> result
    | Failure(errorMsg, _, _) -> failwith errorMsg
    
let parseTypeAssignments str = parse typeAssignments str
let parseTypeAssignmentsRfc (str: string) = 
    let totalLength = str.Length

    let isNewline c = c = '\r' || c = '\n'
    let isWhitespace c = c = ' ' || isNewline c

    let previousIndex (str: string) startIndex (f: char -> bool) =        
        let mutable index = startIndex
        while index >= 0 && not (f str.[index]) do
            index <- index - 1
        
        if index = -1 then None else Some index

    let rec parseNext (fromIndex: int) acc =         
        let mutable index = str.IndexOf("::=", fromIndex)
        
        let stripTrailingWhitespace (n: string, ty: AsnType) =            
            match ty.Range with
            | Some(s, e) ->
                let newEnd = previousIndex str e (isWhitespace >> not)
                
                (n, {ty with Range = Some (s, defaultArg newEnd s) })
            | None -> (n, ty)

        if index = -1 then
            acc
        else           
            let recurse = parseNext (index + "::=".Length)
            let start = defaultArg (previousIndex str index isNewline) 0
            
            let count = totalLength - start

            match (runParserOnSubstring typeAssignment { Offset = start; UseRanges = true } "" str start count) with
            | Success(result, _, _) -> 
                recurse (stripTrailingWhitespace result :: acc)
            | Failure(errorMsg, _, _) -> 
                recurse acc
         
    parseNext 0 [] |> List.rev

    