# 2ο Εσπερινό ΕΠΑ.Λ. Καβάλας — Homepage Concept

**Status:** Unofficial visual/technical prototype for school review. The school's live website has not been modified.

This ZIP contains:

- `preview/index.html` — static, **offline** demo. Open it directly in Chrome, Edge, or Firefox, no npm needed.
- `react/` — source for a real **React 18 + TypeScript + Vite** homepage, sharing the same content and layout.

## 1. Show the prototype to the school

Extract the ZIP and double-click `preview/index.html`. It has responsive navigation, clickable sector links, a school schedule link, and a proposed announcements layout. It does **not** need a server.

## 2. Develop the React version

With Node.js 20+ and an internet connection:

```bash
cd react
npm install
npm run dev
```

Open the local URL shown by Vite. For a production bundle, run `npm run build`. Dependencies are intentionally not bundled in the ZIP; they are downloaded by npm. The React build was not executed in this environment because npm package registry connectivity is unavailable.

## 3. WordPress as read-only announcements CMS (optional)

The React project includes `react/src/wordpress.ts`, a read-only adapter for a **public** WordPress REST API. To enable it, copy `.env.example` to `.env.local` and set:

```text
VITE_WORDPRESS_API_BASE=https://YOUR-WORDPRESS-HOST/wp-json/wp/v2
```

The URL must be a WordPress REST API base exposing `/posts`; content must be publicly readable and **CORS must allow the frontend origin**. The prototype does not include authenticated editing, privileged WordPress access, or migration. On API failure, it keeps the prominently labeled fallback announcements. No WordPress credentials should be placed in Vite environment variables.

Before going live, check whether the school is on the restricted `blogs.sch.gr` environment or the standalone school hosting service, and agree on the most maintainable deployment approach with the designated administrator.

## 4. Content accuracy / approval checklist

- School identity, address and telephone from its [official ΠΣΔ listing](https://www.sch.gr/sites/sch-units/view?registry_no=2140070).
- Contact email appears in published school directories and should be confirmed by the school.
- Six study areas are **historical sections of the current blog**, not verified 2026–2027 offerings. Confirm the active departments and specialties.
- 18:00–22:30 is from an existing school page; confirm today's actual operating hours.
- The first announcement is a real school post dated 15 February 2026; the other two are explicitly illustrative placeholders.
- The schedule links to the EduPage URL referenced by that real school post.
- The hero is an original **vector illustration**, not a photograph of the school or a precise depiction of Kavala.
- Review accessible keyboard navigation, responsive layout, privacy, translations, text copy, current regulations, and approval for public posting.
- Obtain explicit permission before making public claims or replacing the live site.

## 5. Suggested handover

A non-technical school staff member should be able to create and edit posts in WordPress without working with React. Provide a short editing guide, and designate an administrator for routine security and hosting maintenance.

## Not included

No live WordPress connection configured, no hosting deployment, no changes to `sch.gr`, no domain migration, and no login system. The prototype is only a homepage, not a full multi-page website.