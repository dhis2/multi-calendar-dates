// Satisfies `import type { Temporal } from '..'` in the vendored polyfill files.
// In the original package those resolve to the package root; here they land in
// this directory (src/vendor/), so we re-export from the vendored entry point.
export * from './temporal/index'
