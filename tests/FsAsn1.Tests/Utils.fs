﻿module FsAsn1.Tests.Utils

open System
open FsUnit
open FParsec
open FsAsn1.Types
open FsAsn1.Reader
open FsAsn1.Schema
open FsAsn1.SchemaParser

type EmitAttribute(macro: string) =
    inherit System.Attribute()
type ImportAttribute(memb: string, path: string) =
    inherit System.Attribute()

#if !FABLE
// Pretty-print F# value types in error messages
type InitMsgUtils() =
    inherit FSharpCustomMessageFormatter()
#endif

type Assert = 
    // assert.deepEqual(actual, expected)
    [<Import("deepEqual","assert")>]
    static member AreEqual(actual, expected) : unit = NUnit.Framework.Assert.AreEqual(expected, actual)

let equal (expected: 'T) (actual: 'T) =    
    Assert.AreEqual(actual, expected)

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
    { SchemaName = ""; Range = None; Kind = kind; TypeName = None; Constraint = None }

let withName name ty =
    { ty with TypeName = Some name }    

let constrain cs ty =
    { ty with Constraint = Some cs }    

let toNamedType name = toType >> withName name
let toConstrainedType c = toType >> constrain c

let toIndexLineColumn (p: Position) =
    (p.Index, p.Line, p.Column)

let private hexStringToBytes (str: string) =    
    str
    |> Seq.filter (fun c -> c <> ' ' && c <> '|' && c <> '\n' && c <> '\r')
    |> Seq.chunkBySize 2
    |> Seq.map (fun chars -> Convert.ToByte(String(chars), 16))
    |> Seq.toArray
    
let private hexStringStream str = AsnArrayStream(hexStringToBytes str, 0)

let private replaceChildren (value: AsnValue) children =
    match value with
    | Sequence(_) -> Sequence(children)
    | SequenceOf(_) -> SequenceOf(children)
    | Set(_) -> Set(children)
    | SetOf(_) -> SetOf(children)
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
    let fSimple el =
        toDummyElement el.Value
    let fCollection el children =
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
    let ctx = AsnContext(stream, (fun typeName -> None))
    let actual =
        let el = readElement ctx None
        if isDummy expected then convertToDummy el else el

    equal expected actual

let shouldReadAsType typeName expected (hexString, types) =
    let stream = hexString |> hexStringStream
    let ctx = AsnContext(stream, (fun typeName -> Map.tryFind typeName types))
    let el = readElement ctx (Some (Map.find typeName types))
    let actual =
        if isDummy expected then convertToDummy el else el

    equal (typeName, expected) (el.SchemaType.Value.TypeName.Value, actual)