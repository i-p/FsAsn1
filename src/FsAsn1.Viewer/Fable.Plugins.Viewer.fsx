namespace Fable.Plugins

#r "../../build/js/node_modules/fable-compiler/bin/Fable.Compiler.dll"
#r "../../build/js/node_modules/fable-compiler/bin/Fable.Core.dll"
#load "Fable.Plugins.Helper.fsx"

open Fable
open Fable.AST
open Fable.FSharp2Fable
open Fable.Replacements.Util
open Fable.Fable2Babel

type ViewerPlugin() =
    interface IReplacePlugin with
        member x.TryReplace _com (info: Fable.ApplyInfo) =
            let prop = Helper.prop info
            let emit = Helper.emit info
            let icall = Helper.icall info

            match info.ownerFullName with
            | "System.Char" ->
                match info.methodName, info.args with
                | "ToUpper", [Type _] ->
                     emit "$0.toUpperCase()"
                | "ToLower", [Type _] ->
                     emit "$0.toLowerCase()"
                | "IsLower", [Type _] ->
                     emit "$0 >= 'a' && $0 <= 'z'"
                | "IsUpper", [Type _] ->
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
                    emit "[$0, $1]"
                | ".ctor", 
                    [Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (Fable.Type.Number _);
                     Type (EntFullName("System.TimeSpan"))] ->
                    emit "[ new Date(Date.UTC($0,$1 - 1,$2,$3,$4,$5,$6)), $7]"
                | "get_DateTime", [] ->
                    prop "0"
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
                        info.range
                        info.returnType
                        (Fable.Util.ImportCall("fs", "default", Some "readFileSync", false, List.append info.args [Fable.Util.makeConst "utf8"])) |> Some                    
                | _ -> None
            | _ ->
                None