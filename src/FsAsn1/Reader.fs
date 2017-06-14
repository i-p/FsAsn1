module FsAsn1.Reader

open System
open System.IO
open Types
open Schema

// TODO range + overflow checks
type IAsnStream =
    abstract member CanRead: int ->bool
    abstract member ReadByte: unit -> byte
    abstract member ReadBytes: int -> byte[]
    abstract member Position: int with get

exception EndOfAsnStreamException
exception AsnElementException of string

type AsnArrayStream(arr: byte[], pos: int) =    
    let mutable position = pos

    interface IAsnStream with
        member __.CanRead(len) = 
            pos + len <= arr.Length

        member __.Position with get() = position

        member __.ReadByte() = 
            if position + 1 > arr.Length then
                raise (EndOfAsnStreamException)
            else
                let b = arr.[position]
                position <- position + 1
                b

        member __.ReadBytes(len) = 
            if position + len > arr.Length then
                position <- arr.Length
                raise (EndOfAsnStreamException)
            else                
                let bs = arr.[position..position + len - 1]
                position <- position + len
                bs

type AsnBoundedStream(stream: IAsnStream, limit: int32) as this =        

    member private this.CanRead(len) = stream.Position + len <= limit

    interface IAsnStream with
        member __.CanRead(len) =
            this.CanRead(len)
            
        member __.ReadBytes(len) =
            if this.CanRead(len) then
                stream.ReadBytes(len)        
            else
                //TODO improve
                stream.ReadBytes(limit - stream.Position) |> ignore
                raise (EndOfAsnStreamException)

        member __.ReadByte() =            
            if this.CanRead(1) then
                stream.ReadByte()
            else
                raise (EndOfAsnStreamException)

        member __.Position with get() = stream.Position

let createBoundedStream stream (expectedBytes: int32): IAsnStream =    
    AsnBoundedStream(stream, stream.Position + expectedBytes) :> IAsnStream

type AsnContext(stream: IAsnStream, modules: ModuleDefinition list) =
    static member Empty = AsnContext(AsnArrayStream([||], 0), [])

    member __.Stream with get() = stream
    member __.LookupType(name) =         
        modules
        |> List.tryPick (fun md -> Map.tryFind name md.TypeAssignments)
        |> Option.map (fun ta -> ta.Type)
    member __.ResolveType(ty) =
        match ty.Kind with
        | ReferencedType(name) -> 
            match __.LookupType(name) with
            | None -> ty
            | Some(ty2) -> __.ResolveType(ty2)
        | _ -> ty

    member __.WithBoundedStream(expectedBytes: int32) =
        AsnContext(createBoundedStream stream expectedBytes, modules)        
    member __.Modules with get() = modules

let decodeAsnClass b : AsnClass =
    match b with
    | 0b00 -> AsnClass.Universal
    | 0b01 -> AsnClass.Application
    | 0b10 -> AsnClass.ContextSpecific
    | 0b11 -> AsnClass.Private
    | _ -> failwith "Incorrect value"

let readLength (stream : IAsnStream) : Length =        
    let firstLengthOctet = stream.ReadByte() |> int
    let value = firstLengthOctet &&& 0b01111111
    let isShortForm = (firstLengthOctet >>> 7) = 0

    if isShortForm then
        Definite(value, 1)
    else
        //TODO overflow check
        stream.ReadBytes(value)
        |> Array.fold (fun sum b -> sum * 256 + int b) 0 
        |> fun x -> Definite(x, value + 1)

let readTagNumber (tagByte: int) (stream: IAsnStream) : TagNumber =
    let tagNumber = tagByte &&& 0b11111
    let isShortForm = tagNumber < 31

    if isShortForm then
        tagNumber
    else
        //TODO check max value
        let rec readByte acc =
            let b = stream.ReadByte() |> int
            let value = b &&& 0b01111111
            let isEnd = (value = b)
            let newAcc = acc * 128 + value

            if isEnd then newAcc else readByte newAcc

        readByte 0

