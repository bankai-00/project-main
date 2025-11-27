# Deploy to GitHub & GitHub Pages (PowerShell commands)

This project has been prepared for GitHub and GitHub Pages. Follow the steps below from your local machine to create a public repository and publish the site.

---

## 1) Install required CLIs (if not already installed)

Recommended (Windows, PowerShell):
```powershell
winget install --id Git.Git -e --source winget
winget install --id GitHub.cli -e --source winget
```
If `winget` is not available, download installers:
- Git: https://git-scm.com/download/win
- GitHub CLI: https://github.com/cli/cli#installation

## 2) Initialize the repo, commit files

Open PowerShell and run:
```powershell
cd "c:\vs code\web pro"
# Initialize git and create initial commit
git init
git add .
git commit -m "Initial commit: offline neon PortfolioHub demo"
```

## 3A) Create remote repo with GitHub CLI (recommended)

Run:
```powershell
# Interactive authentication (follow prompts)
gh auth login

# Create a public repository and push current branch (main)
gh repo create <YOUR_GITHUB_USERNAME>/PortfolioHub-demo --public --source=. --remote=origin --push
```
Replace `<YOUR_GITHUB_USERNAME>` with your GitHub username. After `gh repo create` the remote `origin` will be set and the local branch pushed.

## 3B) OR create repo via GitHub web UI

- Go to https://github.com/new
- Enter repository name (e.g. `PortfolioHub-demo`) and set it to Public
- Do NOT initialize with README (you already have files)
- Create repository

Then run locally:
```powershell
# Replace URL below with the HTTPS URL shown on GitHub
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/PortfolioHub-demo.git
git branch -M main
git push -u origin main
```

## 4) Enable GitHub Pages (project site)

Option A — Use the GitHub web UI (easiest):
- On GitHub repo page → Settings → Pages
- Under "Build and deployment" choose "Deploy from a branch"
- Choose `main` branch and `/ (root)` folder
- Save. Page will publish; note the URL shown (usually https://<username>.github.io/<repo>)

Option B — Use GitHub CLI API (advanced):
```powershell
# Example (requires gh auth login earlier)
# Replace OWNER and REPO below
$owner = "<YOUR_GITHUB_USERNAME>"
$repo = "PortfolioHub-demo"
$body = '{"source": {"branch":"main","path":"/"}}'
gh api -X POST /repos/$owner/$repo/pages -H "Accept: application/vnd.github+json" -f source="$body"
```
Note: Using the API requires the `gh` CLI to be authenticated and may require additional permissions.

## 5) Check your site

After enabling Pages, your published URL will be one of:
- `https://<YOUR_GITHUB_USERNAME>.github.io/PortfolioHub-demo/`

It may take a minute to publish. If you updated `index.html` at the repo root you should see the offline demo.

---

If you want, I can generate the exact commands with your GitHub username filled in — tell me the username and whether you want the repo named `PortfolioHub-demo` or another name.
