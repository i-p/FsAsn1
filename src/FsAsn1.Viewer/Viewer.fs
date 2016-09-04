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

let inline f1 (f: 'a->'b) = Func<_,_> f
let inline f2 (f: 'a->'b->'c) = Func<_,_,_> f
let inline f3 (f: 'a->'b->'c->'d) = Func<_,_,_,_> f

[<Emit("$0.charCodeAt($1)")>]
let charCodeAt (str: string) (i) : byte = failwith "JS only"

[<Emit("($0).toString(16)")>]
let toHex i : string = failwith "JS only"


//let dataBase64 = "MIIEhTCCA22gAwIBAgIIXZCIiFIoczAwDQYJKoZIhvcNAQELBQAwSTELMAkGA1UEBhMCVVMxEzARBgNVBAoTCkdvb2dsZSBJbmMxJTAjBgNVBAMTHEdvb2dsZSBJbnRlcm5ldCBBdXRob3JpdHkgRzIwHhcNMTYwNTE4MTEyMTQyWhcNMTYwODEwMTA0NjAwWjBlMQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTEWMBQGA1UEBwwNTW91bnRhaW4gVmlldzETMBEGA1UECgwKR29vZ2xlIEluYzEUMBIGA1UEAwwLKi5nb29nbGUuc2swggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCwavWgUn/fa92LE1MP3XrFrrSCa0dcQUP0/NL+dUEQEAgHp/ChSPASHiUsKbSJqzaynAz3999zDAkDpxbZ48KYhh9bfdMCLXHrXz2EdZY0oViH7SzLV2rHpKG/rLF7+tehfkCyDhJ+Oe6IEOiQvX8XKhzHMrDBkCl0OBenJY6fkmGeVXwMy+sosWQiZ7syoLVVrIz9tvvAZqxd7g2hG8mSSKKR/oVL638nbW+D1aysxs2wnMA59jK1d4BvCOdBqTFlSqPwBaf4lLwZ26TGAHZ4Jc+lRhTD9LL7uj9JHDbPypdsGIUEU6PlUEcrJwimP7rNym4OgsafjPY/D3lJ6ai/AgMBAAGjggFTMIIBTzAdBgNVHSUEFjAUBggrBgEFBQcDAQYIKwYBBQUHAwIwIQYDVR0RBBowGIILKi5nb29nbGUuc2uCCWdvb2dsZS5zazBoBggrBgEFBQcBAQRcMFowKwYIKwYBBQUHMAKGH2h0dHA6Ly9wa2kuZ29vZ2xlLmNvbS9HSUFHMi5jcnQwKwYIKwYBBQUHMAGGH2h0dHA6Ly9jbGllbnRzMS5nb29nbGUuY29tL29jc3AwHQYDVR0OBBYEFMKUTd8jCnhjtHJyt8AAL6YQTocsMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUSt0GFhu89mi1dvWBtrtiGrpagS8wIQYDVR0gBBowGDAMBgorBgEEAdZ5AgUBMAgGBmeBDAECAjAwBgNVHR8EKTAnMCWgI6Ahhh9odHRwOi8vcGtpLmdvb2dsZS5jb20vR0lBRzIuY3JsMA0GCSqGSIb3DQEBCwUAA4IBAQBEVDALCBFaS0tV2e17ozMMYdNEHGfBBWvxCE/Tx9Z3Dy5F2ZwTz8gdetpjAs2jBynmWWQgs0Z8/246bWPflvw/pcVrdZu+KWvKBioXKiE/MVIR//h72WOAWcLOkxxW60E+UsIqVtVxnHuynd32FeU1ft0COh2AWZ2C8TTvGTGL5n3LY5WDCfQF8MIq4o64fdDM+bgcSRwHH2c1k5uWXfR3kuii2XkzuE1+8LGsDPTadRlQSzAZM0l3Zf0SNwHPLDzMS91W3bnMfJ+y28c5ExZH+Op/X1NpDnOUQEbLgexS2Jq8xFcGo/bZ9w8ZnODVccqid+wWaR3OwXJ/TtEV4C8Z"
let exampleCmsData = "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"

let byteString = window.atob(exampleCmsData)

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
    
let moduleSelector = document.getElementById("module-selector") :?> HTMLSelectElement

let updateSchema () =
    let selectedValue = moduleSelector.value    
    let els = schemaViewer.getElementsByClassName("schema")

    for i = 0 to int els.length - 1 do
        els.Item(i).classList.add("hidden")

    schemaViewer.querySelector(sprintf "[data-schema-id=%s]" selectedValue).classList.remove("hidden")

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
            | Some(_, el) ->
                let schemaId = el.parentElement.getAttribute("data-schema-id")
                moduleSelector.value <- schemaId
                updateSchema()
            | None -> ()

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

let typeNameEl (ty: AsnType option) =    
    ty 
    |> Core.Option.bind nameOfType
    |> Core.Option.map (fun name -> 
        let el = document.createElement("a")
        el.textContent <- name
        el.className <- "s-type-name"
        el?href <- "#t-" + name
        el)

//TODO remove ctx and parentElements
let componentNameEl (ctx: AsnContext) (el: AsnElement) (parentElements: AsnElement list) =
    componentName el
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

let elInfo (ctx: AsnContext) (asnElement: AsnElement) (parentAsnElements: AsnElement list) =
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
    let compNameEl = componentNameEl ctx asnElement parentAsnElements
    let asnTypeEl = typeStr |> makeSpan "s-asn-type"
    let valueEl = valueStr |> Core.Option.map (makeSpan "s-value")

    let choiceComponent = 
        match (asnElement.SchemaType |> Core.Option.map ctx.ResolveType) with
        | Some({ Kind = ChoiceType(cs) }) ->
            matchChoiceComponent ctx asnElement.Header cs        
        | _ -> None

    let appendTo (targetEl: HTMLElement) el =
        targetEl.appendChild el |> ignore

    let choiceComponentEl = 
        choiceComponent
        |> Core.Option.bind nameOfType
        |> Core.Option.map(fun name ->
            let rootEl = document.createElement("span")
            rootEl.className <- "s-choice-component"

            let el = document.createElement("span")            
            el.textContent <- choiceComponent.Value.ComponentName.Value
            el.className <- "s-component-name"
            
            let typeEl = document.createElement("a")
            typeEl.textContent <- name
            typeEl.className <- "s-type-name"
            typeEl?href <- "#t-" + name
                        
            [document.createTextNode("("); el; typeEl; document.createTextNode(")")] : Node list
            |> List.iter (appendTo rootEl)
            
            rootEl)
        
    [checkbox; label; compNameEl; valueEl; typeNameEl; choiceComponentEl; Some asnTypeEl]
    |> List.choose id
    |> List.iter (fun e -> el.appendChild e |> ignore)

    match typeNameEl with
    | Some(e) -> el?typeName <- e.textContent
    | _ -> ()

    el    

let makeStructureDom (ctx: AsnContext) (parentEl: HTMLElement) (asnElement: AsnElement) =
    let fSimple (el: AsnElement) = 
        fun parents -> 
            elInfo ctx el parents

    let fCollection (el: AsnElement) (children: (AsnElement list -> HTMLElement)[]) =                 
        fun parents ->
            let newParents = el :: parents
            let childrenEl = children |> Array.map (fun c -> c newParents)
            let dom = elInfo ctx el parents
            childrenEl |> Array.iter (fun c -> dom.appendChild c |> ignore)
            dom

    cataAsn fSimple fCollection asnElement []

let read ([cmsModule;x509Module]: ModuleDefinition list) = 

    let br = AsnArrayStream(byteArray, 0)

    let ctx = AsnContext(br, [cmsModule; x509Module])
            
    let element = readElement ctx (Some cmsModule.TypeAssignments.["ContentInfo"].Type)

    console.log(element)

    let lineCount = ((byteArray.Length - 1) / 16) + 1

    let offsetsEl = document.getElementById("hex-offsets")

    for i in seq { 0..lineCount-1 } do
        let div = document.createElement("div")
        div.textContent <- (toHex (i * 16)).ToUpper().PadLeft(6, '0')
        offsetsEl.appendChild div |> ignore

    hexViewer.querySelector("#bytes").appendChild (makeHexViewerDom element byteArray) |> ignore

    makeStructureDom ctx viewer element |> viewer.appendChild |> ignore

    
open Fable.Helpers.Fetch

type SchemaInfo = 
    { Id: string
      DisplayName: string
      Url: string }

let makeSchemaDom info schema =     
    console.time("parsing")

    let md = parseModuleDefinition schema 0 |> Core.Option.get
    
    console.timeEnd("parsing")

    let schemaRootEl = document.createElement("div")
    
    schemaRootEl.classList.add("schema")
    schemaRootEl.textContent <- schema

    let mutable textNode = schemaRootEl.childNodes.Item(0)
    let mutable offset = 0

    console.time("ranges")

    let tStart = performance.now()
    
    md.TypeAssignments |> Seq.sortBy (fun kvp -> fst kvp.Value.Range.Value) |> Seq.iter (fun kvp -> 
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

            textNode <- schemaRootEl.lastChild
            offset <- int e
            ()
        | None -> ()
    )
    
    let tEnd = performance.now()

    console.timeEnd("ranges")

    schemaRootEl.setAttribute("data-schema-id", info.Id)
    schemaRootEl.classList.add("hidden")
    
    let optionEl = document.createElement("option")
    optionEl.setAttribute("value", info.Id)
    optionEl.textContent <- info.DisplayName

    moduleSelector.appendChild(optionEl) |> ignore

    md, schemaRootEl

let loadSchemaDom info =
    async {
        let! resp = fetchAsync(info.Url, [])    
        if resp.Ok then
            let! text = resp.text() |> Async.AwaitPromise
            return makeSchemaDom info text
        else                    
            return failwithf "ERROR: %d" resp.Status
    }


moduleSelector.addEventListener_change(f1(fun e -> 
    updateSchema()
    box()))


async {
    let! elements = 
        [ { Id = "rfc3852"
            DisplayName = "RFC3852: Cryptographic Message Syntax (CMS)"
            Url = "rfc3852.txt" }
          { Id = "rfc5280"
            DisplayName = "RFC5280: X.509 Certificate and Certificate Revocation List"
            Url = "rfc5280.txt" } ]
        |> List.map loadSchemaDom
        |> Async.Parallel

    elements |> Array.iter (fun el -> schemaViewer.appendChild(snd el) |> ignore)    

    updateSchema()

    elements |> List.ofArray |> List.map fst |> read

} |> Async.Start

