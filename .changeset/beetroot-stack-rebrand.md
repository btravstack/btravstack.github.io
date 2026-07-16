---
"@btravstack/theme": minor
---

Beetroot Stack rebrand — studied from tanstack.com: a near-neutral black canvas where each package glows in its own accent.

- Near-black canvas (`oklch(13% 0.006 310)`) is the canonical dark-default; the light scheme remains the daylight fallback.
- Typography: Geist (display 700/800 + body — weight contrast does the branding) + JetBrains Mono replace Montserrat.
- The multi-accent stack: new `--pkg-amqp` / `--pkg-temporal` / `--pkg-unthrown` / `--pkg-demesne` tokens expose the official per-package accents so the landing (and any consumer) can show the stack in color; the org beetroot pink stays the `--accent` knob for wordmark, links and CTAs.
- Elevation through surface lightness (no hairline card borders), solid ink hero name (no gradient text), floating hero mark kept as the one character moment, no glow washes.
- Non-breaking: all semantic tokens keep their names and the one-knob rebrand contract is unchanged — each docs site still overrides only `--accent` with its package color, which is exactly the studied per-library accent system.
