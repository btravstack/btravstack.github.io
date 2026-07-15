# Design — btravstack · "Beetroot Atlas"

A locked design system for the btravstack org (landing + `@btravstack/theme` +
the four docs sites). Every page redesign reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs to
grow.

**The idea.** A botanical atlas. The beetroot (btrav ~ betterave) is a
fine-line engraving on warm ivory paper — hand-tinted linework, hairline rules,
double-rule plate frames, numbered plates, a high-contrast serif. Premium
through restraint: almost no motion, letterspaced small caps, generous
whitespace. Supersedes the rejected "Beetroot Riso" (brutalist) and
"Beetroot Soft" (playful) systems — no hard slabs, no pills, no cards, no
mascot bobbing.

## Genre

editorial — premium register. Vibe: *"botanical atlas, engraved plates, warm
ivory, exact"*.

## Macrostructure family

- Marketing pages (landing): **Catalogue** — left-biased hero (serif headline +
  framed engraving plate), an inventory band, a uniform grid of numbered
  double-rule plates (Pl. I is the beetroot; Pl. II–V the packages), then
  editorial sections: numbered principles (I–III), ruled prose columns, a
  hairline index, a quiet typographic close.
- Docs sites (VitePress content): default VitePress layout wearing the theme
  tokens — Fraunces headings, hairline feature frames, still (no float, no
  glow), near-sharp corners.
- Nav: **N9 edge-aligned** — wordmark hard-left, toggle + text CTA hard-right.
- Footer: **Ft1 mast-headed** — single band: wordmark, tagline, small links,
  MIT line.

## Theme

Light "atlas ivory" is canonical; dark "aubergine" via `.dark`.
Only lightness/chroma move between schemes.

| Token | Light (canonical) | Dark — aubergine |
| --- | --- | --- |
| `--bg` (paper) | `oklch(95.5% 0.015 85)` warm ivory | `oklch(17.5% 0.020 340)` |
| `--card` | `oklch(93% 0.018 85)` | `oklch(21% 0.022 340)` |
| `--text` (ink) | `oklch(25% 0.020 30)` sepia-black | `oklch(93% 0.008 60)` warm cream |
| `--accent` | **#E0589A** = `oklch(65.5% 0.182 353)` — THE knob | same |
| `--text-accent` | accent darkened 30% (AA on ivory) | `var(--accent)` |
| rules | hairlines (22–38% ink mix); plates use double frames | same recipe |
| focus ring | accent darkened 18% — instant, never animated | same |

**One-knob rebrand is contractual.** Docs sites override only `--accent`
(`:root:root { --accent: … }`); every derived shade flows via `color-mix`.
amqp `#FF6600` · temporal `#6B76F2` · unthrown `#46B86C` · demesne `#B45CE0`.
Note: the paper is hue-neutral warm ivory (hue 85), so it harmonises with any
per-site accent.

Accent discipline: text-level only (labels, underlines, plate numbers); fills
appear only on docs-site brand buttons. Washes ≤ 13% opacity.

## Typography

- Display: **Fraunces** (variable, optical size), weight 550–650, roman,
  sentence case. Never italic headers, never all-caps headlines — all-caps is
  reserved for small-caps labels (`Pl. II — Messaging`) at 12px, tracked 0.12em.
- Body: **Switzer** (Fontshare), 400–600.
- Mono (outlier): **JetBrains Mono** — code, package identifiers, star counts.
- Hero headline ≤ 50 chars at `--fs-hero: clamp(36px, 4.8vw, 54px)`.
- 2+1 rule: exactly these three families.

## Spacing / shape

Named px scale in `packages/theme/src/tokens.css` (`--space-1…6`). Corners:
near-sharp (3–8px; plates fully square). Shadows: none in the design language
(a 1px hairline "rest" shadow at most; toast excepted). No glassmorphism, no
frosted nav — atlas paper is solid.

**The plate device** is the system's signature: 1px outer rule + 5px gutter +
1px inner rule, square corners, small-caps caption with an accent plate number.
Use it for framed content, never for generic cards.

## Motion

- Easings: `--ease: cubic-bezier(0.16, 1, 0.3, 1)`; durations ≤ 0.18s.
- Stance: near-none. Hover = underline/color shifts only. No floats, no lifts,
  no marquees, no scroll reveals. The copy toast is the only moving element.
- Reduced-motion: transitions collapse; toast becomes opacity-only.

## Microinteractions stance

- Silent success (copy button → small mono toast, 1.6s).
- Hover tooltips 800ms · focus 0ms. Focus rings instant, 2px `--focus`.

## CTA voice

- Primary: typographic — Fraunces 600 + 2px accent underline + arrow glyph.
  No filled buttons on marketing pages.
- Docs sites keep VitePress's filled brand button (accent fill, ink text,
  4px radius) for functional CTAs.

## Logos

All five marks are **fine-line botanical engravings**: sepia-ink linework
(cream-ink on dark), hand-tint fills (soft beet pink, soft leaf green), hatch
shading, hand-drawn irregularity. Concepts: beetroot (org, Pl. I with root
cross-section), rabbit (amqp), hourglass with beet sand (temporal), no-throw
ring (unthrown), double-frame shield (demesne). Per-scheme files swap ink +
tint values only. Never flatten to hard-edge marks; never revert to gradients.

## What pages MUST share

- The wordmark voice (Fraunces 600, "btrav" in `--text-accent` + "stack" in ink).
- The one-knob accent architecture; accent as text/underline, not fills.
- The three fonts, hairline-rule language, the plate device, small-caps labels.
- The stillness — motion stays near-zero everywhere.

## What pages MAY differ on

- Macrostructure within the family (a future page may be Long Document or
  Conversational FAQ — still wearing this theme).
- Per-site accent hue (docs sites).
- Docs sites keep VitePress's functional layout; only the dress is shared.

## Exports

### tokens.css
The canonical export lives at `packages/theme/src/tokens.css` (published as
`@btravstack/theme`). It is the single source of truth; do not duplicate here.

### Quick-reference (other projects)
```css
:root {
  --color-paper:  oklch(95.5% 0.015 85);
  --color-ink:    oklch(25% 0.020 30);
  --color-accent: #E0589A;
  --font-display: "Fraunces", serif;
  --font-body:    "Switzer", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  --ease:         cubic-bezier(0.16, 1, 0.3, 1);
  --rule-hair:    1px;
}
```
