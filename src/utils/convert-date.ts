import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { NepaliPlainDate } from '../custom-calendars/nepaliCalendar'
import { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomPlainDate, isCustomCalendar } from './helpers'

type ConvertDateFn = (
    date: string | Temporal.PlainDateLike,
    calendar: SupportedCalendar
) => Temporal.PlainDate

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
    const calendar = dhis2CalendarsMap[userCalendar] ?? userCalendar

    if (isCustomCalendar(calendar)) {
        const PlainDateObject = getCustomPlainDate(calendar)
        const dateParts: Temporal.PlainDateLike =
            typeof date === 'string'
                ? extractDatePartsFromDateString(date)
                : date

        const isoDate = new PlainDateObject(
            dateParts.year!,
            dateParts.month!,
            dateParts.day!
        )
        return isoDate
    }

    return Temporal.PlainDate.from(date).withCalendar(calendar)
}

/**
 * converts from a specific calendar (i.e. ethiopic or nepali) to iso8601 (gregorian)
 *
 * @param date calendar date in the format yyyy-MM-dd
 * @param userCalendar the calendar to convert from
 * @returns an object representing the iso8601 date
 */
export const convertToIso8601: ConvertDateFn = (date, userCalendar) => {
    const calendar = dhis2CalendarsMap[userCalendar] ?? userCalendar

    const dateParts: Temporal.PlainDateLike =
        typeof date === 'string' ? extractDatePartsFromDateString(date) : date

    // this is a workaround for the ethiopic calendar being in a different
    // era by default. There is a discussion on Temporal on which should be
    // considered the default era. For us, we need to manually set it to era1
    // https://github.com/js-temporal/temporal-polyfill/blob/8fd0dead40de7c31398f4d2d41e145466ca57a16/lib/calendar.ts#L2010
    if (calendar === 'ethiopic') {
        dateParts.eraYear = dateParts.year
        dateParts.era = 'ethiopic'
        delete dateParts.year
    }

    dateParts.calendar = calendar

    // console.log('....', {
    //     ...dateParts,
    //     calendarId: calendar,
    // })
    // let calendarDate: Temporal.PlainDate

    const PlainDateObject = getCustomPlainDate(calendar)

    const calendarDate: Temporal.PlainDate = PlainDateObject.from({
        ...dateParts,

        calendar,
    }) // .withCalendar('iso8601')

    return calendarDate.withCalendar('iso8601')

    // return { year, month, day }
}
