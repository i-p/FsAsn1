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
    
type AsnArrayStream(arr: byte[], pos: int) =    
    let mutable position = pos

    interface IAsnStream with
        member __.CanRead(len) = 
            pos + len <= arr.Length

        member __.Position with get() = position

        member __.ReadByte() = 
            if position + 1 > arr.Length then
                raise (EndOfStreamException())
            else
                let b = arr.[position]
                position <- position + 1
                b

        member __.ReadBytes(len) = 
            if position + len > arr.Length then
                raise (EndOfStreamException())
            else                
                let bs = arr.[position..position + len - 1]
                position <- position + len
                bs

type AsnBoundedStream(stream: IAsnStream, position: int32, limit: int32) =        
    interface IAsnStream with
        member __.CanRead(len) =
            stream.Position + len <= limit

        member __.ReadBytes(len) =            
            stream.ReadBytes(len)        

        member __.ReadByte() =            
            stream.ReadByte()
        member __.Position with get() = stream.Position

let createBoundedStream stream (expectedBytes: int32): IAsnStream =    
    AsnBoundedStream(stream, stream.Position, stream.Position + expectedBytes) :> IAsnStream

type AsnContext(stream: IAsnStream, lookupType: string -> Schema.AsnType option) =
    member __.Stream with get() = stream
    member __.LookupType(name) = lookupType name
    member __.WithBoundedStream(expectedBytes: int32) =
        AsnContext(createBoundedStream stream expectedBytes, lookupType)
    
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

let readRelativeOid (stream: IAsnStream) (length: int) : bigint[] =
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
    
let resolveType (ctx: AsnContext) (ty: AsnType option) =
    match ty with
    | Kind(ReferencedType(name)) -> 
        match ctx.LookupType name with
        // assuming that target type is not another ReferencedType
        | Some(resolvedType) -> Some resolvedType
        | None -> ty
    | _ -> ty

type TypeTag =
    | UniversalTag of AsnClass * TagNumber
    | ExplicitlyTaggedType of AsnClass * TagNumber * AsnType
    | ImplicitlyTaggedType of AsnClass * TagNumber * AsnType
    | UnresolvedTypeTag of string
    | AnyTag
    | ChoiceComponentTag of (string * AsnType) list

let rec toExpectedTag (ctx: AsnContext) (ty: AsnTypeKind) =
    let wrap tag = UniversalTag(AsnClass.Universal, int tag)
    let toAsnClass cls = 
        match cls with
        | Some Universal -> AsnClass.Universal
        | Some Private -> AsnClass.Private
        | Some Application -> AsnClass.Application
        | None -> AsnClass.ContextSpecific
        
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
    // TODO the default tag kind should be specified in ASN module definition
    | AsnTypeKind.TaggedType(cls, tag, None, taggedTy)
    | AsnTypeKind.TaggedType(cls, tag, Some TagKind.Explicit, taggedTy) ->
        ExplicitlyTaggedType(toAsnClass cls, tag, taggedTy)
    | AsnTypeKind.TaggedType(cls, tag, Some TagKind.Implicit, taggedTy) ->
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
            | UnresolvedTypeTag(name) -> 
                failwithf "Cannot read CHOICE type with a component of unknown type %s" name
            | AnyTag -> 
                failwith "Cannot read CHOICE type with a component of ANY type"
            | ChoiceComponentTag(_) -> 
                failwith "TODO Not implemented yet") 
    |> Option.map snd
    |> resolveType ctx

let rec matchSequenceComponentType (ctx: AsnContext) (header: AsnHeader) (components: ComponentType list) = 
    match components with
    | [] ->
        None, []
    | ComponentType(_, ty, None) :: rest ->
        Some ty, rest
    | ComponentType(_, ty, Some (NamedTypeModifier.Default _)) :: rest
    | ComponentType(_, ty, Some NamedTypeModifier.Optional) :: rest ->       
        match toExpectedTag ctx ty.Kind with
        | UniversalTag(cls, tag)
        | ExplicitlyTaggedType(cls, tag, _)
        | ImplicitlyTaggedType(cls, tag, _) ->
            if (cls, tag) = (header.Class, header.Tag) then
                Some ty, rest
            else
                matchSequenceComponentType ctx header rest
        | UnresolvedTypeTag(_) -> failwith "Not implemented yet"
        | AnyTag -> Some ty, rest
        | ChoiceComponentTag(cs) -> 
            failwith "Not implemented yet"
    
     
        

    