let readHeader (stream : IAsnStream) : AsnHeader =    
    let b = stream.ReadByte() |> int
    let cls = decodeAsnClass (b >>> 6)
    let encoding = if ((b >>> 5) &&& 1) = 0 then Primitive else Constructed
    let tagNumber = readTagNumber b stream            
    let length = readLength stream
            
    makeHeader(cls, encoding, tagNumber, length)
 
let decodeInteger (bytes: byte[]) : bigint =
    let firstByte = bytes.[0] |> int
    let initialValue = (firstByte &&& 0x7F) + (firstByte &&& 0x80) * -1
    Seq.skip 1 bytes 
    |> Seq.fold (fun sum b -> sum * 256I + (bigint (int b))) (bigint initialValue)

let readRelativeOid (stream: IAsnStream) (_length: int) : bigint[] =
    let rec readNextValue valuesAcc valueAcc =        
        if stream.CanRead(1) then                
            let b = stream.ReadByte() 
            let value = valueAcc * 128I + bigint (int (b &&& 0b01111111uy))

            if ((b &&& 0x80uy) > 0uy) then
                readNextValue valuesAcc value
            else
                readNextValue (value :: valuesAcc) bigint.Zero
        else
            //TODO check that valueAcc is zero
            valuesAcc |> List.toArray |> Array.rev

    readNextValue [] bigint.Zero


let readOid (stream: IAsnStream) (length: int) : bigint[] =
    let subidentifiers = readRelativeOid stream length
    let first = subidentifiers.[0]
    let component1, component2 = 
        if first < 40I then
            0I, first
        else if first < 80I then
            1I, first - 40I
        else
            2I, first - 80I

    //TODO use list instead of array?
    Array.concat [[|component1; component2|]; (Array.skip 1 subidentifiers)]


let decodeUTCTime (str: string) =     
    let read2Digits (str: string) index =
        let v = int (str.Substring(index, 2))
        if v < 0 then
            failwith "Unexpected value"
        else
            v    

    let decodeOffset (str: string) =
        match str with
        | "Z" -> System.TimeSpan.Zero
        | s when s.StartsWith("+") -> 
            let h = read2Digits str 1
            let m = read2Digits str 3
            System.TimeSpan(h, m, 0)
        | s when s.StartsWith("-") -> 
            let h = read2Digits str 1
            let m = read2Digits str 3
            System.TimeSpan(-h, -m, 0)
        | _ -> failwith "Unexpected string"

    // Exact interpretation of year digits in UTCTime 
    // is not specified, here we assume the range 1951-2050.
    let year =
        let last2Digits = (read2Digits str 0)
        if last2Digits > 50 then 1900 + last2Digits else 2000 + last2Digits
    let month = read2Digits str 2
    let day = read2Digits str 4
    let hour = read2Digits str 6
    let minute = read2Digits str 8
    let second, offset = 
        match str.Length with
        | 11 | 15 ->                         
            let timeZoneString = str.Substring(10)
            0, decodeOffset(timeZoneString)
        | 13 | 17 ->             
            let timeZoneString = str.Substring(12)
            read2Digits str 10, decodeOffset(timeZoneString)            
        | _ -> failwithf "Unexpected length of UTCTime field: %d" str.Length

    DateTimeOffset(DateTime(year, month, day, hour, minute, second, DateTimeKind.Utc), offset)    

let printableCharSet = Set.ofSeq("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 '()+,-./:=?")    
let isValidPrintableChar ch =  Set.contains ch printableCharSet
let isValidPrintableString = Seq.forall isValidPrintableChar

let (|Kind|_|) (ty: AsnType option) =
    match ty with
    | Some(t) -> Some(t.Kind)
    | _ -> None

