import { defineConfig } from "vitepress";
import { documentedProjects } from "./projects";

const SITE_TITLE = "BtravStack";
const SITE_DESCRIPTION =
  "A TypeScript backend framework and focused libraries for typed errors, domain entities, dependency injection, AMQP and Temporal.";
const SITE_URL = "https://btravstack.github.io";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: SITE_TITLE,
  titleTemplate: "A backend that fits together",
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
    ["meta", { property: "og:title", content: `${SITE_TITLE} — a backend that fits together` }],
    ["meta", { property: "og:description", content: SITE_DESCRIPTION }],
    ["meta", { property: "og:url", content: `${SITE_URL}/` }],
    ["meta", { property: "og:image", content: `${SITE_URL}/og-btravstack.png` }],
    ["meta", { property: "og:image:type", content: "image/png" }],
    ["meta", { property: "og:image:width", content: "1200" }],
    ["meta", { property: "og:image:height", content: "630" }],
    [
      "meta",
      {
        property: "og:image:alt",
        content: "BtravStack — A backend that fits together. A smiling beetroot sits on three teal layers.",
      },
    ],

    // Twitter Card
    ["meta", { name: "twitter:card", content: "summary_large_image" }],
    ["meta", { name: "twitter:title", content: `${SITE_TITLE} — a backend that fits together` }],
    ["meta", { name: "twitter:description", content: SITE_DESCRIPTION }],
    ["meta", { name: "twitter:image", content: `${SITE_URL}/og-btravstack.png` }],
    [
      "meta",
      {
        name: "twitter:image:alt",
        content: "BtravStack — A backend that fits together. A smiling beetroot sits on three teal layers.",
      },
    ],

    // Organization and project metadata share the visible project index.
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
        itemListElement: documentedProjects.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "SoftwareApplication",
            name: project.name,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Cross-platform",
            url: project.docs,
            description: project.blurb,
          },
        })),
      }),
    ],
  ],

  themeConfig: {
    logo: { light: "/logos/btravstack-light.svg", dark: "/logos/btravstack-dark.svg" },
    nav: [
      { text: "Framework", link: "/#framework" },
      { text: "Libraries", link: "/#packages" },
      {
        text: "Docs",
        items: documentedProjects.map((project) => ({ text: project.name, link: project.docs })),
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
