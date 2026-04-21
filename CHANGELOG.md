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

No entries yet. First entry will be added when post-propagation customization
work begins (Phase 3 or earlier, whenever the first real deviation is introduced).
