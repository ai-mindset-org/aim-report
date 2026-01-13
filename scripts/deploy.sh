#!/bin/bash

echo "🚀 Starting deployment..."
echo ""

# Step 1: Convert MD to JSON
echo "📖 Converting slides.md to JSON..."
npx tsx scripts/md-to-json.ts
if [ $? -ne 0 ]; then
  echo "❌ Failed to convert MD to JSON"
  exit 1
fi

# Step 2: Add changes
echo "📝 Adding changes to git..."
git add public/locales/en/*.json content/slides.md

# Step 3: Commit
echo "💾 Committing changes..."
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")
git commit -m "content: update from slides.md ($TIMESTAMP)" || echo "No changes to commit"

# Step 4: Push
echo "🔼 Pushing to GitHub..."
git push

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deployment complete!"
  echo "   GitHub Actions will build and deploy to Pages."
  echo "   Check: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
else
  echo "❌ Failed to push to GitHub"
  exit 1
fi
