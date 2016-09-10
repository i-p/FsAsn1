module FsAsn1.Viewer.Main

open System
open Fable.Core
open Fable.Import
open Fable.Import.Browser
open Fable.Core.JsInterop
open Fable.Helpers.Fetch

open FsAsn1.Types
open FsAsn1.Schema
open FsAsn1.Reader
open FsAsn1.SchemaParser
open Microsoft.FSharp

open FsAsn1.Viewer.Data
open FsAsn1.Viewer.Utils
open FsAsn1.Viewer.Components

let byId = document.getElementById

let schemaViewer        = byId "schema-viewer"
let hexViewer           = byId "hex-viewer"
let hexViewerBytes      = byId "bytes"
let viewer              = byId "viewer"
let moduleSelector      = byId "module-selector" :?> HTMLSelectElement
let offsetsEl           = byId "hex-offsets"
let schemaSelectorEl    = byId "schema-selector"
let fileInfoEl          = byId "file-info"
let introEl             = byId "intro"
let previewInfoEl       = byId "preview-info"
let dropbox             = byId "dropbox"
let fileInput           = byId "file" :?> HTMLInputElement
let listOfExamples      = document.querySelector("#intro ul") :?> HTMLElement

let updateSchema () =
    let selectedValue = moduleSelector.value   
    if selectedValue <> "" then 
        let els = schemaViewer.getElementsByClassName("schema")

        for i = 0 to int els.length - 1 do
            els.Item(i).classList.add("hidden")

        schemaViewer.querySelector(sprintf "[data-schema-id=%s]" selectedValue).classList.remove("hidden")

let read byteArray (modules: ModuleDefinition list) rootTypeName =     
    let ctx = AsnContext(AsnArrayStream(byteArray, 0), modules)            
    let ty = rootTypeName |> Core.Option.bind ctx.LookupType
    let element = readElement ctx ty
        
    makeOffsets byteArray.Length
    |> Seq.iter (appendTo offsetsEl)

    makeHexRuns element byteArray
    |> appendTo hexViewerBytes
    
    makeStructureHierarchy ctx viewer element 
    |> appendTo viewer
    
let hideIntro () =
    addClass "hidden" introEl

    removeClass "hidden" viewer
    removeClass "hidden" schemaViewer
    removeClass "hidden" hexViewer


let fetchSchema info =
    async {
        let! resp = fetchAsync(info.Url, [])    
        if resp.Ok then
            return! resp.text() |> Async.AwaitPromise                        
        else                    
            return failwithf "ERROR: %d" resp.Status
    }

let fetchData url =
    async {
        let! resp = fetchAsync(url, [Headers [ContentType "application/octet-stream"]])
        if resp.Ok then
            return! resp.arrayBuffer() |> Async.AwaitPromise             
        else                    
            return failwithf "ERROR: %d" resp.Status
    }

let parseSchema text =    
    parseModuleDefinition text 0 |> Core.Option.get    


type LoadedSchema =
    { Info: SchemaInfo
      ModuleDefinition: ModuleDefinition
      OptionElement: HTMLElement
      SchemaElement: HTMLElement }

let loadSchemaDom info =
    async {
        let! text = fetchSchema info

        console.time("parsing")
        let md = parseSchema text
        console.timeEnd("parsing")

        let optEl, schemaEl = makeSchemaDom info text md

        return { Info = info
                 ModuleDefinition = md
                 OptionElement = optEl
                 SchemaElement = schemaEl }
    }

let loadFile path ty (byteData: byte[]) =
    async {
        let! schemaData = 
            ty.Schemas 
            |> Seq.map loadSchemaDom                
            |> Async.Parallel
                            
        schemaData 
        |> Array.iter (fun ls ->
            appendTo moduleSelector ls.OptionElement
            appendTo schemaViewer ls.SchemaElement)
            
        updateSchema()

        let modules = schemaData |> List.ofArray |> List.map (fun ls -> ls.ModuleDefinition)

        fileInfoEl.textContent <- sprintf "%s (%.2f KB)" path (float byteData.Length / 1024.0)

        try
            read byteData modules ty.TypeName                
            hideIntro()
        with e ->
            printfn "%A" e
    }

let loadExampleFile path =
    match List.tryFind (fun ef -> ef.Path = path) exampleFiles with
    | Some({ Type = ty; Path = path }) ->
        async {
            let! data = fetchData ("/Data/" + path)
            let byteData = (createNew JS.Uint8Array data) :?> byte[]
            
            return! loadFile path ty byteData            
        } |> Async.Start        
    | None -> ()
                   
