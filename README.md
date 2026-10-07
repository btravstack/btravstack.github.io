# btravstack web

Turborepo for the btravstack website and its shared VitePress theme.

```
packages/theme/   @btravstack/theme — shared VitePress theme + design tokens (published to npm)
apps/website/     the btravstack landing site (VitePress) → deployed to GitHub Pages
```

## Develop

```sh
pnpm install
pnpm dev          # runs the website dev server (builds the theme on demand)
pnpm build        # builds the theme, then the website
```

## How it fits together

- **`@btravstack/theme`** wraps VitePress's default theme with the btravstack
  design tokens (beetroot brand, Geist + JetBrains Mono, light/dark
  surfaces). Every btravstack site — this website and the `amqp-contract` /
  `temporal-contract` / `unthrown` docs — depends on it, so they all share one
  look. It's built with `tsdown` and published to npm via `.github/workflows/release.yml`
  (changesets + npm Trusted Publishing).
- **`apps/website`** is a VitePress site that consumes the theme via
  `workspace:*` and is deployed to GitHub Pages by `.github/workflows/deploy-website.yml`.

## Releasing the theme

Add a changeset (`pnpm changeset`), merge to `main`; the Release workflow opens
a version PR and, when merged, publishes `@btravstack/theme`. Consumers bump the
dependency to adopt it.

## Website and framework

The domain root introduces the ecosystem, with the btravstack framework as
its main entry point. Framework tutorials and reference stay at
[/btravstack/](https://btravstack.github.io/btravstack/); independently usable
libraries keep their own documentation URLs.

## Brand assets

The illustrated family keeps the approved smiling beetroot, soft shading, and
each project’s original motif. The exact approved framework PNG is retained at
`apps/website/public/logos/framework.png` alongside its native SVG redrawing.

Run `pnpm brand` to regenerate the SVG family in `apps/website/public/logos`
and the shared theme's attribution mark. The source and palette live in
`scripts/generate-brand.mjs`; usage is documented in [design.md](design.md).

[The logo proof sheet](branding/logo-family.png) shows light/dark variants and
small sizes. The editable [social card](branding/social-card.html) accepts
`?project=btravstack` (or `framework`, `unthrown`, `entity`, `amqp-contract`,
`temporal-contract`, `tools`, `theme`). Render at 1200 × 630 with device scale
factor 1 after its fonts and images load. Exports live under
`apps/website/public/og-*.png`; project repositories carry local copies.
