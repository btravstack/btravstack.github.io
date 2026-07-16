# @btravstack/theme

## 1.7.0

### Minor Changes

- 3c47dc0: add the start package accent token (`--pkg-start`)

## 1.6.1

### Patch Changes

- 095f054: The "Part of BtravStack" strip now shows the new waving character mascot and the BtravStack brand casing.

## 1.6.0

### Minor Changes

- 458940e: Beetroot Stack rebrand — studied from tanstack.com: a near-neutral black canvas where each package glows in its own accent.

  - Near-black canvas (`oklch(13% 0.006 310)`) is the canonical dark-default; the light scheme remains the daylight fallback.
  - Typography: Geist (display 700/800 + body — weight contrast does the branding) + JetBrains Mono replace Montserrat.
  - The multi-accent stack: new `--pkg-amqp` / `--pkg-temporal` / `--pkg-unthrown` / `--pkg-demesne` tokens expose the official per-package accents so the landing (and any consumer) can show the stack in color; the org beetroot pink stays the `--accent` knob for wordmark, links and CTAs.
  - Elevation through surface lightness (no hairline card borders), solid ink hero name (no gradient text), floating hero mark kept as the one character moment, no glow washes.
  - Non-breaking: all semantic tokens keep their names and the one-knob rebrand contract is unchanged — each docs site still overrides only `--accent` with its package color, which is exactly the studied per-library accent system.

### Patch Changes

- b783afc: Declare `vue` as an optional peer dependency. The theme's `Layout` imports `vue` at runtime; it is always provided by the host VitePress app, so it is marked optional to avoid tripping strict / no-auto-install consumers while still documenting the requirement.

## 1.5.0

### Minor Changes

- be86959: Bring the docs-site chrome in line with the design mockups:

  - **"Part of btravstack" strip** beneath every page (rendered in the `layout-bottom` slot) — the org beetroot mark + wordmark, linking back to the hub.
  - **Larger home-hero mark** — the project logo now reads at the intended size instead of its small intrinsic dimensions.
  - **Broad accent glow shape** behind the hero (not just the small halo hugging the logo), and a slightly larger nav logo.

  All accent-derived via the existing `--accent` token, so every site keeps its own color.

## 1.4.0

### Minor Changes

- eb27e65: Make the accent a single configurable knob. Every accent-derived value (deep, hover, soft, washes, hero glow, feature-icon chip, brand shades, light-mode AA text) now derives from `--accent` via `color-mix`, so a consumer site rebrands the whole theme with just:

  ```css
  :root {
    --accent: #ff6600;
  }
  ```

  The beetroot pink remains the default, so the btravstack org site is unchanged. `--text-accent` and `--accent-contrast` stay overridable for fine-tuning light-mode link contrast or ink-on-fill.