let toAsnClass cls = 
    match cls with
    | Some Universal -> AsnClass.Universal
    | Some Private -> AsnClass.Private
    | Some Application -> AsnClass.Application
    | None -> AsnClass.ContextSpecific

let toTagClass cls = 
    match cls with
    | AsnClass.Universal -> Some Universal
    | AsnClass.Private -> Some Private
    | AsnClass.Application -> Some Application
    | AsnClass.ContextSpecific -> None

type TypeTag =
    | UniversalTag of AsnClass * TagNumber
    | ExplicitlyTaggedType of AsnClass * TagNumber * AsnType
    | ImplicitlyTaggedType of AsnClass * TagNumber * AsnType
    | UnresolvedTypeTag of string
    | AnyTag
    | ChoiceComponentTag of (string * AsnType) list

let rec toExpectedTag (ctx: AsnContext) (ty: AsnTypeKind) =
    let wrap tag = UniversalTag(AsnClass.Universal, int tag)
            
    match ty with    
    | AsnTypeKind.SequenceType(_)
    | AsnTypeKind.SequenceOfType(_, _) -> UniversalTag.Sequence |> wrap
    | AsnTypeKind.SetType(_)
    | AsnTypeKind.SetOfType(_, _) -> UniversalTag.Set |> wrap    
    | AsnTypeKind.BooleanType -> UniversalTag.Boolean |> wrap
    | AsnTypeKind.NullType -> UniversalTag.Null |> wrap
    | AsnTypeKind.BitStringType -> UniversalTag.BitString |> wrap
    | AsnTypeKind.ObjectIdentifierType -> UniversalTag.ObjectIdentifier |> wrap
    | AsnTypeKind.OctetStringType -> UniversalTag.OctetString |> wrap
    | AsnTypeKind.IntegerType(_) -> UniversalTag.Integer |> wrap    
    | AsnTypeKind.ReferencedType("PrintableString") -> UniversalTag.PrintableString |> wrap
    | AsnTypeKind.ReferencedType("VisibleString") -> UniversalTag.VisibleString |> wrap
    | AsnTypeKind.ReferencedType("UTF8String") -> UniversalTag.UTF8String |> wrap    
    | AsnTypeKind.ReferencedType("T61String") -> UniversalTag.T61String |> wrap    
    | AsnTypeKind.ReferencedType("IA5String") -> UniversalTag.IA5String |> wrap    
    | AsnTypeKind.ReferencedType("UTCTime") -> UniversalTag.UTCTime |> wrap    
    | AsnTypeKind.ReferencedType("RelativeObjectIdentifier") -> UniversalTag.RelativeObjectIdentifier |> wrap
    | AsnTypeKind.TaggedType(cls, tag, TagKind.Explicit, taggedTy) ->
        ExplicitlyTaggedType(toAsnClass cls, tag, taggedTy)
    | AsnTypeKind.TaggedType(cls, tag, TagKind.Implicit, taggedTy) ->
        ImplicitlyTaggedType(toAsnClass cls, tag, taggedTy)
    // An ANY type can be represented by any class/tag
    | AsnTypeKind.AnyType(_) -> AnyTag
    // A CHOICE type is represented by one of its components, but we don't know which one
    | AsnTypeKind.ChoiceType(cs) -> ChoiceComponentTag(cs)
    | AsnTypeKind.ReferencedType(name) ->
        let ty = ctx.LookupType name 
        match ty with
        | Some ty -> toExpectedTag ctx ty.Kind
        // We don't know the referenced type definition, so we can't tell anything about its tag or class
        | None -> UnresolvedTypeTag(name)
   
