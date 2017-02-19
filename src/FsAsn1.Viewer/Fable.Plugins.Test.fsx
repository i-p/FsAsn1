namespace Fable.Plugins

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
    
    let log (info: Fable.ApplyInfo) =
        System.IO.File.AppendAllText(@"c:\logs\fable.log", sprintf "%s %s %A %A %A\n" info.ownerFullName info.methodName info.methodTypeArgs info.args info.methodKind)

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


type FParsecPlugin() =
    interface IReplacePlugin with
        member x.TryReplace com (info: Fable.ApplyInfo) =
            let prop = Helper.prop info
            let emit = Helper.emit info
            let forward () =
                if info.args.IsEmpty then                
                    Fable.Util.makeGet 
                        info.range 
                        info.returnType 
                        (Fable.Expr.Value(Fable.ValueKind.ImportRef("default", "./fparsec")))
                        (Fable.Util.makeConst info.methodName)
                    |> Some
                else
                    Fable.Util.makeCall
                        com
                        info.range
                        info.returnType
                        (Fable.Util.ImportCall("./fparsec", "default", Some info.methodName, false, info.args))
                    |> Some

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
                | "tuple3"
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
            | "FsAsn1.SchemaParser" ->
                match info.methodName with                
                | "intColumn" -> emit "$0.column"
                | "intIndex" -> emit "$0.index"           
                | "intLine" -> emit "$0.line"            
                | _ -> None
            | _ -> None

type ViewerPlugin() =
    interface IReplacePlugin with
        member x.TryReplace com (info: Fable.ApplyInfo) =
            let prop = Helper.prop info
            let emit = Helper.emit info
            let icall = Helper.icall com info

            match info.ownerFullName with
            | "System.Char" ->
                match info.methodName, info.args with
                | "ToUpper", [Type (Fable.Type.String _)] ->
                     emit "$0.toUpperCase()"
                | "ToLower", [Type (Fable.Type.String _)] ->
                     emit "$0.toLowerCase()"
                | "IsLower", [Type (Fable.Type.String _)] ->
                     emit "$0 >= 'a' && $0 <= 'z'"
                | "IsUpper", [Type (Fable.Type.String _)] ->
                     emit "$0 >= 'A' && $0 <= 'Z'"
                | _ ->
                    None
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
                | ".ctor", 
                    [Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (EntFullName("System.TimeSpan"))] ->
                    emit "({ dateTime: new Date($0,$1,$2,$3,$4,$5,$6), offset: $7 })"
                | "get_DateTime", [] ->
                    prop "dateTime"
                | _ -> 
                    None
            | "System.Convert" ->
                match info.methodName, info.args with
                | "ToByte", 
                    [Type (Fable.Type.String _); 
                     Type (Fable.Type.Number _)] ->
                     emit "parseInt($0,$1)"
                | _ ->
                    None
            | "System.IO.File" ->
                match info.methodName, info.args with
                | "ReadAllText", [Type (Fable.Type.String _)] ->
                    Fable.Util.makeCall
                        com
                        info.range
                        info.returnType
                        (Fable.Util.ImportCall("fs", "default", Some "readFileSync", false, info.args)) |> Some                    
                | _ -> None
            | _ ->
                None