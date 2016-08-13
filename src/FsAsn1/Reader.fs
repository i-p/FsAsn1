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
    |> Seq.fold (fun sum b -> sum * (bigint 256) + (bigint (int b))) (bigint initialValue)

let readRelativeOid (stream: IAsnStream) (length: int) : bigint[] =
    let rec readNextValue valuesAcc valueAcc =        
        if stream.CanRead(1) then                
            let b = stream.ReadByte() 
            let value = valueAcc * (bigint 128) + bigint (int (b &&& 0b01111111uy))

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
        if first < bigint(40) then
            bigint.Zero, first
        else if first < bigint(80) then
            bigint.One, first - bigint(40)
        else
            bigint(2), first - bigint(80)

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

let rec matchSequenceComponentType (header: AsnHeader) (components: ComponentType list) = 
    match components with
    | [] ->
        None, []
    | ComponentType(_, ty, None) :: rest ->
        Some ty, rest
    | ComponentType(_, ty, Some (NamedTypeModifier.Default _)) :: rest
    | ComponentType(_, ty, Some NamedTypeModifier.Optional) :: rest ->        
        match ty.Kind with
        | TaggedType(None, tag, _, _) ->
            if (tag = header.Tag) then
                Some ty, rest
            else
                matchSequenceComponentType header rest        
        | _ ->
            if components.Length = 1 then
                Some ty, rest
            else
                failwithf "Untagged optional type must be the last component: %A" ty.Kind

    
and readCollection (ctx: AsnContext) (ty: AsnType option) : AsnElement [] =
    let stream = ctx.Stream

    match ty with    
    | Kind(SequenceType components) ->        
        let rec readNext acc components =
            if stream.CanRead(1) then
                
                let position = stream.Position
                let header = readHeader stream
                let ty,rest = matchSequenceComponentType header components
                let ty = resolveType ctx ty
                let v = readValue ctx header ty
                                
                readNext (makeElement(header, v, position, ty) :: acc) rest
            else
                acc |> List.toArray |> Array.rev            
        readNext [] components
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

//TODO add relative object identifier
and toUniversalTag (ctx: AsnContext) (ty: AsnTypeKind) =
    match ty with
    | AsnTypeKind.AnyType(_) -> None
    | AsnTypeKind.SequenceType(_) -> Some UniversalTag.Sequence
    | AsnTypeKind.SequenceOfType(_, _) -> Some UniversalTag.Sequence
    | AsnTypeKind.SetOfType(_, _) -> Some UniversalTag.Set
    | AsnTypeKind.ChoiceType(_) -> None
    | AsnTypeKind.BooleanType -> Some UniversalTag.Boolean
    | AsnTypeKind.NullType -> Some UniversalTag.Null
    | AsnTypeKind.BitStringType -> Some UniversalTag.BitString
    | AsnTypeKind.ObjectIdentifierType -> Some UniversalTag.ObjectIdentifier
    | AsnTypeKind.OctetStringType -> Some UniversalTag.OctetString
    | AsnTypeKind.IntegerType(_) -> Some UniversalTag.Integer
    | AsnTypeKind.TaggedType(_, _, _, _) -> None
    | AsnTypeKind.ReferencedType("PrintableString") -> Some UniversalTag.PrintableString
    | AsnTypeKind.ReferencedType("VisibleString") -> Some UniversalTag.VisibleString
    | AsnTypeKind.ReferencedType("UTF8String") -> Some UniversalTag.UTF8String
    | AsnTypeKind.ReferencedType(name) ->
        let ty = ctx.LookupType name 
        ty |> Option.bind (fun t -> toUniversalTag ctx t.Kind)

and readValue (ctx : AsnContext) (h: AsnHeader) ty =    
    let (cls, tagNumber, length) = h.Class, h.Tag, h.Length
    match length with
    | Definite(len, _) ->
        // TODO create separate function
        let ctx = ctx.WithBoundedStream(len)
        let stream = ctx.Stream

        match cls with
        | AsnClass.Universal-> 
            readValueUniversal ctx (LanguagePrimitives.EnumOfValue tagNumber) len ty
        | AsnClass.Private
        | AsnClass.Application
        | AsnClass.ContextSpecific ->
            match ty with
            | Kind(TaggedType(_, _, Some Explicit, ty2))
            // TODO the default tag kind should be specified in ASN module definition            
            | Kind(TaggedType(_, _, None, ty2)) ->
                readElement ctx (Some ty2) |> ExplicitTag
            | Kind(TaggedType(_, _, Some Implicit, ty2)) ->
                let resolve t = 
                    match Some t with 
                    | Kind(ReferencedType n) -> defaultArg (ctx.LookupType n) t;
                    | _ -> t
                let ty2 = resolve ty2
                
                match toUniversalTag ctx ty2.Kind with
                | Some tag ->
                    readValueUniversal ctx tag len ty
                | None ->
                    readValue ctx { h with Class = AsnClass.ContextSpecific } (Some ty2)
            | None ->
                printfn "Unknown underlying type for tag: %A %d" cls tagNumber
                stream.ReadBytes(len) |> Unknown
            | _ ->
                printfn "Unsupported"
                stream.ReadBytes(len) |> Unknown
    | Indefinite -> failwith "Not supported yet"    
and readElement (ctx: AsnContext) (ty: AsnType option)  =
    let stream = ctx.Stream
    let position = stream.Position
    let header = readHeader stream
    let ty = resolveType ctx ty
    let v = readValue ctx header ty    
    makeElement(header, v, position, ty)