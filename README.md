<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

<!-- aim-public-links:start -->
[AI Mindset labs](https://aimindset.org/?utm_source=website&utm_medium=article&utm_campaign=start&utm_content=github-aim-report#learning) · [Knowledge base](https://base.aimindset.org/?utm_source=website&utm_medium=article&utm_campaign=start&utm_content=github-aim-report)
<!-- aim-public-links:end -->

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1XWx5BQgk7Z1qywviy8jAdDlN1oaF_8NL

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Publication and CI

The live report is https://gap.aimindset.org/ on AIM infrastructure (VM120/Caddy).
Its publication source is `ai-mindset-org/lab-sites`, under `pages/gap/`;
that repository builds the shared shell and publishes `sites/gap/`.

This repository contains the React/Vite report source. Its `Build` workflow runs
`npm ci` and `npm run build` on pull requests and pushes to `main`, then retains
`dist/` as a review artifact for seven days. A successful build here does not
publish the report. To release a change, integrate the built report into
`lab-sites/pages/gap/` through that repository's page contract and release checks.

The legacy GitHub Pages and Netlify deployment workflows have been retired.
GitHub Pages returned 404, and new releases use the AIM publication lane.
The local build uses `/` as its asset base. No deployment credentials are needed
for this repository's CI.
