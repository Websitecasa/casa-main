param(
    [Parameter(Mandatory=$true, Position=0)]
    [string]$SourcePath
)

$RepoRoot = Split-Path -Parent $PSScriptRoot
$DestDir = Join-Path $RepoRoot 'public\images'

if (-not (Test-Path $DestDir)) {
    New-Item -ItemType Directory -Path $DestDir -Force | Out-Null
}

$DestPath = Join-Path $DestDir '16.png'

if (-not (Test-Path $SourcePath)) {
    Write-Error "Source file not found: $SourcePath"
    exit 1
}

try {
    Copy-Item -Path $SourcePath -Destination $DestPath -Force
    Write-Host "Copied:`n  $SourcePath`n-> $DestPath"
} catch {
    Write-Error "Failed to copy image: $_"
    exit 1
}
