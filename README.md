# ChrisGonzalez.net

The official website of Chris Gonzalez, independent software developer, and the home of
**On Record**, **Pilot Buddy** and **ATLsim – CoPilot**.

Static site built with [Astro](https://astro.build), deployed to GitHub Pages at
<https://chrisgonzalez.net>. No server, no database, no CMS, no analytics, no third-party requests.

## Commands

Requires Node 24 (see `.nvmrc`; Astro 7 needs Node ≥ 22.23.4).

```sh
npm install
npm run dev          # local dev server at http://localhost:4321
npm run build        # type-check (astro check) + build to dist/
npm run preview      # serve dist/
npm run test:links   # check every internal link/image in dist/ (run after build)
python3 scripts/make-images.py   # regenerate favicons and Open Graph images (Pillow + Inter font)
```

Only `main` is deployed: every push to `main` is built, link-checked and published via
`.github/workflows/deploy.yml` (it can also be run by hand from the Actions tab). Run
`npm run build && npm run test:links` locally before merging.

## Where things live

| What | Where |
| --- | --- |
| Site name, contact email, social links | `src/config/site.ts` |
| **Every product**: copy, platforms, release status, store links, features, FAQ, support, screenshots | `src/config/apps.ts` |
| Product privacy policies (Markdown) | `src/content/privacy/<app-slug>.md` |
| Updates / release notes (Markdown) | `src/content/updates/<yyyy-mm-dd>-<slug>.md` |
| Product screenshots (optimised at build to AVIF/WebP) | `src/assets/apps/<app-slug>/` |
| App icons, OG images, favicons, press downloads | `public/` |
| Design tokens (colours, type, spacing; dark + light) | `src/styles/global.css` |
| Theme cookie logic | `src/scripts/theme.ts` |

## Common tasks

**On Record goes live on the App Store.** In `src/config/apps.ts`, on the `on-record` entry set
`status: 'available'` and the store `url: 'https://apps.apple.com/app/id6822120030'`. Every download
button, the structured data and the press kit update automatically. To show Apple's official
badge, download it unmodified from Apple's marketing tools into `public/badges/app-store.svg` and
add `'app-store'` to `OFFICIAL_BADGES` in `src/components/StoreButtons.astro`.

**Add a new app.** Add an entry to `apps` in `src/config/apps.ts`, put its screenshots in
`src/assets/apps/<slug>/`, its icon in `public/icons/`, and its privacy policy in
`src/content/privacy/<slug>.md`. The product page, support page, privacy page, cards, footer
links and sitemap entries are generated. Add an OG image in `scripts/make-images.py`.

**Post an update.** Add a Markdown file to `src/content/updates/` with `title`, `date`, `summary`
(and optional `app: <slug>`). It appears on `/updates/` and in the RSS feed.

## Principles

- **Accuracy.** Every product claim is checked against the app's code or approved App Store copy.
  Never add a feature, store link or legal statement that isn't verified.
- **Privacy.** No analytics, trackers, embeds or third-party fonts. The only cookie is `theme`,
  written only when a visitor uses the theme switch (see `/legal/cookies/`). Adding anything that
  stores or reads data on visitors' devices for another purpose requires a consent mechanism first.
- **Accessibility.** WCAG 2.2 AA: keep colour contrast ≥ 4.5:1, visible focus, real buttons and links.

See `docs/PROJECT-REPORT.md` for the audit, design decisions, store compliance checklist and open items.
