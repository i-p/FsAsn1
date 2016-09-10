module FsAsn1.Viewer.Components

open Fable.Import.Browser
open Fable.Core.JsInterop

open FsAsn1.Schema
open FsAsn1.Types
open FsAsn1.Reader
open FsAsn1.Viewer.Utils
open FsAsn1.Viewer.Data

let makeSpan className text =
    let el = document.createElement "span"
    el.textContent <- text
    el.className <- className
    el

let typeNameEl (ty: AsnType option) =
    ty 
    |> Core.Option.bind nameOfType
    |> Core.Option.map (fun name -> 
        let el = document.createElement_a()
        el.textContent <- name
        el.className <- "s-type-name"
        el.href <- "#t-" + name
        el :> HTMLElement)

let componentNameEl (el: AsnElement) =
    componentName el
    |> Core.Option.map (fun n ->
        let el = document.createElement("span")
        el.textContent <- n
        el.className <- "s-component-name"
        el)

let elInfo (ctx: AsnContext) (asnElement: AsnElement) (parentAsnElements: AsnElement list) =        
    let (s, e) = asnElement.Range    
    let elId = sprintf "S%d-%d" s e
        
    let checkbox, label =
        match asnElement.Value with
        | SimpleValue ->
            None, None
        | Collection(_) ->
            let checkbox = document.createElement_input()
            checkbox.``type`` <- "checkbox"
            checkbox.id <- "cb-" + elId

            let label = document.createElement_label()            
            label.setAttribute("for", "cb-" + elId)
            Some (checkbox :> HTMLElement), Some (label :> HTMLElement)

    let typeName = typeNameEl asnElement.SchemaType
    let compName = componentNameEl asnElement
    let asnType = typeStr asnElement |> makeSpan "s-asn-type"
    let value = valueStr asnElement |> Core.Option.map (makeSpan "s-value")
        
    let choiceComponent = 
        let componentType = 
            match (asnElement.SchemaType |> Core.Option.map ctx.ResolveType) with
            | Some({ Kind = ChoiceType(cs) }) ->
                matchChoiceComponent ctx asnElement.Header cs        
            | _ -> None

        componentType
        |> Core.Option.bind nameOfType
        |> Core.Option.map(fun name ->
            let rootEl = document.createElement("span")
            rootEl.className <- "s-choice-component"

            let el = document.createElement("span")            
            el.textContent <- componentType.Value.ComponentName.Value
            el.className <- "s-component-name"
            
            let typeEl = document.createElement_a()
            typeEl.textContent <- name
            typeEl.className <- "s-type-name"
            typeEl.href <- "#t-" + name
                        
            [document.createTextNode("("); el; typeEl; document.createTextNode(")")] : Node list
            |> List.iter (appendTo rootEl)
            
            rootEl)
        
    let el = document.createElement "div"
    el.id <- elId

    [checkbox; label; compName; value; typeName; choiceComponent; Some asnType]
    |> List.choose id
    |> List.iter (appendTo el)

    match typeName with
    | Some(e) -> el?typeName <- e.textContent
    | _ -> ()

    el    

let makeOffsets byteLength =
    seq {    
        let lineCount = ((byteLength - 1) / 16) + 1
    
        for i in seq { 0..lineCount-1 } do
            let div = document.createElement("div")
            div.textContent <- (toHex (i * 16)).ToUpper().PadLeft(6, '0')
            yield div
    }

let makeHexRuns (asnElement: AsnElement) (bytes: byte[]) =
    let toHexString (s, e) =                 
        bytes.[s..e]
        |> Array.map byteToUpperHex 
        |> String.concat " "
        
    let makeId (el: AsnElement) =
        let s, e = el.Range
        sprintf "H%d-%d" s e

    let makeHexRun (s, e) id =
        let span = document.createElement "span"
        span.textContent <- toHexString (s, e) + " "
        span.id <- id
        span

    let fSimple (el: AsnElement) =                         
        makeHexRun el.Range (makeId el)

    let fCollection (el: AsnElement) children =                 
        let run = makeHexRun el.HeaderRange (makeId el)
        children |> Array.iter (appendTo run)
        run

    cataAsn fSimple fCollection asnElement

let makeStructureHierarchy (ctx: AsnContext) (parentEl: HTMLElement) (asnElement: AsnElement) =
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

let makeSchemaDom (info: SchemaInfo) schema md =         
    let schemaRootEl = document.createElement("div")
    
    schemaRootEl.classList.add("schema")
    schemaRootEl.textContent <- schema

    let mutable textNode = schemaRootEl.childNodes.Item(0)
    let mutable offset = 0

    console.time("ranges")

    let tStart = performance.now()
    
    md.TypeAssignments
    |> Seq.map (fun kvp -> kvp.Value)
    |> Seq.sortBy (fun ta -> fst ta.Range.Value) 
    |> Seq.iter (fun ta  ->                 
        match ta.Range with
        | Some(s,e) ->
            let range = document.createRange()

            range.setStart(textNode, float (int s - offset))
            range.setEnd(textNode, float (int e - offset))

            let span = document.createElement("span")

            span.id <- sprintf "t-%s" ta.Name

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
    
    let optionEl = document.createElement_option()
    optionEl.value <- info.Id
    optionEl.textContent <- info.DisplayName
    
    optionEl, schemaRootEl

let exampleFile f =
    let listItem = document.createElement_li()
    let link = document.createElement_a()

    link.href <- "#example=" + f.Path
    link.textContent <- f.Description
    
    appendTo listItem link

    listItem

let knownTypeButton index kt =
    let btnEl = document.createElement_button()
    btnEl.textContent <- kt.DisplayName    
    btnEl.setAttribute("data-known-type", string index)
    btnEl