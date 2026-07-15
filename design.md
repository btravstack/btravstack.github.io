# Design — btravstack · "Beetroot Soft"

A locked design system for the btravstack org (landing + `@btravstack/theme` +
the four docs sites). Every page redesign reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs to
grow.

**The idea.** Software can be soft and exact at once. The beetroot is a
charming character, not a logo stamp — one gentle character moment per page
(the floating mascot), warm near-white paper, white card lifts, 12px corners,
soft accent-tinted shadows, and a friendly-but-precise voice. Never childish,
never quirk-for-quirk. (Supersedes the rejected "Beetroot Riso" brutalist
system — hard edges, flat riso marks, and all-caps declarations are out.)

## Genre

playful (post-Linear soft, Hum-adjacent). Vibe: *"warm, rounded, charming
beetroot, soft-but-exact"*.

## Macrostructure family

- Marketing pages (landing): **Bento Grid** — compact centered hero (mascot +
  one-line headline + pill CTAs), then one friendly mosaic of mixed-span tiles
  (intro, principles, packages, "why now" cluster, inspirations, CTA tile).
- Docs sites (VitePress content): default VitePress layout wearing the theme
  tokens — rounded cards, soft hover-lifts, floating hero mark, tinted icon
  chips.
- Nav: **N1b** — wordmark left, centered links, toggle + filled pill CTA
  right, soft frost.
- Footer: **Ft8 marquee** — gently scrolling brand line (static under
  `prefers-reduced-motion`), with a compact meta/link row beneath.

## Theme

Light is canonical; dark is the soft plum the brand grew up on.
Only lightness/chroma move between schemes — the hue family never changes.

| Token | Light (canonical) | Dark — plum |
| --- | --- | --- |
| `--bg` (paper) | `oklch(97.5% 0.008 353)` | `oklch(18.5% 0.025 310)` |
| `--card` | `oklch(99.5% 0.003 353)` white lift | `oklch(22% 0.026 310)` |
| `--text` (ink) | `oklch(24% 0.020 350)` | `oklch(94% 0.008 340)` |
| `--accent` | **#E0589A** = `oklch(65.5% 0.182 353)` — THE knob | same (fills stay vibrant) |
| `--text-accent` | accent darkened 28% (AA on paper) | `var(--accent)` |
| rules | soft hairlines (12–20% ink mix) | same recipe |
| focus ring | accent darkened 16% — instant, never animated | same |

**One-knob rebrand is contractual.** Docs sites override only `--accent`
(`:root:root { --accent: … }`); every derived shade flows via `color-mix`.
amqp `#FF6600` · temporal `#6B76F2` · unthrown `#46B86C` · demesne `#B45CE0`.

Accent discipline: fills ≤ 5% of any viewport; large accent areas are washes
(`--accent-wash`, ≤ 14% opacity), never solid blocks.

## Typography

- Display: **Plus Jakarta Sans**, 700–800, roman, tracking −0.025em. Never
  italic headers, never all-caps headlines.
- Body: **Geist**, 400.
- Mono (outlier): **JetBrains Mono** — code, package identifiers, small labels.
- Hero headline ≤ 50 chars at `--fs-hero: clamp(38px, 5.5vw, 60px)`.
- 2+1 rule: exactly these three families.

## Spacing / shape

Named px scale in `packages/theme/src/tokens.css` (`--space-1…6`). Corners:
cards `--radius-lg` (12px) max, inputs 8px, pills/chips 999px. Shadows: soft
accent-tinted (`0 8px 24px -10px`), no hard offsets, no glow halos, no
glassmorphism-as-decoration (frosted sticky nav is the one functional frost).

## Motion

- Easings: `--ease: cubic-bezier(0.16, 1, 0.3, 1)`; durations ≤ 0.2s.
- Three primitives per page, max: the mascot idle bob (the character moment),
  card hover-lift (`translateY(-2px)` + shadow expansion), and the copy toast.
- No spring/overshoot on UI state. No scroll-triggered reveals.
- Reduced-motion: bob/marquee stop; state changes stay ≤ 150ms.

## Microinteractions stance

- Silent success (copy button → small toast, 1.6s, no celebration).
- Hover tooltips 800ms · focus 0ms. Focus rings instant, 2px `--focus`.

## CTA voice

- Primary: filled pill, accent fill + ink text, Plus Jakarta 700. One per view.
- Secondary: outlined pill or text link with arrow. No gradients, no springs.

## Logos

The original soft gradient marks are the canon — the beetroot mascot, rabbit,
hourglass, no-throw and shield keep their gradient warmth and rounded
construction. Do NOT flatten them into hard-edged print marks. Refinements
stay within the soft register.

## What pages MUST share

- The wordmark voice (Plus Jakarta 700+, "btrav" in accent-as-text + "stack" in ink).
- The one-knob accent architecture and its footprint discipline.
- The three fonts, 12px card corners, soft-shadow language, pill CTAs.
- The single character moment per page (never more than one).

## What pages MAY differ on

- Macrostructure within the family (a future marketing page may be Split
  Studio or Conversational FAQ — still wearing this theme).
- Per-site accent hue (docs sites).
- Docs sites keep VitePress's functional layout; only the dress is shared.

## Exports

### tokens.css
The canonical export lives at `packages/theme/src/tokens.css` (published as
`@btravstack/theme`). It is the single source of truth; do not duplicate here.

### Quick-reference (other projects)
```css
:root {
  --color-paper:  oklch(97.5% 0.008 353);
  --color-ink:    oklch(24% 0.020 350);
  --color-accent: #E0589A;
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body:    "Geist", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  --ease:         cubic-bezier(0.16, 1, 0.3, 1);
  --radius-card:  12px;
}
```
