module FsAsn1.Viewer.JsUtils

#nowarn "1182"
open Fable.Core

[<Emit("$0.charCodeAt($1)")>]
let charCodeAt (str: string) (i) : byte = failwith "JS only"

[<Emit("($0).toString(16)")>]
let toHex i : string = failwith "JS only"

[<Emit("$1[$0]")>]
let getProp p obj: obj = failwith "JS only"