# Changelog — Pyro Ag Services LLC

Post-propagation customizations to this site. Propagation defaults are
hub-compliant; every entry below is an affirmative override from a human
decision, not drift.

## Purpose

When the platform runs hub content propagation on this dealer's site, the
default output is hub-compliant. Anything this site does that deviates from
hub defaults — content the hub would strip, layouts the hub doesn't
prescribe, sections the hub doesn't include — lives here as a documented
customization.

Phase 3 propagation reads this file to know which sections to preserve
versus reconcile. Don't edit to override hub rules silently — that's what
this file is guarding against.

## Entry format

Each entry uses this shape:

```
## YYYY-MM-DD — Short description

**Type:** customization
**Section affected:** <page section, component, or file>
**Reason:** <why this dealer diverges from hub default>
**Added by:** <session identifier, human, or "inherited from pre-migration state">

<Longer explanation if useful — what the hub default would produce, what
this dealer has instead, and why.>
```

Newest entries go at the top. Dates are ISO (YYYY-MM-DD).

`Type` is currently only `customization`. Other types (`exception` for
temporary deviations with a resolution target, `spoke-specific addition`
for content the hub doesn't touch at all) may be introduced later if real
cases warrant the distinction. For now: if it's a deviation from hub
default that should persist across propagations, it's a `customization`.

## Entries

### 2026-04-29 — Added standalone R-32 and I-19 product pages + Drones nav dropdown

**Type:** customization
**Section affected:** new files `r-32.html`, `i-19.html`; `_partials/nav.html`; `_partials/footer.html`; nav + footer marker regions in `index.html`
**Reason:** Dealer requested dedicated product pages so each Revolution model has a deep-link landing page (better for SEO, paid ads, and email/text shares). Hub propagation today owns the in-page R-32 and I-19 sections on `index.html` but does not prescribe standalone product pages — these are spoke-specific.
**Added by:** Claude session 2026-04-29 (user request: "create the i-19 and r-32 pages for this website. add drones to the navigation and add the 2 revolution models to the dropdown.")

What's deviating from hub default:
- Two new pages exist that hub propagation does not generate. Spec content on these pages matches `hubs/terraplex/products/{r-32,i-19}.json` exactly; body copy matches what is already rendered in the homepage R-32/I-19 sections.
- Nav partial gained a "Drones" dropdown with R-32 + I-19 entries. Hub does not specify nav structure for spokes; this is a dealer/spoke choice.
- Footer partial gained `R-32` and `I-19` quick-links (also dealer choice).
- Mobile menu was moved from a standalone div in `index.html` into the `partial:nav` markers. This is a structural refactor to keep navigation source-of-truth in one file now that there are multiple pages — not a content change.
- Each new product page embeds Schema.org `Product` JSON-LD including MSRP from hub data. Hub MAP policy explicitly permits dealer MSRP advertising; UI surfaces do not show MSRP yet.

If hub later prescribes its own product page templates, this customization should be reconciled rather than dropped — the dealer will want the deeper detail and SEO surface area to persist.

### 2026-04-29 — Critique batch (4 fixes applied)

- ISSUE-001 (harden): Added JS-progressive submission to the contact form — disables the submit button with spinner + "Sending…" label, swaps the form for an inline success state on 200, and shows an orange-bordered error block with retry on non-200. No-JS POST fallback and honeypot preserved.
- ISSUE-002 (polish): Fixed typo "Gteex Revoluion Line" → "Gteex Revolution Line" in the contact-section subhead. Only one occurrence in `index.html`.
- ISSUE-003 (layout): "What We Offer" grid changed from `grid-cols-1 sm:grid-cols-2` to `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`, with the "Agricultural Drone Sales" card promoted to `lg:col-span-2` so the row of five reads as 1-wide + 4-supporting on desktop with no orphan cell.
- ISSUE-005 (clarify): Added a new "Service Area & Response" band between Terraplex Trust and About — CSS-tinted 16:10 map placeholder pinned to "Philip, SD" with a 150-mile radius label, and three cards covering phone hours (placeholder, TODO to confirm), 24-hour weekday response, and in-season urgent direct line. FORGE-styled.