let matchChoiceComponent (ctx: AsnContext) (header: AsnHeader) (components: (string * AsnType) list) =
    components
    |> List.tryFind (fun (_, cty) ->
            match toExpectedTag ctx cty.Kind with
            | UniversalTag(cls, tag)                
            | ExplicitlyTaggedType(cls, tag, _)
            | ImplicitlyTaggedType(cls, tag, _) ->
                (cls, tag) = (header.Class, header.Tag)                
            | UnresolvedTypeTag(_name) -> 
                //TODO log
                false                
            | AnyTag -> 
                failwith "Cannot read CHOICE type with a component of ANY type"
            | ChoiceComponentTag(_) -> 
                failwith "TODO Not implemented yet") 
    |> Option.map snd

let matchAnyTypeDefinedBy (ctx: AsnContext) componentName previous (previousElements: AsnElement list) =
    let targetElement = 
        previous
        |> List.zip previousElements 
        |> List.find (fun (_, ComponentType(name, _, _)) -> name = componentName)
        |> fst

    let equalsOid (oidParts: AsnInteger []) value =
        match value with
        | OidValue(parts2) ->
            parts2
            |> List.map (snd >> Option.get)
            |> fun p ->                                                    
                if p.Length <> oidParts.Length then
                    false
                else
                    //TODO find out how to implement IEquatable for BigInteger in Fable plugin
                    // then this can be simplified to (p = oidParts)
                    List.forall2 (fun n1 n2 -> n1 = n2) p (List.ofArray oidParts) 
        | _ -> false

    match targetElement.Value with
    | ObjectIdentifier(parts) ->
        let knownValues = 
            ctx.Modules |> List.collect (fun md -> Map.toList md.ValueAssignments)
        
        let namedOidValue = 
            knownValues
            |> List.tryFind (fun (_, va) -> equalsOid parts va.Value)                                    

        match namedOidValue with
        | None -> failwith "None"
        | Some(name, _) ->
            // Example: translate id-signedData to SignedData
            let n = name.Substring("id-".Length)                                
            let typeName = string (System.Char.ToUpper(n.[0])) + n.Substring(1)                    
            let newType = 
                ctx.LookupType typeName                        
                |> Option.get
                                                                                              
            newType
    | _ ->
        failwith "ANY type must refer to a component of OBJECT IDENTIFIER type"      

let rec matchSequenceComponentType (ctx: AsnContext) (header: AsnHeader) (previous: ComponentType list, next: ComponentType list) (previousElements: AsnElement list) = 
    
    match next with
    | [] ->        
        None, previous, []
    | (ComponentType(_, ty, None) as cty) :: rest ->
        match toExpectedTag ctx ty.Kind with
        | ExplicitlyTaggedType(cls, tag, { Kind = AnyType(Some(componentName)) }) ->
            let newType = matchAnyTypeDefinedBy ctx componentName previous previousElements

            Some { ty with Kind = TaggedType(toTagClass cls, tag, TagKind.Explicit, newType) }, cty :: previous, rest
        | _ ->
            Some ty, cty :: previous, rest
    | (ComponentType(_, ty, Some (NamedTypeModifier.Default _)) as cty) :: rest
    | (ComponentType(_, ty, Some NamedTypeModifier.Optional) as cty) :: rest ->       
        match toExpectedTag ctx ty.Kind with                    
        | UniversalTag(cls, tag)                    
        | ExplicitlyTaggedType(cls, tag, _)
        | ImplicitlyTaggedType(cls, tag, _) ->
            if (cls, tag) = (header.Class, header.Tag) then
                Some ty, cty :: previous, rest
            else
                matchSequenceComponentType ctx header (previous, rest) previousElements
        | UnresolvedTypeTag(_) -> failwith "Not implemented yet"
        | AnyTag -> Some ty, previous, rest
        | ChoiceComponentTag(_cs) -> 
            failwith "Not implemented yet"
        
