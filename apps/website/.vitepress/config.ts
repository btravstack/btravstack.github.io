import { defineConfig } from "vitepress";

const SITE_TITLE = "btravstack";
const SITE_DESCRIPTION =
  "Type-safe building blocks for the TypeScript backend: contracts for AMQP & Temporal, and errors as values.";
const SITE_URL = "https://btravstack.github.io";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: SITE_TITLE,
  titleTemplate: "An expressive, robust TypeScript backend",
  description: SITE_DESCRIPTION,
  lang: "en-US",
  // user/org site (btravstack.github.io) is served from the domain root
  base: "/",
  cleanUrls: true,
  sitemap: { hostname: SITE_URL },

  head: [
    ["meta", { name: "google-site-verification", content: "u6ZPW5bWbP9G1yF5Sv7B4fSOJm5rLbZWeH858tmisTc" }],
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:title", content: `${SITE_TITLE} — an expressive, robust TypeScript backend` }],
    ["meta", { property: "og:description", content: SITE_DESCRIPTION }],
    ["meta", { property: "og:url", content: `${SITE_URL}/` }],
    ["meta", { property: "og:image", content: `${SITE_URL}/og-btravstack.png` }],
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:image", content: `${SITE_URL}/og-btravstack.png` }],
  ],

  themeConfig: {
    logo: { light: "/logos/btravstack-light.svg", dark: "/logos/btravstack-dark.svg" },
    nav: [
      { text: "Packages", link: "/#packages" },
      {
        text: "Docs",
        items: [
          { text: "amqp-contract", link: "https://btravstack.github.io/amqp-contract/" },
          { text: "temporal-contract", link: "https://btravstack.github.io/temporal-contract/" },
          { text: "unthrown", link: "https://btravstack.github.io/unthrown/" },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/btravstack" }],
    footer: {
      message: "Type-safe building blocks for the TypeScript backend. Released under the MIT License.",
      copyright: "© 2026 Benoit Travers · betterave 🇫🇷",
    },
    search: { provider: "local" },
  },
});
