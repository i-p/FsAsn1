﻿namespace Fable.Plugins

#r "../../build/js/node_modules/fable-compiler/bin/Fable.Compiler.dll"
#r "../../build/js/node_modules/fable-compiler/bin/Fable.Core.dll"

open Fable
open Fable.AST
open Fable.FSharp2Fable
open Fable.Replacements.Util
open Fable.Fable2Babel

module private Helper =
    let emit (i: Fable.ApplyInfo) emit =
        Fable.Apply(
            Fable.Emit(emit) |> Fable.Value, i.args, Fable.ApplyMeth, i.returnType, i.range)
        |> Some

    let import name path =
        let specifier = Babel.ImportDefaultSpecifier(Babel.Identifier(name)) |> U3.Case2
        Babel.ImportDeclaration([specifier], Babel.StringLiteral path)
                            :> Babel.ModuleDeclaration |> U2.Case2

    let log (info: Fable.ApplyInfo) =
        System.IO.File.AppendAllText(@"c:\logs\fable.log", sprintf "%s %s %A %A\n" info.ownerFullName info.methodName info.methodTypeArgs info.args)

    let icall com (info: Fable.ApplyInfo) meth =
        let callee, args = 
            match info.callee with
            | Some c -> (c, info.args)
            | None -> (info.args.Head, info.args.Tail)
            
        Fable.Util.InstanceCall (callee, meth, args)
        |> Fable.Util.makeCall com info.range info.returnType
        |> Some

    let prop (info: Fable.ApplyInfo) p =
        Fable.Util.makeGet info.range info.returnType info.callee.Value (Fable.Util.makeConst p)
        |> Some

type BigIntegerPlugin() =
    interface IDeclarePlugin with
        member x.TryDeclareRoot com ctx file =
            let original = Util.transformModDecls com ctx Util.declareRootModMember None file.Declarations

            Helper.import "bigInt" "big-integer" :: original |> Some
        member x.TryDeclare com ctx decl =
            None

    interface IReplacePlugin with
        member x.TryReplace com (info: Fable.ApplyInfo) =
            let icall = Helper.icall com info
            let emit = Helper.emit info

            match info.ownerFullName with
            | "System.Numerics.BigInteger" ->
                match info.methodName, info.args with
                | ".ctor", [Type (Fable.Type.Number _)] ->
                    emit "bigInt($0)"
                | "Parse", [Type (Fable.Type.String _)] ->
                    emit "bigInt($0)"
                | "get_Zero", [] ->
                    emit "bigInt.zero"
                | _ ->
                    None
            | "Microsoft.FSharp.Core.Operators" ->
                match info.methodName, info.args with
                | "op_Addition", 
                    [Type (EntFullName("System.Numerics.BigInteger")); 
                     Type (EntFullName("System.Numerics.BigInteger"))] ->
                    icall "add"
                | "op_Multiply", 
                    [Type (EntFullName("System.Numerics.BigInteger")); 
                     Type (EntFullName("System.Numerics.BigInteger"))] ->
                    icall "multiply"
                | _ -> None
            | _ -> None

type FParsecPlugin() =
    interface IDeclarePlugin with
        member x.TryDeclareRoot com ctx file =
            let original = Util.transformModDecls com ctx Util.declareRootModMember None file.Declarations

            Helper.import "fparsec" "./fparsec" :: original |> Some
        member x.TryDeclare com ctx decl =
            None

    interface IReplacePlugin with
        member x.TryReplace com (info: Fable.ApplyInfo) =
            let prop = Helper.prop info
            let emit = Helper.emit info

            //TODO create AST instead of emit
            let forward () =
                match info.methodKind with
                | Fable.MemberKind.Field ->
                    sprintf "fparsec.%s" info.methodName |> emit
                | Fable.MemberKind.Method ->
                    sprintf "fparsec.%s(%s)" info.methodName 
                        (String.concat "," (List.mapi (fun i _ -> sprintf "$%d" i) info.args))
                        |> emit

            match info.ownerFullName with
            | "FParsec.CharParsers" ->
                match info.methodName with
                | "eof"
                | "anyChar"
                | "getPosition"
                | "getUserState"
                | "skipString"
                | "skipNewline"
                | "newline"
                | "skipRestOfLine"
                | "run"
                | "runParserOnSubstring"
                | "runParserOnString"
                | "pstring"
                | "pint32"
                | "spaces"
                | "numberLiteral"
                | "many1Satisfy2L" ->
                    forward()
                //TODO move these functions to fparsec.js
                | "isAsciiUpper" ->
                    emit "$0.toUpper() === $0"
                | "isAsciiLower" ->
                    emit "$0 >= 'a' && $0 <= 'z'"
                | "isAsciiLetter" ->
                    emit "($0 >= 'a' && $0 <= 'z') || ($0 >= 'A' && $0 <= 'Z')"
                | "isDigit" ->
                    emit "($0 >= '0' && $0 <= '9')"
                | _ -> 
                    None
            | "FParsec.Primitives" ->
                match info.methodName with
                | "fail"
                | "op_GreaterGreaterEquals"
                | "attempt"
                | "skipManyTill"
                | "manyTill"
                | "opt"
                | "many"
                | "choice"
                | "sepBy"
                | "op_BarGreaterGreater"
                | "op_LessBarGreater"
                | "op_LessBarGreaterPercent"
                | "op_GreaterGreaterDot"
                | "op_DotGreaterGreater"
                | "op_DotGreaterGreaterQmark"
                | "op_DotGreaterGreaterDot"
                | "op_GreaterGreaterPercent"
                | "between"
                | "pipe3"
                | "pipe2"
                | "createParserForwardedToRef" ->
                    forward()
                | _ -> 
                    None
            | "FParsec.CharParsers.NumberLiteral" ->
                match info.methodName with
                | "String" -> prop "string"
                | _ -> None
            | "FParsec.Position" ->
                match info.methodName with
                | "get_Column" -> prop "column"
                | "get_Index" -> prop "index"
                | "get_Line" -> prop "line"
                | "get_StreamName" -> prop "streamName"
                | _ -> None
            | _ -> None

type ViewerPlugin() =
    interface IReplacePlugin with
        member x.TryReplace com (info: Fable.ApplyInfo) =
            let prop = Helper.prop info
            let emit = Helper.emit info
            let icall = Helper.icall com info

            match info.ownerFullName with
            | "System.Text.Encoding" ->
                match info.methodName, info.args with
                | "get_ASCII", [] ->
                    emit "new TextDecoder('ascii')"
                | "get_UTF8", [] ->
                    emit "new TextDecoder('utf-8')"
                | "GetString", [_] -> 
                    icall "decode"
                | _ ->
                    None
            | "System.DateTimeOffset" ->
                match info.methodName, info.args with
                | ".ctor", 
                    [Type (EntFullName("System.DateTime")); 
                     Type (EntFullName("System.TimeSpan"))] ->
                    emit "({ dateTime: $0, offset: $1 })"
                | "dateTime", [] ->
                    prop "dateTime"
                | _ -> 
                    None
            | _ ->
                None