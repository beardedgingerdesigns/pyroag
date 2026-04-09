# Pyro Ag Services — Working Notes

Claude: update this file as work happens. Capture decisions, the *why* behind them, open questions, known quirks, and follow-ups. Keep it terse.

## Recent decisions

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
