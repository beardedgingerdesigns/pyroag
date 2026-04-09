# Pyro Ag Services

## Working Memory Protocol

**At the start of every session:** read `NOTES.md` in this repo. It contains recent decisions, open questions, and follow-ups from prior sessions. Treat it as load-bearing context.

**Before finishing any non-trivial work:** update `NOTES.md`. Specifically:
- Add new entries under "Recent decisions" with the *why*, not just the *what*. Include the date.
- Move resolved items out of "Open questions" and "Follow-ups".
- Add anything surprising, anything the client pushed back on, or anything a future session would need to know.
- Keep it terse — bullet points, not prose.

If `NOTES.md` doesn't exist, create it with the standard sections (Recent decisions / Open questions / Follow-ups).

## Site Requirements

Recreate the existing Pyro Ag Services site (currently hosted on Base44) as a static HTML + Tailwind site in this platform. Faithful visual recreation: same sections, same content, same brand feel. See _reference/ in this repo for the original screenshot, scraped text, structural summary, and logo.

Forms should be rendered as pure HTML markup only — real inputs with proper name/id attributes, but no submission handling, no JS, no form action. Submission handling will be wired up in a later phase.

## Site Profile

- **Client:** Pyro Ag Services LLC — Owner: Taylor Ross
- **Primary contact:** Taylor Ross, taylor.ross@pyroagllc.com, (605) 441-6825
- **Domain:** pyroagllc.com
- **Voice / tone:** Rugged, confident, action-oriented. Fire/ignition motif. Built for serious operators, not hobbyists.
- **Brand colors (from Base44 source — `_reference/source/.../src/components/`):**
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
- **Typography:** **System UI stack** (Tailwind default sans). Hero `<h1>` explicitly uses `system-ui` with `font-stretch: condensed`. Base44 source loads no Google Fonts — the "tall condensed" effect we saw in the screenshot is OS-level system-ui rendering. Earlier Bebas Neue / Source Sans 3 pick was a guess from the screenshot and has been overwritten to match source.
- **Logo:** `assets/logo.png` (flame "Y" icon, transparent bg, copied from `_reference/assets/logo.png`). The "PYRO AG SERVICES" wordmark on the original site does **not** appear in the header or footer — only the icon does, with an orange drop-shadow glow. Earlier guess was wrong.

## Brand Notes

Independent dealer brand. Owner: Taylor Ross. Based in Philip, SD; serves western South Dakota.

Visual direction (from _reference/screencapture-*.png and _reference/Pyro-Ag-Logo-2-rev.png):
- Dark dominant theme — near-black backgrounds (#0a0a0a area), slightly elevated dark gray cards
- Accent: Pyro orange (~Tailwind orange-600). Used sparingly — only on CTAs, the word "Ignited" in the H1, icon circles, and divider lines. Restrained, not flooded.
- Logo is a stylized "Y" rendered as flames on transparent background — sits next to a "PYRO AG SERVICES" wordmark in the header and footer
- Typography (TBD during setup): tall/condensed display sans for headlines (Bebas Neue / Anton / Oswald family), clean sans for body. Avoid generic system fonts.
- Brand thread: flame logo → orange accent → "Ignited" tagline → fire/ignition motif throughout. Preserve this thread.
- Tagline: "Precision Agriculture. Ignited."
- Trust positioning: "AUTHORIZED TERRAPLEX DEALER" eyebrow over the hero

## Reference Sites

- https://pyroagllc.com

## Do Not Touch

- TODO — list folders, files, or third-party scripts that should never be edited (legal pages, tracking pixels, vendor includes, etc.)

## Client Quirks

- TODO — anything non-obvious the client insists on or has rejected before

## Typography

Source-driven, no Google Fonts.

- **Body & default headings:** Tailwind's default sans stack (`ui-sans-serif, system-ui, -apple-system, sans-serif, ...`). The Base44 source loads no custom fonts; the live site renders entirely in the OS system stack.
- **Hero `<h1>` only:** explicit `font-family: system-ui, -apple-system, sans-serif` with `font-stretch: condensed`. On macOS / iOS this resolves to a noticeably condensed face, which is what gives the original its "tall display sans" feel. Other platforms may render closer to regular system-ui — accept the cross-platform variance, do not substitute a Google Font.
- **Type treatment:** Eyebrow labels are uppercase with `tracking-[0.3em]` or `tracking-[0.4em]` and an orange drop-shadow glow. H2s use `tracking-tight`. Body uses `leading-relaxed`.

Why no custom fonts: faithful match to source + zero font-loading cost + brand recognizability is carried by the flame logo and orange accent system, not by the typeface.

## Conventions

- HTML + Tailwind CSS — no JS frameworks, no build tools
- **URL structure:** Use directory-based routing for clean URLs. Each page gets its own folder with an `index.html` inside. For example, the about page should be `about/index.html` (not `about.html`). This allows navigating to `/about` instead of `/about.html`. The homepage remains `index.html` at the root.
- Keep it simple and lightweight

## Output Defaults

- Single `index.html` per page, all styles inline via Tailwind classes
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Images: use real photos from Unsplash. URL format: `https://images.unsplash.com/photo-{PHOTO_ID}?w=WIDTH&h=HEIGHT&fit=crop&auto=format` — search unsplash.com for relevant photos and use the photo ID from the URL. Never use placeholder images.
- Mobile-first responsive

## Frontend Design Guidelines

Before writing any frontend code, follow these design principles. Create distinctive, production-grade interfaces that avoid generic "AI slop" aesthetics.

### Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is intentionality, not intensity.

### Aesthetics

- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt for distinctive choices that elevate the design. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. CSS-only solutions preferred. Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, and grain overlays.

### Anti-Generic Guardrails

- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base -> elevated -> floating), not all sit at the same z-plane.

### What to Avoid

NEVER use generic AI aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Cliched color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and cookie-cutter component patterns
- Design that lacks context-specific character
- Default Tailwind colors and shadows without customization

Vary between light and dark themes, different fonts, different aesthetics. No two sites should look the same. Match implementation complexity to the aesthetic vision.
