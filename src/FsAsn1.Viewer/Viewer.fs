module FsAsn1.Viewer

open System
open Fable.Core
open Fable.Import
open Fable.Import.Browser
open Fable.Core.JsInterop

open FsAsn1.Types
open FsAsn1.Schema
open FsAsn1.Reader
open FsAsn1.SchemaParser
open Microsoft.FSharp

let schemaViewer = document.getElementById "schema-viewer"
let hexViewer = document.getElementById "hex-viewer"
let viewer = document.getElementById "viewer"

//TODO HACK - fix
let mutable resolveType = fun ty -> ty

let inline f1 (f: 'a->'b) = Func<_,_> f
let inline f2 (f: 'a->'b->'c) = Func<_,_,_> f
let inline f3 (f: 'a->'b->'c->'d) = Func<_,_,_,_> f

[<Emit("$0.charCodeAt($1)")>]
let charCodeAt (str: string) (i) : byte = failwith "JS only"

[<Emit("($0).toString(16)")>]
let toHex i : string = failwith "JS only"


let dataBase64 = "MIIEhTCCA22gAwIBAgIIXZCIiFIoczAwDQYJKoZIhvcNAQELBQAwSTELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkdvb2dsZSBJbmMxJTAjBgNVBAMTHEdvb2dsZSBJbnRlcm5ldCBBdXRob3JpdHkgRzIwHhcNMTYwNTE4MTEyMTQyWhcNMTYwODEwMTA0NjAwWjBlMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzETMBEGA1UECgwKR29vZ2xlIEluYzEUMBIGA1UEAwwLKi5nb29nbGUuc2swggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCwavWgUn/fa92LE1MP3XrFrrSCa0dcQUP0/NL+dUEQEAgHp/ChSPASHiUsKbSJqzaynAz3999zDAkDpxbZ48KYhh9bfdMCLXHrXz2EdZY0oViH7SzLV2rHpKG/rLF7+tehfkCyDhJ+Oe6IEOiQvX8XKhzHMrDBkCl0OBenJY6fkmGeVXwMy+sosWQiZ7syoLVVrIz9tvvAZqxd7g2hG8mSSKKR/oVL638nbW+D1aysxs2wnMA59jK1d4BvCOdBqTFlSqPwBaf4lLwZ26TGAHZ4Jc+lRhTD9LL7uj9JHDbPypdsGIUEU6PlUEcrJwimP7rNym4OgsafjPY/D3lJ6ai/AgMBAAGjggFTMIIBTzAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwIQYDVR0RBBowGIILKi5nb29nbGUuc2uCCWdvb2dsZS5zazBoBggrBgEFBQcBAQRcMFowKwYIKwYBBQUHMAKGH2h0dHA6Ly9wa2kuZ29vZ2xlLmNvbS9HSUFHMi5jcnQwKwYIKwYBBQUHMAGGH2h0dHA6Ly9jbGllbnRzMS5nb29nbGUuY29tL29jc3AwHQYDVR0OBBYEFMKUTd8jCnhjtHJyt8AAL6YQTocsMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUSt0GFhu89mi1dvWBtrtiGrpagS8wIQYDVR0gBBowGDAMBgorBgEEAdZ5AgUBMAgGBmeBDAECAjAwBgNVHR8EKTAnMCWgI6Ahhh9odHRwOi8vcGtpLmdvb2dsZS5jb20vR0lBRzIuY3JsMA0GCSqGSIb3DQEBCwUAA4IBAQBEVDALCBFaS0tV2e17ozMMYdNEHGfBBWvxCE/Tx9Z3Dy5F2ZwTz8gdetpjAs2jBynmWWQgs0Z8/246bWPflvw/pcVrdZu+KWvKBioXKiE/MVIR//h72WOAWcLOkxxW60E+UsIqVtVxnHuynd32FeU1ft0COh2AWZ2C8TTvGTGL5n3LY5WDCfQF8MIq4o64fdDM+bgcSRwHH2c1k5uWXfR3kuii2XkzuE1+8LGsDPTadRlQSzAZM0l3Zf0SNwHPLDzMS91W3bnMfJ+y28c5ExZH+Op/X1NpDnOUQEbLgexS2Jq8xFcGo/bZ9w8ZnODVccqid+wWaR3OwXJ/TtEV4C8Z"

let byteString = window.atob(dataBase64)

let byteArray = Array.zeroCreate<byte>(byteString.Length)

for i in 0..byteString.Length - 1 do 
    let c = charCodeAt byteString i
    byteArray.[i] <- charCodeAt byteString i
   
let byteToUpperHex (b: byte) = (toHex b).ToUpper().PadLeft(2, '0')

let makeHexViewerDom (asnElement: AsnElement) (bytes: byte[]) =
    let fSimple (el: AsnElement) = 
        let span = document.createElement "span"
        let len, lenOctets = 
            match el.Header.Length with
            | Definite(l, lenOctets) -> l, lenOctets
            | Indefinite -> failwith "Not supported"

        //TODO length of identifier octet, now assuming 1
        let byteStr = bytes.[el.Offset..el.Offset + 1 + lenOctets + len - 1]
                      |> Array.map byteToUpperHex |> String.concat " "

        span.textContent <- byteStr + " "
        span.id <- sprintf "H%d-%d" el.Offset len
        span

    let fCollection (el: AsnElement) children = 
        let span = document.createElement "span"
        let len, lenOctets = 
            match el.Header.Length with
            | Definite(l, lenOctets) -> l, lenOctets
            | Indefinite -> failwith "Not supported"

        let byteStr = bytes.[el.Offset..el.Offset + 1 + lenOctets - 1] |> Array.map byteToUpperHex |> String.concat " "

        span.textContent <- byteStr + " "
        span.id <- sprintf "H%d-%d" el.Offset len

        children |> Array.map span.appendChild |> ignore
        span

    cataAsn fSimple fCollection asnElement

let toOption (el: HTMLElement) : HTMLElement option = 
    if Object.ReferenceEquals(el, null) then
        None
    else
        Some el
 
let getElementById id : HTMLElement option = 
    document.getElementById id |> toOption

[<Emit("$1[$0]")>]
let getProp p obj: obj = failwith "JS only"

type ElementType =
    | StructureElement
    | HexElement
    | SchemaElement

type ElementSet = 
    { Id: string
      Structure: HTMLElement
      Hex: HTMLElement
      Schema: (string * HTMLElement) option }
    member this.Elements (): HTMLElement list =
        match this.Schema with
        | Some(_, el) -> [this.Structure; this.Hex; el]
        | None -> [this.Structure; this.Hex]

    member this.AddClass (cls: string) =
        this.Elements()
        |> List.iter (fun el -> el.classList.add(cls))

    member this.RemoveClass (cls: string) =
        this.Elements()
        |> List.iter (fun el -> el.classList.remove(cls))


let hover, select =
    let hoverSet: ElementSet option ref = ref None
    let selectionSet: ElementSet option ref = ref None

    let update (cls: string) (curSet: ElementSet option ref) (newSet: ElementSet option) =
        match !curSet with
        | Some(set) -> set.RemoveClass cls
        | None -> ()

        match newSet with
        | Some(set) -> 
            set.AddClass cls        
            curSet := Some set
        | None ->
            curSet := None

    update "hover" hoverSet, update "selected" selectionSet

let getElementSet (el: HTMLElement) = 
    let id = el.id.Substring(1)
    let hexEl = getElementById("H" + id).Value
    let structureEl = getElementById("S" + id).Value
    let typeName = (getProp "typeName" structureEl) :?> string
    let typeEl = getElementById("t-" + typeName)
    { Id = id
      Structure = structureEl
      Hex = hexEl
      Schema = typeEl |> Core.Option.map (fun el -> (typeName, el)) }

let hoverId (el: HTMLElement option) =
    el
    |> Core.Option.map getElementSet
    |> hover    

let syncScroll (sourceEl: HTMLElement) 
               (sourceContainer: HTMLElement) 
               (targetEl: HTMLElement) 
               (targetContainer: HTMLElement) =
    let newScrollTop = targetEl.offsetTop - (sourceEl.offsetTop - sourceContainer.scrollTop)

    targetContainer.scrollTop <- newScrollTop
    

let selectId (el: HTMLElement option) =
    match el with
    | None -> select None
    | Some(el) ->
        let set = getElementSet el
        select (Some set)
    
        if el.id.StartsWith("S") then        
            let sync = syncScroll set.Structure viewer
               
            sync set.Hex hexViewer

            match set.Schema with
            | Some(_, el) -> sync el schemaViewer
            | None -> ()
                        
        if el.id.StartsWith("H") then            
            let sync = syncScroll set.Hex hexViewer
               
            sync set.Structure viewer

            match set.Schema with
            | Some(_, el) -> sync el schemaViewer
            | None -> ()
                            
let rec findParent predicate (el: HTMLElement) =
    if Object.ReferenceEquals(el, null) then
        None
    else if predicate el then
        Some el
    else                
        findParent predicate el.parentElement

let withElement (prefix: char) (el: HTMLElement) action =
    el
    |> findParent (fun el -> el.id.StartsWith(prefix.ToString()))
    |> Core.Option.iter (fun el -> action (Some el))

hexViewer.addEventListener_click(f1 (fun e -> 
    let el = e.target :?> HTMLElement
        
    withElement 'H' el selectId
        
    box ()), false)

hexViewer.addEventListener_mouseover(f1 (fun e -> 
    let n = e.target :?> HTMLElement

    withElement 'H' n hoverId
    
    box ()), false)

hexViewer.addEventListener_mouseleave(f1 (fun e ->     
    hoverId None
    box ()), false)

viewer.addEventListener_mouseover(f1 (fun e -> 
    let n = e.target :?> HTMLElement

    withElement 'S' n hoverId
        
    box ()), false)

viewer.addEventListener_mouseleave(f1 (fun e ->     
    hoverId None            
    box ()), false)

viewer.addEventListener_click(f1 (fun e ->
    let n = e.target :?> HTMLElement

    withElement 'S' n selectId
    box ()), false)

let nameOfType (ty: AsnType) =
    match ty.Kind with
    | ReferencedType(n) -> Some n
    | _ -> defaultArg (Some ty.TypeName) None

let componentName (ty: AsnType) parentTy =
    let ty = resolveType ty
    match parentTy with
    | None -> None
    | Kind (SequenceType cs) ->
        match List.tryFind (fun (ComponentType(n, cty, _)) -> Object.ReferenceEquals(resolveType cty, ty)) cs with
        | Some(ComponentType(n, _, _)) -> Some n
        | None -> failwith "Component not found"
    | _ -> None

let typeNameEl (ty: AsnType option) =
    let ty = Core.Option.map resolveType ty
    ty 
    |> Core.Option.bind nameOfType
    |> Core.Option.map (fun name -> 
        let el = document.createElement("a")
        el.textContent <- name
        el.className <- "s-type-name"
        el?href <- "#t-" + name
        el)

let componentNameEl (ty: AsnType option) (parentTy: AsnType option) =
    ty
    |> Core.Option.bind (fun t -> componentName t parentTy)
    |> Core.Option.map (fun n ->
        let el = document.createElement("span")
        el.textContent <- n
        el.className <- "s-component-name"
        el)

let makeSpan className text =
    let el = document.createElement "span"
    el.textContent <- text
    el.className <- className
    el

let elInfo (asnElement: AsnElement) (parentAsnElement: AsnElement option) =
    let el = document.createElement "div"
    let length = asnElement.Header.Length

    let len, lenOctets = 
        match asnElement.Header.Length with
        | Definite(l, lenOctets) -> l, lenOctets
        | Indefinite -> failwith "Not supported"

    el.id <- sprintf "S%d-%d" asnElement.Offset len

    let lengthStr = 
        match length with
        | Definite (l, _) -> l.ToString()
        | Indefinite -> "Indefinite"

    let utcTimeToString (dto: DateTimeOffset) =
        sprintf "%02d.%02d.%d %02d:%02d" dto.DateTime.Day dto.DateTime.Month dto.DateTime.Year dto.DateTime.Hour dto.DateTime.Minute        

    let valueStr =
        match asnElement.Value with
        | Integer(v) -> v.ToString() |> Some
        | ObjectIdentifier(numbers) -> String.Join(".", numbers) |> Some
        //TODO FIX
        | OctetString(v) -> sprintf "%x" v.[0] |> Some
        | PrintableString(v) -> sprintf "\"%s\"" v |> Some
        | UTF8String(v) -> sprintf "\"%s\"" v |> Some
        | UTCTime(dto) -> utcTimeToString dto |> Some
        | T61String(_) -> "" |> Some
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

    let typeStr = 
        match asnElement.Value with
        | Null -> "NULL"
        | Integer(_) -> "INTEGER"
        | ObjectIdentifier(_) -> "OBJECT_IDENTIFIER"
        | OctetString(_) -> "OCTET_STRING"
        | PrintableString(_) -> "PRINTABLE_STRING"
        | UTF8String(_) -> "UTF8_STRING"
        | Sequence(_) -> "SEQUENCE"
        | Set(_) -> "SET"
        | T61String(_) -> "T61_STRING"
        | Unknown(_) -> "Unknown"
        | BitString(_) -> "BITSTRING"
        | UTCTime(_) -> "UTC_TIME"
        | ExplicitTag(_) -> "EXPLICIT_TAG"
        | Boolean(v) -> "BOOLEAN"

    let checkbox, label =
        match asnElement.Value with
        | SimpleValue ->
            None, None
        | Collection(_) ->
            let checkbox = document.createElement("input")
            checkbox?``type`` <- "checkbox"
            checkbox.id <- "cb-" + el.id

            let label = document.createElement("label")
            //label.textContent <- "+/-"
            label.setAttribute("for", "cb-" + el.id)
            Some checkbox, Some label

    let typeNameEl = typeNameEl asnElement.SchemaType
    let compNameEl =   componentNameEl asnElement.SchemaType (FSharp.Core.Option.bind (fun (m: AsnElement) -> m.SchemaType) parentAsnElement)
    let offsetLengthEl = sprintf "%d,%s" asnElement.Offset lengthStr |> makeSpan "s-offset-length"
    let asnTypeEl = typeStr |> makeSpan "s-asn-type"
    let valueEl = valueStr |> Core.Option.map (makeSpan "s-value")

    [checkbox; label; compNameEl; valueEl; typeNameEl; Some asnTypeEl; Some offsetLengthEl]
    |> List.choose id
    |> List.iter (fun e -> el.appendChild e |> ignore)

    match typeNameEl with
    | Some(e) -> el?typeName <- e.textContent
    | _ -> ()

    el    

let makeStructureDom (parentEl: HTMLElement) (asnElement: AsnElement) =
    let fSimple (el: AsnElement) = 
        fun parent -> 
            elInfo el parent

    let fCollection (el: AsnElement) (children: (AsnElement option -> HTMLElement)[]) = 
        let childrenEl = children |> Array.map (fun c -> c (Some el))

        fun parent ->
            let dom = elInfo el parent
            childrenEl |> Array.iter (fun c -> dom.appendChild c |> ignore)
            dom

    cataAsn fSimple fCollection asnElement None

let read (ts: Map<_,_>) = 

    let br = AsnArrayStream(byteArray, 0)

    let resolveTypeName = (fun n -> if ts.ContainsKey n then Some ts.[n] else None)

    //TODO improve
    resolveType <- fun ty ->
        match ty.Kind with
        | ReferencedType(name) -> 
            match resolveTypeName name with
            | None -> ty
            | Some(ty) -> ty
        | _ -> ty

    let rdr = AsnContext(br, resolveTypeName)

    let element = readElement rdr (Some ts.["Certificate"])

    console.log(element)

    let lineCount = ((byteArray.Length - 1) / 16) + 1

    let offsetsEl = document.getElementById("hex-offsets")

    for i in seq { 0..lineCount-1 } do
        let div = document.createElement("div")
        div.textContent <- (toHex (i * 16)).ToUpper().PadLeft(6, '0')
        offsetsEl.appendChild div |> ignore

    hexViewer.querySelector("#bytes").appendChild (makeHexViewerDom element byteArray) |> ignore

    makeStructureDom viewer element |> viewer.appendChild |> ignore

let xhr = XMLHttpRequest.Create()
xhr.``open``("GET", "rfc5280.txt", true)
xhr.onreadystatechange <- (fun (e) -> 
  if (int xhr.readyState <> 4 || int xhr.status <> 200) then
    box ()
  else
    let rfcSchema = xhr.responseText

    console.time("parsing")

    let types = parseAssignments rfcSchema |> fst |> Map.ofSeq
    window?rfc <- types

    console.timeEnd("parsing")

    schemaViewer.textContent <- rfcSchema

    let mutable textNode = schemaViewer.childNodes.Item(0)
    let mutable offset = 0

    console.time("ranges")

    let tStart = performance.now()
    
    types |> Seq.sortBy (fun kvp -> fst kvp.Value.Range.Value) |> Seq.iter (fun kvp -> 
        let name = kvp.Key
        let value = kvp.Value
        
        match value.Range with
        | Some(s,e) ->
            let range = document.createRange()

            range.setStart(textNode, float (int s - offset))
            range.setEnd(textNode, float (int e - offset))

            let span = document.createElement("span")

            span.id <- sprintf "t-%s" name

            range.surroundContents(span)

            textNode <- schemaViewer.lastChild
            offset <- int e
            ()
        | None -> ()
    )

    read types

    let tEnd = performance.now()

    console.timeEnd("ranges")
    
    box())

xhr.send("")
