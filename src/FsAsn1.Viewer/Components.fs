module FsAsn1.Viewer.Components

open Fable.Import.Browser
open Fable.Core.JsInterop

open FsAsn1.Schema
open FsAsn1.Types
open FsAsn1.Reader
open FsAsn1.Viewer.Utils
open FsAsn1.Viewer.Data
open FsAsn1.Viewer.JsUtils

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

let componentNameEl (ty: AsnType option) =
    componentName ty
    |> Core.Option.map (fun n ->
        let el = document.createElement("span")
        el.textContent <- n
        el.className <- "s-component-name"
        el)

let elInfo (ctx: AsnContext) (s,e) (header: AsnHeader) (value: AsnValue option) (schemaType: AsnType option) isSimpleValue =            
    let elId = sprintf "S%d-%d" s e
        
    let checkbox, label =
        if isSimpleValue then
            None, None
        else
            let checkbox = document.createElement_input()
            checkbox.``type`` <- "checkbox"
            checkbox.id <- "cb-" + elId

            let label = document.createElement_label()            
            label.setAttribute("for", "cb-" + elId)
            Some (checkbox :> HTMLElement), Some (label :> HTMLElement)

    let typeName = typeNameEl schemaType

    let compName = componentNameEl schemaType
    let asnType = value |> Core.Option.map (typeStr >> makeSpan "s-asn-type")
    let value = value |> Core.Option.bind(valueStr) |> Core.Option.map (makeSpan "s-value")
        
    let choiceComponent =         
        let componentType = 
            match (schemaType |> Core.Option.map ctx.ResolveType) with
            | Some({ Kind = ChoiceType(cs) }) ->
                matchChoiceComponent ctx header cs        
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

    [checkbox; label; compName; value; typeName; choiceComponent; asnType]
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

let getRange (result: AsnResult) =
    match result with
    | None, None -> failwith "should not happen"
    | Some(el), None ->
        Some(el.Range)
    | _, Some(InvalidValue(offset, realLength, h, _, _)) ->
        Some(offset, offset + h.HeaderLength + realLength - 1)
    | _ ->
        None
 
let getHeaderRange (result: AsnResult) =
    match result with
    | None, None -> failwith "should not happen"
    | Some(el), None ->
        Some(el.HeaderRange)
    | _, Some(InvalidValue(offset, length, h, _, _)) ->
        Some(offset, offset + h.HeaderLength - 1)
    | _ ->
        None
        

let makeHexRuns (asnElement: AsnResult) (bytes: byte[]) =
    let toHexString (s, e) =                 
        bytes.[s..e]
        |> Array.map byteToUpperHex 
        |> String.concat " "
        
    let makeId (s, e) =        
        sprintf "H%d-%d" s e

    let makeHexRun (s, e) id =
        let span = document.createElement "span"
        span.textContent <- toHexString (s, e) + " "
        span.id <- id
        span

    let fSimple result =                         
        let range = getRange result
        
        range 
        |> Core.Option.map (fun r -> makeHexRun r (makeId r))

    let fCollection result children =                 
        let range = getRange result
        let headerRange = getHeaderRange result

        match range, headerRange with
        | Some(r), Some(hr) ->
            let run = makeHexRun hr (makeId r)
            children |> Seq.choose id |> Seq.iter (appendTo run)
            Some run
        | _ ->
            None
        
    cataAsnResult fSimple fCollection asnElement

let makeStructureHierarchy (ctx: AsnContext) (_parentEl: HTMLElement) (asnResult: AsnResult) =

    let makeErrorElement (errEl: AsnErrorElement) =
        
        match errEl with
        | NoData(_) -> 
            let el = document.createElement "div"
            el.textContent <- "No data"
            el
        | InvalidHeader(_) ->
            let el = document.createElement "div"
            el.textContent <- "Invalid header"
            el        
        | InvalidValue(offset, length, h, ty, { Exception = ex; ChildrenErrors = childrenErrors }) ->            
            // We cannot rely on the length in header
            let s, e = offset, offset + h.HeaderLength + length - 1
            let el = elInfo ctx (s,e) h None ty (childrenErrors = [])
            
            let el2 = document.createElement "span"
            el2.classList.add "error-message"
            el2.textContent <- "Invalid value" + (if ex.IsSome then ": " + ex.Value.Message else "")
            el.appendChild(el2) |> ignore

            el.classList.add "error"            
            el
            
    let fSimple (result: AsnResult) = 
        fun parents -> 
            match result with 
            | None, None -> failwith "Should not happen"  //TODO change definition of AsnResult? This should be forbidden
            | Some(el), _ ->                
                // TODO FIX
                let range = getRange result |> Core.Option.get

                elInfo ctx range el.Header (Some el.Value) el.SchemaType true
            | None, Some(errEl) ->                
                makeErrorElement errEl                

    let fCollection (result: AsnResult) (children: (AsnResult list -> HTMLElement)[]) =                 
        fun parents ->
            let newParents = result :: parents
            let childrenEl = children |> Array.map (fun c -> c newParents)
            
            match result with
            | None, None -> failwith "Should not happen"  //TODO change definition of AsnResult? This should be forbidden
            | Some(el), _ ->                
                // TODO FIX
                let range = getRange result |> Core.Option.get

                let dom = elInfo ctx range el.Header (Some el.Value) el.SchemaType false

                childrenEl |> Array.iter (fun c -> dom.appendChild c |> ignore)
                dom    
            | None, Some(errEl) ->
                let el = makeErrorElement errEl                
                childrenEl |> Array.iter (fun c -> el.appendChild c |> ignore)
                el
            
    cataAsnResult fSimple fCollection asnResult []

let makeSchemaDom (info: SchemaInfo) schema md =         
    let schemaRootEl = document.createElement("div")
    
    schemaRootEl.classList.add("schema")
    schemaRootEl.textContent <- schema

    let mutable textNode = schemaRootEl.childNodes.Item(0)
    let mutable offset = 0

    console.time("ranges")

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
    btnEl.classList.add("schema-button")
    btnEl.setAttribute("data-known-type", string index)
    btnEl