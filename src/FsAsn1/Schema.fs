module FsAsn1.Schema

type TagKind = 
    | Explicit 
    | Implicit

type TagClass = 
    | Universal 
    | Application 
    | Private

type AsnTypeKind =    
    | SequenceType of ComponentType list 
    | SequenceOfType of Constraint option * SequenceOfType
    | SetType of ComponentType list
    | SetOfType of Constraint option * SetOfType
    | ChoiceType of (string * AsnType) list
    | BooleanType
    | NullType 
    | BitStringType
    | ObjectIdentifierType
    | OctetStringType    
    | AnyType of definedBy: string option
    | IntegerType of NamedNumber list
    | TaggedType of TagClass option * int * TagKind * AsnType
    | ReferencedType of string
and AsnType = 
    { Kind: AsnTypeKind
      Constraint: Constraint option
      TypeName: string option
      SchemaName: string
      ComponentName: string option
      Range: (int * int) option }
and ComponentType = 
    | ComponentType of string * AsnType * NamedTypeModifier option
and NamedTypeModifier = 
    | Optional 
    | Default of Value
and Value = 
    | ReferencedValue of string 
    | BooleanValue of bool
    | IntegerValue of bigint
    | SequenceOfValue of Value list
    | OidValue of (string option * bigint option) list
and NamedNumberValue = 
    | SignedNumber of bigint
    | DefinedValue of Value
and NamedNumber = string * NamedNumberValue
and SequenceOfType = 
    | SequenceOfType of AsnType 
    | SequenceOfNamedType of string * AsnType
and SetOfType = 
    | SetOfType of AsnType 
    | SetOfNamedType of string * AsnType
and LowerEndpoint = 
    | Value of Value 
    | Min
and UpperEndpoint = 
    | Value of Value 
    | Max
and Constraint =
    | SingleValue of Value
    | ValueRange of LowerEndpoint * UpperEndpoint
    | SizeConstraint of Constraint
    | Union of Constraint * Constraint
and TagDefault =
    | ExplicitTags
    | ImplicitTags
    | AutomaticTags
and ValueAssignment =
    { Name: string
      Type: AsnType
      Value: Value
      Range: (int * int) option }
and TypeAssignment =
    { Name: string
      Type: AsnType
      Range: (int * int) option }
and OidTypeReference = (string * string)    
and ModuleImport =
    { Identifier: string
      Oid: (string option * bigint option) []
      ValueReferences: string list
      TypeReferences: string list }      
and ModuleDefinition =
    { Identifier: string
      Oid: (string option * bigint option) []
      TagDefault: TagDefault option
      ExtensibilityImplied: bool
      TypeAssignments: Map<string, TypeAssignment>
      ValueAssignments: Map<string, ValueAssignment>
      Imports: ModuleImport list
      Range: (int * int) option
      ElementsDefinedByOid: Map<string, OidTypeReference>  } 
    with
        member __.TryFindType(name) =
            __.TypeAssignments
            |> Map.tryFind name 
            |> Option.map (fun ta -> ta.Type)
        
        member __.FindType(name) =
            match __.TryFindType(name) with
            | Some(ty) -> ty
            | None -> failwithf "Module '%s' doesn't contain type '%s'" __.Identifier name



