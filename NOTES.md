# Pyro Ag Services — Working Notes

Claude: update this file as work happens. Capture decisions, the *why* behind them, open questions, known quirks, and follow-ups. Keep it terse.

## Recent decisions

### 2026-04-29 — Added R-32 and I-19 standalone product pages + Drones dropdown nav

- Created `r-32.html` and `i-19.html` as full standalone product pages. Site is no longer single-page only.
- Each page: hero (eyebrow / gradient title / tagline / body / CTAs / image), 4 spec cards (full hub spec set), 5-pill benefits list, cross-sell card to the other model, contact CTA, footer. Reuses existing FORGE tokens (stone/zinc/orange/red, ember accent rules) — no redesign.
- Spec content matches `hubs/terraplex/products/{r-32,i-19}.json` exactly. Body copy matches the in-page sections that were already on `index.html`. No paraphrasing.
- Nav updated: added a "Drones" desktop dropdown between Services and Products, containing R-32 and I-19 with brief subtitles. Dropdown reveals on `:hover` / `:focus-within` (CSS-only, no JS), with chevron rotation and a transparent `pt-3` bridge to keep hover stable.
- Mobile menu got a "Drones" eyebrow with R-32 and I-19 stacked below it. Active model gets `text-orange-500`.
- **Mobile menu moved into the nav partial.** It used to be a sibling div in `index.html`; now it lives inside the `partial:nav` markers so all three pages (home, r-32, i-19) render the same menu from one source. The standalone div in `index.html` was removed.
- Footer partial: added `R-32` and `I-19` quick-links between `Services` and `Products`. Links to homepage anchors are now `index.html#services` etc. when `activePage != "home"`, plain `#services` on home.
- Template syntax used: flat `{{#if activePage=="home"}}…{{else}}…{{/if}}` per CLAUDE.md (no nesting). Each conditional is independent.
- Drone product pages include Schema.org `Product` JSON-LD with MSRP from hub data ($72,000 R-32, $46,250 I-19) — hub MAP policy permits dealer MSRP advertising. The on-page UI does not yet show MSRP; the price lives in JSON-LD only.
- Logged in `CHANGELOG.md` as customizations so propagation preserves them.

### 2026-04-19 — Migrated to Terraplex hub v0.2.0 (Phase 2 canary)

