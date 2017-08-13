[<AutoOpen>]
module FsAsn1.Types

open System
open System.IO
    
type UniversalTag =
    | Boolean = 1
    | Integer = 2
    | BitString = 3
    | OctetString = 4
    | Null = 5
    | ObjectIdentifier = 6
    | UTF8String = 12
    | RelativeObjectIdentifier = 13
    | Sequence = 16
    | Set = 17
    | PrintableString = 19
    | T61String = 20
    | IA5String = 22
    | UTCTime = 23
    | VisibleString = 26

type AsnClass =
    | Universal
    | Application
    | ContextSpecific
    | Private

type Encoding = 
    | Primitive
    | Constructed

type IdentifierOctets =
    | LowTagNumberForm of AsnClass * byte
    | HighTagNumberForm of AsnClass * int

type LengthOctets = 
    | ShortForm of byte
    | LongForm of byte[]

type TagNumber = int
    
type Length = 
    | Definite of length: int * numberOfOctets: int
    | Indefinite

type AsnHeader =
    { Class: AsnClass
      Encoding: Encoding
      Tag: TagNumber
      Length: Length }
    with
        member x.ElementLength =
            let len, lenOctets = 
                match x.Length with
                | Definite(l, lenOctets) -> l, lenOctets
                | Indefinite -> failwith "Not supported"

            //TODO length of identifier octet, now assuming 1
            1 + lenOctets + len

        member x.HeaderLength =
            let lenOctets = 
                match x.Length with
                | Definite(_, lenOctets) -> lenOctets
                | Indefinite -> failwith "Not supported"

            //TODO length of identifier octet, now assuming 1
            1 + lenOctets
            
let makeHeader(cls, encoding, tag, length) =
    { Class = cls; Encoding = encoding; Tag = tag; Length = length }
        
type AsnBitString = { NumberOfUnusedBits: byte; Data: byte[] }

// Value True is represented by an octet of any non-zero value.
type AsnBoolean = 
    | True of byte 
    | False

type AsnInteger = bigint

type AsnElement = 
    { Header: AsnHeader
      Value: AsnValue
      Offset: int32
      SchemaType: Schema.AsnType option }
    with
        member x.Range =            
            (x.Offset, x.Offset + x.Header.ElementLength - 1)

        //TODO move to header
        member x.HeaderRange =
            let lenOctets = 
                match x.Header.Length with
                | Definite(_, lenOctets) -> lenOctets
                | Indefinite -> failwith "Not supported"

            //TODO length of identifier octet, now assuming 1
            (x.Offset, x.Offset + x.Header.HeaderLength - 1)

and AsnValue =
    | Integer of AsnInteger
    | Null
    // Depth and integer size are not limited
    // http://www.viathinksoft.de/~daniel-marschall/asn.1/oid_facts.html#chap4
    | ObjectIdentifier of AsnInteger[]
    | RelativeObjectIdentifier of AsnInteger[]
    | OctetString of byte[]
    | PrintableString of string
    | VisibleString of string
    | IA5String of string
    | UTF8String of string
    /// Represents value of the SEQUENCE or SEQUENCE OF type
    | Sequence of AsnElement[]
    /// Represents value of the SET or SET OF type
    | Set of AsnElement[]
    | T61String of string
    | Unknown of byte[]
    | BitString of AsnBitString
    | UTCTime of DateTimeOffset
    | ExplicitTag of AsnElement
    | Boolean of AsnBoolean


type NoData = { Offset: int32 }
type InvalidHeader = { Offset: int32 }
type InvalidElementValue = 
    { Offset: int32
      RealLength: int32
      Header: AsnHeader
      SchemaType: Schema.AsnType option
      Value: AsnValueError }
    with
        member x.RealRange =
            x.Offset, x.Offset + x.Header.HeaderLength + x.RealLength - 1
        member x.HeaderRange =
            x.Offset, x.Offset + x.Header.HeaderLength - 1

and AsnValueError =
    { Exception: Exception option
      ChildrenErrors: AsnElementError list }
and AsnElementError =
    | NoData of NoData
    // Cannot read whole header
    // Header has invalid structure
    | InvalidHeader of InvalidHeader
    // Cannot correctly read value that follows given header
    | InvalidValue of InvalidElementValue

type EitherOrBoth<'a, 'b> =
    | Left of 'a
    | Right of 'b
    | Both of left: 'a * right: 'b
            
let left x = 
    match x with
    | Left(l) -> Some(l)
    | Right(_) -> None
    | Both(l, _) -> Some(l)
    
let right x = 
    match x with
    | Left(_) -> None
    | Right(r) -> Some(r)
    | Both(_, r) -> Some(r)    

let mapLeft f x =
    match x with
    | Left(l) -> Left(f l)
    | Right(r) -> Right(r)
    | Both(l, r) -> Both(f l, r)
    
let mapRight f x =
    match x with
    | Left(l) -> Left(l)
    | Right(r) -> Right(f r)
    | Both(l, r) -> Both(l, f r)
   
let toTuple x =
    left x, right x
    

type AsnResult = EitherOrBoth<AsnElementError, AsnElement>
type AsnValueResult = EitherOrBoth<AsnValueError, AsnValue>

let makeElement(header, value, offset, schemaType): AsnElement =
    { Header = header; Value = value; Offset = offset; SchemaType = schemaType }
     
let (|SimpleValue|Collection|) (value: AsnValue) =    
    match value with
    | Null
    | Integer(_)
    | ObjectIdentifier(_)
    | OctetString(_)
    | PrintableString(_)
    | UTF8String(_)
    | T61String(_)
    | Unknown(_)
    | BitString(_)
    | UTCTime(_)
    | Boolean(_)
    | RelativeObjectIdentifier(_)
    | VisibleString(_)
    | IA5String(_) ->
        SimpleValue()
    | Sequence(items)
    | Set(items) ->
        Collection(items)    
    | ExplicitTag(el) -> 
        Collection([|el|])
    
let childElements (value: AsnValue) =
    match value with
    | SimpleValue -> [||]
    | Collection(items) -> items

let rec cataAsn fSimple fCollection (asnElement: AsnElement): 't = 
    let recurse = cataAsn fSimple fCollection
    match asnElement.Value with
    | SimpleValue -> fSimple(asnElement)
    | Collection(items) ->         
        fCollection asnElement (items |> Array.map recurse)

let rec foldAsn fSimple fCollection acc (asnElement: AsnElement): 't = 
    let recurse = foldAsn fSimple fCollection
    match asnElement.Value with
    | SimpleValue -> fSimple acc asnElement
    | Collection(items) ->
        let acc = fCollection acc asnElement         
        items |> Array.fold recurse acc

let filter (predicate: AsnElement -> bool) (el: AsnElement) =
    let fSimple el = 
        if predicate el then [el] else []
    let fCollection el children =
        let result = List.concat children
        if predicate el then el :: result else result
        
    cataAsn fSimple fCollection el