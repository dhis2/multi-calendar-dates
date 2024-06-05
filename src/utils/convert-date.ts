import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomCalendarIfExists } from './helpers'

type PlainDate = {
    year: number
    month: number
    day: number
    // keeping eraYear to be consistent with the default behaviour of Temporal (check method documentation for more info)
    eraYear?: number
}

type ConvertDateFn = (
    date: string | Temporal.PlainDateLike,
    calendar: SupportedCalendar
) => PlainDate

/**
 * converts from an iso8601 (gregorian) date to a specific calendar
 *
 * @param date string in the format yyyy-MM-dd
 * @param userCalendar the calendar to covert to
 * @returns an object representing the date
 *
 * NOTE: the returned object contains two properties year and eraYear
 * to be consistent with the default behaviour of Temporal. This only affects
 * ethiopic calendar in practice. When accessing year, consumers should be defensive
 * and do: `const yearToUse = result.eraYear ?? result.year` for example.
 *
 * @see https://github.com/tc39/ecma402/issues/534 for more details
 */
export const convertFromIso8601: ConvertDateFn = (date, userCalendar) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[userCalendar] ?? userCalendar
    ) as SupportedCalendar

    const { eraYear, year, month, day } =
        Temporal.PlainDate.from(date).withCalendar(calendar)

    return {
        eraYear,
        year,
        month,
        day,
    }
}

/**
 * converts from a specific calendar (i.e. ethiopic or nepali) to iso8601 (gregorian)
 *
 * @param date calendar date in the format yyyy-MM-dd
 * @param userCalendar the calendar to convert from
 * @returns an object representing the iso8601 date
 */
export const convertToIso8601: ConvertDateFn = (date, userCalendar) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[userCalendar] ?? userCalendar
    ) as SupportedCalendar

    const dateParts: Temporal.PlainDateLike =
        typeof date === 'string' ? extractDatePartsFromDateString(date) : date

    // this is a workaround for the ethiopic calendar being in a different
    // era by default. There is a discussion on Temporal on which should be
    // considered the default era. For us, we need to manually set it to era1
    // https://github.com/js-temporal/temporal-polyfill/blob/8fd0dead40de7c31398f4d2d41e145466ca57a16/lib/calendar.ts#L2010
    if (calendar === 'ethiopic') {
        dateParts.eraYear = dateParts.year
        dateParts.era = 'era1'
        delete dateParts.year
    }

    dateParts.calendar = calendar

    const { year, month, day } =
        Temporal.PlainDate.from(dateParts).withCalendar('iso8601')

    return { year, month, day }
}
