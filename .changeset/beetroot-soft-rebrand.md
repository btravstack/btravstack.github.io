---
"@btravstack/theme": minor
---

Beetroot Soft rebrand — warm, rounded, soft-but-exact.

- Light warm near-white paper (`oklch(97.5% 0.008 353)`) is now the canonical scheme; dark stays the soft plum, activated on `.dark`.
- Typography: Plus Jakarta Sans (display) + Geist (body) + JetBrains Mono (code) replace Montserrat.
- Rounded, friendly shape language: 12px card corners, pill buttons, soft accent-tinted shadows, hairline rules, hover-lifts; solid ink hero name (no gradient text), gently floating hero mark preserved as the one character moment.
- Non-breaking: all semantic tokens keep their names and the one-knob rebrand contract is unchanged — consumer sites still override only `--accent` (`:root:root { --accent: … }`) and every derived shade follows via `color-mix`.
