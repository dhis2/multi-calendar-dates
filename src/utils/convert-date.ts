import { Temporal } from '@js-temporal/polyfill-patched'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { CalendarDate, SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getPlainDateFromCalendarFields, getPlainDateFromIso } from './helpers'
import { toIsoPlainDate } from './plainDate'

type ConvertDateFn = (
    date: string | Temporal.PlainDateLike,
    calendar: SupportedCalendar
) => CalendarDate

/**
 * converts from an iso8601 (gregorian) date to a specific calendar
 *
 * @param date string in the format yyyy-MM-dd
 * @param userCalendar the calendar to covert to
 * @returns an object representing the date
 *
 * NOTE: the returned object contains two properties year and eraYear
 * to be consistent with the default behaviour of Temporal. `eraYear` is only
 * populated for calendars that have an era concept - this includes not just
 * Ethiopic but also Gregorian (AD) and others; Islamic, for example, has
 * none and always leaves it undefined. When accessing year, consumers
 * should be defensive and do: `const yearToUse = result.eraYear ?? result.year`.
 *
 * @see https://github.com/tc39/ecma402/issues/534 for more details
 */
export const convertFromIso8601: ConvertDateFn = (date, userCalendar) => {
    const calendar = (dhis2CalendarsMap[userCalendar] ??
        userCalendar) as SupportedCalendar
    const isoDate = Temporal.PlainDate.from(date)

    const calendarDate = getPlainDateFromIso(
        { year: isoDate.year, month: isoDate.month, day: isoDate.day },
        calendar
    )

    return {
        eraYear: calendarDate.eraYear,
        year: calendarDate.year,
        month: calendarDate.month,
        day: calendarDate.day,
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
    const calendar = (dhis2CalendarsMap[userCalendar] ??
        userCalendar) as SupportedCalendar

    const dateParts: Temporal.PlainDateLike =
        typeof date === 'string' ? extractDatePartsFromDateString(date) : date

    // this is a workaround for the ethiopic calendar being in a different
    // era by default. There is a discussion on Temporal on which should be
    // considered the default era. For us, we need to manually set it to
    // 'ethiopic' (CLDR 48's code for the Amete Mihret era)
    // https://github.com/js-temporal/temporal-polyfill/blob/8fd0dead40de7c31398f4d2d41e145466ca57a16/lib/calendar.ts#L2010
    if (calendar === 'ethiopic') {
        dateParts.eraYear = dateParts.year
        dateParts.era = 'ethiopic'
        delete dateParts.year
    }

    const calendarDate = getPlainDateFromCalendarFields(dateParts, calendar)
    const { year, month, day } = toIsoPlainDate(calendarDate)

    return { year, month, day }
}
