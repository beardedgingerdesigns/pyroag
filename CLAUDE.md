# Pyro Ag Services — Dealer Site

Dealer site for Pyro Ag Services LLC. Part of the Terraplex dealer network.

## Working Memory Protocol

**At the start of every session:** read `NOTES.md` in this repo. Recent decisions, open questions, follow-ups.

**Before finishing any non-trivial work:** update `NOTES.md`. Date new entries. Include the *why*, not just the *what*. Move resolved items out of Open questions and Follow-ups.

## Configuration

- **Structured dealer data:** `spoke.config.json` (validated against `hubs/terraplex/spoke/spoke.schema.json`). When editing dealer facts — phone, services, archetype, accent color — edit the config, not prose here.
- **Hub:** Terraplex hub at `hubs/terraplex/`, pinned to v0.3.0 in `spoke.config.json`. Read `hubs/terraplex/HUB-CLAUDE.md` to understand what hub content is authoritative (product specs, asset URLs, archetype recipes, terminology rules) versus what this spoke owns. Hub content is not editable from this repo.
- **Visual reference:** `_reference/` contains the original Base44 screenshot, scraped text, and logo exports. Look at reference images before writing code that changes visual treatment; spot-check your output against them before reporting done.
- **Customizations log:** `CHANGELOG.md` tracks post-propagation deviations from hub defaults (persistent customizations like dealer-specific sections, layouts, or content that hub propagation would otherwise strip). Read before making changes that could conflict with hub rules; add an entry for any new deviation.

## Spoke-specific prose

These are the things that don't fit the structured config and live here:

### Logo usage rule

`assets/logo.png` (flame "Y" icon, transparent bg, copied from `_reference/assets/logo.png`). The "PYRO AG SERVICES" wordmark on the original site does **not** appear in the header or footer — only the icon does, with an orange drop-shadow glow. Earlier guess was wrong.

### Visual elaboration on FORGE archetype

Pyro Ag's specific implementation of FORGE layers detail beyond the generic archetype recipe. These details live in the rendered HTML/CSS; hub content propagation (R-32/I-19 specs, product copy) should not disturb them:

- Base bg: `stone-950` (#0c0a09)
- Section alt: `zinc-950` and `stone-950 → zinc-950` gradients
- Cards: `stone-900/50` or `/60` with `backdrop-blur-sm`, borders `stone-800`, hover-border `orange-500/40`
- Text: white primary, `stone-400` muted, `stone-500` super-muted
- Accent CTAs: gradient `from-orange-600 to-red-600`, border `orange-500/30`, orange glow shadows
- Outline buttons: `border-2 border-orange-500/40`, text `orange-500`/`orange-400`
- Eyebrow labels: `text-orange-500` `tracking-[0.3em]` (`0.4em` in hero), uppercase, with orange drop-shadow glow
- H2 second-line gradient text: `from-orange-400 to-red-500`
- Hero H1 gradient ("Ignited."): `from-orange-400 via-amber-500 to-red-500`
- Ember accent lines at section edges: `bg-gradient-to-r from-transparent via-orange-500/40-60 to-transparent`

## Partials

This site uses **marked partials** for the shared nav, footer, and Tailwind config. Source of truth lives in `_partials/`:

- `_partials/nav.html` — full header + mobile menu
- `_partials/footer.html` — footer
- `_partials/tailwind-config.html` — Tailwind theme extensions

Pages reference them via HTML-comment markers:

```html
<!-- partial:nav activePage="home" -->
...rendered content — DO NOT hand-edit, regenerated on every turn...
<!-- /partial:nav -->
```

**To change the nav/footer/Tailwind config: edit the file in `_partials/`.** The manager app re-renders all pages after every turn. Editing inside a marker region in a page is overwritten on the next run (a `PostToolUse` hook warns you in real time if it happens).

Template syntax: `{{var}}` and `{{#if var=="lit"}}...{{else}}...{{/if}}`. Truthy check: `{{#if var}}...{{/if}}`. No nesting.

Pyro is single-page today; partials are scaffolded so new pages drop in with consistent nav/footer.

## Do Not Touch

- `netlify.toml` and any `netlify/functions/*` files — platform-managed.
- `_reference/` — dealer-local visual truth, do not alter.
- `spoke.config.json` — only edit to reflect genuine dealer data changes (new phone, updated services, etc.). Do NOT edit to override hub content.
- `_partials/` marker regions in `index.html` — edit the partial template, not the rendered output.

## Client Quirks

- TODO — anything non-obvious the client insists on or has rejected before

## Reference Sites

See `spoke.config.json` → `referenceSites`.
