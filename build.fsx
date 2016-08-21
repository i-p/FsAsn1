#r @"packages\FAKE\tools\FakeLib.dll"
#r "packages/Suave/lib/net40/Suave.dll"

open System
open Fake.FscHelper
open Fake.ProcessHelper
open Fake
open Fake.Testing.NUnit3


let buildDir = "./build/"


let run workingDir fileName args =
    let fileName, args = "cmd", "/C " + fileName + " " + args
    let ok = ProcessHelper. execProcess (fun info ->
        info.FileName <- fileName
        info.WorkingDirectory <- workingDir
        info.Arguments <- args) TimeSpan.MaxValue
    if not ok then failwithf "Process failed: %s %s (working dir: %s)" fileName args workingDir


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

Target "PrepareNodeEnv" (fun _ ->
    FileUtils.mkdir "build/js"
    FileUtils.cp "src/FsAsn1.Viewer/package.json" "build/js"
    run "./build/js" "npm" "install"
)

Target "BuildJS" (fun _ ->  
    run "./build/js" "node"
        @"node_modules\fable-compiler\index.js ..\..\src\FsAsn1\FsAsn1.fsproj --outDir ..\..\build\js --plugins ..\..\build\Fable.Plugins.Test.dll"
)

Target "BuildTestsJS" (fun _ ->
    run "./build/js" "node"
        (@"node_modules\fable-compiler\index.js "
        + @"..\..\tests\FsAsn1.Tests\FsAsn1.Tests.fsproj "
        + @"--outDir ..\..\build\js "
        + @"--plugins ..\..\build\Fable.Plugins.Test.dll ..\..\build\js\node_modules\fable-plugins-nunit\Fable.Plugins.NUnit.dll "
        + @"--refs FsAsn1=. "
        + @"--symbols FABLE")
)

Target "Babel" (fun _ ->
    run "./build/js" "node" 
        (@"node_modules\babel-cli\bin\babel.js " +
         @"..\..\src\FsAsn1.Viewer\fparsec.es6.js " +
         @"-o fparsec.js " +
         @"--plugins ..\..\build\js\node_modules\babel-plugin-transform-es2015-modules-umd")
)

Target "RunTestsJS" (fun _ ->
    run "./build/js" "node"
        @"node_modules\mocha\bin\mocha fparsec.js ParserTests.js FParsecTests.js"
)

Target "BuildViewerJS" (fun _ ->  
    run "./build/js" "node"
        (@"node_modules\fable-compiler\index.js " +
         @"..\..\src\FsAsn1.Viewer\FsAsn1.Viewer.fsproj " +
         @"--outDir ..\..\build\js " +
         @"--plugins ..\..\build\Fable.Plugins.Test.dll " +
         @"--refs FsAsn1=.")
)

Target "FablePlugin" (fun _ ->
    ["src/FsAsn1.Viewer/Fable.Plugins.Test.fsx"]
    |> Compile [
        FscHelper.Target FscHelper.TargetType.Library
        Out "./build/Fable.Plugins.Test.dll"
    ]
)



open Suave
open Suave.Operators

Target "WebServer" (fun _ ->
    let app : WebPart =
  
        choose [
            Filters.GET >=> choose [ 
                Filters.path "/" >=> Files.browseFileHome "src/FsAsn1.Viewer/index.html";
                Filters.path "/rfc5280.txt" >=> Files.browseFileHome "tests/FsAsn1.Tests/Data/rfc5280.txt";
                Files.browseHome ]
            RequestErrors.NOT_FOUND "Page not found." ]

    startWebServer { 
        defaultConfig with 
            homeFolder = Some @"C:\dev\FsAsn1"
            logger = Suave.Logging.Loggers.ConsoleWindowLogger(Logging.LogLevel.Debug)
        } app    
)

Target "All" DoNothing

"Clean" 
    ==> "Build"
    ==> "RunTests"
    ==> "All"

"PrepareNodeEnv" 
    ==> "FablePlugin" 
    ==> "BuildJS"

"BuildJS" ==> "BuildTestsJS"
"BuildTestsJS" ==> "RunTestsJS"
"Babel" ==> "RunTestsJS"

"BuildJS" ==> "BuildViewerJS"

RunTargetOrDefault "All"