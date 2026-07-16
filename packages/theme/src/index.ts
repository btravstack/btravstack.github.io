import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";
import { h } from "vue";

import "./style.css";

/**
 * Small btravstack beetroot mark for the "Part of btravstack" strip. Kept as
 * an inline string (rendered via innerHTML) so the theme package ships no image
 * asset and works on every site regardless of its own logo.
 */
const BEET_MARK = `<svg viewBox="-2 -12 104 148" width="15" height="21" fill="none" aria-hidden="true"><g transform="rotate(-6 50 68)"><path d="M46,34 C44,26 44,18 47,10" stroke="#2C8B4E" stroke-width="3.6" stroke-linecap="round" fill="none"></path><path d="M47,10 C40,7 37,-2 43,-6 C50,-10 56,-3 54,3 C53,7 51,9 47,10 Z" fill="#3DAE62"></path><path d="M41,36 C34,31 26,30 21,34 C16,38 19,45 26,45 C32,45 38,41 41,36 Z" fill="#2C8B4E"></path><path d="M57,34 C62,27 70,24 76,28 C81,32 78,39 71,40 C65,40 60,37 57,34 Z" fill="#3DAE62"></path><g transform="rotate(-38 16 66)"><rect x="4" y="62" width="20" height="9" rx="4.5" fill="#CE3D80"></rect></g><g transform="rotate(24 84 78)"><rect x="76" y="74" width="18" height="9" rx="4.5" fill="#8E1A52"></rect></g><path d="M50,32 C28,31 14,45 14,62 C14,81 30,98 44,108 C47,111 48,114 50,116 C52,114 53,111 56,108 C70,98 86,81 86,62 C86,45 72,31 50,32 Z" fill="#CE3D80"></path><path d="M63,35 C76,41 86,50 86,62 C86,79 73,94 58,106 C69,91 78,76 78,62 C78,51 72,42 63,35 Z" fill="#8E1A52" opacity="0.85"></path><circle cx="38" cy="60" r="5.2" fill="#3A0D24"></circle><circle cx="39.7" cy="58.3" r="1.8" fill="#FFFFFF"></circle><circle cx="63" cy="60" r="5.2" fill="#3A0D24"></circle><circle cx="64.7" cy="58.3" r="1.8" fill="#FFFFFF"></circle><path d="M41,71 Q50.5,80 60,71" stroke="#3A0D24" stroke-width="3.4" stroke-linecap="round" fill="none"></path><circle cx="29" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"></circle><circle cx="72" cy="69" r="4.2" fill="#EE9CC4" opacity="0.75"></circle><path d="M50,116 C49,121 52,124 49,129 C47,132 44,132 43,130" stroke="#8E1A52" stroke-width="2.8" stroke-linecap="round" fill="none"></path></g></svg>`;

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
