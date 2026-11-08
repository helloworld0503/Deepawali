# Little Light — Diwali Gift App

A responsive, client-side Diwali greeting experience built with React + Vite.

## Features
- Personalise sender, recipient and greeting text.
- Gift reveal interaction.
- Share a unique greeting URL.
- Share directly to WhatsApp or copy the link.
- Mobile-responsive festive design.
- No backend, database, API key or environment variables required.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL printed by Vite.

## Production build
```bash
npm run build
npm run preview
```
The production files are generated in `dist/`.

## Publish using GitHub Pages
1. Create a GitHub repository and upload all files in this folder.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Add the workflow below as `.github/workflows/deploy.yml`.
5. Push to the `main` branch. GitHub Actions will build and publish the app.

### GitHub Actions workflow
```yaml
name: Deploy Diwali Gift App
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Notes
- All greeting details are encoded in the share URL query string.
- This is an original implementation inspired by a festive gift-card concept; it does not copy the reference site's source code or branding.
- The sound toggle is a visual control placeholder; this version does not play audio.
