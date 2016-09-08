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

let base64ToByteArray b64 =
    let byteString = window.atob(b64)
    let byteArray = Array.zeroCreate<byte>(byteString.Length)

    for i in 0..byteString.Length - 1 do    
        byteArray.[i] <- charCodeAt byteString i
    byteArray
   
let byteToUpperHex (b: byte) = (toHex b).ToUpper().PadLeft(2, '0')

let appendTo (targetEl: HTMLElement) el =
    targetEl.appendChild el |> ignore

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

let read byteArray (modules: ModuleDefinition list) rootTypeName = 
    let br = AsnArrayStream(byteArray, 0)
    let ctx = AsnContext(br, modules)
            
    let element = readElement ctx (rootTypeName |> Core.Option.bind ctx.LookupType)

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

let loadData url =
    async {
        let! resp = fetchAsync(url, [Headers [ContentType "application/octet-stream"]])
        if resp.Ok then
            return! resp.arrayBuffer() |> Async.AwaitPromise             
        else                    
            return failwithf "ERROR: %d" resp.Status
    }

moduleSelector.addEventListener_change(f1(fun e -> 
    updateSchema()
    box()))


module Schemas =
    let Cms = { Id = "rfc3852"
                DisplayName = "RFC3852: Cryptographic Message Syntax (CMS)"
                Url = "/Data/rfc3852.txt" }

    let X509 = { Id = "rfc5280"
                 DisplayName = "RFC5280: X.509 Certificate and Certificate Revocation List"
                 Url = "/Data/rfc5280.txt" }

type ExampleFile = 
    { Path: string
      Description: string
      RootType: string
      Schemas: SchemaInfo list }

let exampleFiles =
    [ { Path = "google_ssl.cer"
        Description = "Google SSL certificate"
        RootType = "Certificate"
        Schemas = [Schemas.X509] }
      { Path = "BouncyCastle/cms/sigs/PSSSignDataSHA1.sig"
        Description = "Example CMS signed file (BouncyCastle test data)"
        RootType = "ContentInfo"
        Schemas = [Schemas.Cms; Schemas.X509]} ]
    
let toSeq (nodeList: NodeListOf<'t>) =
    seq {
        for i = 0 to int nodeList.length - 1 do
            yield nodeList.Item(i)
    }

exampleFiles 
|> List.iter (fun f -> 
    let listOfExamples = document.querySelector("#intro ul") :?> HTMLElement

    let listItem = document.createElement_li()
    let link = document.createElement_a()

    link.href <- "#example=" + f.Path
    link.textContent <- f.Description
    
    listItem.appendChild(link) |> ignore
    listOfExamples.appendChild(listItem) |> ignore)

let loadExampleFile exampleFile =
    match List.tryFind (fun ef -> ef.Path = exampleFile) exampleFiles with
    | Some({ Schemas = schemas; RootType = rootType; Path = path }) ->
        async {
            let! data = loadData ("/Data/" + path)
            let! schemaData = schemas |> Seq.map loadSchemaDom |> Async.Parallel

            schemaData |> Array.iter (snd >> appendTo schemaViewer)
            updateSchema()        

            let byteData = (createNew JS.Uint8Array data) :?> byte[]
            
            let modules = schemaData |> List.ofArray |> List.map fst

            try
                read byteData modules (Some rootType)
                
                document.getElementById("intro").classList.add("hidden")

                document.querySelectorAll(".viewer,.schema-viewer,.hex-viewer") 
                |> toSeq
                |> Seq.iter (fun n -> n.classList.remove("hidden"))

            with e ->
                printfn "%A" e
        } |> Async.Start        
    | None -> ()

if location.hash.StartsWith("#example=") then
    location.hash.Substring("#example=".Length) |> loadExampleFile

window.addEventListener_hashchange(f1(fun e -> location.hash.Substring("#example=".Length) |> loadExampleFile; box ()))
    
let handleFiles (fs: FileList) =
  let reader = FileReader.Create()
  
  reader.onload <- f1(fun e ->
      let data = (createNew JS.Uint8Array reader.result) :?> byte[]
      
      read data [] None      
      document.getElementById("intro").classList.add("hidden")
      document.querySelectorAll(".viewer,.schema-viewer,.hex-viewer") 
      |> toSeq
      |> Seq.iter (fun n -> n.classList.remove("hidden"))
      box ())

  reader.readAsArrayBuffer(fs.[0]);

let drop (e: DragEvent ) =
  console.log("drop")
  e.stopPropagation()
  e.preventDefault()

  let dt = e.dataTransfer
  let files = dt.files

  handleFiles(files);
  box()

let dropbox = document.getElementById("dropbox");
let dragenter (e: DragEvent) =  
  e.stopPropagation()
  e.preventDefault()
  dropbox.classList.add("active")
  box ()
let dragleave (e: DragEvent) =  
  e.stopPropagation()
  e.preventDefault()
  dropbox.classList.remove("active")
  box ()
let dragover (e: DragEvent) =  
  e.stopPropagation()
  e.preventDefault()
  box ()

dropbox.addEventListener_dragenter(f1 dragenter, false)
dropbox.addEventListener_dragleave(f1 dragleave, false)
dropbox.addEventListener_dragover(f1 dragover, false)
dropbox.addEventListener_drop(f1 drop, false)

let fileInput = document.getElementById("file") :?> HTMLInputElement

fileInput.addEventListener_change(f1 (fun e -> fileInput.files |> handleFiles; box ()), false)




