// Rewrites @js-temporal/polyfill-patched imports to the vendored copy that
// includes the CLDR 48 era-code fix (see src/vendor/temporal/calendar.ts).
// This runs during both the d2-app-scripts lib build (Babel per-file) and
// Jest, so consumers receive the patched version without any extra setup.
//
// tsconfig.json "paths" handles the same alias for the TypeScript type checker
// and IDE, but does NOT rewrite import strings in the emitted JS — that is
// what this file does.
module.exports = {
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@js-temporal/polyfill-patched':
                        './src/vendor/temporal/index',
                },
            },
        ],
    ],
}