and readCollection (ctx: AsnContext) (ty: AsnType option) : AsnElement [] =
    let stream = ctx.Stream

    match ty with
    | Kind(SequenceType components) ->        
        let rec readNext acc components =
            if stream.CanRead(1) then
                
                let position = stream.Position
                let header = readHeader stream
                let ty,rest = matchSequenceComponentType ctx header components
                let ty = resolveType ctx ty
                let v = readValue ctx header ty
                                
                readNext (makeElement(header, v, position, ty) :: acc) rest
            else
                acc |> List.toArray |> Array.rev            
        readNext [] components
    | Kind(AsnTypeKind.SequenceOfType(_, SequenceOfType.SequenceOfType(ty))) ->
        let rec readNext acc =
            if stream.CanRead(1) then
                let position = stream.Position
                let header = readHeader stream
                let ty = resolveType ctx (Some ty)
                let v = readValue ctx header ty

                readNext (makeElement(header, v, position, ty) :: acc)
            else
                acc |> List.toArray |> Array.rev
        readNext []
    | Kind(SetType components) ->
        let toAsnClass (tagClass: TagClass option) =
            match tagClass with
            | Some (TagClass.Application) -> AsnClass.Application
            | Some (TagClass.Private) -> AsnClass.Private
            | Some (TagClass.Universal) -> AsnClass.Universal
            | None -> AsnClass.ContextSpecific

        let rec toPair ty =
            match ty.Kind with
            | TaggedType(cls, tag, _, _) -> ((toAsnClass cls, tag), ty)
            | ReferencedType(name) -> 
                match ctx.LookupType(name) with
                | Some ty -> toPair ty
                | None -> failwith "??"
            | _ -> failwith "?"

        let componentsByTag =
            components
            |> List.map (fun ((ComponentType(_,ty,_)) as ct) -> toPair ty)
            |> Map.ofList

        let rec readNext acc =
            if stream.CanRead(1) then
                let position = stream.Position
                let header = readHeader stream
                let ty = Map.find (header.Class, header.Tag) componentsByTag
                let ty = resolveType ctx (Some ty)
                let v = readValue ctx header ty

                readNext (makeElement(header, v, position, ty) :: acc)
            else
                acc |> List.toArray |> Array.rev
        readNext []
    | Kind(AsnTypeKind.SetOfType(_, SetOfType.SetOfType(ty))) ->
        let ty = resolveType ctx (Some ty)
        let rec readNext acc =
            if stream.CanRead(1) then
                let position = stream.Position
                let header = readHeader stream
                let v = readValue ctx header ty

                readNext (makeElement(header, v, position, ty) :: acc)
            else
                acc |> List.toArray |> Array.rev
        readNext []
    | Kind(ReferencedType name) ->
        readCollection ctx (ctx.LookupType name)
    | None        
    | _ ->        
        printfn "Not implemented %A" ty
        let rec readNext acc =
            if stream.CanRead(1) then
                let el = readElement ctx None                                
                readNext (el :: acc)
            else
                acc |> List.toArray |> Array.rev            
        readNext []
        
