import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "esm",
  dts: true,
  clean: true,
  // CSS is shipped as-is (copied to dist by the build script) and resolved by
  // the consumer's Vite, so keep the `import "./style.css"` as an external ref.
  external: [/\.css$/],
});
