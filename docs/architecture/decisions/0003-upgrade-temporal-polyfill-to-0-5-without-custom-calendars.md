# 3. Upgrade the Temporal polyfill to 0.5.x without custom calendars

Date: 2026-07-04

## Status

Accepted. Released in 3.0.0.

## Context

The library upgraded its internal `@js-temporal/polyfill` dependency from 0.4.x to 0.5.x. The proposal itself changed shape between those versions (per the [TC39 June 2024 meeting](https://docs.google.com/presentation/d/1PPMAxVnVjFwRPuJwOvVsw9nZLQ6jDM8Hd5PNO0Grp4I)), in a way that forced real changes to the library's internals and to one public function.

In 0.4.x, `Temporal.Calendar` was a real, subclassable class implementing a defined protocol: `dateFromFields`, `dateAdd`, `dateUntil`, `fields` and `mergeFields`, plus read methods like `year`, `month`, `eraYear` and `daysInMonth`. Any object implementing this protocol could be plugged into Temporal as the `calendar` of a `PlainDate`/`ZonedDateTime`, and Temporal's arithmetic, formatting and comparison would call back into it.

In 0.5.0, **`Temporal.Calendar` and the whole user-defined calendar protocol were removed from the proposal**: "without custom calendars, the huge surface area of `Temporal.Calendar` was not necessary." Calendars are now only plain string identifiers from a fixed set of built-in CLDR/ISO calendar ids, and there is no way to register custom calendar logic with Temporal. `Temporal.TimeZone` was removed for the same reason, since time zones are string-only too. The `.calendar` property was renamed to `.calendarId` and always returns a string.

The library's one non-CLDR calendar, Nepali, was implemented as `NepaliCalendar extends Temporal.Calendar`, a plugin registered with Temporal. With the protocol gone, there was nothing left to extend, and no way for Temporal to call into it even if there were.

## Decision

-   **Nepali is a standalone class.** It's implemented as `NepaliPlainDate` (`src/custom-calendars/nepaliCalendar.ts`), which lives entirely outside Temporal. It wraps a real ISO `Temporal.PlainDate` and reimplements the pieces the library needs.
-   **A union type for dates that can be either.** A Nepali date is never a real `Temporal.PlainDate`, so code that can receive either a CLDR-calendar date or a Nepali one works with `AnyPlainDate` (`Temporal.PlainDate | NepaliPlainDate`, in `src/utils/plainDate.ts`). The helpers `toIsoPlainDate` and `isSameDate` compare across the two representations consistently.
-   **One place to build dates from a calendar name.** Call sites that did `Temporal.Calendar.from(x).dateFromFields(fields)`, or passed a `NepaliCalendar` instance as the `calendar` of `Temporal.PlainDate.from({ ...fields, calendar })`, no longer work, because calendars must be strings. They were consolidated into two functions in `src/utils/helpers.ts`:

    -   `getPlainDateFromCalendarFields`: builds a date from that calendar's own year/month/day fields.
    -   `getPlainDateFromIso`: reinterprets an ISO date in a target calendar.

    Both dispatch either to real Temporal construction (a string calendar) or to `NepaliPlainDate`'s static methods. They do this through a small registry (`customPlainDateImplementations` in `src/utils/plainDate.ts`) rather than an "is it Nepali?" check at every call site. Adding another custom calendar means registering it there and extending `AnyPlainDate`.

-   **`getNowInCalendar` returns plain data.** It used to return a `Temporal.ZonedDateTime` tagged with the target calendar, which for Nepali meant `.withCalendar(nepaliCalendarInstance)`, a construct that no longer exists. Instead of returning the Temporal-flavoured `AnyPlainDate` as a stopgap, it returns a plain object with the same shape as `convertFromIso8601`/`convertToIso8601`. That keeps Temporal out of the public interface.
-   **`era` and `eraYear` are only forwarded together.** 0.5.x also tightened Temporal's field validation: if `eraYear` is supplied when constructing a date, the matching `era` must be too, or it throws. This surfaced as a real bug during the migration. `getPlainDateFromCalendarFields` was passing a `CalendarDate`'s `eraYear` back into `Temporal.PlainDate.from()` without an `era`, and `CalendarDate` deliberately never carries `era` publicly. `eraYear` is set for any calendar with an era concept, e.g. Gregorian's AD, not just Ethiopic. Now `era`/`eraYear` are only forwarded when both are present; otherwise `year` alone is used, which Temporal accepts for every calendar.

## Consequences

-   **Breaking change for `getNowInCalendar`.** It no longer returns a `Temporal.ZonedDateTime`, so Temporal methods on its result (`.add()`, `.with()`, `.withCalendar()`, `.startOfDay()`, …) throw. Code that only reads `.year`/`.month`/`.day`/`.eraYear` needs no changes. Code that called Temporal methods has to work on plain data instead, for example by deriving another date with `getNowInCalendar`/`convertFromIso8601`, or by using the date arithmetic helpers (`addToCalendarDate`, `formatCalendarDate`, `getDaysInMonth`).
-   **Time of day.** In 3.0.0, `getNowInCalendar` returned only `{ year, month, day, eraYear? }`, so code reading `.hour`/`.minute`/`.second` silently got `undefined`. 3.1.0 added them back as plain numbers (`CalendarDateTime`). Other time zone information isn't returned.
-   **The year to read.** `eraYear` is undefined for calendars without eras, such as Islamic, so consumers should read `eraYear ?? year`.
-   **Nepali arithmetic.** `NepaliPlainDate.add()`/`.subtract()` do the arithmetic on the underlying ISO date and re-derive the Nepali fields. That matches Temporal's default for calendars that don't override `dateAdd`, but it's wrong across month and year boundaries. Period generation works around it by setting the day to the 14th, and `addToCalendarDate` does Nepali month arithmetic on the fields.
-   **The polyfill is vendored** to carry a CLDR 48 Ethiopic era-code fix that isn't released upstream yet; see `src/vendor/README.md`. Future polyfill upgrades should be treated as potentially breaking: check `getNowInCalendar`, `convertFromIso8601`/`convertToIso8601` and the internal use of `AnyPlainDate`.

## Resources

-   [Temporal proposal](https://tc39.es/proposal-temporal/docs/index.html)
-   [TC39 June 2024 meeting slides](https://docs.google.com/presentation/d/1PPMAxVnVjFwRPuJwOvVsw9nZLQ6jDM8Hd5PNO0Grp4I)
-   [multi-calendar-dates#102](https://github.com/dhis2/multi-calendar-dates/pull/102): the upgrade
-   [multi-calendar-dates#105](https://github.com/dhis2/multi-calendar-dates/pull/105): time of day restored in `getNowInCalendar`
