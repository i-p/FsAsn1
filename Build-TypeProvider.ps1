function Set-UniqueAssemblyName {
    param($projectName)

    $proj = Get-Project $projectName
    $prop = $proj.Properties.Item("AssemblyName")
    $originalAssemblyName = $prop.Value
    $newAssemblyName = $prop.Value + "_" + (date -Format "yyyyMMddHHmmss")

    $prop.Value = $newAssemblyName

    [pscustomobject]@{
        NewName = $newAssemblyName;
        OldName = $originalAssemblyName;
        Project = $proj
    }
}

# TODO extract output path from
# $cm.ActiveConfiguration.Properties.Item("OutputPath").Value
function Build-TypeProvider {
    $projects = "FsAsn1", "FsAsn1.TypeProvider"

    $assemblyChanges = $projects | % { Set-UniqueAssemblyName $_ }

    $references = ($assemblyChanges | %{ "#r @`"..\..\src\FsAsn1.TypeProvider\bin\Debug\$($_.NewName).dll`"" }) -join "`n"

    $DTE.Solution.Projects `
    | % projectitems `
    | ? name -eq "load-tp-assemblies.fsx" `
    | % FileNames(0) `
    | % {[System.IO.File]::WriteAllText($_, "#I __SOURCE_DIRECTORY__`n$references")}


    $c = (Get-Project "FsAsn1.TypeProvider").ConfigurationManager.ActiveConfiguration
    $originalValue = $c.Properties.Item("DefineConstants").Value
    $c.Properties.Item("DefineConstants").Value = $originalValue + ";TYPE_PROVIDER_ASSEMBLY"

    $waitForBuildToFinish = $true
    $DTE.Solution.SolutionBuild.Build($waitForBuildToFinish)


    $c.Properties.Item("DefineConstants").Value = $originalValue

    $assemblyChanges | % { $_.Project.Properties.Item("AssemblyName").Value = $_.OldName }
}

Build-TypeProvider
