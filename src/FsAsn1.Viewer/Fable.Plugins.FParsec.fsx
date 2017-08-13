namespace Fable.Plugins

#r "../../build/js/node_modules/fable-compiler/bin/Fable.Compiler.dll"
#r "../../build/js/node_modules/fable-compiler/bin/Fable.Core.dll"
#load "Fable.Plugins.Helper.fsx"

open Fable
open Fable.AST
open Fable.FSharp2Fable
open Fable.Replacements.Util
open Fable.Fable2Babel

type FParsecPlugin() =
    interface IReplacePlugin with
        member x.TryReplace _com (info: Fable.ApplyInfo) =
            let prop = Helper.prop info
            let emit = Helper.emit info
            let forwardField () =                                
                Fable.Util.makeGet 
                    info.range 
                    info.returnType 
                    (Fable.Expr.Value(Fable.ValueKind.ImportRef("default", "fparsec", Fable.ImportKind.CustomImport)))
                    (Fable.Util.makeConst info.methodName)
                |> Some
            let forwardCall () =                
                Fable.Util.makeCall
                    info.range
                    info.returnType
                    (Fable.Util.ImportCall("fparsec", "default", Some info.methodName, false, info.args))
                |> Some

            match info.ownerFullName with
            | "FParsec.CharParsers" ->
                match info.methodName with                
                | "pint32"
                | "spaces"
                | "eof"
                | "newline"
                | "anyChar"
                | "getPosition"
                | "getUserState"
                | "skipNewline" ->
                    forwardField()        
                | "pstring"
                | "skipString"                                
                | "skipRestOfLine"
                | "run"
                | "runParserOnSubstring"
                | "runParserOnString"                
                | "numberLiteral"
                | "many1Satisfy2L" ->
                    forwardCall()
                //TODO move these functions to fparsec.js
                | "isAsciiUpper" ->
                    emit "$0 >= 'A' && $0 <= 'Z'"
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
                | "pipe4"
                | "pipe3"
                | "pipe2"
                | "preturn"
                | "tuple2"
                | "tuple3"
                | "createParserForwardedToRef" ->
                    forwardCall()
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
            | "FsAsn1.SchemaParser" ->
                match info.methodName with                
                | "intColumn" -> emit "$0.column"
                | "intIndex" -> emit "$0.index"           
                | "intLine" -> emit "$0.line"            
                | _ -> None
            | _ -> None