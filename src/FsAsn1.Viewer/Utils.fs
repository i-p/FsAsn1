module FsAsn1.Viewer.Utils

open System
open Fable.Core
open Fable.Import.Browser
open FsAsn1.Types
open JsUtils

let syncScroll (sourceEl: HTMLElement) 
               (sourceContainer: HTMLElement) 
               (targetEl: HTMLElement) 
               (targetContainer: HTMLElement) =
    let newScrollTop = targetEl.offsetTop - (sourceEl.offsetTop - sourceContainer.scrollTop)

    targetContainer.scrollTop <- newScrollTop

let addClass (cls: string) (el: HTMLElement) = el.classList.add(cls)
let removeClass (cls: string) (el: HTMLElement) = el.classList.remove(cls)

let base64ToByteArray b64 =
    let byteString = window.atob(b64)
    let byteArray = Array.zeroCreate<byte>(byteString.Length)

    for i in 0..byteString.Length - 1 do    
        byteArray.[i] <- charCodeAt byteString i
    byteArray
   
let byteToUpperHex (b: byte) = (toHex b).ToUpper().PadLeft(2, '0')

let appendTo (targetEl: HTMLElement) el =
    targetEl.appendChild el |> ignore

let tryGetElementById id : HTMLElement option =     
    document.getElementById id |> Core.Option.ofObj

let rec findParent predicate (el: HTMLElement) =
    match Core.Option.ofObj el with
    | None ->
        None
    | Some(el) when predicate el ->    
        Some el
    | Some(el) ->
        findParent predicate el.parentElement

let toSeq (nodeList: NodeListOf<'t>) =
    seq {
        for i = 0 to int nodeList.length - 1 do
            yield nodeList.Item(i)
    }

let inline f1 (f: 'a->'b) = Func<_,_> f
let withTarget<'a when 'a :> Event> func : Func<'a, obj> =
    f1(fun (e: 'a) ->
        e.target :?> HTMLElement |> func
        box ())

let lengthStr header = 
    match header.Length with
    | Definite (l, _) -> l.ToString()
    | Indefinite -> "Indefinite"

let valueStr asnElement =
    let utcTimeToString (dto: DateTimeOffset) =
        sprintf "%02d.%02d.%d %02d:%02d" dto.DateTime.Day dto.DateTime.Month dto.DateTime.Year dto.DateTime.Hour dto.DateTime.Minute        

    match asnElement.Value with
    | Integer(v) -> v.ToString() |> Some
    | ObjectIdentifier(numbers)
    | RelativeObjectIdentifier(numbers) -> String.Join(".", numbers |> Seq.map(fun n -> n.ToString())) |> Some
    //TODO FIX
    | OctetString(v) -> sprintf "%x" v.[0] |> Some    
    | UTCTime(dto) -> utcTimeToString dto |> Some
    | PrintableString(v)
    | UTF8String(v)
    | T61String(v)
    | VisibleString(v)
    | IA5String(v) -> sprintf "\"%s\"" v |> Some
    | Boolean(v) ->
        match v with
        | AsnBoolean.True _ -> "TRUE" |> Some
        | AsnBoolean.False -> "FALSE" |> Some
    | Null
    | Sequence(_)
    | Set(_)
    | Unknown(_)
    | BitString(_)
    | ExplicitTag(_) -> None

let typeStr asnElement = 
    match asnElement.Value with
    | Null -> "NULL"
    | Integer(_) -> "INTEGER"
    | ObjectIdentifier(_) -> "OBJECT_IDENTIFIER"
    | RelativeObjectIdentifier(_) -> "RELATIVE_OBJECT_IDENTIFIER"
    | OctetString(_) -> "OCTET_STRING"
    | PrintableString(_) -> "PRINTABLE_STRING"
    | IA5String(_) -> "IA5_STRING"
    | VisibleString(_) -> "VISIBLE_STRING"
    | UTF8String(_) -> "UTF8_STRING"
    | Sequence(_) -> "SEQUENCE"
    | Set(_) -> "SET"
    | T61String(_) -> "T61_STRING"
    | Unknown(_) -> "Unknown"
    | BitString(_) -> "BITSTRING"
    | UTCTime(_) -> "UTC_TIME"
    | ExplicitTag(_) -> "EXPLICIT_TAG"
    | Boolean(_) -> "BOOLEAN"

/// Retrieves data from the specified resource.
let internal fetchAsync2 (url:string, init: Fable.Helpers.Fetch.RequestProperties list) : Async<Fable.Import.Fetch.Response> = 
    let pathname = document.location.pathname
    let basePath = 
        match pathname.LastIndexOf('/') with
        | -1 -> ""
        | lastSlash -> pathname.Substring(0, lastSlash)

    Fable.Import.Fetch.GlobalFetch.fetch(basePath + url, unbox init) |> Async.AwaitPromise