---
"@btravstack/theme": minor
---

Beetroot Nocturne rebrand — the original identity, elevated: built for the dark.

- Deep plum canvas (`oklch(17% 0.024 305)`) stays the canonical dark-default; the light scheme remains the daylight fallback.
- Typography: Geist (display 600/700 + body) + JetBrains Mono replace Montserrat.
- Atmosphere with discipline: ambient beetroot blooms (fixed, never animated, accent-derived so they recolor per site), elevation through surface lightness instead of card borders, warm accent glow on hover, solid ink hero name (no gradient text), floating hero mark kept as the one character moment.
- Non-breaking: all semantic tokens keep their names and the one-knob rebrand contract is unchanged — consumer sites still override only `--accent` (`:root:root { --accent: … }`) and every derived shade (blooms included) follows via `color-mix`.
