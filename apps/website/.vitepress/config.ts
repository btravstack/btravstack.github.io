import { defineConfig } from "vitepress";

const SITE_TITLE = "BtravStack";
const SITE_DESCRIPTION =
  "Type-safe building blocks for the TypeScript backend: contracts for AMQP & Temporal, typed dependency injection, and errors as values.";
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
    ["meta", { name: "author", content: "Benoit Travers" }],
    ["meta", { name: "robots", content: "index, follow" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "TypeScript, backend, Node.js, type-safe, contracts, AMQP, RabbitMQ, Temporal, workflows, errors as values, Result, schema validation, amqp-contract, temporal-contract, unthrown",
      },
    ],

    // Open Graph
    ["meta", { property: "og:type", content: "website" }],
    ["meta", { property: "og:site_name", content: SITE_TITLE }],
    ["meta", { property: "og:locale", content: "en_US" }],
    ["meta", { property: "og:title", content: `${SITE_TITLE} — an expressive, robust TypeScript backend` }],
    ["meta", { property: "og:description", content: SITE_DESCRIPTION }],
    ["meta", { property: "og:url", content: `${SITE_URL}/` }],
    ["meta", { property: "og:image", content: `${SITE_URL}/og-btravstack.png` }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:image:width", content: "1280" }],
    ["meta", { property: "og:image:height", content: "640" }],
    [
      "meta",
      {
        property: "og:image:alt",
        content: "BtravStack — type-safe building blocks for the TypeScript backend",
      },
    ],

    // Twitter Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: `${SITE_TITLE} — an expressive, robust TypeScript backend` }],
    ["meta", { name: "twitter:description", content: SITE_DESCRIPTION }],
    ["meta", { name: "twitter:image", content: `${SITE_URL}/og-btravstack.png` }],
    [
      "meta",
      {
        name: "twitter:image:alt",
        content: "BtravStack — type-safe building blocks for the TypeScript backend",
      },
    ],

    // JSON-LD: the org, the site, and the three packages it publishes
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_TITLE,
        url: `${SITE_URL}/`,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logos/btravstack-dark.svg` },
        description: SITE_DESCRIPTION,
        sameAs: ["https://github.com/btravstack", "https://www.npmjs.com/~btravers"],
      }),
    ],
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_TITLE,
        url: `${SITE_URL}/`,
        description: SITE_DESCRIPTION,
      }),
    ],
    [
      "script",
      { type: "application/ld+json" },
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "BtravStack packages",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareApplication",
              name: "amqp-contract",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              url: "https://btravstack.github.io/amqp-contract/",
              description: "Type-safe contracts for AMQP & RabbitMQ.",
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "SoftwareApplication",
              name: "temporal-contract",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              url: "https://btravstack.github.io/temporal-contract/",
              description: "Type-safe contracts for Temporal.io.",
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "SoftwareApplication",
              name: "unthrown",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Cross-platform",
              url: "https://btravstack.github.io/unthrown/",
              description: "Explicit errors as values, for TypeScript.",
            },
          },
        ],
      }),
    ],
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
      copyright: "© 2026 Benoit Travers",
    },
    search: { provider: "local" },
  },

  vite: {
    ssr: {
      // @btravstack/theme's entry imports "vue" (for its Layout); mark it
      // noExternal so Vite processes the package and resolves "vue" to the
      // app's copy instead of failing to externalize it during the build.
      noExternal: ["@btravstack/theme"],
    },
  },
});
