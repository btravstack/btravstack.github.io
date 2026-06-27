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
  design tokens (beetroot brand, Montserrat + JetBrains Mono, light/dark
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
