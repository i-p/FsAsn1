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

    let icall (info: Fable.ApplyInfo) meth =
        let callee, args = 
            match info.callee with
            | Some c -> (c, info.args)
            | None -> (info.args.Head, info.args.Tail)
            
        Fable.Util.InstanceCall (callee, meth, args)
        |> Fable.Util.makeCall info.range info.returnType
        |> Some

    let prop (info: Fable.ApplyInfo) p =
        Fable.Util.makeGet info.range info.returnType info.callee.Value (Fable.Util.makeConst p)
        |> Some