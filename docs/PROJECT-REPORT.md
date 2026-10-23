# ChrisGonzalez.net — Project Report

_2026-10-23. Covers the audit, the design and architecture decisions, what was built, how it was
tested, the app store compliance checklist, and what still needs Chris._

---

## 1. Assessment of the starting point

**The website.** The repository held only a one-line README and a GitHub Pages `CNAME` for
`chrisgonzalez.net`. There was no existing page, asset, framework, analytics or SEO setup to
preserve. The `CNAME` was kept (now `public/CNAME`) so the domain keeps resolving to GitHub Pages.

**The products — researched from source, not assumed from names:**

| | On Record | Pilot Buddy | ATLsim – CoPilot (CoPilot Checklist) |
|---|---|---|---|
| Source | `ChrisGonzalez72/OnRecord` (Swift, active daily) | `ChrisGonzalez72/PilotBuddy` (Java, Oct 2026) | `ChrisGonzalez72/CoPilot-Checklist-v3` (C#/.NET 6 WPF, last commit Jan 2023) |
| What it does | Records meetings on Mac/iPhone/iPad/Watch; transcribes, detects speakers and writes summaries, decisions, actions with on-device AI on the Mac; every point links to its moment; Ask across meetings | Turn calculator (90/180/270°), crosswind/headwind calculator, offline airport lookup (≈48,000 airports with runways and frequencies) | Voice-driven challenge/response checklists for flight simulators (Windows speech), checklist editor, optional cloud sharing with username + email |
| Platforms | macOS 15+, iOS/iPadOS 18+, watchOS 11+ (Apple silicon Mac required) | Android 7.1+ (minSdk 25) | Windows 10 1607+ (MSIX package) |
| Release status | App Store record created (id6822120030), v1.0 in TestFlight, **not yet released** | **Not published** (package id is still `com.example.pilotbuddy`) | **On the Microsoft Store** (confirmed by Chris 2026-10-23; listing URL still to add) |
| Data handling | "Data Not Collected"; iCloud private DB sync; model downloads from Hugging Face | Requests **no permissions** (no internet) | Cloud checklists optional and **off by default**; when on, username + email + shared checklists go to a web service at `chrisgonzalez.net/CoPilotChecklistWS/…` |

Two findings differ from the brief and shaped the site:

1. **Pilot Buddy is an Android app**, not an Apple or Microsoft Store app. It is presented as
   Android, "Not yet on Google Play".
2. **ATLsim – CoPilot depends on a web service on this domain** (`https://chrisgonzalez.net/CoPilotChecklistWS/Copilot-checklist.asmx`).
   GitHub Pages cannot host an ASMX service, so with the domain on GitHub Pages that endpoint does
   not work. See open item O-5.

**Approved On Record copy already existed** in `docs/release/v1.0-app-store-metadata.md` of the On
Record repo (checked against the 1.0 code by the release work). The website reuses its claims and
wording so the site and the App Store listing never contradict each other. It also lists what App
Store Connect is still missing: **Support URL, Marketing URL and Privacy Policy URL** — this site
now provides all three.

---

## 2. Brand and design direction

**Positioning:** _Independent developer. Professional software. Thoughtful design._ Expressed on
the homepage as **"Thoughtful software, built independently."** Chris is the brand; the site uses
first person, never an invented company.

**On Record as a product brand inside the site.** On Record keeps its own identity — its coral
`#E5484D` accent, its icon, and its App Store voice ("Private meeting notes, made on your Mac.") —
while living at `chrisgonzalez.net/apps/on-record`. Each product page sets its own accent through
one CSS variable, so the site stays one system while each app looks like itself.

**Visual system**

- Dark by default (`#09090b`), with a full light theme. Neutral greys, generous whitespace, one
  accent per product. Subtle grid and accent glows instead of stock imagery.
- Type: Inter (variable, self-hosted), tight display tracking for headlines.
- Real product screenshots only, cropped from the approved App Store captures and shown in CSS
  device frames (phone, Mac window, Watch).
- Restrained motion: fade-up on scroll, respects `prefers-reduced-motion`, content visible without JS.
- Accent buttons are the accent darkened 20% so white text meets WCAG AA for every product colour.
- Pilot Buddy and CoPilot share the same headset logo in their repos; on the site Pilot Buddy is
  shown on a white tile and CoPilot on a dark navy tile to tell them apart (see O-7).

---

## 3. Site architecture (as built)

```
/                                   Homepage
/apps/                              All apps
/apps/on-record/                    Flagship marketing page (bespoke sections + template)
/apps/on-record/support/            ← App Store Support URL
/apps/on-record/privacy/            ← App Store Privacy Policy URL
/apps/pilot-buddy/  (+ /support/, /privacy/)
/apps/atlsim-copilot/ (+ /support/, /privacy/)
/about/  /contact/  /support/       About Chris, contact, support centre
/legal/privacy/  /legal/cookies/  /legal/terms/
/updates/  /updates/<post>/  /updates/rss.xml
/press/                             Press kit (icons, approved screenshots, copy)
/sitemap-index.xml  /robots.txt  /404.html
```

Not published, deliberately: **`/legal/account-deletion`** — none of the apps distributed through
Apple has an account, so the page would have no legitimate content. CoPilot's deletion process is
in its own privacy policy.

**Homepage layout:** A · hero (headline, value proposition, "Explore On Record" / "View all apps",
Mac + iPhone visual) → B · On Record feature panel (icon, tagline, four benefits, platforms, store
status, link) → C · Pilot Buddy and CoPilot cards → D · About the developer + three principles →
E · "Find your app" list with status, support and privacy links → F · footer (apps, help, Chris,
legal, trademark notice).

**Product page template (all apps):** hero with icon, status and download action → overview →
alternating features with screenshots → use cases → gallery → compatibility and requirements →
download CTA → FAQ → disclaimer (aviation apps) + support and privacy cards → related apps.

**On Record page concept:** the template plus Apple-style storytelling: a Mac-and-iPhone hero; a
"Capture. Understand. Remember." three-step explainer; "One app on every Apple device you carry"
(Mac / iPhone / iPad / Watch capabilities); a privacy band ("Your meetings stay yours."); "A memory
that grows with every meeting" (people, series/projects/courses, vocabulary, export); recording
consent notice; gallery of Mac, iPhone and Watch screens; FAQ written for App Store visitors
("Do I need a Mac?", "Where do my recordings go?", "Does a bot join my calls?").

---

## 4. Technical decisions

| Decision | Why |
|---|---|
| **Astro 7, static output** | Content site with almost no interactivity: ships zero framework JS, builds to plain HTML for GitHub Pages, typed content collections. Astro ≤7.3.1 has a critical advisory, so 7.4.2 is used (`npm audit`: 0 vulnerabilities). Next.js was considered and rejected: more runtime and complexity for no benefit here. |
| **No Tailwind, hand-written CSS tokens** | One small stylesheet + scoped component styles; easier to keep the two themes exact. |
| **Central product registry** (`src/config/apps.ts`) | One typed entry drives page, cards, support, store buttons, structured data, sitemap. A fourth app is one entry + screenshots + a Markdown policy. |
| **Markdown for policies and updates** | Lightweight, reviewable in pull requests; no CMS or database. |
| **mailto instead of a contact form** | GitHub Pages has no backend; a form service would add a third party that processes visitor data. |
| **Self-hosted font, no external requests** | Performance and GDPR (Google-hosted fonts transmit visitor IPs). Verified: pages request only first-party URLs. |
| **Status-aware download buttons** | Unreleased apps show "Coming soon to the App Store" / "Not yet on Google Play" instead of dead or invented links. |
| **Text store buttons until official badges are added** | Apple's badge host was not reachable from the build environment; brand guidelines forbid recreating badges. Drop-in slot documented in README. |

**Theme and GDPR.** Dark is the default. A cookie `theme=light|dark` (first-party, `Path=/`,
`SameSite=Lax`, `Secure` on HTTPS, 1 year) is written **only when the visitor clicks the theme
switch**, and read by an inline script before first paint (no flash). Because it stores only a
preference the visitor explicitly requested and is not used for tracking, it falls under the
"strictly necessary" exemption of ePrivacy Directive Art. 5(3) / UK PECR, so no banner is shown.
`/legal/cookies/` documents it and has a live control to view and clear it. If analytics are ever
added, a consent mechanism must come first (recommendation: a cookieless, EU-hosted tool such as
Plausible or self-hosted Umami counting product-page views and outbound store clicks).

**SEO.** Unique titles and descriptions per page; canonical URLs; Open Graph/Twitter cards with
generated 1200×630 images per product; JSON-LD (`WebSite`, `Person`, `ProfilePage`,
`SoftwareApplication` per app, `BreadcrumbList`, `ItemList`); sitemap and robots.txt; RSS for updates.
`SoftwareApplication` deliberately has no `offers` or ratings until there are real ones.

---

## 5. Validation performed

| Check | Result |
|---|---|
| `astro check` (TypeScript) | 0 errors, 0 warnings |
| Production build | 21 pages, sitemap generated |
| Internal links (`npm run test:links`) | 1,174 references in 21 pages, 0 broken |
| axe-core (WCAG 2.0/2.1/2.2 A+AA + best practice), 18 pages × dark/light × 1440/390 px | 0 violations (after fixing button contrast and a scrollable table) |
| Lighthouse (mobile emulation), `/` and `/apps/on-record/` | Performance 99, Accessibility 100, Best Practices 100, SEO 100; LCP 1.6–1.7 s, CLS 0, TBT 0 ms; 104–130 KB per page |
| Theme cookie behaviour (Playwright) | No cookie on first visit; toggle writes exactly one `theme` cookie; persists across pages; clear restores dark |
| Third-party requests | None (only first-party) |
| Mobile menu | Opens, `aria-expanded` updates, Escape closes and returns focus |
| Horizontal overflow at 375 px | None on any page |
| Browser console | No errors |
| Image loading | All images decode on every page |

Not tested: real Safari/iOS devices (Chromium only in this environment), and the live domain
(not reachable from the build environment).

---

## 6. App store compliance checklist

Legend: ✅ done on the site · ⏳ pending (Chris) · ◻ conditionally required · — not applicable

### On Record — Apple App Store (iOS, iPadOS, watchOS, macOS)

| Item | Status | Notes |
|---|---|---|
| Privacy Policy URL (Guideline 5.1.1(i); required field) | ✅ Required | `https://chrisgonzalez.net/apps/on-record/privacy/` — enter for both iOS and macOS. Matches the drafted "Data Not Collected" label. |
| Support URL with contact information (required field; Guideline 1.5) | ✅ Required · ⏳ | `https://chrisgonzalez.net/apps/on-record/support/` — contact: support@chrisgonzalez.net. |
| Marketing URL | ✅ Recommended | `https://chrisgonzalez.net/apps/on-record/` |
| App Privacy details ("Data Not Collected") | ⏳ Required | Drafted in the On Record repo; **Publish** in App Store Connect is still pending. Policy text matches it. |
| Developer contact information | ✅ Required | Support page + footer. |
| Account deletion (5.1.1(v)) | — | No accounts. |
| Third-party AI disclosure (5.1.2(i)) | — / ✅ | No data shared with AI services; stated in the policy. |
| Subscription / in-app purchase disclosures (3.1.2) | — / ◻ | Free, no IAP today. Revisit if subscriptions are added. Site makes no price claims, so "free for a limited time" can end without site changes. |
| Terms / EULA | ✅ Recommended | `/legal/terms/` references Apple's Standard EULA. Add a custom EULA only if needed. |
| Recording consent notice | ✅ Recommended | Product page, FAQ, terms, privacy policy (mirrors the App Store description). |
| Export compliance answer | ⏳ | In App Store Connect (owner to confirm `ITSAppUsesNonExemptEncryption = NO`); not a website item. |
| Store link and badge | ⏳ Pending release | Flip `status`/`url` in `apps.ts` on release; add the official badge file. |

### Pilot Buddy — Google Play (if published)

| Item | Status | Notes |
|---|---|---|
| Privacy policy URL (required for all Play apps) | ✅ Required | `/apps/pilot-buddy/privacy/` |
| Data safety form | ⏳ Required | Answer "no data collected or shared" (no permissions, no internet). |
| Support contact | ✅ Required | `/apps/pilot-buddy/support/` |
| Unique application ID | ⏳ **Blocking** | `com.example.pilotbuddy` is rejected by Play; change before upload (O-6). |
| Account deletion | — | No accounts. |
| Aviation safety disclaimer | ✅ Recommended | "Not approved for navigation" on product, support and terms pages. |

### ATLsim – CoPilot — Microsoft Store (listed)

| Item | Status | Notes |
|---|---|---|
| Privacy policy (Policy 10.5.1 — collects username and email) | ✅ Required | `/apps/atlsim-copilot/privacy/`. **The app's in-app link still points to an old SharePoint page** — update `appsettings.json` (O-5). |
| Support contact on the listing | ✅ Required | `/apps/atlsim-copilot/support/` |
| Microphone capability disclosure | ✅ Required | Covered in the policy. |
| Data deletion route | ✅ / ⏳ | Email process described; Chris must confirm he can delete records on the web service. |
| Working cloud service | ⏳ **Blocking for cloud users** | Cloud sharing is still an option (off by default). Its service URL is on this domain; once the domain serves GitHub Pages, that path stops reaching the service (O-5). |
| Simulation-only disclaimer | ✅ Recommended | Product, support and terms pages. |

---

## 7. Open items for Chris

| # | Item | Why it matters |
|---|---|---|
| **O-1** | **Make sure `support@chrisgonzalez.net` receives mail** (chosen by Chris 2026-10-23; `contactEmail` in `src/config/site.ts`). | Every support and privacy page uses it, and App Review checks the support contact works. |
| **O-2** | **Enable deployment:** GitHub → Settings → Pages → Source: **GitHub Actions**; custom domain `chrisgonzalez.net`; enforce HTTPS. Then merge this branch to `main`. | Nothing is live until then. |
| **O-3** | **Enter the three URLs in App Store Connect** (both iOS and macOS versions) and publish App Privacy. | Required before submitting On Record 1.0. |
| O-4 | Review copy that speaks for you: the About page, the homepage "About the developer" section and the three principles. They use only what the repositories show; add background, location, photo or LinkedIn if you want them. | The brief asked for no invented credentials, so the bio is deliberately modest. |
| **O-5** | **CoPilot's web service** (cloud sharing is still offered, off by default): `chrisgonzalez.net/CoPilotChecklistWS/Copilot-checklist.asmx` cannot run on GitHub Pages. Before pointing the domain at Pages, host the service on a subdomain (e.g. `api.chrisgonzalez.net`) and ship an app update with the new endpoint. Also point the app's privacy link to `/apps/atlsim-copilot/privacy/` and the Store listing's privacy URL to the same page. | Users who turn cloud sharing on would get errors once the domain moves. |
| O-6 | Pilot Buddy: decide on Google Play; if yes, change the application ID and complete the Data safety form. Site status says "Not yet on Google Play". | Avoids promising a release that isn't planned. |
| O-7 | Pilot Buddy and CoPilot use the same headset logo. Consider a distinct icon for one of them. | Product recognition. |
| O-8 | Legal review of the three product privacy policies, site privacy/cookie policies and terms. They are written from verified app behaviour but are not legal advice. | Requested by the brief. |
| O-9 | On release day: set On Record `status: 'available'` and its store URL; add Apple's official badge; post an update. | See README → "On Record goes live". |
| O-10 | **Confirmed 2026-10-23:** ATLsim – CoPilot is `CoPilot-Checklist-v3`, it is on the Microsoft Store, and cloud sharing is optional and off by default. **Still needed: the Store listing URL** — paste it into the `atlsim-copilot` store entry in `src/config/apps.ts` to turn the status into a download button. | The site says "Available on the Microsoft Store" without a link until then. |

---

## 8. Recommended next improvements

| Improvement | Impact | Effort | Notes |
|---|---|---|---|
| Official App Store badge + live link on release | High | Minutes | O-9 |
| Retina Mac screenshots (2880×1800) | Medium | Low | Current Mac captures are 1440×900; recapture from build 8 (the On Record repo notes Mac screenshot 3 has stale text — it is excluded here). |
| App preview video on the On Record page | High | Medium | Reuse the App Store app preview once made. |
| Privacy-friendly analytics with consent | Medium | Low–Medium | Measure product-page views and outbound store clicks (`data-store` attributes are already on store buttons). Needs cookie/consent update first. |
| Smart App Banner (`apple-itunes-app` meta) on On Record pages | Medium | Minutes | Add once the listing is live. |
| Custom Product Pages / campaign links (`ct=` App Store tokens) | Medium | Low | Track which channels drive installs without tracking visitors. |
| Lightweight feedback form | Low–Medium | Medium | Only via a privacy-reviewed service; email works today. |
| Release-notes entries per On Record version | Medium | Ongoing | `src/content/updates/` with `app: on-record`. |
| Universal links (`apple-app-site-association`) | Low | Low | Only if On Record adds deep links. |
