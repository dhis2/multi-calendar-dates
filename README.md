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

# Periods and Dates helpers

The library also provides helper methods to work with periods and dates in
multiple calendars. This allows doing date arithmetic, comparisons in a
standard timezone-safe way. It currently relies on the Temporal API.

> The library is built on top of Temporal API, but this is an implementation
> detail, and one of the goals of the library is to hide that detail to allow
> replacing Temporal with a different implementation in the future, i.e. a
> Kotlin multi-platform implementation to achieve consistency between web,
> android and backend.

## generateFixedPeriods

`generateFixedPeriods` returns the periods of a specific type in a specific
year. This is used, for example in [Data
Visualizer](https://github.com/dhis2/data-visualizer-app/pull/2233), to display
the list of periods of different types (i.e. monthly, weekly, yearly) in a
specific year, according to the user's calendar and locale.

### Examples

Calling `generateFixedPeriods({year: 2015, periodType: "FYNOV", calendar:
"gregory"})` will return all the November financial year periods (FYNOV) from
the year 2015 (defaults to 10 years). Here are some more examples:

```js
// some examples
import { generateFixedPeriods } from '@dhis2/multi-calendar-dates'

describe('generateFixedPeriods', () => {
    it('should generate financial years periods (starting November) for the specified', () => {
        const result = generateFixedPeriods({
            year: 2015,
            calendar: 'gregory',
            locale: 'en',
            periodType: 'FYNOV',
        })

        expect(result).toEqual(
            expect.arrayContaining([
                {
                    id: '2015Nov',
                    name: 'November 2015 - October 2016',
                    startDate: '2015-11-01',
                    endDate: '2016-10-31',
                },
                {
                    id: '2014Nov',
                    name: 'November 2014 - October 2015',
                    startDate: '2014-11-01',
                    endDate: '2015-10-31',
                },
                // .... up to
                {
                    id: '2006Nov',
                    name: 'November 2006 - October 2007',
                    startDate: '2006-11-01',
                    endDate: '2007-10-31',
                },
            ])
        )
    })
    it('should generate weekly periods (weeks starting on Sunday) for the specified year', () => {
        const result = generateFixedPeriods({
            year: 2015,
            calendar: 'gregory',
            locale: 'en',
            periodType: 'WEEKLYSUN',
        })

        expect(result).toEqual(
            expect.arrayContaining([
                {
                    id: '2015SunW1',
                    iso: '2015SunW1',
                    name: 'Week 1 - 2015-01-04 - 2015-01-10',
                    startDate: '2015-01-04',
                    endDate: '2015-01-10',
                },
                // .... up to
                {
                    id: '2015SunW52',
                    iso: '2015SunW52',
                    name: 'Week 52 - 2015-12-27 - 2016-01-02',
                    startDate: '2015-12-27',
                    endDate: '2016-01-02',
                },
            ])
        )
    })

    it('should generate monthly periods (localised in Spanish) for the specified year', () => {
        const result = generateFixedPeriods({
            year: 2015,
            calendar: 'gregory',
            locale: 'es',
            periodType: 'MONTHLY',
        })

        expect(result).toEqual(
            expect.arrayContaining([
                {
                    id: '201501',
                    iso: '201501',
                    name: 'Enero de 2015',
                    startDate: '2015-01-01',
                    endDate: '2015-01-31',
                },
                // .... up to
                {
                    id: '201512',
                    iso: '201512',
                    name: 'Diciembre de 2015',
                    startDate: '2015-12-01',
                    endDate: '2015-12-31',
                },
            ])
        )
    })

    it('should generate bi-monthly periods for the Ethiopic calendar for the specified year', () => {
        const result = generateFixedPeriods({
            year: 2015,
            calendar: 'ethiopic',
            locale: 'en',
            periodType: 'BIMONTHLY',
        })

        expect(result).toEqual(
            expect.arrayContaining([
                {
                    id: '201501B',
                    iso: '201501B',
                    name: 'Meskerem - Tekemt 2015',
                    startDate: '2015-01-01',
                    endDate: '2015-02-30',
                },
                // .... up to
                {
                    endDate: '2015-12-30',
                    id: '201506B',
                    iso: '201506B',
                    name: 'Hamle - Nehasse 2015',
                    startDate: '2015-11-01',
                },
            ])
        )
    })
    it('should generate six-monthly periods for the Nepali calendar for the specified year', () => {
        const result = generateFixedPeriods({
            year: 2078,
            calendar: 'nepali',
            locale: 'en',
            periodType: 'SIXMONTHLY',
        })

        expect(result).toEqual([
            {
                id: '2078S1',
                iso: '2078S1',
                name: 'Baisakh - Ashwin 2078',
                startDate: '2078-01-01',
                endDate: '2078-06-31',
            },
            {
                id: '2078S2',
                iso: '2078S2',
                name: 'Kartik - Chaitra 2078',
                startDate: '2078-07-01',
                endDate: '2078-12-30',
            },
        ])
    })
})
```

### Types

The method takes a single `options` parameter and returns an
`Array<FixedPeriod>`.

#### The `options` param

The `options` param is an object of type `GeneratedPeriodParams`:

```ts
type GeneratedPeriodParams = {
    year: number
    periodType: PeriodIdentifier
    calendar: SupportedCalendar
    locale?: string
    startingDay?: number /** 1 is Monday */
    yearsCount?: number
}
```

For convenience, `locale` can be passed in the Java-like style (i.e. `ar_SD`
rather than `ar-SD`) and it will be converted to the JS-style. `yearsCount` is
used when generating yearly periods to know how many years to generate
(defaults to 10). `

`periodType` can be one of the period identifiers defined
[here](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/period-calculation/fixed-periods.ts#L10).
Although the library internally is flexible and can accept, for example,
quarterly periods starting any month (i.e. `QUARTERLYMAY`), support for such
periods might not be available in the backend, so they should be used
carefully. The flexibility, though, means that a new period could be added to
the backend and used without changes in the frontend.

#### The return value

The returned value is an array of `FixedPeriod`s:

```ts
type FixedPeriod = {
    id: string
    iso?: string
    name: string
    startDate: string
    endDate: string
}
```

-   `id` (and `iso`) are the same right now, and return a period identifier,
    i.e. `2015Q1` (quarter one of the year 2015) or `2015SunW1` (the first week
    - starting Sunday - of the year 2015). The full list of values are
    documented in
    [periodValues](https://github.com/dhis2/multi-calendar-dates/blob/main/features/fixed-periods.ethiopic.feature)
    in the feature files.

> please use `id` to identify the period. `iso` was added for backwards
> compatibility with existing implementations

-   `startDate` and `endDate` are the start and end dates of the specific
    period. This is provided for convenience, but the backend currently only
    makes use of the ID to work out what each period means.
-   `name` is the human readable name of the period, according to what we
    dispaly in DHIS2 Data Visualizer, i.e. `Week 1 - 2014-13-03 - 2015-01-04`
    for a weekly period or `2015` for a yearly period.

## getNowInCalendar

`getNowInCalendar` returns today's date in the specified calendrical system.

### Examples

```js
// Assuming today's date is 13th October 2021
beforeEach(() => {
    // 13 October 2021 UTC
    jest.spyOn(Date, 'now').mockReturnValue(1634089600000)
})
it('should get today date in Gregorian', () => {
    const { day, month, year } = getNowInCalendar('gregory', 'UTC')
    expect({ day, month, year }).toEqual({ day: 13, month: 10, year: 2021 })
})
it('should get today date in Ethiopic', () => {
    const { day, month, eraYear: year } = getNowInCalendar('ethiopic', 'UTC')
    expect({ day, month, year }).toEqual({
        day: 3,
        month: 2,
        year: 2014,
    })
})
```

### Types

The method takes two positional arguments:

-   `calendarToUse` which can be one of the calendars specified
    [here](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/constants/calendars.ts)
    (defaults to `gregory` calendar if not specied.
-   `timeZone`: a string representing the time zone (defaults to `UTC`) of the
    user.

and returns a
[ZonedDateTime](https://tc39.es/proposal-temporal/docs/zoneddatetime.html#properties)
object, which can be destructured to `.year` or `.eraYear` (`eraYear` preferred
to avoid an issue with Ethiopic calendar), `.month`, `.day` which returns the
values in the specified calendar, or you can `.getISOFields()` to return the
underlying iso8601 (gregory) date.

> ToDo: we should also return the date stringified into `yyyy-MM-dd` since this
> is the most common usecase and it would help clients not to have to do the
> conversion manually.

## Upcoming methods

There are new methods that will be added soon (in the alpha release right now),
such as `getFixedPeriodByDate` (which, given a date in a calendar, it returns
what fixed period the date falls in) and `getAdjacentFixedPeriods` (that
facilitates being able to navigate to next and previous periods).

> These new methods will be documented when merged into main branch, but this
> gives an idea about the general approach we want to follow with the library;
> if you encounter a use case that you think it should be included in the
> library then please get in touch to discuss whether it should live there, or
> at the consumer level.

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

# Hooks for Calendar UI

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
    onDateSelect: ({
        calendarDate,
        calendarDateString,
    }: {
        calendarDate: Temporal.ZonedDateTime
        calendarDateString: string
    }) => void
}
```

```ts
// the return type of the hook
type UseDatePickerReturn = UseNavigationReturnType & {
    weekDayLabels: string[]
    calendarWeekDays: {
        zdt: Temporal.ZonedDateTime
        label: string | number
        calendarDate: string
        onClick: () => void
        isSelected: boolean | undefined
        isToday: boolean
        isInCurrentMonth: boolean
    }[][]
}
```

# Architecture Design Records

-   [Use Temporal API as the backbone of the
    engine](./doc/architecture/decisions/0002-use-temporal-api-as-the-backbone-for-the-engine.md)
