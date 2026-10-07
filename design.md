# Design — btravstack · "Beetroot Stack" (studied DNA)

A locked design system for the btravstack org (landing + `@btravstack/theme` +
the project docs sites). Every page redesign reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs to
grow.

**The idea.** Studied from the user's stated inspiration. The org is a
*colorful stack of distinct tools* on a near-neutral black canvas: the
beetroot pink is the ORG accent (wordmark, links, CTAs, umbrella mark), while each
package glows in **its own accent** — amqp orange, temporal indigo, unthrown
teal, entity amber, di blue. Weight-contrast typography (one grotesque at
400 vs 800), elevation through surface lightness, a framework-first hero,
and a coordinated beetroot mark family.

## Provenance

Extracted from `https://tanstack.com/` on 2026-07-16 as a **public reference
for the user's own brand** (user-stated inspiration). Sources: page HTML via
WebFetch + own headless screenshot (so the rhythm pass is covered). The DNA is
structural — macrostructure, multi-accent model, type roles, stats-hero;
tokens below are btravstack's own, not the source's. Do not copy TanStack
copy, artwork, or exact hues.

## Genre

atmospheric (studied register — dark, quiet, confident; no blooms).

## Macrostructure family

- Marketing pages (landing): **Ecosystem Index** — framework-led hero with the
  umbrella mark beside and a capability strip beneath, then the framework
  overview and independent libraries as
  per-package-colored elevated panels, philosophy panels, "why now" cluster,
  inspirations, closing CTA.
- Docs sites (VitePress content): default VitePress layout wearing the theme
  tokens — floating hero mark with a subtle halo, elevated feature cards,
  the site's own package accent everywhere via the one-knob override.
- Nav: **N1b three-section** — wordmark · centered links · toggle + GitHub.
- Footer: **Ft3 index** — justified: the landing is a genuine hub for the project
  docs sites. Brand column + Docs column + GitHub column + MIT line. No
  social row, no Legal filler.

## Theme

**Dark near-black is canonical**; light is the daylight fallback.

| Token | Dark (canonical) | Light |
| --- | --- | --- |
| `--bg` (canvas) | `oklch(13% 0.006 310)` ≈ #080709 | `#FAF9FA` |
| `--card` | `oklch(17% 0.007 310)` — elevation 1 | `#FFFFFF` |
| `--card-soft` | `oklch(20.5% 0.008 310)` — elevation 2 | `#F0EDF0` |
| `--text` | `oklch(95% 0.004 310)` | `#1B1218` |
| `--accent` (org) | **#E0589A** — THE knob | same (text darkens for AA) |
| `--pkg-amqp` | `#FF6600` | darken 30% at point of use |
| `--pkg-temporal` | `#6B76F2` | darken 30% at point of use |
| `--pkg-unthrown` | `#3FB0A5` | darken 30% at point of use |
| `--pkg-entity` | `#C8871F` | darken 30% at point of use |
| `--pkg-di` | `#3E7FD4` | darken 30% at point of use |

**The multi-accent rule (the studied signature).** The canvas and chrome are
near-neutral; color belongs to the *products*. Package names, category dots
and panel hover-glows use the package's own accent. The org accent never
paints package content, and package accents never paint org chrome. Each docs
site keeps overriding only `--accent` with its package color — that IS this
system.

**Honest numbers.** The stats strip may only show live-fetched values
(GitHub API, npm downloads API) or real baselines; unfetched values render
as `—`, never a made-up figure.

## Typography

- Display + body: **Geist** — weight contrast does the branding (display
  700/800, tracking −0.03em; body 400/500). Sentence case; never italic
  headers; never gradient text.
- Mono (outlier): **JetBrains Mono** — code, identifiers, tags, tabular stats.
- Wordmark: Geist 800, "btrav" in `--display-accent` + "stack" in ink.

## Spacing / shape

Named px scale in `packages/theme/src/tokens.css` (`--space-1…6`). Corners:
10–14px cards, 999px only where legacy pills remain. **No hairline card
borders** — elevation via `--card` / `--card-soft`; 1px rules only as
page-level dividers (stats strip, footer). The one sanctioned border is the
1.5px *dashed* accent edge on an incubating/WIP surface (see Logos → Status
badge and "What pages MUST share"). Shadows: darkness at rest; per-package
color glow on package-panel hover only.

