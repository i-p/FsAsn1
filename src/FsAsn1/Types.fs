﻿module FsAsn1.Types

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
    | Sequence = 16
    | Set = 17
    | PrintableString = 19
    | T61String = 20
    | IA5String = 22
    | UTCTime = 23

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

and AsnValue =
    | Integer of AsnInteger
    | Null
    // Depth and integer size are not limited
    // http://www.viathinksoft.de/~daniel-marschall/asn.1/oid_facts.html#chap4
    | ObjectIdentifier of AsnInteger[]
    | OctetString of byte[]
    | PrintableString of string
    | UTF8String of string
    | Sequence of AsnElement[]
    | SequenceOf of AsnElement[]
    | Set of AsnElement[]
    | SetOf of AsnElement[]
    | T61String of string
    | Unknown of byte[]
    | BitString of AsnBitString
    | UTCTime of DateTimeOffset
    | ExplicitTag of AsnElement
    | Boolean of AsnBoolean

let makeElement(header, value, offset, schemaType) =
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
    | Boolean(_) ->
        SimpleValue()
    | Sequence(items)        
    | SequenceOf(items)
    | Set(items)
    | SetOf(items) ->
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