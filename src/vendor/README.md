# Vendored `@js-temporal/polyfill`

This directory contains a verbatim copy of `@js-temporal/polyfill` v0.5.1
(`node_modules/@js-temporal/polyfill/lib/*.ts`) with a targeted patch applied.

## Why it is vendored

`@js-temporal/polyfill` v0.5.1 does not handle the CLDR 48 / ICU 76 era-code
rename for the Ethiopic calendar. ICU 76 renamed the `Intl.DateTimeFormat`
era codes to include `aa` (Amete Alem) and `am` (Amete Mihret). The polyfill
only recognises its own internal era names/codes, so any Ethiopic date
operation that goes through `Intl` throws a `RangeError`.

The fix is in open PR
[js-temporal/temporal-polyfill#357](https://github.com/js-temporal/temporal-polyfill/pull/357),
which is unmerged as of this writing (it targets `main`, past the v0.5.1
release, and has not shipped in any published version). We carry the patched
source here so all consumers of this library get the fix automatically,
without waiting on an upstream release.

## Patch applied

**File:** `temporal/calendar.ts`

Added the CLDR 48 era codes (`'aa'`, `'am'`) to `EthiopicHelper`'s era `names`
arrays (this is the real, unmerged upstream diff from PR #357, applied
verbatim):

```typescript
class EthiopicHelper extends OrthodoxBaseHelper {
  constructor() {
    super('ethiopic', [
      { code: 'ethioaa', names: ['ethiopic-amete-alem', 'mundi', 'aa'], isoEpoch: { year: -5492, month: 7, day: 17 } },
      {
        code: 'ethiopic',
        names: ['incar', 'am'],
        isoEpoch: { year: 8, month: 8, day: 27 },
        anchorEpoch: { year: 5501 }
      }
    ]);
  }
}
```

Unlike the v0.4.3 vendor patch (which added a `reviseIntlEra` override method
to remap `era0`/`era1` internal names back and forth), v0.5.1 restructured
calendar era matching to check against a `names` array directly — so the fix
is now just adding the new CLDR names to that array, not a new method.

## Other modifications

**All vendored files:** The TypeScript class-field declarations
`[Symbol.toStringTag]!: 'Temporal.XXX'` were removed from every class that
had one (`PlainDate`, `PlainDateTime`, `ZonedDateTime`, `PlainYearMonth`,
`PlainMonthDay`, `PlainTime`, `Instant`, `Duration`). These are type-only
annotations; the runtime value is set by `MakeIntrinsicClass` on the
prototype. Create React App's Babel compiles class fields in loose mode
(`this[Symbol.toStringTag] = …`) which throws because the prototype property
has `writable: false`. (`Calendar` and `TimeZone` no longer exist as classes
in v0.5.1, so they no longer need this treatment.)

**Not carried forward from the v0.4.3 patch:** a fix to `intl.ts` for a
Babel loose-mode argument-shift bug in `DateTimeFormatImpl` (a function that
combined a type-only `this` parameter with default-valued parameters,
which `@babel/plugin-transform-parameters` mis-compiled into an
`arguments`-indexed form, shifting every argument by one slot). v0.5.1
rewrote `DateTimeFormatImpl` as a real `class` with an explicit `this`
argument passed positionally to `createDateTimeFormat` — the precondition
for the bug (a `this: Type` parameter combined with default values in the
same parameter list) no longer occurs anywhere in the vendored source
(verified by scanning every function declaration in v0.5.1's `lib/*.ts`).
If a similar symptom (e.g. a formatted date rendering as a full date string
instead of the requested field) resurfaces under CRA's Babel pipeline, look
for this same pattern re-appearing after a future polyfill bump.

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

## Version status (checked 2026-07-04)

The latest published version is still **0.5.1** — there is no 0.5.2 or 0.5.3
on npm or as a GitHub tag/release
([`js-temporal/temporal-polyfill` releases](https://github.com/js-temporal/temporal-polyfill/releases)).
PR #357 (the CLDR 48 fix, see above) is still unmerged even on `main`, so
there is currently no version to upgrade to that would let us remove this
vendor directory. Re-check both of those before assuming a newer release
exists.

## Comparison with the TC39 cookbook's Nepali calendar example

TC39 later published an official
["Nepali calendar" cookbook entry](https://tc39.es/proposal-temporal/docs/cookbook-nepali-calendar.html)
for implementing a custom calendar under the post-0.5.0 model — it explicitly
credits this library's pre-0.5 `NepaliCalendar` as its starting point. Our
`NepaliPlainDate` (`src/custom-calendars/nepaliCalendar.ts`) independently
arrived at the same overall shape (wrap a real ISO `Temporal.PlainDate`,
delegate `dayOfWeek`/`daysInWeek` to it, use a year-indexed lookup table for
month lengths). Notable differences, and why:

- **Arithmetic (`add`/`subtract`/`with`/`since`/`until`) is implemented here,
  but explicitly left as `throw new Error('not implemented')` in the
  cookbook.** The cookbook calls this "omitted for brevity" and out of scope
  for an illustrative example. We can't omit it: `useNavigation.ts` and the
  monthly/yearly period-calculation builders genuinely need date arithmetic
  on Nepali dates. Ours reproduces the exact "ISO arithmetic, then
  re-derive Nepali fields" behaviour the old `NepaliCalendar extends
  Temporal.Calendar` class had (see the class-level comment in
  `nepaliCalendar.ts`), since existing workarounds (the day-14 clamp) depend
  on it.
- **`weekOfYear`/`yearOfWeek` always return `undefined`** in both
  implementations, since Nepali has no week-numbering scheme — we adopted
  this from the cookbook rather than the old class's behaviour (which
  incidentally fell back to reporting the *ISO* week, since it didn't
  override these either).
- **`daysInYear`/`dayOfYear`/`inLeapYear` report the underlying ISO date's
  values here, not genuine Nepali ones** — the cookbook computes these
  properly from the year's own month-length data. This is a deliberate,
  pre-existing quirk we chose to preserve rather than fix as part of the
  0.5.x migration (the old `NepaliCalendar` class didn't override these
  either, so this isn't a regression) — but it is a real, known-incorrect
  value, and the one place it can actually matter is
  `generateFixedPeriodsDaily` (`src/period-calculation/generate-fixed-periods/generate-fixed-periods-daily.ts`),
  which loops `for (let i = 0; i < day.daysInYear; i++)` to generate one
  `FixedPeriod` per day of the year — for Nepali this uses the ISO year
  length (365/366) rather than Nepali's actual (variable, ~354–385 day)
  year length. Flagged here rather than silently fixed since it changes
  daily-period output for Nepali; do this as a deliberate, separately
  reviewed change if it needs fixing.
- **`toString()`/`toJSON()` match Temporal's convention** (ISO position plus
  a `[u-ca=nepali]` calendar annotation, like the cookbook), not the
  Nepali-space `year-month-day` digits. Nothing in this codebase currently
  calls these directly (dates are always formatted via
  `formatDate`/`localisationHelpers`), but keeping them convention-compliant
  avoids surprises for anyone who logs or serializes one of these values.
- **`equals()` defensively checks `other instanceof NepaliPlainDate`**
  (matching the cookbook) rather than assuming the caller only ever compares
  same-typed values.
- **Not adopted:** the cookbook's private `#iso` field and its
  `fromTemporalPlainDate`-only access pattern. `isoDate` is a public
  `readonly` property here because `toIsoPlainDate`
  (`src/utils/plainDate.ts`) needs broad, direct access to it for
  comparisons across the whole codebase — the cookbook's example doesn't
  have an equivalent cross-cutting need. Also not adopted: a static
  `compare()` convenience method — this codebase already has a single,
  consistent pattern (`Temporal.PlainDate.compare(toIsoPlainDate(a),
  toIsoPlainDate(b))`) used directly at every comparison call site, so an
  unused alternative wasn't added.
