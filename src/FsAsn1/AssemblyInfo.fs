namespace System
open System.Reflection

[<assembly: AssemblyTitleAttribute("FsAsn1")>]
[<assembly: AssemblyProductAttribute("FsAsn1")>]
[<assembly: AssemblyDescriptionAttribute("An F# library for reading ASN.1 encoded data.")>]
[<assembly: AssemblyVersionAttribute("0.0.1")>]
[<assembly: AssemblyFileVersionAttribute("0.0.1")>]
do ()

module internal AssemblyVersionInformation =
    let [<Literal>] Version = "0.0.1"