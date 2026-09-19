param(
  [Parameter(Mandatory = $true)]
  [string]$SourcePath,
  [string]$OutputDirectory = "assets/sprunki-2d"
)

Add-Type -AssemblyName System.Drawing

$source = [System.Drawing.Bitmap]::FromFile((Resolve-Path -LiteralPath $SourcePath))
$output = Join-Path (Get-Location) $OutputDirectory
[System.IO.Directory]::CreateDirectory($output) | Out-Null

$ids = @(
  'oren', 'raddy', 'clukr', 'fun-bot', 'vineria',
  'gray', 'brud', 'garnold', 'owakcx', 'sky',
  'mr-sun', 'durple', 'mr-tree', 'simon', 'tunner',
  'mr-fun-computer', 'wenda', 'jevin', 'pinki', 'black'
)

try {
  for ($index = 0; $index -lt $ids.Count; $index++) {
    $column = $index % 5
    $row = [Math]::Floor($index / 5)
    $left = [Math]::Floor($column * $source.Width / 5)
    $top = [Math]::Floor($row * $source.Height / 4)
    $right = [Math]::Floor(($column + 1) * $source.Width / 5)
    $bottom = [Math]::Floor(($row + 1) * $source.Height / 4)
    $cell = New-Object System.Drawing.Bitmap ($right - $left), ($bottom - $top), ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($cell)
    $graphics.DrawImage($source, 0, 0, [System.Drawing.Rectangle]::new($left, $top, $right - $left, $bottom - $top), [System.Drawing.GraphicsUnit]::Pixel)
    $graphics.Dispose()

    $minX = $cell.Width
    $minY = $cell.Height
    $maxX = -1
    $maxY = -1
    for ($y = 0; $y -lt $cell.Height; $y++) {
      for ($x = 0; $x -lt $cell.Width; $x++) {
        $pixel = $cell.GetPixel($x, $y)
        $brightness = [Math]::Min($pixel.R, [Math]::Min($pixel.G, $pixel.B))
        $edgeNoise = $x -lt 13 -or $x -ge ($cell.Width - 13) -or $y -lt 7
        if ($brightness -ge 246 -or $edgeNoise) {
          $cell.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
        } else {
          $minX = [Math]::Min($minX, $x)
          $minY = [Math]::Min($minY, $y)
          $maxX = [Math]::Max($maxX, $x)
          $maxY = [Math]::Max($maxY, $y)
        }
      }
    }

    $padding = 4
    $cropX = [Math]::Max(0, $minX - $padding)
    $cropY = [Math]::Max(0, $minY - $padding)
    $cropRight = [Math]::Min($cell.Width - 1, $maxX + $padding)
    $cropBottom = [Math]::Min($cell.Height - 1, $maxY + $padding)
    $crop = $cell.Clone([System.Drawing.Rectangle]::new($cropX, $cropY, $cropRight - $cropX + 1, $cropBottom - $cropY + 1), [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $path = Join-Path $output ($ids[$index] + '.png')
    $crop.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $crop.Dispose()
    $cell.Dispose()
  }
} finally {
  $source.Dispose()
}

Write-Output "Generated $($ids.Count) transparent 2D character sprites in $OutputDirectory"
