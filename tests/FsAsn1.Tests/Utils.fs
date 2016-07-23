﻿module FsAsn1.Tests.Utils

open FsUnit
open FParsec
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