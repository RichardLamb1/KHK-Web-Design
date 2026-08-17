<#
.SYNOPSIS
    Reorders the member entries in js/members-data.js back into alphabetical
    order (by id, which is always a "last-first" slug) so the raw file is easy
    to skim/scan.

.DESCRIPTION
    You do NOT need to run this for the site to work correctly -
    js/members-engine.js already sorts members alphabetically when it builds
    members-templated.html, no matter what order they're listed in this file.
    This script is only for keeping the raw file itself tidy after you've
    pasted new entries in without hunting for the "right" spot.

    Safe by design: every member entry is treated as an opaque block of text
    (matching { ... } braces, aware of quoted strings) that just gets moved
    around - nothing inside any entry is ever rewritten or reformatted, so
    nothing you've hand-edited can be lost or altered. A backup of the file
    (members-data.js.bak) is written before any changes are saved.
#>

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$dataFile = Join-Path $repoRoot "js\members-data.js"

if (-not (Test-Path -LiteralPath $dataFile)) {
    Write-Error "Could not find $dataFile"
    exit 1
}

$text = Get-Content -Raw -LiteralPath $dataFile

$arrayStartMarker = "window.KHK_MEMBERS_DATA = ["
$startIdx = $text.IndexOf($arrayStartMarker)
if ($startIdx -lt 0) {
    Write-Error "Could not find 'window.KHK_MEMBERS_DATA = [' in $dataFile - aborting without changes."
    exit 1
}
$bodyStart = $startIdx + $arrayStartMarker.Length

$arrayEndMarker = "];"
$endIdx = $text.LastIndexOf($arrayEndMarker)
if ($endIdx -lt $bodyStart) {
    Write-Error "Could not find the closing '];' after the member list in $dataFile - aborting without changes."
    exit 1
}

$prefix = $text.Substring(0, $bodyStart)
$body = $text.Substring($bodyStart, $endIdx - $bodyStart)
$suffix = $text.Substring($endIdx)

# --- Scan $body for top-level { ... } entry blocks, skipping over anything
#     inside quoted strings so a brace in someone's blurb can't confuse it ---
$blockStarts = New-Object System.Collections.Generic.List[int]
$blockEnds = New-Object System.Collections.Generic.List[int]

$depth = 0
$inString = $false
$stringChar = [char]0
$escaped = $false
$blockStart = -1

for ($i = 0; $i -lt $body.Length; $i++) {
    $c = $body[$i]

    if ($inString) {
        if ($escaped) {
            $escaped = $false
        } elseif ($c -eq '\') {
            $escaped = $true
        } elseif ($c -eq $stringChar) {
            $inString = $false
        }
        continue
    }

    if ($c -eq '"' -or $c -eq "'") {
        $inString = $true
        $stringChar = $c
        continue
    }

    if ($c -eq '{') {
        if ($depth -eq 0) { $blockStart = $i }
        $depth++
    } elseif ($c -eq '}') {
        $depth--
        if ($depth -eq 0) {
            $blockStarts.Add($blockStart)
            $blockEnds.Add($i)
        } elseif ($depth -lt 0) {
            Write-Error "Found an unmatched closing brace while scanning $dataFile - aborting without changes."
            exit 1
        }
    }
}

if ($depth -ne 0) {
    Write-Error "Braces don't balance in $dataFile (ended at depth $depth) - aborting without changes."
    exit 1
}

if ($blockStarts.Count -eq 0) {
    Write-Error "Found no member entries in $dataFile - aborting without changes."
    exit 1
}

# Capture the exact separator text between the first two entries (comma,
# newline, indentation) so the file's existing formatting style is preserved
# when entries are rejoined in the new order.
$separator = ",`r`n    "
if ($blockStarts.Count -gt 1) {
    $sepStart = $blockEnds[0] + 1
    $sepEnd = $blockStarts[1]
    $separator = $body.Substring($sepStart, $sepEnd - $sepStart)
}

$entries = New-Object System.Collections.Generic.List[psobject]
for ($j = 0; $j -lt $blockStarts.Count; $j++) {
    $blockText = $body.Substring($blockStarts[$j], $blockEnds[$j] - $blockStarts[$j] + 1)
    $idMatch = [regex]::Match($blockText, 'id:\s*"([^"]*)"')
    if (-not $idMatch.Success) {
        $preview = $blockText.Substring(0, [Math]::Min(80, $blockText.Length))
        Write-Error "An entry is missing a simple quoted id field - aborting without changes. It starts with: $preview"
        exit 1
    }
    $entries.Add([PSCustomObject]@{ Id = $idMatch.Groups[1].Value; Text = $blockText })
}

$originalOrder = ($entries | ForEach-Object { $_.Id }) -join ","
$sorted = $entries | Sort-Object -Property Id
$sortedOrder = ($sorted | ForEach-Object { $_.Id }) -join ","

if ($originalOrder -eq $sortedOrder) {
    Write-Host "Already in alphabetical order - no changes needed. ($($entries.Count) members)"
    exit 0
}

$leadIn = $body.Substring(0, $blockStarts[0])
$trailOut = $body.Substring($blockEnds[$blockEnds.Count - 1] + 1)
$newBody = $leadIn + (($sorted | ForEach-Object { $_.Text }) -join $separator) + $trailOut

if ($newBody.Length -ne $body.Length) {
    Write-Error "Safety check failed: reordered content isn't the same length as the original - aborting without touching the file, to avoid corrupting it."
    exit 1
}

$backupPath = "$dataFile.bak"
Copy-Item -LiteralPath $dataFile -Destination $backupPath -Force

$newText = $prefix + $newBody + $suffix
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($dataFile, $newText, $utf8NoBom)

Write-Host "Sorted $($entries.Count) members back into alphabetical order."
Write-Host "A backup of the previous version was saved to: $backupPath"
