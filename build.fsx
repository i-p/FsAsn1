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
#r @"../../build/FsAsn1.dll"
#r @"../../build/FsAsn1.TypeProvider.dll"
"""
    //TODO restore previous content
    System.IO.File.WriteAllText("tests/FsAsn1.Tests/load-tp-assemblies.fsx", tpAssemblies) 

    let printMessage = fun msg -> if msg.IsError then traceError msg.Message else trace msg.Message
    let success = 
        !! "tests/FsAsn1.Tests/Script1.fsx"
        |> Seq.map (fun f -> 
            let success, messages = executeFSI "./" f Seq.empty 
        
            messages |> Seq.iter printMessage
            success)
        |> Seq.forall id
    
    if not success then failwithf "Type provider tests failed" else ()
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
    let homeDir = Environment.CurrentDirectory
    let dataDir = System.IO.Path.Combine(homeDir, "tests\FsAsn1.Tests\Data")
    let app : WebPart =
  
        choose [            
            Filters.GET >=> choose [ 
                Filters.path "/asn1-viewer/" >=> Files.browseFileHome "src/FsAsn1.Viewer/index.html";
                Filters.pathScan "/asn1-viewer/Data/%s" 
                    (fun c -> Writers.setMimeType("application/octet-stream") 
                                >=> Files.sendFile (Files.resolvePath dataDir c) false);                
                Filters.path "/asn1-viewer/bundle.js" >=> Files.browseFileHome "build/js/public/bundle.js" ]
            RequestErrors.NOT_FOUND "Page not found." ]

    let mimeTypes =
        Writers.defaultMimeTypesMap
        @@ (function | ".cer" -> Writers.createMimeType "application/octet-stream" false | _ -> None)

    startWebServer { 
        defaultConfig with 
            homeFolder = Some homeDir
            mimeTypesMap = mimeTypes
            logger = Suave.Logging.Targets.create Logging.LogLevel.Debug [||]
        } app    
)

Target "DevRunTestsJS" (fun _ ->
    "BuildJS" ==> "BuildTestsJS" ==> "BundleTestsJS" ==> "RunTestsJS" |> ignore

    Run "RunTestsJS"    
)

Target "DevViewerJS" (fun _ ->
    "BuildViewerJS" ==> "BundleViewerJS" |> ignore

    Run "BundleViewerJS"    
)

Target "All" (fun _ ->
    "PrepareNodeEnv"
        ==> "Build"
        ==> "FablePlugin"
        ==> "BuildJS"
        ==> "BuildViewerJS"
        ==> "BundleViewerJS"
        ==> "BuildTestsJS"
        ==> "BundleTestsJS"
        ==> "RunTests"
        ==> "RunTPTests"
        ==> "RunTestsJS"
        |> ignore

    Run "RunTestsJS"
)

RunTargetOrDefault "All"