and readCollection (ctx: AsnContext) (ty: AsnType option) : AsnResult list =
    let stream = ctx.Stream
            
    //TODO refactor
    let readElements tryFindType initialState =
        let rec recurse acc state =             
            if stream.CanRead(1) then                            
                let position = stream.Position
                
                try
                    let header = readHeader stream
                    let ty, newState = tryFindType header state acc                
                    let res = readValue ctx header ty

                    let elResult = 
                        res
                        |> mapLeft (fun e -> InvalidValue 
                                                { Offset = position
                                                  RealLength = stream.Position - position - header.HeaderLength
                                                  Header = header
                                                  SchemaType = ty
                                                  Value = e })
                        |> mapRight (fun vv -> makeElement(header, vv, position, ty))

                    recurse (elResult :: acc) newState                    
                with
                | e ->
                    let err = 
                        if stream.Position = position then
                            NoData { Offset = position }
                        else
                            InvalidHeader { Offset = position }
                    
                    (Left(err) :: acc) |> List.rev
            else
                acc |> List.rev
        
        recurse [] initialState
            
    let readElementsNoState tryFindType =
        readElements (fun h _ _ ->  tryFindType h, ()) ()

    match ty with
    | Kind(SequenceType components) ->
        readElements (fun header components previousResults ->
            let previousElements = previousResults |> List.choose right
            let cty, previous, next = matchSequenceComponentType ctx header components previousElements
            
            cty, (previous, next)
                        
        ) ([], components)

    | Kind(AsnTypeKind.SequenceOfType(_, SequenceOfType.SequenceOfType(ty))) ->
        readElementsNoState (fun _ -> Some ty)        
    | Kind(SetType components) ->
        let rec toPair ty =
            match toExpectedTag ctx ty.Kind with
            | UniversalTag(cls, tag)
            | ExplicitlyTaggedType(cls, tag, _)
            | ImplicitlyTaggedType(cls, tag, _) -> ((cls, tag), ty)
            | UnresolvedTypeTag(name) -> failwithf "Cannot determine tag of type %s" name
            | AnyTag -> failwith "Cannot determine tag of ANY type"
            | ChoiceComponentTag(_) -> failwith "Cannot determine tag of CHOICE type"
                    
        components
        |> List.map (fun (ComponentType(_,ty,_)) -> toPair ty)
        |> List.groupBy fst
        |> List.map (fun (key, values) -> 
                        match values with
                        | [value] -> value
                        | _ -> failwithf "Multiple components with the same class and tag: %A" key)
        |> Map.ofList
        |> readElements (fun header componentMap _previousElements ->
            let key = (header.Class, header.Tag)
            match Map.tryFind key componentMap with
            | Some(ty) ->
                Some ty, Map.remove key componentMap
            | None ->
                failwithf "Unexpected component of SET type with class %A and tag %d" header.Class header.Tag)

    | Kind(AsnTypeKind.SetOfType(_, SetOfType.SetOfType(ty))) ->        
        readElementsNoState (fun _ -> Some ty)
    | Kind(ReferencedType name) ->
        readCollection ctx (ctx.LookupType name)
    | None ->
        readElementsNoState (fun _ -> None)
    | _ ->        
        failwithf "Unexpected collection type %A" ty
           
