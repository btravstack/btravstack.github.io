# btravstack design system

The shared visual language for **btravstack** — this landing page and every
project docs site. It is a small set of CSS files driven by design tokens
(CSS custom properties). No build step, no framework.

```
theme/
├─ tokens.css      Design tokens — the single source of truth.
├─ fonts.css       @font-face / Google Fonts (Montserrat + JetBrains Mono).
├─ theme.css       Base styles + component classes for plain HTML.
│                  Imports fonts.css + tokens.css → link this one file.
├─ vitepress.css   Adapter: maps tokens onto VitePress's --vp-* variables.
└─ preview.html    Living style guide (open it to see every token).
```

## Use it

### Plain HTML (this landing page, microsites)

```html
<link rel="stylesheet" href="theme/theme.css">
```

Then reference tokens directly:

```html
<button style="background:var(--accent);color:var(--accent-contrast);
               border-radius:var(--radius);font-family:var(--sans)">Get started</button>
```

### VitePress docs sites (amqp-contract, temporal-contract, unthrown)

Both consumer types theme through CSS variables, so one import does it.
In each docs repo, create/extend `.vitepress/theme/custom.css`:

```css
@import "https://cdn.jsdelivr.net/gh/btravstack/btravstack.github.io@main/theme/vitepress.css";
```

and ensure it's loaded by `.vitepress/theme/index.ts`:

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'
export default DefaultTheme
```

The adapter themes **both** color schemes, so you can leave VitePress's
default (`appearance: true`) to follow each visitor's OS preference — dark
adopts the btravstack surfaces, light keeps clean white surfaces with the
brand darkened for WCAG-AA contrast. If you'd rather pick a default, set
`appearance: 'dark'` (dark default, toggle kept) or `'force-dark'` (dark
only, no toggle) in `.vitepress/config.ts`.

## Distribution

The files are served two ways — pick per consumer:

| URL | When |
| --- | --- |
| `theme/theme.css` (relative) | same-origin pages in this repo |
| `https://btravstack.github.io/theme/<file>` | always-latest, the Pages site |
| `https://cdn.jsdelivr.net/gh/btravstack/btravstack.github.io@<ref>/theme/<file>` | external repos; cached + **versionable** |

Prefer the jsDelivr URL with a **pinned ref** for the docs sites so a token
change can't silently restyle published docs:

- `@main` — always latest (fine while iterating)
- `@v1.0.0` — pinned to a git tag (recommended once stable)

To cut a version: `git tag v1.0.0 && git push --tags`, then bump the `@ref`
in each docs repo when you want to adopt it.

## Changing the design

Edit **`tokens.css`** — it is the source of truth. Avoid hardcoding hex
values anywhere else; reference a token so the change propagates. After a
change, open `theme/preview.html` to eyeball every token in one place, then
tag a new version and roll it out to the docs sites.

> Future option: if a project ever needs tokens in TypeScript/SCSS (not just
> CSS), promote `tokens.css` to a `tokens.json` compiled by Style Dictionary
> into multiple targets. Not needed today — every current consumer reads CSS
> variables natively.
