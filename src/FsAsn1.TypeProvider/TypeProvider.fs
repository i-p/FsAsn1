module FsAsn1.TypeProvider

open ProviderImplementation.ProvidedTypes
open FSharp.Core.CompilerServices
open System.Reflection
open Schema
open Microsoft.FSharp.Quotations
open Microsoft.FSharp.Reflection
open Types

//TODO add test - type of the return value of getPrimitiveValue should be
//the same as the type returned by typeRep
let getPrimitiveValue (element: AsnElement) : obj =
    let asnValue = element.Value
    match asnValue with    
    | AsnValue.Integer v -> box v
    | AsnValue.ObjectIdentifier v -> box v
    | AsnValue.OctetString v -> box v
    | AsnValue.PrintableString v -> box v
    | AsnValue.UTF8String v -> box v    
    | AsnValue.T61String v -> box v
    | AsnValue.Unknown v -> box v
    | AsnValue.UTCTime v -> box v    
    | AsnValue.Null -> null    
    | AsnValue.BitString v -> box v
    | AsnValue.Sequence _ -> box element
    | AsnValue.SequenceOf(_) -> failwith "Not implemented yet"
    | AsnValue.Set(_) -> failwith "Not implemented yet"
    | AsnValue.SetOf(_) -> failwith "Not implemented yet"
    | AsnValue.ExplicitTag v -> box v
    | AsnValue.Boolean v -> box v

//TODO support optional elements
let getCollectionItem index (element: AsnElement) =
    let asnValue = element.Value
    match asnValue with
    //TODO bounds check
    | AsnValue.Sequence(items) -> items.[index]
    | _ -> failwith "Unsupported"    

//TODO this should return true only for types accepted by providedProperties
let shouldWrapInProvidedType ty =
    match ty with
    | SequenceType _ -> true
    | IntegerType [] -> false
    | IntegerType namedValues -> true
    | _ ->
        failwith <| sprintf "Unsupported top level type %A" ty

let coerceToElement : Expr<obj -> AsnElement> = Expr.Cast(<@@ fun (x: obj) -> x :?> AsnElement @@>)

type TypeRep = 
    { SchemaType: AsnType
      BaseType: System.Type
      FromElement: Expr<AsnElement -> obj> }

let rec toTypeRep ty lookupType =
    let repBy baseType = { SchemaType = ty; BaseType = baseType; FromElement = <@ getPrimitiveValue @> }

    match ty.Kind with   
    | SequenceType _        -> repBy typeof<AsnElement>
    | BooleanType           -> repBy typeof<bool>
    | NullType              -> repBy typeof<unit>
    | BitStringType         -> repBy typeof<AsnBitString>
    | ObjectIdentifierType  -> repBy typeof<bigint[]>
    | OctetStringType       -> repBy typeof<byte[]>
    | IntegerType(_)        -> repBy typeof<bigint>
    | AnyType(_)                    -> failwith "Not implemented yet"
    | AsnTypeKind.SequenceOfType(_, _)  -> failwith "Not implemented yet"
    | ChoiceType(_)                 -> failwith "Not implemented yet"
    | TaggedType(_, _, Some Implicit, innerTy) ->
        let innerRep = toTypeRep innerTy lookupType
        { innerRep with SchemaType = ty }
    | TaggedType(_, _, Some Explicit, innerTy) ->
        let innerRep = toTypeRep innerTy lookupType
        { innerRep with SchemaType = ty; FromElement = <@ getPrimitiveValue >> %coerceToElement >> %(innerRep.FromElement) @> }
    | ReferencedType(name) ->
        match lookupType name with
        | Some(ty) ->
            let referencedRep = toTypeRep ty lookupType
            { referencedRep with SchemaType = ty }
        | None ->
            { SchemaType = ty; BaseType = typeof<AsnElement>; FromElement = <@ box @> }
   
let providedType name ty lookupType =
    let typeRep = toTypeRep ty lookupType
    if shouldWrapInProvidedType ty.Kind then
        Some(ProvidedTypeDefinition(name, Some(typeRep.BaseType)))
    else
        None


type GetterSpec =
    | Instance of (Expr -> Expr)
    | Static of Expr

type PropertySpec =
    { Name: string
      Type: System.Type
      SchemaType: AsnType option
      Getter: GetterSpec }

let property (name, ty, returnType, getter) =
    { Name = name; SchemaType = ty; Type = returnType; Getter = getter }

