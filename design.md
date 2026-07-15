# Design — btravstack · "Beetroot Nocturne"

A locked design system for the btravstack org (landing + `@btravstack/theme` +
the four docs sites). Every page redesign reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs to
grow.

**The idea.** The original identity, elevated. A deep plum canvas built for the
dark, two warm beetroot blooms, a weighty geometric sans, elevation through
lightness instead of borders, warm glow on interaction, and the gradient
mascot floating as the one character moment per page. (This is the dark
atmospheric candidate — the sibling of "Beetroot Atlas" on
`design/beetroot-atlas`; one of the two ships.)

## Genre

atmospheric. Vibe: *"late-night plum, warm bloom, velvet, exact"*.

## Macrostructure family

- Marketing pages (landing): **Marquee Hero** — the fold is the canvas
  (mascot + one statement + scroll cue, nothing else), a thick accent-wash
  rule, then intro + CTAs, elevated package panels, quiet numbered columns,
  a bloom-lit "why now" cluster, inspiration cards, closing CTA.
- Docs sites (VitePress content): default VitePress layout wearing the theme
  tokens — floating hero mark, one ambient bloom top-right, elevated feature
  cards with glow hover.
- Nav: **N5 floating pill** — content-sized, detached, blur backdrop over the
  bloom.
- Footer: **Ft5 statement** — one large display sentence + a quiet meta row.

## Theme

**Dark "nocturne" is canonical** — the page is built for the dark. Light is
the daylight fallback on `:root:not(.dark)`.

| Token | Dark (canonical) | Light |
| --- | --- | --- |
| `--bg` (canvas) | `oklch(17% 0.024 305)` deep plum | `#FBF7F9` warm near-white |
| `--card` | `oklch(20.5% 0.026 305)` — elevation step 1 | `#FFFFFF` |
| `--card-soft` | `oklch(24% 0.027 305)` — elevation step 2 | `#F0E6EC` |
| `--text` | `oklch(94% 0.008 340)` | `#1F0E18` |
| `--accent` | **#E0589A** = `oklch(65.5% 0.182 353)` — THE knob | same (fills stay vibrant) |
| `--text-accent` | `var(--accent)` (reads on plum) | accent darkened 26% (AA) |
| `--bloom` / `--bloom-2` | accent at 15% / deep at 13% — radial only | 11% / 8% |

**One-knob rebrand is contractual.** Docs sites override only `--accent`
(`:root:root { --accent: … }`); every derived shade — including the blooms —
flows via `color-mix`. amqp `#FF6600` · temporal `#6B76F2` · unthrown
`#46B86C` · demesne `#B45CE0`.

Bloom discipline: at most two per page, radial, fixed, never animated,
~20–30% footprint each. Accent fills only on pill CTAs and small tags.

## Typography

- Display + body: **Geist** — one weighty family (display 600/700, tracking
  −0.03em; body 400/500). The single-family voice is the atmospheric register.
- Mono (outlier): **JetBrains Mono** — code, identifiers, numerals, star counts.
- Statement scale: `--fs-hero: clamp(42px, 5.5vw + 12px, 84px)`.
- Never italic headers, never gradient text.

## Spacing / shape

Named px scale in `packages/theme/src/tokens.css` (`--space-1…6`). Corners:
rounded (12–16px cards, 999px pills). **No hairline card borders** — elevation
comes from surface lightness (`--card`, `--card-soft`); hairlines only as
page-level dividers. Shadows: darkness for depth at rest, warm accent glow
(`--shadow-accent`) on hover.

## Motion

- Easings: `--ease: cubic-bezier(0.16, 1, 0.3, 1)`; durations ≤ 0.2s.
- Three primitives: the mascot bob (character moment), hover lift + glow on
  interactive cards, the copy toast. Fade only otherwise — no slide, no bounce.
- Blooms never move. Reduced-motion: bob stops, transitions collapse.

## Microinteractions stance

- Silent success (copy button → small mono toast, 1.6s).
- Hover tooltips 800ms · focus 0ms. Focus rings instant, 2px accent.

## CTA voice

- Primary: confident accent-filled pill, ink text, Geist 600. One per view.
- Secondary: outlined pill, transparent fill.

## Logos

The original soft gradient marks are the canon here — they were drawn for
this dark canvas (mascot, rabbit, hourglass, no-throw, shield). Keep the
gradients; keep the rounded warmth.

## What pages MUST share

- The wordmark voice (Geist 700, "btrav" in accent + "stack" in ink).
- The one-knob accent architecture and bloom discipline.
- Geist + JetBrains Mono, pill CTAs, elevation-not-borders.
- Exactly one character moment (the floating mascot) per page.

## What pages MAY differ on

- Macrostructure within the family (a future page may be Feature Stack or
  Split Studio — still wearing this theme).
- Per-site accent hue (docs sites) — blooms recolor automatically.
- Docs sites keep VitePress's functional layout; only the dress is shared.

## Exports

### tokens.css
The canonical export lives at `packages/theme/src/tokens.css` (published as
`@btravstack/theme`). It is the single source of truth; do not duplicate here.

### Quick-reference (other projects)
```css
:root {
  --color-paper:  oklch(17% 0.024 305);
  --color-ink:    oklch(94% 0.008 340);
  --color-accent: #E0589A;
  --font-display: "Geist", sans-serif;
  --font-body:    "Geist", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  --ease:         cubic-bezier(0.16, 1, 0.3, 1);
  --radius-card:  16px;
}
```
