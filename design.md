# Design — btravstack · "Beetroot Riso"

A locked design system for the btravstack org (landing + `@btravstack/theme` +
the four docs sites). Every page redesign reads this file before emitting code.
Do not regenerate per page — extend or amend this file when the system needs to
grow.

**The idea.** The brand is a risograph-printed contract. Riso printing = flat
spot-colors on cream paper, hard edges, visible ink, slight misregistration —
and beetroot pink is a classic riso ink. btrav ~ betterave (beetroot); the pun
is carried by the ink, not by a mascot. Pages read as printed documents:
declarations, numbered clauses, spec-sheet tables, a colophon signature block.
"The signature is the doc" — literally.

## Genre

editorial — brutalist register. Vibe: *"beetroot risograph, contract-as-document,
raw, technical"*.

## Macrostructure family

- Marketing pages (landing): **Manifesto** — declaration hero (left-biased,
  all-caps display), numbered clauses, ink-bleed blocks as section dividers,
  oversized solid block CTA far below the fold. Packages presented as an
  **F3 tabular spec-sheet**, never cards.
- Docs sites (VitePress content): default VitePress layout wearing the theme
  tokens — square corners, 2 px rules, mono labels, flat blocks. No glow, no
  float, no gradient text.
- Nav: **N7 brutal slab** (2 px ink border-bottom, tracked caps links).
- Footer: **Ft4 dense colophon** — a mono signature block, contract-style.

## Theme

Light "riso print" is canonical; dark "night edition" via `.dark`.
Only lightness/chroma move between schemes — the hue never changes.

| Token | Light (canonical) | Dark |
| --- | --- | --- |
| `--bg` (paper) | `oklch(96.5% 0.010 353)` ≈ #f9f1f4 | `oklch(17% 0.022 335)` ≈ #150c13 |
| `--card` (paper-2) | `oklch(93.5% 0.014 353)` | `oklch(21% 0.024 335)` |
| `--text` (ink) | `oklch(21% 0.020 350)` ≈ #20151a | `oklch(93% 0.010 340)` |
| `--muted` | `oklch(38% 0.018 350)` | `oklch(76% 0.014 340)` |
| `--accent` | **#E0589A** = `oklch(65.5% 0.182 353)` — THE knob | same (fills stay vibrant) |
| `--text-accent` | `oklch(51% 0.19 355)` ≈ #b11e6b (AA on cream) | `var(--accent)` |
| `--green` (leaf) | #3DAE62 `oklch(66.8% 0.151 151)` | same |
| focus ring | `oklch(60% 0.21 353)` — instant, never animated | same |

**One-knob rebrand is contractual.** Docs sites override only `--accent`
(`:root:root { --accent: … }`); every derived shade flows via `color-mix`.
amqp `#FF6600` · temporal `#6B76F2` · unthrown `#46B86C` · demesne `#B45CE0`.

Accent discipline: ≤ 5 % of any viewport. The oversized block CTA is the one
sanctioned large accent fill per page.

## Typography

- Display: **Bricolage Grotesque**, weight 700–800, roman, uppercase for
  manifesto headlines, tracking −0.02em. Never italic headers.
- Body: **Geist**, weight 400 (350 visual weight on dark via 400 + dark scheme).
- Mono (outlier): **JetBrains Mono** — code and clause numerals only.
- Display scale anchor: `--fs-hero: clamp(44px, 7.5vw, 92px)`; all-caps display
  line-height 1.02–1.08.
- 2+1 rule: exactly these three families, nothing else.

## Spacing / shape

4-pt-ish named scale in `packages/theme/src/tokens.css` (`--space-1…6`). Pages
use tokens, never raw values.
Corners: **square** (`--radius-*: 0`). Shadows: **hard offsets only**
(`4px 4px 0 <ink>`), no blur, no glow ever.
Rules: 2 px solid ink for structure; hairlines only inside dense tables.

## Motion

- Easings: `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`; durations ≤ 0.2 s.
- Stance: near-none. State changes are instant flips (ink↔paper inversion on
  hover). No scroll reveals, no float loops, no glow pulses.
- Reduced-motion: everything already ≤ 150 ms opacity/color; nothing spatial.

## Microinteractions stance

- Silent success (copy button shows a small mono toast, 1.6 s, no celebration).
- Hover tooltips 800 ms · focus 0 ms. Focus rings instant, 2 px solid focus color.

## CTA voice

- Primary: solid block, square, ink-on-accent or paper-on-ink, uppercase
  Bricolage, generous padding. One oversized block CTA per page, far below fold.
- Secondary: C3 typographic link — word + arrow + 2 px underline. No pills,
  no gradients, no rounded buttons anywhere.

## Logos

Flat riso marks: solid spot-color shapes (project accent + leaf green + ink),
hard edges, **no gradients, no radial highlights**, one deliberate
misregistration offset layer (deep shade, offset ~3 px) as the riso signature.
Each project keeps its concept (rabbit, clock, no-throw, keep) rebuilt in this
construction. Per-scheme variants only swap the "cutout" color to the paper.

## What pages MUST share

- The wordmark voice (Bricolage 800, "btrav" in accent + "stack" in ink).
- The one-knob accent architecture and its ≤ 5 % footprint.
- The three fonts, square corners, hard-offset shadows, 2 px rule language.
- The colophon-style footer voice.

## What pages MAY differ on

- Macrostructure within the family (a future marketing page may be Long
  Document — still wearing this theme).
- Per-site accent hue (docs sites).
- Docs sites keep VitePress's functional layout; only the dress is shared.

## Exports

### tokens.css
The canonical export lives at `packages/theme/src/tokens.css` (published as
`@btravstack/theme`). It is the single source of truth; do not duplicate here.

### Quick-reference (other projects)
```css
:root {
  --color-paper:  oklch(96.5% 0.010 353);
  --color-ink:    oklch(21% 0.020 350);
  --color-accent: #E0589A;
  --font-display: "Bricolage Grotesque", sans-serif;
  --font-body:    "Geist", sans-serif;
  --font-mono:    "JetBrains Mono", monospace;
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);
}
```
