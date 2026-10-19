# API and examples

The functions the library exports to work with periods and dates in multiple
calendars, with their arguments, return values and examples. For an overview,
see the [README](../README.md#api).

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
    -   starting Sunday - of the year 2015). The full list of values are
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

`getNowInCalendar` returns the current date and time of day in the specified
calendrical system and time zone, as a plain
`{ year, month, day, eraYear?, hour, minute, second }` object (typed as
`CalendarDateTime`). The date fields are the same shape returned by
`convertFromIso8601`/`convertToIso8601` below; `hour` (0-23), `minute` and
`second` are the wall-clock time in the given time zone, read from the same
instant as the date.

> **Breaking change (`@js-temporal/polyfill` 0.5.x upgrade):** prior versions
> of this library returned a `Temporal.ZonedDateTime` directly from
> `getNowInCalendar`, exposing Temporal methods (`.startOfDay()`,
> `.withCalendar()`, etc.) and time-of-day/timezone information alongside
> `.year`/`.month`/`.day`/`.eraYear`. It now returns plain data only — no
> Temporal (or other date-engine) type is exposed. `.hour`/`.minute`/`.second`
> are still available as plain numbers (they were missing in 3.0.0 and added
> back afterwards); other time zone information is not. Code that only read
> `.year`/`.month`/`.day`/`.eraYear`/`.hour`/`.minute`/`.second` needs no changes; code that called Temporal
> methods on the result needs to be rewritten against plain data (e.g. re-derive
> another date via `getNowInCalendar`/`convertFromIso8601` again, rather than
> calling `.withCalendar()` on the previous result). See
> [ADR 3](./architecture/decisions/0003-upgrade-temporal-polyfill-to-0-5-without-custom-calendars.md)
> for why this was forced, not just a cleanup.

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
it('should get the time of day in the given time zone', () => {
    // 01:46:40 UTC; Asia/Kathmandu is UTC+05:45
    const { hour, minute, second } = getNowInCalendar('nepali', 'Asia/Kathmandu')
    expect({ hour, minute, second }).toEqual({ hour: 7, minute: 31, second: 40 })
})
```

## convertFromIso8601 and convertToIso8601

`convertFromIso8601` and `convertToIso8601` are used to convert between Iso8601 (gregorian) dates and specific calendars (i.e. Ethiopic or Nepali). It accepts either a string in the format `yyyy-MM-dd` or an object representing the date properties (`year`, `month` and `day`).

### Examples

```js
it('should convert a gregorian date to ethiopic', () => {
    const result = convertFromIso8601('2024-05-23', 'ethiopic')
    expect(result).toMatchObject({
        year: 7516,
        eraYear: 2016,
        month: 9,
        day: 15,
    })
})
it('should convert a Nepali date to gregorian', () => {
    const result = convertToIso8601('2081-02-10', 'nepali')
    expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
})
it('should convert an ethiopic date to gregorian', () => {
    const result = convertToIso8601('2016-09-15', 'ethiopic')
    expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
})
it('should accept a date object instead of a string', () => {
    const result = convertToIso8601(
        {
            year: 2081,
            month: 2,
            day: 10,
        },
        'nepali'
    )
    expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
})
```

### Types

The method takes two positional arguments:

-   `calendarToUse` which can be one of the calendars specified
    [here](https://github.com/dhis2/multi-calendar-dates/blob/multi-calendar-docs/src/constants/calendars.ts)
    (defaults to `gregory` calendar if not specied.
-   `timeZone`: a string representing the time zone (defaults to `UTC`) of the
    user.

and returns a plain `{ year, month, day, eraYear? }` object in the specified
calendar. Read the year as `eraYear ?? year`. To turn it into a `yyyy-MM-dd`
string, use [`formatCalendarDate`](#date-arithmetic-and-formatting).

## Date arithmetic and formatting

These take and return the same plain date objects as `getNowInCalendar` and
`convertFromIso8601`, so their results can be passed in as-is. They follow the
DHIS2 date-string convention: the year is `eraYear ?? year` (e.g. the Amete
Mihret year for Ethiopic, not Temporal's Amete Alem `year`). The calendar can
be a Temporal calendar id or a DHIS2 one (`ethiopian`, `gregorian`, …).

-   **`getDaysInMonth({ year, month }, calendar)`** returns the number of days
    in a month, e.g. `29` for February 2024, `5` or `6` for the 13th month in
    Ethiopic, or up to `32` in Nepali.
-   **`addToCalendarDate(date, { years, months, days }, calendar)`** adds (or,
    with negative values, subtracts) years, months and days. Years and months
    are counted in the calendar's own months, and the day is clamped to the
    end of the resulting month; days are added after that.
-   **`formatCalendarDate(date, { format, includeTime })`** formats a date as
    the date string the DHIS2 backend expects. `format` is `YYYY-MM-DD`
    (default) or `DD-MM-YYYY`. `includeTime` appends `Thh:mm:ss`, from
    `getNowInCalendar`'s `hour`, `minute` and `second`.

All of them throw for a date that doesn't exist in the calendar, or a Nepali
year outside 1970-2100.

### Examples

```js
const now = getNowInCalendar('ethiopian') // { eraYear: 2016, year: 7516, month: 10, day: 8, … }

