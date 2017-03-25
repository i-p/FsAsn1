﻿module FsAsn1.Tests.Utils

open System
open FsUnit
open FParsec
open FsAsn1.Types
open FsAsn1.Reader
open FsAsn1.Schema
open FsAsn1.SchemaParser

#if !FABLE
// Pretty-print F# value types in error messages
type InitMsgUtils() =
    inherit FSharpCustomMessageFormatter()
#endif


let equal (expected: 'T) (actual: 'T) =    
    NUnit.Framework.Assert.AreEqual(expected, actual)

let parse p str =
    match runParserOnString p { Offset = 0; UseRanges = false } "" str with
    | Success(result, _, _) -> result
    | Failure(errorMsg, _, _) -> failwith errorMsg
  
// Verify that parser consumes the whole input string
let shouldParseAs (p: Parser<'t, UserState>) (result: 't) str =        
    (parse (p .>> eof) str) |> equal result

let shouldPartiallyParseAs (p: Parser<'t, UserState>) (result: 't) str =        
    (parse p str) |> equal result

let toType kind =
    { SchemaName = ""; Range = None; Kind = kind; TypeName = None; Constraint = None; ComponentName = None }

let toComponentType componentName kind =
    { SchemaName = ""; Range = None; Kind = kind; TypeName = None; Constraint = None; ComponentName = Some componentName }

let withName name ty =
    { ty with TypeName = Some name }    

let constrain cs ty =
    { ty with Constraint = Some cs }    

let toNamedType name = toType >> withName name
let toConstrainedType c = toType >> constrain c

let mkComponentType (name, ty, defaultValue) =
    ComponentType(name, { ty with ComponentName = Some name }, defaultValue)

let mkChoiceComponent (name, ty) =
    (name, { ty with ComponentName = Some name })

let toIndexLineColumn (p: Position) =
    (p.IntIndex, p.IntLine, p.IntColumn)

let private hexStringToBytes (str: string) =    
    str
    |> Seq.filter (fun c -> c <> ' ' && c <> '|' && c <> '\n' && c <> '\r')
    |> Seq.toList    
    |> Seq.unfold (fun str -> match str with | [] -> None | c1 :: c2 :: rest -> Some([|c1;c2|], rest))
    |> Seq.map (fun chars -> Convert.ToByte(String(chars), 16))
    |> Seq.toArray
    
let private hexStringStream str = AsnArrayStream(hexStringToBytes str, 0)

let private replaceChildren (value: AsnValue) children =
    match value with
    | Sequence(_) -> Sequence(children)
    | Set(_) -> Set(children)
    | ExplicitTag(_) ->
        match children with
        | [| c |] -> ExplicitTag(c)
        | _ -> failwithf "Expected one child element for explicit tag, got %d elements." children.Length
    | Integer(_)
    | Null
    | ObjectIdentifier(_)
    | RelativeObjectIdentifier(_)
    | OctetString(_)
    | PrintableString(_)
    | VisibleString(_)
    | IA5String(_)
    | UTF8String(_)
    | T61String(_)
    | Unknown(_)
    | BitString(_)
    | UTCTime(_)
    | Boolean(_) ->
        failwithf "Cannot replace children of a primitive type %A" value

let private toDummyElement (value: AsnValue) =
    makeElement(makeHeader(AsnClass.ContextSpecific, Encoding.Primitive, -1, Indefinite), value, -1, None)

let (~&) = toDummyElement

let private isDummy (el: AsnElement) = el.Offset = -1 && el.Header.Tag = -1

let private convertToDummy (el: AsnElement) =
    let fSimple (el: AsnElement) =
        toDummyElement el.Value
    let fCollection (el: AsnElement) children =
        toDummyElement (replaceChildren el.Value children)

    cataAsn fSimple fCollection el

let shouldReadAsHeader args hexString =
    let actual = hexString |> hexStringStream |> readHeader
    let expected = makeHeader args
    equal expected actual

let shouldReadAsLength len hexString =
    let stream = hexString |> hexStringStream
    equal len (readLength stream)

let shouldReadAs expected hexString =
    let stream = hexString |> hexStringStream
    let ctx = AsnContext(stream, [])
    let actual =
        match readElement ctx None with
        | Some(el), None ->
            if isDummy expected then convertToDummy el else el
        | el, errEl ->
            failwithf "Unexpected element %A or error element %A" el errEl
        
    equal expected actual
    
let read (hexString) : (AsnElement option * AsnErrorElement option * AsnContext) =
    let stream = hexString |> hexStringStream
    let ctx = AsnContext(stream, [])        
    let el, err = readElement ctx None    
    el, err, ctx        
    
let readAsType typeName (hexString, moduleDefinition) : (AsnElement option * AsnErrorElement option * AsnContext) =
    let stream = hexString |> hexStringStream
    let ctx = AsnContext(stream, [moduleDefinition])        
    let el, err = readElement ctx (Some (Map.find typeName moduleDefinition.TypeAssignments).Type)    
    el, err, ctx

let shouldReadAsType typeName expected (hexString, moduleDefinition: FsAsn1.Schema.ModuleDefinition) =
    let stream = hexString |> hexStringStream
    let ctx = AsnContext(stream, [moduleDefinition])
    let Some(el), None = readElement ctx (Some (Map.find typeName moduleDefinition.TypeAssignments).Type)
    let actual =
        if isDummy expected then convertToDummy el else el

    equal (typeName, expected) (el.SchemaType.Value.TypeName.Value, actual)

#nowarn "1182"

type EmitAttribute(macro: string) =
    inherit System.Attribute()
type ImportAttribute(memb: string, path: string) =
    inherit System.Attribute()
