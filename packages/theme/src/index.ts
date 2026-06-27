import DefaultTheme from "vitepress/theme";
import type { Theme } from "vitepress";

import "./style.css";

/**
 * The shared btravstack VitePress theme: VitePress's default theme with the
 * btravstack design tokens layered on top. Use it from a site's
 * `.vitepress/theme/index.ts`:
 *
 *   import Theme from "@btravstack/theme";
 *   export default Theme;
 */
const theme: Theme = {
  extends: DefaultTheme,
};

export default theme;
