# Vendored `@js-temporal/polyfill`

This directory contains a verbatim copy of `@js-temporal/polyfill` v0.4.3
(`node_modules/@js-temporal/polyfill/lib/*.ts`) with a targeted patch applied.

## Why it is vendored

`@js-temporal/polyfill` v0.4.3 does not handle the CLDR 48 / ICU 76 era-code
rename for the Ethiopic calendar. ICU 76 renamed the `Intl.DateTimeFormat`
era codes from `era0`/`era1` to `aa` (Amete Alem) and `am` (Amete Mihret).
The polyfill only knows the old codes, so any Ethiopic date operation that
goes through `Intl` throws a `RangeError`.

The fix (adding `reviseIntlEra` to `EthiopicHelper`) is in open PR
[js-temporal/temporal-polyfill#357](https://github.com/js-temporal/temporal-polyfill/pull/357),
but the PR targets the v0.5 master branch, not v0.4.3. Until an upstream
release ships the fix we carry the patched source here so all consumers of
this library get the fix automatically.

## Patch applied

**File:** `temporal/calendar.ts`

Added `reviseIntlEra` to `EthiopicHelper`. When `Intl.DateTimeFormat`
returns the new CLDR 48 era codes, this method maps them back to the
polyfill's internal names before further processing:

```typescript
override reviseIntlEra<T extends Partial<EraAndEraYear>>(calendarDate: T): T {
  let { era, eraYear } = calendarDate
  if (era === 'aa') era = 'era0'
  if (era === 'am') era = 'era1'
  return { era, eraYear } as T
}
```

## Other modifications

**All vendored files:** The TypeScript class-field declarations
`[Symbol.toStringTag]!: 'Temporal.XXX'` were removed from every class that
had one (`Calendar`, `PlainDate`, `PlainDateTime`, `ZonedDateTime`,
`PlainYearMonth`, `PlainMonthDay`, `PlainTime`, `Instant`, `Duration`,
`TimeZone`). These are type-only annotations; the runtime value is set by
`MakeIntrinsicClass` on the prototype. Create React App's Babel compiles
class fields in loose mode (`this[Symbol.toStringTag] = …`) which throws
because the prototype property has `writable: false`.

## Import alias

All library source files import from `@js-temporal/polyfill-patched` (not
`@js-temporal/polyfill`). The alias is resolved to this directory by:

- **TypeScript / IDE:** `tsconfig.json` `paths`
- **Jest:** `moduleNameMapper` in `package.json`
- **Build output:** `babel-plugin-module-resolver` in `babel.config.js`
  rewrites the import strings to relative paths so consumers receive the
  patched code without any extra setup.

## Removing the vendor copy

Once an upstream release of `@js-temporal/polyfill` ships the CLDR 48 fix:

1. Delete this directory (`src/vendor/`).
2. Remove `babel.config.js`.
3. Remove `paths` from `tsconfig.json`.
4. Remove `moduleNameMapper` from `package.json`.
5. Change all `from '@js-temporal/polyfill-patched'` imports back to
   `from '@js-temporal/polyfill'`.
6. Bump the `@js-temporal/polyfill` dependency to the fixed version.
