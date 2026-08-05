#!/bin/bash
# Deploy AgentDev site + static subpages (wallet, verify) to gh-pages.
# Usage: ./deploy.sh   (working tree must be clean)
set -e
cd "$(dirname "$0")"

WALLET_SRC="$HOME/Documents/ecomwin/qr-card-wallet-site"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

# 0) Require a clean working tree (avoids checkout aborts)
if [ -n "$(git status --porcelain)" ]; then
  echo "ERROR: working tree not clean. Commit or stash changes first."
  exit 1
fi

echo "==> Building site (on main)..."
npm run build

echo "==> Injecting static subpages into dist..."
rm -rf dist/wallet dist/verify
cp -r "$WALLET_SRC/wallet" dist/wallet
cp -r "$WALLET_SRC/verify" dist/verify

echo "==> Staging build output..."
cp -r dist/. "$TMP/"

echo "==> Syncing gh-pages branch (CNAME preserved)..."
git fetch origin gh-pages -q
git checkout -B deploy origin/gh-pages -q
find . -maxdepth 1 ! -name . ! -name .git ! -name CNAME -exec rm -rf {} +
cp -r "$TMP/." .
git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy."
else
  git -c user.name="Jackfromreallife" -c user.email="jackisforevernot@gmail.com" commit -m "Deploy: site + wallet/verify subpages" -q
  git push origin deploy:gh-pages -q
  echo "Deployed."
fi
git checkout main -q
git branch -D deploy -q
echo "==> Restoring dependencies (the branch swap removes untracked node_modules)..."
if [ ! -x node_modules/.bin/vite ]; then
  npm ci > /dev/null 2>&1 || npm install > /dev/null 2>&1
  echo "==> node_modules restored."
fi
echo "==> Done."
