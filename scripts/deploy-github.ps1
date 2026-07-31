$ErrorActionPreference = "Stop"
Set-Location (Split-Path $PSScriptRoot -Parent)

$repoName = "ai-atlas"

gh auth status | Out-Null
if ($LASTEXITCODE -ne 0) {
  Write-Host "请先登录 GitHub：gh auth login --web --git-protocol https"
  exit 1
}

$owner = (gh api user -q .login)
Write-Host "GitHub 用户: $owner"

if (-not (git remote get-url origin 2>$null)) {
  gh repo create $repoName --public --source=. --remote=origin --description "AI市场 · AI ATLAS — 个人 AI 产品学习地图"
}

git push -u origin main

$pagesBody = '{"build_type":"legacy","source":{"branch":"main","path":"/"}}'
$pagesBody | gh api -X POST "/repos/$owner/$repoName/pages" --input - | Out-Null

Write-Host ""
Write-Host "部署完成。GitHub Pages 地址（约 1–2 分钟后生效）："
Write-Host "https://$owner.github.io/$repoName/"
