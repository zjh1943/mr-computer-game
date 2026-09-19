param(
  [string]$FrontDirectory,
  [string]$FrontSheet,
  [string]$RightSheet,
  [string]$BackSheet,
  [string]$OutputDirectory = "assets/sprunki-views"
)

Add-Type -AssemblyName System.Drawing

$frontOrder = @(
  'oren','raddy','clukr','fun-bot','vineria',
  'gray','brud','garnold','owakcx','sky',
  'mr-sun','durple','mr-tree','simon','tunner',
  'mr-fun-computer','wenda','jevin','pinki','black'
)
$sideOrder = @(
  'gray','oren','raddy','clukr','fun-bot',
  'vineria','brud','simon','owakcx','sky',
  'mr-sun','durple','mr-tree','mr-fun-computer','wenda',
  'pinki','jevin','tunner','garnold','black'
)

function Remove-ConnectedBackground([System.Drawing.Bitmap]$bitmap) {
  $visited = New-Object 'bool[,]' $bitmap.Width, $bitmap.Height
  $queue = [System.Collections.Generic.Queue[System.Drawing.Point]]::new()
  for ($x = 0; $x -lt $bitmap.Width; $x++) { $queue.Enqueue([System.Drawing.Point]::new($x, 0)); $queue.Enqueue([System.Drawing.Point]::new($x, $bitmap.Height - 1)) }
  for ($y = 0; $y -lt $bitmap.Height; $y++) { $queue.Enqueue([System.Drawing.Point]::new(0, $y)); $queue.Enqueue([System.Drawing.Point]::new($bitmap.Width - 1, $y)) }
  while ($queue.Count -gt 0) {
    $point = $queue.Dequeue()
    if ($point.X -lt 0 -or $point.Y -lt 0 -or $point.X -ge $bitmap.Width -or $point.Y -ge $bitmap.Height -or $visited[$point.X, $point.Y]) { continue }
    $visited[$point.X, $point.Y] = $true
    $pixel = $bitmap.GetPixel($point.X, $point.Y)
    if ($pixel.R -lt 232 -or $pixel.G -lt 232 -or $pixel.B -lt 232) { continue }
    $bitmap.SetPixel($point.X, $point.Y, [System.Drawing.Color]::Transparent)
    $queue.Enqueue([System.Drawing.Point]::new($point.X - 1, $point.Y))
    $queue.Enqueue([System.Drawing.Point]::new($point.X + 1, $point.Y))
    $queue.Enqueue([System.Drawing.Point]::new($point.X, $point.Y - 1))
    $queue.Enqueue([System.Drawing.Point]::new($point.X, $point.Y + 1))
  }
}

function Save-TrimmedCell([System.Drawing.Bitmap]$source, [System.Drawing.Rectangle]$rect, [string]$path, [bool]$removeWhite) {
  $cell = New-Object System.Drawing.Bitmap $rect.Width, $rect.Height, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($cell)
  $graphics.DrawImage($source, 0, 0, $rect, [System.Drawing.GraphicsUnit]::Pixel)
  $graphics.Dispose()
  if ($removeWhite) { Remove-ConnectedBackground $cell }
  $minX = $cell.Width; $minY = $cell.Height; $maxX = -1; $maxY = -1
  for ($y = 0; $y -lt $cell.Height; $y++) { for ($x = 0; $x -lt $cell.Width; $x++) {
    if ($cell.GetPixel($x, $y).A -gt 10) { $minX=[Math]::Min($minX,$x); $minY=[Math]::Min($minY,$y); $maxX=[Math]::Max($maxX,$x); $maxY=[Math]::Max($maxY,$y) }
  }}
  $pad = 5
  $x0=[Math]::Max(0,$minX-$pad); $y0=[Math]::Max(0,$minY-$pad)
  $x1=[Math]::Min($cell.Width-1,$maxX+$pad); $y1=[Math]::Min($cell.Height-1,$maxY+$pad)
  $trimmed = $cell.Clone([System.Drawing.Rectangle]::new($x0,$y0,$x1-$x0+1,$y1-$y0+1), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $normalized = New-Object System.Drawing.Bitmap 320, 400, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($normalized)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $scale = [Math]::Min(290 / $trimmed.Width, 370 / $trimmed.Height)
  $width = [Math]::Max(1, [Math]::Round($trimmed.Width * $scale))
  $height = [Math]::Max(1, [Math]::Round($trimmed.Height * $scale))
  $left = [Math]::Round((320 - $width) / 2)
  $top = 390 - $height
  $graphics.DrawImage($trimmed, $left, $top, $width, $height)
  $graphics.Dispose()
  $normalized.Save($path,[System.Drawing.Imaging.ImageFormat]::Png)
  $normalized.Dispose(); $trimmed.Dispose(); $cell.Dispose()
}

function Split-RegularSheet([string]$sourcePath, [string]$view, [string[]]$order) {
  $source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $sourcePath))
  $directory = Join-Path $OutputDirectory $view
  [System.IO.Directory]::CreateDirectory((Join-Path (Get-Location) $directory)) | Out-Null
  try {
    for ($i=0; $i -lt 20; $i++) {
      $column=$i%5; $row=[Math]::Floor($i/5)
      $x0=[Math]::Floor($column*$source.Width/5); $x1=[Math]::Floor(($column+1)*$source.Width/5)
      $y0=[Math]::Floor($row*$source.Height/4); $y1=[Math]::Floor(($row+1)*$source.Height/4)
      $y0 += 10; $y1 -= 10
      Save-TrimmedCell $source ([System.Drawing.Rectangle]::new($x0,$y0,$x1-$x0,$y1-$y0)) (Join-Path $directory ($order[$i]+'.png')) $false
    }
  } finally { $source.Dispose() }
}

function Normalize-FrontDirectory([string]$sourceDirectory) {
  $directory = Join-Path $OutputDirectory 'front'
  [System.IO.Directory]::CreateDirectory((Join-Path (Get-Location) $directory)) | Out-Null
  foreach ($id in $frontOrder) {
    $source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath (Join-Path $sourceDirectory ($id + '.png'))))
    try { Save-TrimmedCell $source ([System.Drawing.Rectangle]::new(0,0,$source.Width,$source.Height)) (Join-Path $directory ($id+'.png')) $true }
    finally { $source.Dispose() }
  }
}

function Mirror-View([string]$sourceView, [string]$targetView) {
  $targetDirectory = Join-Path $OutputDirectory $targetView
  [System.IO.Directory]::CreateDirectory((Join-Path (Get-Location) $targetDirectory)) | Out-Null
  foreach ($id in $frontOrder) {
    $source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath (Join-Path (Join-Path $OutputDirectory $sourceView) ($id+'.png'))))
    try { $source.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX); $source.Save((Join-Path $targetDirectory ($id+'.png')),[System.Drawing.Imaging.ImageFormat]::Png) }
    finally { $source.Dispose() }
  }
}

if ($FrontSheet) { Split-RegularSheet $FrontSheet 'front' $frontOrder }
elseif ($FrontDirectory) { Normalize-FrontDirectory $FrontDirectory }
else { throw 'Provide either -FrontSheet or -FrontDirectory.' }
if ($RightSheet) { Split-RegularSheet $RightSheet 'right' $frontOrder; Mirror-View 'right' 'left' }
if ($BackSheet) { Split-RegularSheet $BackSheet 'back' $frontOrder }
Write-Output "Generated 80 normalized front/left/right/back character views in $OutputDirectory"
