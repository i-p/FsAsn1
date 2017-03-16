[<NUnit.Framework.TestFixture>]
module FsAsn1.Tests.FParsecTests

open NUnit.Framework
open FParsec
open FsAsn1.Tests.Utils

let choice = FsAsn1.SchemaParser.choice

[<Test>]
let ``pstring works``() =
    "a" |> shouldParseAs (pstring "a") "a"

[<Test>]
let ``pint32 works``() =
    "123" |> shouldParseAs (pint32) 123

[<Test>]
let ``.>>. works``() =
    "ab" |> shouldParseAs (pstring "a" .>>. pstring "b") ("a","b")

//TODO minus sign
[<Test>]
let ``numberLiteral works``() =
    "123" 
    |> shouldParseAs 
        (numberLiteral NumberLiteralOptions.AllowMinusSign "signedNumber" |>> fun nl -> nl.String) "123"

[<Test>]
let ``skipNewline works with \n`` () =
    "\n" |> shouldParseAs skipNewline ()

[<Test>]
let ``skipNewline works with \r\n`` () =
    "\r\n" |> shouldParseAs skipNewline ()

[<Test>]
let ``skipNewline works with \r`` () =
    "\r" |> shouldParseAs skipNewline ()

[<Test>]
let ``spaces works`` () =
    "    \t    \t   \n\r  \r \n \n" 
    |> shouldParseAs spaces ()

[<Test>]
let ``getPosition works`` () =
    "a\nb" |> shouldPartiallyParseAs (getPosition |>> toIndexLineColumn)  (0, 1, 1)

[<Test>]
let ``getPosition works after a character is read`` () =
    "a\nb" |> shouldPartiallyParseAs (pstring "a" >>. getPosition |>> toIndexLineColumn) (1, 1, 2)

[<Test>]
let ``getPosition works after a line is read`` () =
    "a\nb" |> shouldPartiallyParseAs (pstring "a" >>. newline >>. getPosition |>> toIndexLineColumn) (2, 2, 1)

[<Test>]
let ``choice works - first alternative`` () =
    "a" |> shouldParseAs (choice [|pstring "a"; pstring "b"|]) "a"

[<Test>]
let ``choice works - second alternative`` () =
    "b" |> shouldParseAs (choice [|pstring "a"; pstring "b"|]) "b"

[< Test>]
let ``sepBy works`` ()=
    "a,a, a" |> shouldParseAs (sepBy (pstring "a" ) (pstring "," .>> spaces)) ["a"; "a"; "a"]