and readValueUniversal (ctx : AsnContext) (tag: TagNumber) len ty : AsnValueResult =
    let stream = ctx.Stream
    match (LanguagePrimitives.EnumOfValue tag) with
    | UniversalTag.Sequence ->                
        let res = readCollection ctx ty        
        let el = res |> List.choose right |> List.toArray |> Sequence
        let errs = res |> List.choose left
        
        match errs with
        | [] -> Right el
        | _ -> Both({ AsnValueError.Exception = None; ChildrenErrors = errs }, el)

    | UniversalTag.Set->                
        //TODO based on ty, create either Set or SetOf
        let res = readCollection ctx ty   
        let el = res |> List.choose right |> List.toArray |> Set                 
        let errs = res |> List.choose left
        
        match errs with
        | [] -> Right el
        | _ -> Both({ AsnValueError.Exception = None; ChildrenErrors = errs }, el)
                    
    | UniversalTag.Integer ->                
        stream.ReadBytes(len) |> decodeInteger |> Integer |> Right
    | UniversalTag.ObjectIdentifier ->                
        readOid stream len |> ObjectIdentifier |> Right
    | UniversalTag.RelativeObjectIdentifier ->
        readRelativeOid stream len |> RelativeObjectIdentifier |> Right
    | UniversalTag.Null ->
        Null |> Right
    | UniversalTag.PrintableString ->
        let str = stream.ReadBytes(len) |> System.Text.Encoding.ASCII.GetString
        if (isValidPrintableString str) then
            PrintableString str |> Right
        else
            failwith "Invalid printable string"
    | UniversalTag.UTF8String ->
        stream.ReadBytes(len) |> System.Text.Encoding.UTF8.GetString |> UTF8String |> Right
    | UniversalTag.VisibleString ->  //TODO this is not correct (https://www.itscj.ipsj.or.jp/iso-ir/006.pdf)
        stream.ReadBytes(len) |> System.Text.Encoding.UTF8.GetString |> VisibleString |> Right
    | UniversalTag.IA5String ->  //TODO check charset
        stream.ReadBytes(len) |> System.Text.Encoding.UTF8.GetString |> IA5String |> Right
    | UniversalTag.UTCTime ->
        stream.ReadBytes(len) |> System.Text.Encoding.ASCII.GetString |> decodeUTCTime |> UTCTime |> Right
    | UniversalTag.BitString ->
        let numberOfUnusedBits = stream.ReadByte()            
        let bytes = stream.ReadBytes(len - 1)
        BitString { NumberOfUnusedBits = numberOfUnusedBits; Data = bytes } |> Right
    | UniversalTag.OctetString ->
        stream.ReadBytes(len) |> OctetString |> Right
    | UniversalTag.Boolean ->
        if len <> 1 then raise (AsnElementException("Invalid length of boolean value."))
        match stream.ReadByte() with
        | 0uy -> Boolean(AsnBoolean.False) |> Right
        | v -> Boolean(AsnBoolean.True(v)) |> Right
    | _ ->
        printfn "Unsupported universal class tag '%d'" tag
        stream.ReadBytes(len) |> Unknown |> Right

and readValue (ctx : AsnContext) (h: AsnHeader) (ty: AsnType option): AsnValueResult =    
    let (tagNumber, length) = h.Tag, h.Length
    

    let failsToMatchHeader expectedTag =        
        let compare cls tag = 
            cls <> h.Class || tag <> h.Tag                
        
        match expectedTag with
        | UniversalTag(cls, tag) -> compare cls tag
        | ExplicitlyTaggedType(cls, tag, _) -> compare cls tag
        | ImplicitlyTaggedType(cls, tag, _) -> compare cls tag
        | UnresolvedTypeTag(_) -> false
        | AnyTag -> false
        | ChoiceComponentTag(_) -> false        

    let readValueOfDefiniteLength len =
        let ctx = ctx.WithBoundedStream(len)
        let stream = ctx.Stream

        let ty = ty |> Option.map ctx.ResolveType

        let expectedTag = 
            (ty |> Option.map (fun ty -> ty.Kind) |> Option.map (toExpectedTag ctx))

        let readAsUnknownType () = stream.ReadBytes(len) |> Unknown |> Right
        let readWithNoType () =
            match h.Class with
            | AsnClass.Universal ->
                readValueUniversal ctx tagNumber len None
            | _ ->
                stream.ReadBytes(len) |> Unknown |> Right

        match (expectedTag |> Option.map failsToMatchHeader) with
        | Some(true) ->
            failwithf "Unexpected class and tag for type %A: %A %d" ty.Value h.Class h.Tag
            //TODO if non strict mode
