import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";

import "./style.css";

import { brandMark } from "./brand-mark.js";

/** "Part of 🫜 btravstack" org-attribution strip, shown at the bottom of every page. */
const PartOfBtravstack = () =>
  h("div", { class: "btv-partof" }, [
    h(
      "a",
      { class: "btv-partof-link", href: "https://btravstack.github.io/", target: "_blank", rel: "noopener noreferrer" },
      [
        h("span", { class: "btv-partof-label" }, "Part of"),
        h("span", { class: "btv-partof-mark", innerHTML: brandMark }),
        h("span", { class: "btv-partof-word" }, [
          h("span", { class: "btv-partof-pink" }, "Btrav"),
          "Stack",
        ]),
      ],
    ),
  ]);

/**
 * The shared btravstack VitePress theme: VitePress's default theme with the
 * btravstack design tokens layered on top, plus a "Part of btravstack" strip
 * beneath every page. Use it from a site's `.vitepress/theme/index.ts`:
 *
 *   import Theme from "@btravstack/theme";
 *   export default Theme;
 */
const theme: Theme = {
  extends: DefaultTheme,
  Layout: () => h(DefaultTheme.Layout, null, { "layout-bottom": () => PartOfBtravstack() }),
};

export default theme;
