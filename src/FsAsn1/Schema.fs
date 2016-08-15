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
    | TaggedType of TagClass option * int * TagKind option * AsnType
    | ReferencedType of string
and AsnType = 
    { Kind: AsnTypeKind
      Constraint: Constraint option
      TypeName: string option
      SchemaName: string
      Range: (int * int) option }
and ComponentType = 
    | ComponentType of string * AsnType * NamedTypeModifier option
and TypeReference = string
and TypeAssignment = TypeReference * AsnType
and DefinedType = TypeReference
and NamedTypeModifier = 
    | Optional 
    | Default of Value
and Value = 
    | ReferencedValue of string 
    | BooleanValue of bool
    | IntegerValue of bigint
    | SequenceOfValue of Value list
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
and TagDefault =
    | ExplicitTags
    | ImplicitTags
    | AutomaticTags
and ModuleDefinition =
    { Identifier: string
      Oid: (string option * bigint option) []
      TagDefault: TagDefault option
      ExtensibilityImplied: bool
      TypeAssignments: Map<string, AsnType>
      ValueAssignments: Map<string, Value> }

