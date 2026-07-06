---
"@btravstack/theme": patch
---

Declare `vue` as an optional peer dependency. The theme's `Layout` imports `vue` at runtime; it is always provided by the host VitePress app, so it is marked optional to avoid tripping strict / no-auto-install consumers while still documenting the requirement.
