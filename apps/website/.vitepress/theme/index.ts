import type { EnhanceAppContext } from "vitepress";
import Theme from "@btravstack/theme";

import Landing from "./Landing.vue";

export default {
  extends: Theme,
  enhanceApp({ app }: EnhanceAppContext) {
    app.component("Landing", Landing);
  },
};
