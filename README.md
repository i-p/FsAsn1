# FsAsn1

[![Build status](https://ci.appveyor.com/api/projects/status/6sax20taysn08391?svg=true)](https://ci.appveyor.com/project/i-p/fsasn1)

FsAsn1 is an F# library for reading DER encoded ASN.1 data. ASN.1 is a binary format that is widespread in cryptography and public key infrastructure. For example X.509 certificates, which are used also in HTTPS, are defined by an ASN.1 schema.

ASN.1 encoded data cannot always be fully interpreted without corresponding schema. For this reason, FsAsn1 supports decoding ASN.1 data according to a schema. Since a lot of ASN.1 schemas are described in RFC files, in addition to a plain schema file, you can also provide text version of an RFC file (e.g. [https://www.ietf.org/rfc/rfc5280.txt](https://www.ietf.org/rfc/rfc5280.txt)).

The main reason to build this library, apart from learning F#, was to create a web-based ASN.1 viewer. As far as I know, there is no free ASN.1 viewer with support for schemas and in my last job I would definitely make use of one. The viewer itself is built using the Fable compiler which compiles F# code to JavaScript.

Since the library was primarily intended to build the web-based viewer,
its interface is not well thought out. For standalone usage it would need tidying up, adding documentation and creating a NuGet package.

## Web viewer

You can try the web viewer here: 

https://i-p.github.io/asn1-viewer/

If you have a file which is not displayed correctly or if you'd like to have a support for another schema, feel free to open a Github issue.

## Solution overview

### Project FsAsn1
* `Schema.fs` - type definitions used to represent an ASN.1 schema
* `Types.fs` - types used to represent an ASN.1 structure
* `Reader.fs` - reading and interpreting ASN.1 encoded data
* `SchemaParser.fs` - FParsec-based parser for reading ASN.1 schemas
* `Examples.fsx` - a few examples how to use the library

### Project FsAsn1.TypeProvider

A proof of concept for an ASN.1 type provider.

### Project FsAsn1.Tests

NUnit-based tests that are also run in JavaScript after they are compiled by Fable.

* `ParserTests.fs` - tests for parsers defined in SchemaParser module
* `FParsecTests.fs` - tests to verify that FParsec functions work correctly after translation to JavaScript
* `ReaderTests.fs` - tests for reading ASN.1 encoded data
* `TypeProviderTests.fsx` - simple F# script used to test ASN.1 type provider

### Project FsAsn1.Viewer

* `Fable.Plugins.FParsec.fsx` - Fable plugins for translating FParsec functions to JavaScript
* `Fable.Plugins.Viewer.fsx` - Fable plugins for translating various functions that are needed by `FsAsn1.Viewer`
* `fparsec.es6.js` - wrapper that provides FParsec-like interface to `bennu` library. Replacements defined by Fable plugin are then much simpler.
* `Data.fs` - example files and schemas
* `Components.fs` - functions for building user interface

## Used libraries / assets

- [Fable](http://fable.io/) - F# to JavaScript compiler
- [FParsec](http://www.quanttec.com/fparsec/) - parser combinator library used to parse ASN.1 schemas
- [bennu](https://github.com/mattbierner/bennu) - JavaScript parser combinator library based on the same principles as FParsec, that allowed for an easy translation
- [Font Awesome icons](http://fontawesome.io/icons/)

## Development

### Build and test everything

In solution directory, run:

    build.bat

### Helpful targets for development:

To run ASN.1 Viewer locally, run:

    build.bat WebServer

then open http://localhost:8080/asn1-viewer in your browser.

If you change something in `FsAsn1.Viewer` project, run the following command and reload the ASN.1 Viewer:

    build.bat DevViewerJS

If you change something in `FsAsn1` project and want to execute JavaScript tests, run:

    build.bat DevRunTestsJS

## Type provider

ASN.1 type provider is currently just a proof of concept. For experimenting with it, see `TypeProviderTests.fsx`.

In order to prevent Visual Studio from locking the assemblies, it's important to refer to assemblies in the following way:

    #load "load-tp-assemblies.fsx"

After you make some changes to `FsAsn1` or `FsAsn1.TypeProvider`, run following command in NuGet Package Manager Console (menu Tools > Nuget Package Manager):

    . .\Build-TypeProvider.ps1

This command will build uniquely named assemblies and update `load-tp-assemblies.fsx`. In this way, there are no issues with Visual Studio locking the assemblies.

## References

- ASN.1 standard
    - [ITU-T X.680 (08/2015) Information technology – Abstract Syntax Notation One (ASN.1): Specification of basic notation](https://www.itu.int/ITU-T/recommendations/rec.aspx?rec=12479&lang=en)
    - [ITU-T X.690 (08/2015) Information technology – ASN.1 encoding rules: Specification of Basic Encoding Rules (BER), Canonical Encoding Rules (CER) and Distinguished Encoding Rules (DER)]()

