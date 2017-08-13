#I __SOURCE_DIRECTORY__

#load @"Scripts/load-references-debug.fsx"
#load @"Scripts/load-project-debug.fsx"

open System.IO
open FsAsn1
open FsAsn1.Reader

let schemaPath = __SOURCE_DIRECTORY__ + @"..\..\..\tests\FsAsn1.Tests\Data\rfc5280.txt"
let certificatePath = __SOURCE_DIRECTORY__ + @"..\..\..\tests\FsAsn1.Tests\Data\google_ssl.cer"

// Parse all ASN.1 modules from given file
let modules = SchemaParser.parseFile schemaPath
        
// Read ASN.1 structure from file. Root element is of type "Certificate".
// This type has to be present in one of the ASN.1 modules.
let result = readElementFromFile modules (TypeName "Certificate") certificatePath

// Result is a combination of ASN.1 structure and potential errors.
// For most purposes, matching for AsnResult.Right is enough.
let certElement =
    match result with
    | AsnResult.Right(element) ->
        printf "%A" element   
        element 
    | _ ->
        failwithf "Unexpected result: %A" result

// cataAsn is one of the basic functions used to process ASN.1 structures.
// It allows you to process the ASN.1 structure recursively.
// Here it counts number of simple ASN.1 elements.
let countElements =
    cataAsn
        (fun el -> 1)
        (fun _ children -> Array.sum children)

printfn "Count of simple elements: %d" (countElements certElement)

// Using the filter function you can retrieve all elements from an ASN.1 structure
// that match given predicate.
// In this example, all elements that represent certificate extension are returned.
let isExtension (el: AsnElement) =
    match el.SchemaType with 
    | Some({ Kind = Schema.ReferencedType("Extension") }) -> true 
    | _ -> false

let extensionElements = filter isExtension certElement

printfn "Count of extension elements: %d" (extensionElements.Length)


let nameOfElement (el: AsnElement) =
    match el.SchemaType with
    | Some(ty) ->        
        let compName = defaultArg (Reader.componentName (Some ty)) ""
        let typeName = defaultArg (Reader.nameOfType ty) ""
        compName + ":" + typeName
    | None ->
        "?"

// Collect a list of paths to every simple (non-collection) ASN.1 element
// in the structure. Path segments are identified by combination of component name
// and type name (both parts are optional).
let collectPaths (el: AsnElement) =
    let fSimple el = [[nameOfElement el]]

    let fCollection el children = 
        Seq.collect (List.map (fun path -> (nameOfElement el)::path)) children
            |> Seq.toList

    cataAsn fSimple fCollection el
    |> List.map (String.concat "/")

collectPaths certElement


// ASN.1 structure can be read without schema, but it doesn't
// have to be fully decoded.
let certElementWithoutSchema =    
    let result = readElementFromFile modules Unknown certificatePath
    
    match result with
    | AsnResult.Right(element) ->
        printf "%A" element
        element
    | _ ->
        failwithf "Unexpected result: %A" result

let isUnknown (el: AsnElement) =
    match el.Value with 
    | AsnValue.Unknown(_) -> true
    | _ -> false

let getUnknownElements = filter isUnknown
         
// Without schema, there are 2 elements that cannot be recognized              
(getUnknownElements certElementWithoutSchema).Length = 2