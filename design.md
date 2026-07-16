# Design — btravstack · "Beetroot Stack" (studied DNA)

A locked design system for the btravstack org (landing + `@btravstack/theme` +
the four docs sites). Every page redesign reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs to
grow.

**The idea.** Studied from the user's stated inspiration. The org is a
*colorful stack of distinct tools* on a near-neutral black canvas: the
beetroot pink is the ORG accent (wordmark, links, CTAs, mascot), while each
package glows in **its own accent** — amqp orange, temporal indigo, unthrown
green, demesne violet. Weight-contrast typography (one grotesque at 400 vs
800), elevation through surface lightness, real numbers in the hero, and the
gradient beetroot mascot as the one character moment.

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

- Marketing pages (landing): **Ecosystem Index** — wordmark-led hero with the
  mascot beside and a **real-stats strip** beneath (live GitHub stars, live
  npm downloads, package count — never invented numbers), then the stack as
  per-package-colored elevated panels, philosophy panels, "why now" cluster,
  inspirations, closing CTA.
- Docs sites (VitePress content): default VitePress layout wearing the theme
  tokens — floating hero mark with a subtle halo, elevated feature cards,
  the site's own package accent everywhere via the one-knob override.
- Nav: **N1b three-section** — wordmark · centered links · toggle + GitHub.
- Footer: **Ft3 index** — justified: the landing is a genuine hub for four
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
| `--pkg-unthrown` | `#46B86C` | darken 30% at point of use |
| `--pkg-demesne` | `#B45CE0` | darken 30% at point of use |

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
page-level dividers (stats strip, footer). Shadows: darkness at rest;
per-package color glow on package-panel hover only.

## Motion

- Easings: `--ease: cubic-bezier(0.16, 1, 0.3, 1)`; durations ≤ 0.2s.
- Three primitives: mascot bob (character moment), panel hover lift (+ the
  package-colored shadow), copy toast. No blooms, no scroll reveals, no
  marquees. Reduced-motion: bob stops, transitions collapse.

## Microinteractions stance

- Silent success (copy button → small mono toast, 1.6s).
- Hover tooltips 800ms · focus 0ms. Focus rings instant, 2px accent.

## CTA voice

- Primary: accent-filled rounded rectangle (10px radius), ink text, Geist 700.
- Secondary: outlined, transparent.

## Logos

The original soft gradient marks stay — mascot, rabbit, hourglass, no-throw,
shield. They read perfectly on the near-black canvas and each sits inside its
package-colored panel context.

## What pages MUST share

- The wordmark voice and the one-knob accent architecture.
- The neutral-canvas / colored-products split (the multi-accent rule).
- Geist + JetBrains Mono, elevation-not-borders, honest numbers.
- Exactly one character moment (the floating mascot) per page.

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
  --pkg-unthrown:  #46B86C;
  --pkg-demesne:   #B45CE0;
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
