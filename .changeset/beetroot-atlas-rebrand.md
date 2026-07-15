---
"@btravstack/theme": minor
---

Beetroot Atlas rebrand — a botanical atlas: engraved, warm, exact.

- Light warm-ivory paper (`oklch(95.5% 0.015 85)`) with sepia ink is now the canonical scheme; dark becomes the "aubergine" scheme on `.dark`.
- Typography: Fraunces (display serif) + Switzer (body) + JetBrains Mono (code) replace Montserrat.
- Shape language: hairline rules, near-sharp corners, no decorative shadows, solid (non-frosted) navbar, solid ink hero name, still hero mark (no float, no glow). Motion reduced to near-zero.
- Non-breaking: all semantic tokens keep their names and the one-knob rebrand contract is unchanged — consumer sites still override only `--accent` (`:root:root { --accent: … }`) and every derived shade follows via `color-mix`. The new ivory paper is hue-neutral, so per-site accents (orange/indigo/green/violet) harmonise without changes.