formatCalendarDate(now) // '2016-10-08'
formatCalendarDate(now, { includeTime: true }) // '2016-10-08T10:30:00'

// one year ago
formatCalendarDate(addToCalendarDate(now, { years: -1 }, 'ethiopian')) // '2015-10-08'

// 31 March minus 1 month is clamped to the end of February
addToCalendarDate({ year: 2024, month: 3, day: 31 }, { months: -1 }, 'gregory') // { year: 2024, month: 2, day: 29, … }

getDaysInMonth({ year: 2016, month: 13 }, 'ethiopian') // 5
getDaysInMonth({ year: 2081, month: 2 }, 'nepali') // 32
```

## `createFixedPeriodFromPeriodId`

-   [API](#createFixedPeriodFromPeriodId-api)
-   [Examples](#createFixedPeriodFromPeriodId-examples)

<a name="createFixedPeriodFromPeriodId-api"></a>

### API

#### Arguments

The function expects an options object with the following properties:

| Option     | type                | Required | Default value | Description                                    |
| ---------- | ------------------- | -------- | ------------- | ---------------------------------------------- |
| `periodId` | `string`            | yes      | -             | A period id, e.g. `2020` or `2020April`        |
| `calendar` | `SupportedCalendar` | yes      | -             | A calendar sytem, e.g. `gregory` or `ethiopic` |
| `locale`   | `string`            | no       | `"en"`        | A language locale for the displayed labels     |

#### Return value

Returns a `FixedPeriod` whos `id` equals the provided `periodId`, see `src/period-calculation/types.ts`

<a name="createFixedPeriodFromPeriodId-examples"></a>

### Examples

```ts
createFixedPeriodFromPeriodId({
    periodId: '2023',
    calendar: 'gregory',
})
```

will return:

```ts
{
    periodType: 'YEARLY',
    name: '2023',
    displayName: '2023',
    id: '2023',
    iso: '2023',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
}
```

## `getAdjacentFixedPeriods`

-   [API](#getAdjacentFixedPeriods-api)
-   [Examples](#getAdjacentFixedPeriods-examples)

<a name="getAdjacentFixedPeriods-api"></a>

### API

#### Arguments

The function expects an options object with the following properties:

| Option     | Type                | Required | Default value | Description                                                       |
| ---------- | ------------------- | -------- | ------------- | ----------------------------------------------------------------- |
| `period`   | `FixedPeriod`       | yes      | -             | A period id, e.g. `2020` or `2020April`                           |
| `calendar` | `SupportedCalendar` | yes      | -             | A calendar sytem, e.g. `gregory` or `ethiopic`                    |
| `steps`    | `integer`           | no       | `1`           | Amount of adjacent fixed period forward/backward, can be negative |
| `locale`   | `string`            | no       | `"en"`        | A language locale for the displayed labels                        |

#### Return value

Returns a collection with fixed periods, see `src/period-calculation/types.ts`

<a name="getAdjacentFixedPeriods-examples"></a>

### Examples

**With `steps: 1` (default):**

```ts
const period = createFixedPeriodFromPeriodId({
    periodId: '20230101',
    calendar: 'gregory',
})
getAdjacentFixedPeriods({
    period,
    calendar: 'gregory',
})
```

will return:

```ts
{
    periodType: 'YEARLY',
    name: '2023',
    displayName: '2023',
    id: '2023',
    iso: '2023',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
}
```

**With `steps: 2`:**

```ts
const period = createFixedPeriodFromPeriodId({
    periodId: '20221230',
    calendar: 'gregory',
})
getAdjacentFixedPeriods({
    period,
    calendar: 'gregory',
    steps: 2,
})
```

will return:

```ts
;[
    {
        periodType: 'DAILY',
        name: '2022-12-31',
        displayName: 'December 31, 2022',
        id: '20221231',
        iso: '20221231',
        startDate: '2022-12-31',
        endDate: '2022-12-31',
    },
    {
        periodType: 'DAILY',
        name: '2023-01-01',
        displayName: 'January 1, 2023',
        id: '20230101',
        iso: '20230101',
        startDate: '2023-01-01',
        endDate: '2023-01-01',
    },
]
```

**With `steps: -3`:**

```ts
const period = createFixedPeriodFromPeriodId({
    periodId: '20230102',
    calendar: 'gregory',
})
getAdjacentFixedPeriods({
    period,
    calendar: 'gregory',
    steps: -3,
})
```

will return:

```ts
;[
    {
        periodType: 'DAILY',
        name: '2022-12-30',
        displayName: 'December 30, 2022',
        id: '20221230',
        iso: '20221230',
        startDate: '2022-12-30',
        endDate: '2022-12-30',
    },
    {
        periodType: 'DAILY',
        name: '2022-12-31',
        displayName: 'December 31, 2022',
        id: '20221231',
        iso: '20221231',
        startDate: '2022-12-31',
        endDate: '2022-12-31',
    },
    {
        periodType: 'DAILY',
        name: '2023-01-01',
        displayName: 'January 1, 2023',
        id: '20230101',
        iso: '20230101',
        startDate: '2023-01-01',
        endDate: '2023-01-01',
    },
]
```

## `getFixedPeriodByDate`

-   [API](#getFixedPeriodByDate-api)
-   [Examples](#getFixedPeriodByDate-examples)

<a name="getFixedPeriodByDate-api"></a>

### API

#### Arguments

The function expects an options object with the following properties:

| Option                                    | Type                | Required | Default value | Description                                    |
| ----------------------------------------- | ------------------- | -------- | ------------- | ---------------------------------------------- |
| `periodType`                              | `PeriodType`        | yes      | -             | E.g. `'YEARLY'` (see                           |
| `src/period-calculation/period-types.ts`) |
| `calendar`                                | `SupportedCalendar` | yes      | -             | A calendar sytem, e.g. `gregory` or `ethiopic` |
| `date`                                    | `string`            | yes      | -             | E.g. `'2020-10-04'`                            |
| `locale`                                  | `string`            | no       | `"en"`        | A language locale for the displayed labels     |

#### Return value

Returns a fixed period, see `src/period-calculation/types.ts`

<a name="getFixedPeriodByDate-examples"></a>

### Examples

```ts
getFixedPeriodByDate({
    periodType: 'DAILY',
    date: '2022-01-01',
    calendar: 'gregory',
})
```

will return:

```ts
{
    periodType: 'DAILY',
    id: '20220101',
    iso: '20220101',
    displayName: 'January 1, 2022',
    name: '2022-01-01',
    startDate: '2022-01-01',
    endDate: '2022-01-01'
}
```

## `periodTypes`

Some functions require a period type to be passed. Instead of hardcoding string
or manually replicating the constants used in the library, they're being
exposed. `periodTypes` is an array with string, which can easily be converted
to an object:

```ts
const obj = periodTypes.reduce(
    (acc, periodType) => ({ ...acc, [periodType]: periodType }),
    {}
)
```

### API

For all available period types, see: `src/period-calculation/period-types.ts`

```ts
type periodTypes = string[]
```
