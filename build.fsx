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
    !! (buildDir @@ "FsAsn1.*.dll")
    |> NUnit3 (fun p -> 
        { p with
            TimeOut = TimeSpan.FromMinutes 5. })
)

Target "All" DoNothing

"Clean" 
    ==> "Build"
    ==> "RunTests"
    ==> "All"

RunTargetOrDefault "All"