//            readWithNoType()
        | _ -> ()
                
        match expectedTag with
        | Some(UniversalTag(_, _)) ->             
            readValueUniversal ctx tagNumber len ty                            
        | Some(ExplicitlyTaggedType(_, _, taggedTy)) ->            
            readElement ctx (Some taggedTy)
            |> mapRight AsnValue.ExplicitTag
            |> mapLeft (fun e -> { AsnValueError.Exception = None; ChildrenErrors = [e] })            
        | Some(ImplicitlyTaggedType(_, _, taggedTy)) ->            
            match toExpectedTag ctx taggedTy.Kind with
            | UniversalTag(cls, tag) 
            | ExplicitlyTaggedType(cls, tag, _) 
            | ImplicitlyTaggedType(cls, tag, _) ->            
                readValue ctx { h with Class = cls; Tag = tag } (Some taggedTy)
            | AnyTag(_) ->
                // X.680 31.2.9  The  IMPLICIT alternative shall not be used if the type defined by "Type" is an untagged choice type or an
                // untagged open type or an untagged "DummyReference" (see Rec. ITU-T X.683 | ISO/IEC 8824-4, 8.3).
                failwithf "Cannot read value of implicitly tagged ANY type"
            | ChoiceComponentTag(_) ->
                // X.680 31.2.9  The  IMPLICIT alternative shall not be used if the type defined by "Type" is an untagged choice type or an
                // untagged open type or an untagged "DummyReference" (see Rec. ITU-T X.683 | ISO/IEC 8824-4, 8.3).
                failwithf "Cannot read value of implicitly tagged CHOICE type"
            | UnresolvedTypeTag(_) ->
                readAsUnknownType()         
        | Some(AnyTag(_)) -> 
            match h.Class with
            | AsnClass.Universal ->                
                readValueUniversal ctx tagNumber len None
            | _ ->
                readAsUnknownType()
        | Some(UnresolvedTypeTag(_)) -> 
            readAsUnknownType()
        | Some(ChoiceComponentTag(components)) -> 
            match matchChoiceComponent ctx h components with
            | Some cty ->
                readValue ctx h (Some cty)
            | None -> 
                readAsUnknownType()
                //failwithf "Cannot find matching CHOICE component"            
        | None ->
            readWithNoType()


    let tryMoveTo pos =
        try
            ctx.Stream.ReadBytes(pos - ctx.Stream.Position) |> ignore
        with
        | :? EndOfAsnStreamException -> ()
        | _ -> reraise()
        
    match length with
    | Definite(len, _) ->        
        let position = ctx.Stream.Position
        try
            let res = readValueOfDefiniteLength len
            tryMoveTo (len + position)            
            res
        with        
        | e ->  
            tryMoveTo (len + position)
            Left({ AsnValueError.Exception = Some(e); ChildrenErrors = [] })

    | Indefinite -> failwith "Not supported yet"    
and readElement (ctx: AsnContext) (ty: AsnType option): AsnResult =
    let stream = ctx.Stream
    let position = stream.Position
    try
        let header = readHeader stream    
        
        readValue ctx header ty     
        |> mapRight (fun v -> makeElement(header, v, position, ty))
        |> mapLeft (fun e -> InvalidValue 
                                { Offset = position
                                  RealLength = stream.Position - position - header.HeaderLength
                                  Header = header
                                  SchemaType = ty
                                  Value = e })        
    with
    | e ->
        printfn "%A" e
        if position = stream.Position then
            Left(AsnElementError.NoData { Offset = position })
        else
            Left(AsnElementError.InvalidHeader { Offset = position })


//TODO rename TypeName to AssignedName
//TODO add nameOfType as a property to AsnType

let nameOfType (ty: AsnType) =
    match ty.TypeName, ty.Kind with
    | Some(typeName), _ -> Some(typeName)
    | None, FsAsn1.Schema.ReferencedType(n) -> Some n
    | _, _ -> None
  
let componentName (ty: AsnType option) =
    match ty with    
    | Some({ ComponentName = Some name }) -> Some name
    | _ -> None