and readValueUniversal (ctx : AsnContext) (tag: UniversalTag) len ty : AsnValue =
    let stream = ctx.Stream
    match tag with
    | UniversalTag.Sequence ->                
        readCollection ctx ty |> Sequence
    | UniversalTag.Set->                
        //TODO based on ty, create either Set or SetOf
        readCollection ctx ty |> Set
    | UniversalTag.Integer ->                
        stream.ReadBytes(len) |> decodeInteger |> Integer
    | UniversalTag.ObjectIdentifier ->                
        readOid stream len |> ObjectIdentifier
    | UniversalTag.RelativeObjectIdentifier ->
        readRelativeOid stream len |> RelativeObjectIdentifier
    | UniversalTag.Null ->
        Null
    | UniversalTag.PrintableString ->
        let str = stream.ReadBytes(len) |> System.Text.Encoding.ASCII.GetString
        if (isValidPrintableString str) then
            PrintableString str
        else
            failwith "Invalid printable string"
    | UniversalTag.UTF8String ->
        stream.ReadBytes(len) |> System.Text.Encoding.UTF8.GetString |> UTF8String
    | UniversalTag.VisibleString ->  //TODO this is not correct (https://www.itscj.ipsj.or.jp/iso-ir/006.pdf)
        stream.ReadBytes(len) |> System.Text.Encoding.UTF8.GetString |> VisibleString
    | UniversalTag.IA5String ->  //TODO check charset
        stream.ReadBytes(len) |> System.Text.Encoding.UTF8.GetString |> IA5String
    | UniversalTag.UTCTime ->
        stream.ReadBytes(len) |> System.Text.Encoding.ASCII.GetString |> decodeUTCTime |> UTCTime
    | UniversalTag.BitString ->
        let numberOfUnusedBits = stream.ReadByte()            
        let bytes = stream.ReadBytes(len - 1)
        BitString { NumberOfUnusedBits = numberOfUnusedBits; Data = bytes }
    | UniversalTag.OctetString ->
        stream.ReadBytes(len) |> OctetString
    | UniversalTag.Boolean ->
        match stream.ReadByte() with
        | 0uy -> Boolean(AsnBoolean.False)
        | v -> Boolean(AsnBoolean.True(v))                
    | _ ->
        printfn "Unsupported universal class tag '%d'" (int tag)
        stream.ReadBytes(len) |> Unknown

and readValue (ctx : AsnContext) (h: AsnHeader) ty =    
    let (cls, tagNumber, length) = h.Class, h.Tag, h.Length
    

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

    match length with
    | Definite(len, _) ->
        // TODO create separate function
        let ctx = ctx.WithBoundedStream(len)
        let stream = ctx.Stream

        let ty = resolveType ctx ty

        let expectedTag = 
            (ty |> Option.map (fun ty -> ty.Kind) |> Option.map (toExpectedTag ctx))

        let readAsUnknownType () = stream.ReadBytes(len) |> Unknown
        let readWithNoType () =
            match h.Class with
            | AsnClass.Universal ->
                readValueUniversal ctx (LanguagePrimitives.EnumOfValue tagNumber) len None
            | _ ->
                stream.ReadBytes(len) |> Unknown

        match (expectedTag |> Option.map failsToMatchHeader) with
        | Some(true) ->
            failwithf "Unexpected class and tag for type %A: %A %d" ty.Value h.Class h.Tag
            //TODO if non strict mode
//            readWithNoType()
        | _ -> ()
                
        match expectedTag with
        | Some(UniversalTag(cls, tag)) ->             
            readValueUniversal ctx (LanguagePrimitives.EnumOfValue tagNumber) len ty                            
        | Some(ExplicitlyTaggedType(cls, tag, taggedTy)) ->            
            readElement ctx (Some taggedTy) |> AsnValue.ExplicitTag            
        | Some(ImplicitlyTaggedType(cls, tag, taggedTy)) ->            
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
                readValueUniversal ctx (LanguagePrimitives.EnumOfValue tagNumber) len None
            | _ ->
                readAsUnknownType()
        | Some(UnresolvedTypeTag(_)) -> 
            readAsUnknownType()
        | Some(ChoiceComponentTag(components)) -> 
            match matchChoiceComponent ctx h components with
            | Some cty ->
                readValue ctx h (Some cty)
            | None -> failwithf "Cannot find matching CHOICE component"            
        | None ->
            readWithNoType()
    | Indefinite -> failwith "Not supported yet"    
and readElement (ctx: AsnContext) (ty: AsnType option)  =
    let stream = ctx.Stream
    let position = stream.Position
    let header = readHeader stream
    let ty = resolveType ctx ty    
    let v = readValue ctx header ty
    makeElement(header, v, position, ty)