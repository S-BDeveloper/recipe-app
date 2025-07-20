$files = Get-ChildItem -Path .\src\components\ -Recurse -Include *.ts,*.tsx
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $content = $content -replace '(from\s+["'']\.\.\/contexts\/useAuth)\.js(["''])', '$1$2'
    $content = $content -replace '(from\s+["'']\.\/ui\/OptimizedImage)\.jsx(["''])', '$1$2'
    $content = $content -replace '(from\s+["'']\.\/LoadingSpinner)\.jsx(["''])', '$1$2'
    Set-Content $file.FullName $content
}
Write-Host "✅ Imports fixed."