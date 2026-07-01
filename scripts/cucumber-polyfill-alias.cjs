// Remaps @js-temporal/polyfill-patched to the vendored patched copy for the
// cucumber / ts-node runner. Jest uses moduleNameMapper and the build uses
// babel-plugin-module-resolver; this shim covers the remaining entry point.
const Module = require('module')
const path = require('path')
const vendorIndex = path.resolve(__dirname, '../src/vendor/temporal/index.ts')
const original = Module._resolveFilename
Module._resolveFilename = function (request, parent, isMain, options) {
    if (request === '@js-temporal/polyfill-patched') {
        return vendorIndex
    }
    return original(request, parent, isMain, options)
}
