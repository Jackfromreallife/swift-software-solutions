#!/bin/bash
# Deploy AgentDev site + static subpages (wallet, verify) to gh-pages.
# Usage: ./deploy.sh
set -e
cd "$(dirname "$0")"

WALLET_SRC="$HOME/Documents/ecomwin/qr-card-wallet-site"

echo "==> Building site..."
npm run build

echo "==> Injecting static subpages into dist..."
rm -rf dist/wallet dist/verify
cp -r "$WALLET_SRC/wallet" dist/wallet
cp -r "$WALLET_SRC/verify" dist/verify

echo "==> Syncing gh-pages branch (CNAME preserved)..."
git fetch origin gh-pages -q
git checkout -B deploy origin/gh-pages -q
# keep .git and CNAME; replace everything else
find . -maxdepth 1 ! -name . ! -name .git ! -name CNAME -exec rm -rf {} +
cp -r dist/assets dist/favicon.ico dist/index.html dist/placeholder.svg dist/robots.txt dist/wallet dist/verify .
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
echo "==> Done."
