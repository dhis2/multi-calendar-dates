[![codecov](https://codecov.io/github/dhis2/multi-calendar-dates/graph/badge.svg?token=VZBHOLXYP1)](https://codecov.io/github/dhis2/multi-calendar-dates)

# multi-calendar-engine

This library is used to work with dates in multiple calendrical system (i.e.
Ethiopic, Nepali etc..) across DHIS-2 applications. It mainly exposes two
components:

1. Hooks like
   [useDatePicker](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/hooks/useDatePicker.ts)
   used to build UI components (part of @dhis/ui) such as the
   [Calendar](https://ui.dhis2.nu/components/calendar) and
   [CalendarInput](https://ui.dhis2.nu/components/calendar-input) components.
1. Helper methods, like `generateFixedPeriods` and `getNowInCalendar` to deal
   with period generations, date manipulation and arithmetic across multiple
   calendrical systems.

The idea behind this library is to abstract the complicated details of dealing
with dates in DHIS2, and to centralise them in one place for consumption in
different apps and libraries.

Internally, the library relies on the [Temporal
API](https://tc39.es/proposal-temporal) which aims to achieve, among other
goals, full-support for non-Gregorian calendars.

This
[document](https://docs.google.com/document/d/19zjyB45oBbqC5KeubaU8E7cw9fGhFc3tOXY0GkzZKqc/edit?userstoinvite=hendrik%40dhis2.org#heading=h.rjt0etsbsqh6)
has some of the requirements and design decisions for this project.

This [Jira epic](https://dhis2.atlassian.net/browse/DHIS2-14051) lists the app
that moved to using the library, and what comes next.

# API

Everything below is exported from `@dhis2/multi-calendar-dates`. See [API and
examples](./doc/api.md) for arguments, return values and examples.

## Helpers

| Name                                                                         | Description                                                                                                                              |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| [`getNowInCalendar`](./doc/api.md#getnowincalendar)                          | The current date and time of day in a calendar and time zone                                                                             |
| [`convertFromIso8601`](./doc/api.md#convertfromiso8601-and-converttoiso8601) | Converts an ISO 8601 (Gregorian) date to a calendar                                                                                      |
| [`convertToIso8601`](./doc/api.md#convertfromiso8601-and-converttoiso8601)   | Converts a date in a calendar to ISO 8601 (Gregorian)                                                                                    |
| [`addToCalendarDate`](./doc/api.md#date-arithmetic-and-formatting)           | Adds or subtracts years, months and days in a calendar, clamping the day to the end of the month                                         |
| [`formatCalendarDate`](./doc/api.md#date-arithmetic-and-formatting)          | Formats a date as the `yyyy-MM-dd` string the DHIS2 backend expects, optionally with the time of day                                     |
| [`getDaysInMonth`](./doc/api.md#date-arithmetic-and-formatting)              | The number of days in a month in a calendar                                                                                              |
| `validateDateString`                                                         | Validates a date string against the format, a min/max range and the calendar's rules. Returns a `DateValidationResult` code when invalid |

## Fixed period utils

Used by apps like Data Entry, and by the analytics library, to generate the
list of fixed periods (daily, weekly, monthly, …) in different calendar
systems.

| Name                                                                          | Description                                                              |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| [`generateFixedPeriods`](./doc/api.md#generatefixedperiods)                   | All periods of a period type in a year, in the given calendar and locale |
| [`getFixedPeriodByDate`](./doc/api.md#getfixedperiodbydate)                   | The period of a period type that contains a date                         |
| [`createFixedPeriodFromPeriodId`](./doc/api.md#createfixedperiodfromperiodid) | Rebuilds a period from its id, e.g. `202301`                             |
| [`getAdjacentFixedPeriods`](./doc/api.md#getadjacentfixedperiods)             | The N periods before or after a period                                   |

## Hooks and others

The hooks are exported, but they're mostly used internally: by `@dhis2/ui`'s
[Calendar](https://ui.dhis2.nu/components/calendar) and
[CalendarInput](https://ui.dhis2.nu/components/calendar-input). Most apps use
those components rather than the hooks directly.

| Name                                       | Description                                                                                                           |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| [`useDatePicker`](#hooks-for-calendar-ui)  | Hook that returns the week grid, day labels and navigation state for a calendar picker                                |
| `useResolvedDirection`                     | Hook that resolves the text direction (LTR/RTL) from the locale, or an explicit override                              |
| [`periodTypes`](./doc/api.md#periodtypes)  | All supported period type ids                                                                                         |
| `constants.calendars`                      | The supported calendar ids                                                                                            |
| `constants.numberingSystems`               | The supported CLDR numbering system codes                                                                             |
| `DateValidationResult`                     | The codes `validateDateString` returns when a date is invalid                                                         |
| `CalendarDate`, `CalendarDateTime` (types) | `{ year, month, day, eraYear? }`, and the same plus `hour`, `minute` and `second`. Read the year as `eraYear ?? year` |

### Hooks for Calendar UI

The library provides a hook `useDatePicker` that's consumed by the dhis/ui
calendar components. There are two components that currently use it:

-   [Calendar](https://ui.dhis2.nu/components/calendar): a calendar component
    supporting non-Greogorian calendars
-   [CalendarInput](https://ui.dhis2.nu/components/calendar-input): a wrapper
    around the Calendar component to support the most common use case for a
    calendar when we want to display it next to an input.

`useDatePicker` takes a
[DatePickerOptions](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/hooks/useDatePicker.ts#L16)
object, and returns
[UseDatePickerReturn](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/hooks/useDatePicker.ts#LL28C13-L28C32)
that contains information needed to render a UI component, i.e. the localised
day names, and the weeks in the current view (month).

```ts
// the options passed to useDatePicker
type DatePickerOptions = {
    date: string
    options: PickerOptions
    onDateSelect: (payload: OnDateSelectPayload) => void
    minDate?: string
    maxDate?: string
    format?: 'YYYY-MM-DD' | 'DD-MM-YYYY'
    strictValidation?: boolean
}
type OnDateSelectPayload = { calendarDateString: string } | null
```

```ts
// the return type of the hook
type UseDatePickerReturn = UseNavigationReturnType & {
    weekDayLabels: string[]
    calendarWeekDays: {
        dateValue: string
        label: string | number
        onClick: () => void
        isSelected: boolean | undefined
        isToday: boolean
        isInCurrentMonth: boolean
    }[][]
}
```

# Special cases and considerations with periods logic

There are some special DHIS2-specific cases when doing period calculations that
we handle. The specs for these are documented in the tests and cucumber feature
files. Some of these are:

-   Dealing with the 13th month in the Ethiopian calendar: the Ethiopic
    calendar has 13 months: 12 months of 30 days, then the 13th month has 5 or
    6 days depending on whether it's a leap year or not. When generating
    periods for bi-weekly or less (bi-weekly, weekly, daily) then the 13th
    month is displayed. But when we are generating periods for monthly or
    larger, we do not display the 13th month. The backend then makes the
    decision about where to include any data for the 13th month, so when doing
    monthly analytics, the 13th month will be lumped with the following month's
    data.
-   The period IDs are dictated by the backend, and they use the Gregorian
    month names, for example, `QuarterlyNov` or `QuarterlyApr`. In the
    frontend, in a non-Gregorian calendar, `Nov` will be "translated" into the
    11th month of the current calendar system (Hamle in Ethiopic). Ideally, we
    will have period IDs that are calendar-agnostic in the future, but this
    works for now as a solution.
-   From the frontend perspective, we always send a date in the calendar
    system. It is formatted in an ISO-like format (`yyyy-MM-dd`). It is
    "ISO-like", because the date is actually in the calendar system rather than
    the Gregorian ISO8601 calendar. So when a system set to Ethiopic, sends
    `2015-01-01` to the backend, it means the year 2015 in Ethiopic (which is
    2022 in Gregorian). This is what the backend expects, and if there is a
    need for a conversion, then it happens in the backend.
    -   Given we have the Temporal object in the frontend, we have the ability
        to send the date converted into Gregorian, but that's what the backend
        expects right now.
-   Nepali is implemented as a custom calendar: see
    [nepaliCalendar.ts](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/custom-calendars/nepaliCalendar.ts).
    Nepali is luni-solar calendar which means that the length of months can
    vary from year to year. The way Temporal does date arithmetic, is that it
    converts the day to gregorian, performs the arithmetic, then converts it
    back to the calendar. This leads to weird situations where you do
    `nepaliDate.add({month: 1})` for example, but the result is still in the
    current month (since the month has 30 days in Gregorian, but 32 in Nepali
    for example). To get around that, we [set the day to the
    14th](https://github.com/dhis2/multi-calendar-dates/blob/73057360c4720d995370779b02fe6e3784b326ab/src/period-calculation/getYearlyPeriods.ts#L23)
    before doing arithmetic (in the context of period generation) and this
    leads to results that make sense in the context of DHIS2.
-   Nepali is also not supported as a locale in major browsers. So we rely on
    localising it with a hardcoded map, meaning we don't have the same
    flexibility showing the day or month names as short or long for example
    with `.toLocaleString`. That means that the consumer can only use one of
    `ne-NP` or `en-NP` (nepali months and days transliterated into English) as
    a locale with the Nepali calendar, and they can't use browser localisations
    (so they can't display Nepali month names in French for example, but they
    would be able to do so with Ehtiopic or Islamic calendars).
-   In Ethiopic calendar, when consuming a date, use `.eraYear` rather than
    `.year` to get the year part of a date. There is an ongoing discussion on
    Temporal to decide which era of the Ethiopic calendar should be the
    default, but it's likely to be browser-dependent at the end, so it's safer
    to use `eraYear` as this is what users in Ethiopia would expect to see. We
    looked at abstracting this difference away in the library, but there was no
    easy solution for it.
-   The library also abstracts some DHIS2-specific inconsistencies with the
    backend to make it easier for consumers of the library. For example, it has
    a map to convert from the calendar IDs used in DHIS2 to the ones expected
    by the library:
    [dhis2CalendarsMap.ts](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/constants/dhis2CalendarsMap.ts).
    This maps "ethiopian" (used in DHIS2) to "ethiopic" which is the standard
    ID used in JavaScript (in [Unicode CLDR](https://cldr.unicode.org/)). It
    also maps the Java locale names with an underscore to ones with a dash, to
    make them easier to use in a JavaScript context (i.e from `ar_SD` to
    `ar-SD`).

# Architecture Decision Records

-   [Record architecture decisions](./doc/architecture/decisions/0001-record-architecture-decisions.md)
-   [Use Temporal API as the backbone of the
    engine](./doc/architecture/decisions/0002-use-temporal-api-as-the-backbone-for-the-engine.md)
-   [Upgrade the Temporal polyfill to 0.5.x without custom
    calendars](./doc/architecture/decisions/0003-upgrade-temporal-polyfill-to-0-5-without-custom-calendars.md)
    (the 3.0.0 breaking change)
