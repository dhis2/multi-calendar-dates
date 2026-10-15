import { Temporal } from '@js-temporal/polyfill-patched'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { CalendarDate, SupportedCalendar } from '../types'
import { getPlainDateFromCalendarFields, padWithZeroes } from './helpers'
import { AnyPlainDate, getCustomPlainDateImplementation } from './plainDate'

type CalendarYearMonth = { year: number; eraYear?: number; month: number }
type CalendarDateFields = CalendarYearMonth & { day: number }

type CalendarDuration = { years?: number; months?: number; days?: number }

type FormatCalendarDateOptions = {
    format?: 'YYYY-MM-DD' | 'DD-MM-YYYY'
    includeTime?: boolean
}

// widened beyond SupportedCalendar to also accept DHIS2 calendar identifiers
// (e.g. 'ethiopian', 'gregorian'), like getNowInCalendar
type CalendarId = SupportedCalendar | string

const resolveCalendar = (calendar: CalendarId) =>
    (dhis2CalendarsMap[calendar] ?? calendar) as SupportedCalendar

/**
 * Builds a date from fields that follow the DHIS2 date-string convention:
 * the year is `eraYear ?? year`, so the output of getNowInCalendar or
 * convertFromIso8601 can be passed in as-is. Ethiopic needs the Amete Mihret
 * era set explicitly, the same workaround as convertToIso8601 - otherwise
 * Temporal reads the year as Amete Alem.
 */
const toPlainDate = (
    { year, eraYear, month, day }: CalendarDateFields,
    calendar: SupportedCalendar,
    overflow: Temporal.AssignmentOptions['overflow'] = 'reject'
): AnyPlainDate => {
    const resolvedYear = eraYear ?? year
    const fields: Temporal.PlainDateLike =
        calendar === 'ethiopic'
            ? { era: 'ethiopic', eraYear: resolvedYear, month, day }
            : { year: resolvedYear, month, day }

    return getPlainDateFromCalendarFields(fields, calendar, { overflow })
}

const toCalendarDate = (date: AnyPlainDate): CalendarDate => ({
    eraYear: date.eraYear,
    year: date.year,
    month: date.month,
    day: date.day,
})

/**
 * Gets the number of days in a month
 *
 * @param date the year and month (`eraYear ?? year` is used as the year)
 * @param calendar the calendar the year and month are in
 * @returns the number of days, e.g. 29 for February 2024 in Gregorian, 5 or 6
 * for the 13th month in Ethiopic, or up to 32 in Nepali
 */
export const getDaysInMonth = (
    date: CalendarYearMonth,
    calendar: CalendarId
): number =>
    toPlainDate({ ...date, day: 1 }, resolveCalendar(calendar)).daysInMonth

/**
 * Adds (or, with negative values, subtracts) years, months and days to a date.
 *
 * Years and months are added in the calendar's own months, and the day is
 * clamped to the end of the resulting month (e.g. 31 March 2024 - 1 month
 * is 29 February 2024). Days are added after that.
 *
 * @param date the date to add to (`eraYear ?? year` is used as the year)
 * @param duration the years, months and days to add
 * @param calendar the calendar the date is in
 * @returns a plain `{ year, month, day, eraYear? }` object, the same shape
 * as convertFromIso8601
 */
export const addToCalendarDate = (
    date: CalendarDateFields,
    { years = 0, months = 0, days = 0 }: CalendarDuration,
    calendar: CalendarId
): CalendarDate => {
    const resolvedCalendar = resolveCalendar(calendar)
    const start = toPlainDate(date, resolvedCalendar)

    let result: AnyPlainDate
    if (getCustomPlainDateImplementation(resolvedCalendar)) {
        // custom calendars (Nepali) do add() in ISO terms, which is wrong
        // for months and years, so do the month arithmetic on the fields
        const monthsInYear = start.monthsInYear
        const monthIndex =
            (start.year + years) * monthsInYear + (start.month - 1) + months
        const year = Math.floor(monthIndex / monthsInYear)
        const month = (monthIndex % monthsInYear) + 1
        const { daysInMonth } = toPlainDate(
            { year, month, day: 1 },
            resolvedCalendar
        )
        result = toPlainDate(
            { year, month, day: Math.min(start.day, daysInMonth) },
            resolvedCalendar
        )
    } else {
        result = start.add({ years, months }, { overflow: 'constrain' })
    }

    return toCalendarDate(result.add({ days }))
}

/**
 * Formats a date as a date string in the format the DHIS2 backend expects,
 * e.g. `2016-13-05` for an Ethiopic date. The year is `eraYear ?? year`.
 *
 * @param date the date, e.g. from getNowInCalendar or convertFromIso8601
 * @param options.format `YYYY-MM-DD` (default) or `DD-MM-YYYY`
 * @param options.includeTime appends `Thh:mm:ss` - the date must have
 * `hour`, `minute` and `second`, as getNowInCalendar's result does
 * @returns the formatted date string
 */
export const formatCalendarDate = (
    date: CalendarDate & { hour?: number; minute?: number; second?: number },
    {
        format = 'YYYY-MM-DD',
        includeTime = false,
    }: FormatCalendarDateOptions = {}
): string => {
    const year = padWithZeroes(date.eraYear ?? date.year, 4)
    const month = padWithZeroes(date.month)
    const day = padWithZeroes(date.day)
    const dateString =
        format === 'DD-MM-YYYY'
            ? `${day}-${month}-${year}`
            : `${year}-${month}-${day}`

    if (!includeTime) {
        return dateString
    }

    const { hour, minute, second } = date
    if (hour === undefined || minute === undefined || second === undefined) {
        throw new Error(
            'formatCalendarDate: includeTime needs a date with hour, minute and second'
        )
    }

    return `${dateString}T${padWithZeroes(hour)}:${padWithZeroes(
        minute
    )}:${padWithZeroes(second)}`
}
