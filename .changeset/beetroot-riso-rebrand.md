---
"@btravstack/theme": minor
---

Beetroot Riso rebrand — the theme becomes a risograph-printed contract.

- Light cream paper (`oklch(96.5% 0.010 353)`) is now the canonical scheme; dark is the "night edition" soil-black override on `.dark`.
- Typography: Bricolage Grotesque (display) + Geist (body) + JetBrains Mono (code) replace Montserrat.
- Square corners everywhere (`--radius-*: 0`), hard-offset shadows (no blur, no glow), 2px ink rules, solid non-frosted navbar, solid ink hero name (no gradient text, no hero glow/float).
- Non-breaking: all semantic tokens keep their names and the one-knob rebrand contract is unchanged — consumer sites still override only `--accent` (`:root:root { --accent: … }`) and every derived shade follows via `color-mix`.
