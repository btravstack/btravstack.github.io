# @btravstack/theme

## 1.4.0

### Minor Changes

- eb27e65: Make the accent a single configurable knob. Every accent-derived value (deep, hover, soft, washes, hero glow, feature-icon chip, brand shades, light-mode AA text) now derives from `--accent` via `color-mix`, so a consumer site rebrands the whole theme with just:

  ```css
  :root {
    --accent: #ff6600;
  }
  ```

  The beetroot pink remains the default, so the btravstack org site is unchanged. `--text-accent` and `--accent-contrast` stay overridable for fine-tuning light-mode link contrast or ink-on-fill.