- Created `spoke.config.json` pinning `hub.version: "0.2.0"`. Validates against `hubs/terraplex/spoke/spoke.schema.json`.
- Shrunk `CLAUDE.md` from 132 → 52 lines. Moved structured dealer data to `spoke.config.json`. Moved Terraplex-shared content (product specs, archetype recipe, positioning, terminology) to the hub via v0.2.0 pin. Kept Pyro Ag-specific prose (logo-icon-only rule + FORGE color/gradient overlay tokens).
- Deleted the embedded "Frontend Design Guidelines" section — it directly contradicted the hub's typography rules (forbidding system fonts while the hub and all existing dealer sites use them). Hub is authoritative on design rules. Resolving this contradiction was part of the purpose of hub/spoke separation.
- Also deleted Site Requirements (one-time migration note), Site Profile / Brand Notes (facts now in spoke config), Reference Sites (now in `referenceSites`), Typography (in hub's `guidelines/typography.md`), Conventions (platform concern), Output Defaults (platform scaffold concern).
- Dealer HTML/CSS/JS untouched. Live site looks identical to pre-migration. Golden-path check: `git diff sites/pyroagllc-com/index.html` is empty post-migration.
- Services auto-mapped: `["Drone Sales"]` only. Page renders 4 service cards ("Precision Spraying", "Cover Crop Seeding", "Pest Management", "Quick Response") plus 3 Parts & Service cards ("Repairs & Diagnostics", "Replacement Parts", "Routine Maintenance") plus 2 "What We Offer" service-shaped cards ("Agricultural Drone Sales", "Custom Application"). None are exact matches to canonical. Per briefing's conservative rule, only one defensible auto-map was made — "Drone Sales" (the page `<title>` contains "Drone Sales" verbatim and the About page leads with "Agricultural Drone Sales"). Everything else flagged for human review.
- Pre-existing uncommitted working-tree edits found in `index.html` (8 occurrences of `R-32` → `R-33` across heading, body copy, aria-label, JSON-LD, and the section comment). Not caused by this migration — they predated the session. Reverted to HEAD at user's request so the rendered R-32 product block matches the hub's canonical naming. Committed HEAD already had `R-32`.
- Service area discrepancy: the footer says "Serving Central & Western SD" but meta description, JSON-LD, and About section all say "western South Dakota". Spoke config uses `"western South Dakota"` (majority framing). Worth confirming with Taylor.
- TODOs remaining in `spoke.config.json`: none (all required fields populated). `story.ownerBio` omitted — the page has no owner bio paragraph, and the schema makes it optional as of v0.2.0.

- **2026-04-09 — Switched recreation source from screenshot to Base44 export.** The full Vite/React project was dropped at `_reference/source/`. Source code is far higher signal than the screenshot for design tokens, copy, structure, and asset URLs. Earlier guesses (font pairing, hex color tokens, section assumptions) have all been overwritten with what the source actually says.
- **2026-04-09 — Typography: system stack only, no Google Fonts.** Earlier Bebas Neue + Source Sans 3 pick was wrong — the Base44 source loads no custom fonts. Hero H1 uses `system-ui` with `font-stretch: condensed`; everything else uses the Tailwind default sans. The "tall condensed" headline effect is OS-level system-ui rendering. Faithful to source + zero font-loading overhead. Cross-platform variance accepted.
- **2026-04-09 — Color palette: full Tailwind stone/zinc/orange/red system.** From source components: stone-950 base, zinc-950 alt sections, stone-900/50-60 cards with stone-800 borders + orange-500/40 hover, gradient-orange-600-to-red-600 CTAs with orange glow shadows, orange-500 eyebrows with `tracking-[0.3em]`, gradient bg-clip-text from orange-400 to red-500 on H2 second lines, hero H1 uses orange-400→amber-500→red-500. Orange is the only accent — no purples, no other colors.
- **2026-04-09 — Built the entire site in a single index.html.** All 10 sections (nav, hero, services, revolution intro, R-32, I-19, parts/service, Terraplex trust, about, contact, footer) translated from the React components. Tailwind via CDN, no build step. ~620 lines. All copy verbatim from source. Form is pure HTML, no submission. Single ~1 KB inline JS for scroll-state header + mobile menu + footer year.
- **2026-04-09 — Hero uses background video, not a static image.** Source pulls `Justin-Lobaito_s-Video-Oct-30-2025-VEED-1.mp4` from the Terraplex shared GCS bucket. Hotlinked.
- **2026-04-09 — Logo: icon-only in header/footer.** The "PYRO AG SERVICES" wordmark text is NOT in the original Base44 header or footer — only the flame icon with an orange drop-shadow glow. Earlier "set wordmark in Bebas Neue alongside icon" decision was wrong and has been removed.
- **2026-04-09 — All Lucide icons replaced with inline SVGs.** Source uses lucide-react; static recreation has them inlined to avoid any JS dep. Each icon is a small `<svg>` with the same viewBox/path as Lucide.
- **2026-04-09 — Animations replaced framer-motion with CSS keyframes.** Hero glow blobs, scroll cue, and fade-up entrance animations are pure CSS. No motion library.
- **2026-04-09 — Section order matches Home.jsx exactly:** Navigation → Hero → ServicesSection → RevolutionIntro → R32Section → ProductsSection (I-19) → PartsServiceSection → TerraplexTrustSection → AboutSection → ContactSection → Footer. Single-page scroll, anchor nav.

## Open questions

- **Hero background image** — Original has a dark aerial/agricultural photo. Will source from Unsplash per Output Defaults unless client provides a specific image. (Approved to proceed with Unsplash placeholder.)
- **Terraplex dealer badge/seal** — No asset in `_reference/assets/`. Approved to compose from text + styling. Real asset is a later-phase item.
- **Spec PDFs** — No PDFs exist yet. Rendering as `<a href="#">`. Real files are a later-phase item.

## Resolved questions (2026-04-09)

- **Logo wordmark** — Original header/footer use the icon ONLY, no wordmark text. Earlier "set wordmark in Bebas Neue" idea was based on a misread of the screenshot. Resolved against source.
- **Drone product images** — Hotlinked from `storage.googleapis.com/bgd-sites/terraplex/...` per source. R-32: `image001.jpg`. I-19: `Header-Images/RevolutionWebHeader.00_00_13_22.Still005.jpg`.
- **Contact form select options** — Application Services / Buying a Drone / Parts & Service / Other (verbatim from source `ContactSection.jsx`).
- **Hero background image** — Source uses a background video, not a still: `Justin-Lobaito_s-Video-Oct-30-2025-VEED-1.mp4` from the Terraplex GCS bucket. Hotlinked.
- **Terraplex dealer badge/seal** — Source builds it inline (Shield icon + "TERRAPLEX" + "AUTHORIZED DEALER" text in a bordered orange-glowing pill). No separate badge asset exists. Recreated the same way.
- **Spec PDFs** — Real URLs found in source: R-32 → `dealer-documents/Terraplex_R-32_sell-sheet_1.26.26.pdf`, I-19 → `Terraplex_I-19_SellSheet.pdf`. Both wired up.
- **Font choice** — System stack only. Source loads no Google Fonts.

## Build progress

- [x] All sections built in single pass from Base44 source (2026-04-09): Nav · Hero · Services · Revolution Intro · R-32 · I-19 · Parts & Service · Terraplex Trust · About · Contact · Footer.

## Follow-ups

- Wire up contact form submission handling (later phase per CLAUDE.md)
- Move logo from `_reference/assets/logo.png` to `assets/logo.png` when build starts
- Add real PDFs for spec brochure / spec sheet download buttons

- Add favicon
- SEO meta tags (title and description are in page-summary.json — will add during build)
