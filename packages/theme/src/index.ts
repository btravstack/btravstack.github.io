import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";

import "./style.css";

/**
 * Small btravstack beetroot mark for the "Part of btravstack" strip. Kept as
 * an inline string (rendered via innerHTML) so the theme package ships no image
 * asset and works on every site regardless of its own logo.
 */
const BEET_MARK = `<svg viewBox="0 0 100 124" width="15" height="18" fill="none" aria-hidden="true"><g transform="translate(50,34)"><g transform="rotate(-35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"></path></g><g transform="rotate(35)"><path d="M0,3 C-6,-7 -6,-18 0,-28 C6,-18 6,-7 0,3 Z" fill="#2C8B4E"></path></g><path d="M0,4 C-7,-8 -7,-20 0,-32 C7,-20 7,-8 0,4 Z" fill="#3DAE62"></path></g><path d="M50,32 C29,30 17,44 17,60 C17,79 37,99 50,107 Z" fill="#CE3D80"></path><path d="M50,32 C71,30 83,44 83,60 C83,79 63,99 50,107 Z" fill="#8E1A52"></path><path d="M46.5,104 C46.5,112 44,118 39,124 C47,120 52.5,112 53.5,104 Z" fill="#8E1A52"></path></svg>`;

/** "Part of 🫜 btravstack" org-attribution strip, shown at the bottom of every page. */
const PartOfBtravstack = () =>
  h("div", { class: "btv-partof" }, [
    h(
      "a",
      { class: "btv-partof-link", href: "https://btravstack.github.io/", target: "_blank", rel: "noopener noreferrer" },
      [
        h("span", { class: "btv-partof-label" }, "Part of"),
        h("span", { class: "btv-partof-mark", innerHTML: BEET_MARK }),
        h("span", { class: "btv-partof-word" }, [
          h("span", { class: "btv-partof-pink" }, "btrav"),
          "stack",
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
