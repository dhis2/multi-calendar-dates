# multi-calendar-dates

A library used to work with dates across multiple calendrical systems (Gregorian, Ethiopic, Nepali, Islamic, …) in DHIS2 applications. It exposes two things: hooks like `useDatePicker` for building UI components (consumed by `@dhis2/ui`'s Calendar and CalendarInput), and helper functions like `generateFixedPeriods` and `getNowInCalendar` for period generation, date arithmetic, and conversions across calendars. Internally it uses the [Temporal API](https://tc39.es/proposal-temporal) via `@js-temporal/polyfill`, but that is an implementation detail — one of the goals is to be able to swap Temporal for another engine (e.g. Kotlin multiplatform) without changing the public interface.

## Public interface

Everything exported from `src/index.ts` is public. Nothing else is.

**Hooks**
- `useDatePicker(options: DatePickerOptions)` — returns a week-grid, day-name labels, and navigation state for building a calendar picker
- `useResolvedDirection(options)` — resolves text direction (LTR/RTL) from locale or an explicit override

**Period calculation**
- `generateFixedPeriods` — all periods of a given type for a year and calendar
- `getFixedPeriodByDate` — the period that contains a given date
- `createFixedPeriodFromPeriodId` — reconstructs a `FixedPeriod` from its ID string (e.g. `"202301"`)
- `getAdjacentFixedPeriods` — N periods before or after a given period
- `periodTypes` — const array of all 53 supported period type identifiers

**Utilities**
- `getNowInCalendar` — today's date in any supported calendar
- `convertFromIso8601` / `convertToIso8601` — convert between ISO 8601 and any calendar
- `validateDateString` — validates a date string against format, range, and calendar rules

**Constants**
- `constants.calendars` — 21 supported calendar IDs
- `constants.numberingSystems` — 87 CLDR numbering system codes

**Implicit Temporal contract.** The Temporal API (`@js-temporal/polyfill`) is described as an internal implementation detail, but it leaks into the public interface in two specific places:

- **`getNowInCalendar`** — returns `Temporal.ZonedDateTime` directly. Callers access `.year`, `.month`, `.day`, `.eraYear`, `.startOfDay()`, `.withCalendar()`, and other Temporal methods on the result. Any rename or signature change in the proposal breaks these call sites.
- **`convertFromIso8601` / `convertToIso8601`** — accept `string | Temporal.PlainDateLike` as their `date` parameter. Callers who pass a `Temporal.PlainDateLike` object are coupled to that type.

`useDatePicker` and the period-calculation functions (`generateFixedPeriods`, `getFixedPeriodByDate`, etc.) are insulated — their return types use plain strings and numbers, not Temporal objects.

The polyfill tracks TC39 proposal stage 3, which is not yet finalised or natively available in all environments. When upgrading `@js-temporal/polyfill`, treat it as a potentially breaking change and audit the two affected functions above.

## Domain-specific gotchas

**Date format convention.** Dates are always sent to the backend in the active calendar system formatted as `yyyy-MM-dd`. This is ISO-like but not ISO 8601 — `2015-01-01` from an Ethiopic system means year 2015 in Ethiopic (≈ 2022 Gregorian). The backend expects this format and handles any conversion it needs.

**Ethiopic 13th month.** The Ethiopic calendar has 13 months: 12 × 30 days, plus a 5- or 6-day 13th month. For period types smaller than monthly (daily, weekly, bi-weekly), the 13th month is shown. For monthly and above it is hidden — the backend lumps its data into the following month's analytics.

**Period IDs use Gregorian month names.** Period IDs are dictated by the backend and always reference Gregorian month names (e.g. `QUARTERLYNOV`, `FYDEC`). In a non-Gregorian calendar `NOV` is translated to the 11th month of that system (e.g. Hamle in Ethiopic).

**Ethiopic `.eraYear` vs `.year`.** When reading a year from a Temporal object in the Ethiopic calendar, use `.eraYear` not `.year`. The default era is browser-dependent, so `.year` may return unexpected values.

**Nepali custom calendar.** Nepali is not in the Temporal/CLDR spec and is implemented as a custom calendar (`src/custom-calendars/nepaliCalendar.ts`). It is a luni-solar calendar — month lengths vary year to year. Temporal does arithmetic by converting to Gregorian first, which produces wrong results for Nepali; to work around this, period generation sets the day to the 14th before performing month arithmetic.

**Nepali locale limitations.** Nepali is not a supported locale in major browsers. Month and day names are provided via a hardcoded map. Only `ne-NP` (Devanagari) and `en-NP` (transliterated into English) are supported — it is not possible to display Nepali month names in other languages the way you can with Ethiopic or Islamic.

**DHIS2 calendar/locale aliases.** `"ethiopian"` is accepted everywhere `"ethiopic"` is — it is a DHIS2 non-standard name normalised internally. Java-style locale codes with underscores (e.g. `ar_SD`) are normalised to dash-separated form (`ar-SD`).

## Testing approach

Test the public interface thoroughly. Internal helpers and hooks are not tested directly — they are covered as side effects of public-interface tests. Do not add unit tests for internals to increase coverage numbers.

**At minimum, test Gregorian, Ethiopic, and a custom calendar (Nepali).** Gregorian is the baseline. Ethiopic exercises extended-calendar behaviour (13th month, `.eraYear`). Nepali exercises the custom-calendar code path. Islamic is also included in the hook and conversion tests as a locale/RTL check. Other calendars listed in `constants.calendars` are not tested and that is expected.

Period-calculation specs are split per calendar — e.g. `generate-fixed-periods.gregorian.spec.ts`, `.ethiopic.spec.ts`, `.nepali.spec.ts`. Follow this pattern when adding period tests.

**Known gaps in public-interface coverage** (see `doc/test-coverage.md`):
- `useDatePicker` with `minDate`, `maxDate`, `strictValidation`, `format` options
- `useDatePicker` with `pastOnly` option

## Commands

```bash
yarn test              # Jest (watch mode)
yarn test --coverage   # Jest with coverage report (thresholds: 85% branches, 92% functions/lines/statements)
yarn cucumber          # Cucumber BDD specs in features/
yarn build             # ESM + CJS bundles + TypeScript declarations
yarn lint              # ESLint via d2-style
yarn format            # Auto-format via d2-style
```

## Project structure

```
src/
  index.ts                  # single public entry point
  types.ts                  # shared types (SupportedCalendar, ResolvedLocaleOptions, …)
  hooks/                    # useDatePicker, useResolvedDirection + internal hooks
  period-calculation/       # one subdirectory per exported function
  utils/                    # getNowInCalendar, convertFromIso8601, validateDateString, …
  custom-calendars/         # Nepali calendar engine + data tables
  constants/                # calendars[], numberingSystems[]
features/                   # Cucumber BDD feature files (fixed-period scenarios)
doc/                        # architecture notes, test coverage overview
```