type MethodSpec =
    { Name: string
      Parameters: (string * System.Type) list
      ReturnType: System.Type
      Invoker: Expr list -> Expr
      IsStatic: bool }

let toProvidedMethod (methodSpec: MethodSpec) =
   ProvidedMethod(methodSpec.Name,
        List.map (fun (n,t) -> ProvidedParameter(n, t)) methodSpec.Parameters,
        methodSpec.ReturnType,
        IsStaticMethod = methodSpec.IsStatic,
        InvokeCode = methodSpec.Invoker)

let factoryMethod ptd ty =
    { Name = "fromElement"
      Parameters = [ ("element", typeof<AsnElement>) ]
      ReturnType = ptd
      IsStatic = true
      Invoker = (fun args -> <@@ (%%args.[0] : AsnElement) @@>) }
        
let providedMethods ptd ty =
    seq {
        yield factoryMethod ptd ty
    }

let providedProperties ty lookupType : seq<PropertySpec> =
    match ty with
    | SequenceType components ->
        components 
        |> Seq.mapi (fun index (ComponentType(name, ty, modifier)) ->
            let typeRep = toTypeRep ty lookupType
            let getter = fun (fromElement: Expr<AsnElement -> obj>) ->
                fun (arg: Expr) ->
                    <@@ getCollectionItem index (%%arg : AsnElement) |> %fromElement @@>

            property(name, Some(ty), typeRep.BaseType, Instance(getter typeRep.FromElement)))
    | IntegerType namedNumbers ->
        namedNumbers 
        |> Seq.map (fun (name, namedNumberValue) -> 
            match namedNumberValue with
            | SignedNumber v ->
                property(name, None, typeof<bigint>, Static(<@@ v @@>))
            | DefinedValue name ->
                failwith "Defined value not supported yet" )
    | _ -> failwith "Not supported yet"

let toGetterCode : GetterSpec -> Expr list -> Expr = function
    | Instance getter ->
        fun args -> getter args.[0]
    | Static getter ->
        fun args -> getter

let toProvidedProperty (lookupProvidedType: string -> ProvidedTypeDefinition option) (prop: PropertySpec) =
    let propertyType =
        match Option.map (fun x -> x.Kind) prop.SchemaType with
        | Some(ReferencedType(name)) ->
            match lookupProvidedType name with
            | Some(ptd) -> ptd :> System.Type
            | None -> prop.Type
        | _ -> prop.Type

    ProvidedProperty(prop.Name, propertyType, IsStatic = false, GetterCode = toGetterCode prop.Getter)

let providedTopLevelTypesFromSchema schema =
    let topLevelTypes = FsAsn1.SchemaParser.parseTypeAssignments schema

    let namedAsnTypes = topLevelTypes |> Map.ofList

    let lookupAsnType name = Map.tryFind name namedAsnTypes

    let providedTypes =
        topLevelTypes
        |> List.collect (fun (n,ty) ->
            match providedType n ty lookupAsnType with
            | Some(ptd) -> List.singleton(n, (ty, ptd))
            | None -> [])
        |> Map.ofList

    let lookupProvidedType name = Map.tryFind name providedTypes |> Option.map snd

    providedTypes |> Map.iter (fun x (ty, ptd) ->
        providedMethods ptd ty |> Seq.iter (toProvidedMethod >> ptd.AddMember)
        providedProperties ty.Kind lookupAsnType |> Seq.iter
            ((toProvidedProperty lookupProvidedType) >> ptd.AddMember))

    providedTypes

[<TypeProvider>]
type AsnProviderImpl (config : TypeProviderConfig) as this =
    inherit TypeProviderForNamespaces ()

    let ns = "FsAsn1.Provided"
    let asm = Assembly.GetExecutingAssembly()
    let providerType = ProvidedTypeDefinition(asm, ns, "AsnProvider", Some typeof<obj>)

    let sparams = [ProvidedStaticParameter("Schema", typeof<string>)]

    do providerType.DefineStaticParameters(sparams, (fun typeName args ->

        let schema = unbox<string> args.[0]

        let t = ProvidedTypeDefinition(asm, ns, typeName, Some typeof<AsnElement>)

        providedTopLevelTypesFromSchema schema |> Seq.iter (fun kvp -> t.AddMember (snd kvp.Value))

        t))

    do
        this.AddNamespace(ns, [providerType])

#if TYPE_PROVIDER_ASSEMBLY
[<assembly:TypeProviderAssembly>]
do ()
#endif

