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

let readOid (stream: IAsnStream) (length: int) : bigint[] =

    let rec readNextValue valuesAcc valueAcc =        
        if stream.CanRead(1) then                
            let b = stream.ReadByte() 
            let value = valueAcc * (bigint 128) + bigint (int (b &&& 0b01111111uy))

            if ((b &&& 0b10000000uy) > 0uy) then
                readNextValue valuesAcc value
            else
                readNextValue (value :: valuesAcc) bigint.Zero
        else
            //TODO check that valueAcc is zero
            valuesAcc |> List.toArray |> Array.rev

    let first = stream.ReadByte()
    let value1 = bigint ((int first &&& 0b01111111) / 40)
    let value2 = bigint ((int first &&& 0b01111111) % 40)

    if (int first >>> 7) = 1 then
        [| value1; value2 |]
    else
        readNextValue [value2; value1] bigint.Zero

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
                
    let year = (read2Digits str 0) + 2000 //TODO when to assume 19--/20--?
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
        


and readValue (ctx : AsnContext) (h: AsnHeader) ty =    
    let (cls, tagNumber, length) = h.Class, h.Tag, h.Length
    match length with
    | Definite(l, _) ->
        // TODO create separate function
        let ctx = ctx.WithBoundedStream(l)
        let stream = ctx.Stream

        match cls with
        | AsnClass.Universal-> 
            match (LanguagePrimitives.EnumOfValue tagNumber) with
            | UniversalTag.Sequence ->                
                readCollection ctx ty |> Sequence
            | UniversalTag.Set->                
                readCollection ctx ty |> Set
            | UniversalTag.Integer ->                
                stream.ReadBytes(l) |> decodeInteger |> Integer
            | UniversalTag.ObjectIdentifier ->                
                readOid stream l |> ObjectIdentifier
            | UniversalTag.Null ->
                Null
            | UniversalTag.PrintableString ->
                let str = stream.ReadBytes(l) |> System.Text.Encoding.ASCII.GetString
                if (isValidPrintableString str) then
                    PrintableString str
                else
                    failwith "Invalid printable string"
            | UniversalTag.UTF8String ->
                stream.ReadBytes(l) |> System.Text.Encoding.UTF8.GetString |> UTF8String
            | UniversalTag.UTCTime ->
                stream.ReadBytes(l) |> System.Text.Encoding.ASCII.GetString |> decodeUTCTime |> UTCTime
            | UniversalTag.BitString ->
                let numberOfUnusedBits = stream.ReadByte()            
                let bytes = stream.ReadBytes(l - 1)
                BitString { NumberOfUnusedBits = numberOfUnusedBits; Data = bytes }
            | UniversalTag.OctetString ->
                stream.ReadBytes(l) |> OctetString
            | UniversalTag.Boolean ->
                match stream.ReadByte() with
                | 0uy -> Boolean(AsnBoolean.False)
                | v -> Boolean(AsnBoolean.True(v))                
            | _ ->
                printfn "Unsupported universal class tag '%d'" tagNumber
                stream.ReadBytes(l) |> Unknown
        | ContextSpecific ->
            match ty with
            | Kind(TaggedType(_, _, Some Explicit, ty2))
            // TODO the default tag kind should be specified in ASN module definition            
            | Kind(TaggedType(_, _, None, ty2)) ->
                readElement ctx (Some ty2) |> ExplicitTag
            | Kind(TaggedType(_, _, Some Implicit, ty2)) ->
                readValue ctx h (Some ty2)
            | None ->
                printfn "Unknown underlying type for a context specific class"
                stream.ReadBytes(l) |> Unknown
            | _ ->
                printfn "Unsupported"                
                stream.ReadBytes(l) |> Unknown
        | _ -> 
            printfn "Unknown tag number of class %A: %d" cls tagNumber
            stream.ReadBytes(l) |> Unknown
    | Indefinite -> failwith "Not supported yet"    
and readElement (ctx: AsnContext) (ty: AsnType option)  =
    let stream = ctx.Stream
    let position = stream.Position
    let header = readHeader stream
    let ty = resolveType ctx ty
    let v = readValue ctx header ty    
    makeElement(header, v, position, ty)