## Motion

- Easings: `--ease: cubic-bezier(0.16, 1, 0.3, 1)`; durations ≤ 0.2s.
- Three primitives: panel hover lift (+ the
  package-colored shadow), copy toast. No blooms, no scroll reveals, no
  marquees. Reduced-motion: transitions collapse.

## Microinteractions stance

- Silent success (copy button → small mono toast, 1.6s).
- Hover tooltips 800ms · focus 0ms. Focus rings instant, 2px accent.

## CTA voice

- Primary: accent-filled rounded rectangle (10px radius), ink text, Geist 700.
- Secondary: outlined, transparent.

## Logos

The logo family preserves the illustrated beetroot mascot: rounded pink body,
three green leaves, bright eyes, rosy cheeks, and soft gradient shading. The
framework's approved PNG — the smiling beet resting on three teal layers — is
the art reference. Its original raster stays available alongside the vector
redrawing; vector shading is intentionally smooth rather than textured.

Every project keeps its original motif: unthrown's no-throw sign, entity's
identity card, di's syringe, AMQP's envelope, and Temporal's hourglass. Tools
carries a wrench and the shared theme carries a palette. The umbrella mascot
is the same beet without a project prop. Do not replace the characters with
abstract glyphs or recolor their bodies to the project's accent.

The editable source is `scripts/generate-brand.mjs`; run `pnpm brand` to
regenerate the website assets and shared theme attribution mark together.
All illustrations are native SVG paths and gradients on a transparent
`512 × 512` canvas, with no embedded raster images. Light and dark files keep
the same character colors, which work on either background. `*-mono.svg` is
the grayscale print variant; `*-favicon.svg` supplies a standalone browser icon.
Assets copied into project repositories stay local, so a theme release or
website deployment is not a prerequisite for their logos to work.

The homepage leads with the framework and its getting-started guide. The root
URL remains the ecosystem entrance; framework documentation keeps its
`/btravstack/` URLs. Independent libraries remain first-class destinations.
The capability strip describes shipped behavior; the page does not fetch
popularity counters. `di` links into the framework repository and reference.

**Status badge.** The worker beet (hard hat + shovel) is a small
complementary *marker*, never a project logo: it appears only inside a
maturity chip (`alpha`, `under construction`) at ~13px, or as a 64px figure in
a docs-page notice strip. Incubating projects still carry their own product
mark everywhere a logo belongs.

## What pages MUST share

- The wordmark voice and the one-knob accent architecture.
- The neutral-canvas / colored-products split (the multi-accent rule).
- Geist + JetBrains Mono, elevation-not-borders, honest numbers. **One
  exception:** an incubating/WIP surface may carry a 1.5px *dashed* accent
  border — a deliberate "not finished" signal, distinct from the banned
  hairline card border. Solid card borders remain banned.
- Product marks are functional identities, not decoration. Keep their
  silhouettes and symbols intact; use the supplied variants on each surface.

## What pages MAY differ on

- Macrostructure within the family for future marketing pages.
- Per-site accent hue (docs sites) — that's the system working as designed.
- Docs sites keep VitePress's functional layout; only the dress is shared.

## Exports

### tokens.css
The canonical export lives at `packages/theme/src/tokens.css` (published as
`@btravstack/theme`). It is the single source of truth; do not duplicate here.

### Quick-reference (other projects)
```css
:root {
  --color-paper:   oklch(13% 0.006 310);
  --color-ink:     oklch(95% 0.004 310);
  --color-accent:  #E0589A;            /* org */
  --pkg-amqp:      #FF6600;
  --pkg-temporal:  #6B76F2;
  --pkg-unthrown:  #3FB0A5;
  --pkg-entity:    #C8871F;
  --pkg-di:        #3E7FD4;
  --font-display:  "Geist", sans-serif; /* 800 for display */
  --font-body:     "Geist", sans-serif;
  --font-mono:     "JetBrains Mono", monospace;
  --ease:          cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Notes — anti-patterns not to carry over from the source

- No embedded AI prompt-box gimmick.
- No partner/sponsor tier walls (no such content).
- No invented statistics — live APIs or `—`.
