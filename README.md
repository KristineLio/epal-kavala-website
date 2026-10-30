# 2ο Εσπερινό ΕΠΑ.Λ. Καβάλας — Website Redesign Concept

> **Unofficial prototype for review**, not the school's official website. The live school website has not been changed.

A responsive, Greek-language homepage concept for the 2nd Evening Vocational High School of Kavala, built as a volunteer portfolio project.

## Preview

- **GitHub Pages:** https://kristinelio.github.io/epal-kavala-website/ (available after Pages is enabled and its first successful deployment)
- **Standalone preview:** `index.html` (opens without Node or a server)
- **React + TypeScript source:** `react/` (React 18, TypeScript, Vite, custom CSS)
- **WordPress:** `react/src/wordpress.ts` contains an *optional*, read-only WordPress REST API adapter.

## Run locally

Requirements: Node.js 20+ and npm.

```bash
cd react
npm install
npm run dev
```

Build:

```bash
npm run build
```

The app uses Vite base `/epal-kavala-website/` for deployment to GitHub Pages. Set the correct `base` in `react/vite.config.ts` if the repository or hosting path changes.

## GitHub Pages deployment

The `.github/workflows/pages.yml` workflow installs dependencies, type-checks and builds the React app, and deploys `react/dist`. On GitHub open **Settings → Pages → Build and deployment → Source → GitHub Actions**. The next workflow run publishes the React version. Check **Actions** for any build or deployment failures.

## Optional WordPress connection

The prototype can load **public** posts from the WordPress REST API.

1. Copy `react/.env.example` to `react/.env.local`.
2. Set `VITE_WORDPRESS_API_BASE=https://YOUR-WORDPRESS-SITE/wp-json/wp/v2`.
3. Confirm public post access and CORS on the WordPress host.

If the API is absent or unavailable, the homepage clearly labels the fallback/sample announcements. **Never place credentials in Vite environment variables** because frontend environment values can be exposed to visitors. No WordPress migration, login, or administrative access is included.

## Content approval before launch

- Verify the school's identity, contact details, and current operating hours with school administration.
- The six study areas are based on *historical existing website pages*, not verified current-year offerings.
- The announcement section contains one school announcement from February 2026 and two explicitly labeled samples.
- The illustration is original vector artwork, **not a photograph of the school**.
- Confirm all school content, images, student privacy, accessibility and publication rights before replacing the official website.
- Ensure that a designated staff member can maintain content after volunteer handover.

## Status

This is a **homepage prototype**, not a complete school site. The official `sch.gr` site has **not** been modified. GitHub Pages only serves the frontend; WordPress requires compatible hosting and its own management.
