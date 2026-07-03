# @btravstack/theme

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
