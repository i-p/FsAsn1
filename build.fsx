#r "packages/FAKE/tools/FakeLib.dll"
#r "packages/Suave/lib/net40/Suave.dll"

open System
open Fake.FscHelper
open Fake.ProcessHelper
open Fake
open Fake.Testing.NUnit3


let buildDir = "./build/"


let run workingDir fileName args =
    let fileName, args = "cmd", "/C " + fileName + " " + args
    let ok = ProcessHelper.execProcess (fun info ->
        info.FileName <- fileName
        info.WorkingDirectory <- workingDir
        info.Arguments <- args) TimeSpan.MaxValue
    if not ok then failwithf "Process failed: %s %s (working dir: %s)" fileName args workingDir


Target "Clean" (fun _ ->
    CleanDir buildDir
)


Target "PrepareNodeEnv" (fun _ ->
    FileUtils.mkdir "build/js"
    FileUtils.cp "src/FsAsn1.Viewer/package.json" "build/js"
    FileUtils.cp "src/FsAsn1.Viewer/fparsec.es6.js" "build/js/fparsec.js"
    FileUtils.cp "src/FsAsn1.Viewer/webpack.config.js" "build/js"
    FileUtils.cp "src/FsAsn1.Viewer/webpack.config.test.js" "build/js"

    run "./build/js" "npm" "install"
)

// PrepareNodeEnv must be run before this target because Fable.Core is referenced 
// from npm module fable-core.
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
#r @"../../src/FsAsn1.TypeProvider/bin/Release/FsAsn1.dll"
#r @"../../src/FsAsn1.TypeProvider/bin/Release/FsAsn1.TypeProvider.dll"
"""
    //TODO restore previous content
    System.IO.File.WriteAllText("tests/FsAsn1.Tests/load-tp-assemblies.fsx", tpAssemblies) 

    !! "tests/FsAsn1.Tests/Script1.fsx"
    |> Seq.iter (fun f -> executeFSI "./" f Seq.empty |> snd |> Seq.iter (fun msg -> if msg.IsError then traceError msg.Message else trace msg.Message))
)

Target "FablePlugin" (fun _ ->
    ["src/FsAsn1.Viewer/Fable.Plugins.Test.fsx"]
    |> Compile [
        FscHelper.Target FscHelper.TargetType.Library
        Out "./build/Fable.Plugins.Test.dll"
    ]
)

Target "BuildJS" (fun _ ->  
    run "./build/js" "node"
        @"node_modules/fable-compiler/index.js ../../src/FsAsn1/FsAsn1.Fable.fsproj --outDir ../../build/js --plugins ../../build/Fable.Plugins.Test.dll --verbose --dll --module commonjs --coreLib fable-core" 
)

Target "BuildTestsJS" (fun _ -> 
    run "./build/js" "node"
        (@"node_modules/fable-compiler/index.js "
        + @"../../tests/FsAsn1.Tests/FsAsn1.Tests.Fable.fsproj "
        + @"--outDir ../../build/js "
        + @"--plugins ../../build/Fable.Plugins.Test.dll ../../build/js/node_modules/fable-plugins-nunit/Fable.Plugins.NUnit.dll "        
        + @"--symbols FABLE --module commonjs --coreLib fable-core")
)

Target "BundleTestsJS" (fun _ ->
    run "./build/js" "node"
        @"node_modules/webpack/bin/webpack.js --config webpack.config.test.js"
)

Target "RunTestsJS" (fun _ ->
    run "./build/js" "node"
        @"node_modules/mocha/bin/mocha tests.bundle.js"
)

Target "BuildViewerJS" (fun _ ->  
    run "./build/js" "node"
        (@"node_modules/fable-compiler/index.js " +
         @"../../src/FsAsn1.Viewer/FsAsn1.Viewer.Fable.fsproj " +
         @"--outDir ../../build/js " +
         @"--plugins ../../build/Fable.Plugins.Test.dll " +
         @"--verbose --module commonjs --coreLib fable-core")
)

Target "BundleViewerJS" (fun _ ->
    run "./build/js" "node"
        @"node_modules/webpack/bin/webpack.js --config webpack.config.js"
)





open Suave
open Suave.Operators

Target "WebServer" (fun _ ->
    let app : WebPart =
  
        choose [
            Filters.GET >=> choose [ 
                Filters.path "/" >=> Files.browseFileHome "src/FsAsn1.Viewer/index.html";
                Filters.pathScan "/Data/%s" (fun c -> Writers.setMimeType("application/octet-stream") >=> Files.sendFile (Files.resolvePath @"C:\dev\FsAsn1\tests\FsAsn1.Tests\Data" c) false);                
                Files.browseHome ]
            RequestErrors.NOT_FOUND "Page not found." ]

    let mimeTypes =
        Writers.defaultMimeTypesMap
        @@ (function | ".cer" -> Writers.mkMimeType "application/octet-stream" false | _ -> None)

    startWebServer { 
        defaultConfig with 
            homeFolder = Some @"C:\dev\FsAsn1"
            mimeTypesMap = mimeTypes
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

"BuildJS" ==> "BuildViewerJS"

RunTargetOrDefault "All"