let loadSelectedFile (fs: FileList) =
    let readFile (file: File) knownType = 
        let reader = FileReader.Create()
  
        reader.onload <- fun e ->
            let data = (createNew JS.Uint8Array reader.result) :?> byte[]
      
            loadFile file.name knownType data |> Async.Start            
            box ()
            
        reader.readAsArrayBuffer(file);

    let file = fs.[0]  
    previewInfoEl.textContent <- sprintf "Load %s (%.2f KB) as:" file.name (file.size / 1024.0)
    previewInfoEl.classList.remove("hidden")

    schemaSelectorEl.classList.remove("hidden")
    schemaSelectorEl.addEventListener_click(fun e -> 
        let el = e.target :?> HTMLElement        

        match Core.Option.ofObj (el.getAttribute("data-known-type")) with
        | Some(strIndex) ->            
            readFile file (knownTypes.[int strIndex])            
        | None -> ()
        box ())
 
module State =
    type private ElementSet = 
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
            |> List.iter (addClass cls)

        member this.RemoveClass (cls: string) =
            this.Elements()
            |> List.iter (removeClass cls)
    
    let isHexElement (el: HTMLElement) =
        el.id.StartsWith("H")

    let isStructureElement (el: HTMLElement) =
        el.id.StartsWith("S")

    let private getElementSet (el: HTMLElement) = 
        let id = el.id.Substring(1)
        let hexEl = tryGetElementById("H" + id).Value
        let structureEl = tryGetElementById("S" + id).Value
        let typeName = (getProp "typeName" structureEl) :?> string
        let typeEl = tryGetElementById("t-" + typeName)
        { Id = id
          Structure = structureEl
          Hex = hexEl
          Schema = typeEl |> Core.Option.map (fun el -> (typeName, el)) }

    let private syncOtherViews (el: HTMLElement) set =    
        if isStructureElement el then        
            let sync = syncScroll set.Structure viewer
               
            sync set.Hex hexViewer

            match set.Schema with
            | Some(_, el) ->
                let schemaId = el.parentElement.getAttribute("data-schema-id")
                moduleSelector.value <- schemaId
                updateSchema()
                sync el schemaViewer
            | None -> ()
                                    
        if isHexElement el then            
            let sync = syncScroll set.Hex hexViewer
               
            sync set.Structure viewer

            match set.Schema with
            | Some(_, el) -> sync el schemaViewer
            | None -> ()

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

        let hoverEl el =
            el 
            |> Core.Option.bind (findParent (fun x -> isHexElement x || isStructureElement x))
            |> Core.Option.map getElementSet 
            |> update "hover" hoverSet

        let selectEl el =        
            el 
            |> Core.Option.bind (findParent (fun x -> isHexElement x || isStructureElement x))
            |> Core.Option.map (fun el -> el, getElementSet el) 
            |> function
                | Some(el, set) -> 
                    update "selected" selectionSet (Some set)
                    syncOtherViews el set                
                | None -> 
                    update "selected" selectionSet None
                                                                
        hoverEl, selectEl
     
hexViewer.addEventListener_click(withTarget (Some >> State.select))
hexViewer.addEventListener_mouseover(withTarget (Some >> State.hover))
hexViewer.addEventListener_mouseleave(fun _ ->     
    State.hover None
    box ())

viewer.addEventListener_click(withTarget (Some >> State.select))
viewer.addEventListener_mouseover(withTarget (Some >> State.hover))
viewer.addEventListener_mouseleave(fun e ->     
    State.hover None
    box ())

moduleSelector.addEventListener_change(fun e -> 
    updateSchema()
    box())
 
window.addEventListener_hashchange(fun e -> location.hash.Substring("#example=".Length) |> loadExampleFile; box ())

dropbox.addEventListener_dragenter(fun e ->
    e.stopPropagation()
    e.preventDefault()
    dropbox.classList.add("active")
    box ())

dropbox.addEventListener_dragleave(fun e ->
    e.stopPropagation()
    e.preventDefault()
    dropbox.classList.remove("active")
    box ())

dropbox.addEventListener_dragover(fun e ->
    e.stopPropagation()
    e.preventDefault()
    box ())

dropbox.addEventListener_drop(fun e ->
    e.stopPropagation()
    e.preventDefault()
    e.dataTransfer.files |> loadSelectedFile    
    box())

fileInput.addEventListener_change(fun e -> fileInput.files |> loadSelectedFile; box ())


exampleFiles 
|> List.iter (exampleFile >> appendTo listOfExamples)

knownTypes
|> List.mapi knownTypeButton
|> List.iter (appendTo schemaSelectorEl)
       
if location.hash.StartsWith("#example=") then
    location.hash.Substring("#example=".Length) |> loadExampleFile