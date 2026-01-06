# Video Compression Script
# Requires: FFmpeg installed on system
# Usage: .\compress-videos.ps1 -Quality medium

param(
    [ValidateSet('low', 'medium', 'high')]
    [string]$Quality = 'medium',
    
    [ValidateSet('mp4', 'webm', 'both')]
    [string]$Format = 'both',
    
    [switch]$Backup
)

$videoDir = ".\public\videos"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

# Quality settings
$qualityMap = @{
    'high'   = @{ crf = '23'; preset = 'slow' }
    'medium' = @{ crf = '26'; preset = 'medium' }
    'low'    = @{ crf = '30'; preset = 'fast' }
}

$settings = $qualityMap[$Quality]

Write-Host "Starting video compression..." -ForegroundColor Green
Write-Host "Quality: $Quality | Format: $Format" -ForegroundColor Cyan

# Check if FFmpeg is installed
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: FFmpeg is not installed. Install from https://ffmpeg.org" -ForegroundColor Red
    exit 1
}

# Get video files
$videos = Get-ChildItem -Path $videoDir -Filter "*.mp4" -ErrorAction SilentlyContinue

if ($videos.Count -eq 0) {
    Write-Host "No MP4 videos found in $videoDir" -ForegroundColor Yellow
    exit 0
}

foreach ($video in $videos) {
    $inputFile = $video.FullName
    $baseName = $video.BaseName
    
    # Create backup if requested
    if ($Backup) {
        $backupDir = "$videoDir\backups"
        if (-not (Test-Path $backupDir)) { New-Item -ItemType Directory -Path $backupDir | Out-Null }
        Copy-Item -Path $inputFile -Destination "$backupDir\$($video.Name)_backup_$timestamp" -Force
        Write-Host "Backed up: $($video.Name)" -ForegroundColor Cyan
    }
    
    # Compress as MP4
    if ($Format -in 'mp4', 'both') {
        $outputMp4 = "$videoDir\${baseName}_compressed.mp4"
        Write-Host "Compressing to MP4: $($video.Name)..." -ForegroundColor Yellow
        
        & ffmpeg -i $inputFile `
            -c:v libx264 `
            -preset $settings.preset `
            -crf $settings.crf `
            -c:a aac `
            -b:a 128k `
            -y `
            $outputMp4
        
        if ($LASTEXITCODE -eq 0) {
            $originalSize = (Get-Item $inputFile).Length / 1MB
            $compressedSize = (Get-Item $outputMp4).Length / 1MB
            $reduction = [math]::Round((1 - ($compressedSize / $originalSize)) * 100, 1)
            Write-Host "[OK] MP4 Complete: $([Math]::Round($originalSize, 2))MB -> $([Math]::Round($compressedSize, 2))MB (reduced by $reduction%)" -ForegroundColor Green
        }
        else {
            Write-Host "[FAIL] MP4 compression failed for $($video.Name)" -ForegroundColor Red
        }
    }
    
    # Compress as WebM
    if ($Format -in 'webm', 'both') {
        $outputWebm = "$videoDir\${baseName}.webm"
        Write-Host "Compressing to WebM: $($video.Name)..." -ForegroundColor Yellow
        
        & ffmpeg -i $inputFile `
            -c:v libvpx-vp9 `
            -crf 30 `
            -c:a libopus `
            -b:a 96k `
            -y `
            $outputWebm
        
        if ($LASTEXITCODE -eq 0) {
            $compressedSize = (Get-Item $outputWebm).Length / 1MB
            Write-Host "[OK] WebM Complete: $([Math]::Round($compressedSize, 2))MB" -ForegroundColor Green
        }
        else {
            Write-Host "[FAIL] WebM compression failed for $($video.Name)" -ForegroundColor Red
        }
    }
}

Write-Host "`nCompression complete!" -ForegroundColor Green
Write-Host "Check the output files and replace originals if satisfied." -ForegroundColor Cyan

