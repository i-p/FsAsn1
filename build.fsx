#r @"packages\FAKE\tools\FakeLib.dll"

open System
open Fake.FscHelper
open Fake.ProcessHelper
open Fake
open Fake.Testing.NUnit3


let buildDir = "./build/"

Target "Clean" (fun _ ->
    CleanDir buildDir
)

Target "Build" (fun _ ->
    !! "FsAsn1.sln"
    |> MSBuildRelease buildDir "Rebuild"
    |> ignore
)

Target "RunTests" (fun _ ->
    !! (buildDir @@ "FsAsn1.Tests.dll")
    |> NUnit3 (fun p -> 
        { p with
            TimeOut = TimeSpan.FromMinutes 5. })
)

Target "RunTPTests" (fun _ ->

    let tpAssemblies = """
#I __SOURCE_DIRECTORY__
#r @"..\..\src\FsAsn1.TypeProvider\bin\Release\FsAsn1.dll"
#r @"..\..\src\FsAsn1.TypeProvider\bin\Release\FsAsn1.TypeProvider.dll"
"""
    //TODO restore previous content
    System.IO.File.WriteAllText("tests/FsAsn1.Tests/load-tp-assemblies.fsx", tpAssemblies) 

    !! "tests/FsAsn1.Tests/Script1.fsx"
    |> Seq.iter (fun f -> executeFSI "./" f Seq.empty |> snd |> Seq.iter (fun msg -> if msg.IsError then traceError msg.Message else trace msg.Message))
)


Target "All" DoNothing

"Clean" 
    ==> "Build"
    ==> "RunTests"
    ==> "All"

RunTargetOrDefault "All"