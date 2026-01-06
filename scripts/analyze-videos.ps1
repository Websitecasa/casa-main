# Simple Video Information Script
# This script analyzes your video files and provides compression recommendations

param(
    [string]$Format = 'all'
)

$videoDir = ".\public\videos"

Write-Host "Video Analysis Tool" -ForegroundColor Green
Write-Host "==================`n" -ForegroundColor Green

# Get video files
$videos = Get-ChildItem -Path $videoDir -Filter "*.mp4" -ErrorAction SilentlyContinue

if ($videos.Count -eq 0) {
    Write-Host "No MP4 videos found in $videoDir" -ForegroundColor Yellow
    exit 0
}

Write-Host "Found $($videos.Count) video(s):`n" -ForegroundColor Cyan

$totalSize = 0

foreach ($video in $videos) {
    $sizeInMB = [math]::Round($video.Length / 1MB, 2)
    $totalSize += $sizeInMB
    Write-Host "  - $($video.Name): $sizeInMB MB" -ForegroundColor White
}

Write-Host "`nTotal video size: $([math]::Round($totalSize, 2)) MB" -ForegroundColor Yellow

Write-Host "`n[COMPRESSION OPTIONS]`n" -ForegroundColor Cyan

Write-Host "Since FFmpeg is not installed, use one of these online tools:`n" -ForegroundColor Yellow

Write-Host "1. CloudConvert (Free, up to 25 conversions/day)" -ForegroundColor Green
Write-Host "   - Visit: https://cloudconvert.com/mp4-to-mp4" -ForegroundColor White
Write-Host "   - Upload your MP4 files" -ForegroundColor White
Write-Host "   - Set quality to medium/high for best results" -ForegroundColor White
Write-Host "   - Download compressed files`n" -ForegroundColor White

Write-Host "2. Compressor.io (Free)" -ForegroundColor Green
Write-Host "   - Visit: https://compressor.io/" -ForegroundColor White
Write-Host "   - Lossy compression (good for web)" -ForegroundColor White
Write-Host "   - Upload and download`n" -ForegroundColor White

Write-Host "3. HandBrake (Desktop App - Free, Open Source)" -ForegroundColor Green
Write-Host "   - Download: https://handbrake.fr/" -ForegroundColor White
Write-Host "   - Install and use GUI to compress`n" -ForegroundColor White

Write-Host "4. VidCo.ai (Free)" -ForegroundColor Green
Write-Host "   - Visit: https://vidco.ai/" -ForegroundColor White
Write-Host "   - Simple drag-and-drop compression`n" -ForegroundColor White

Write-Host "[RECOMMENDED SETTINGS]" -ForegroundColor Yellow
Write-Host "- Format: MP4" -ForegroundColor White
Write-Host "- Codec: H.264" -ForegroundColor White
Write-Host "- Quality: Medium-High (target 40-50% size reduction)" -ForegroundColor White
Write-Host "- Audio Bitrate: 128 kbps" -ForegroundColor White
