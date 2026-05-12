import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { isNepaliCalendar, NepaliPlainDate } from '../custom-calendars'
import { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'

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
    const calendar = dhis2CalendarsMap[userCalendar] ?? userCalendar
    const isoDate = Temporal.PlainDate.from(date)

    if (isNepaliCalendar(calendar)) {
        const nepali = NepaliPlainDate.fromIso(isoDate)
        return {
            year: nepali.year,
            eraYear: nepali.year,
            month: nepali.month,
            day: nepali.day,
        }
    }

    const { eraYear, year, month, day } = isoDate.withCalendar(
        calendar as Temporal.CalendarLike
    )
    // In `@js-temporal/polyfill` 0.5.x some calendars (e.g. `islamic`) no
    // longer expose an `eraYear` even when the user-facing year equals it.
    // Consumers of this function relied on `eraYear ?? year`, so fall back
    // here to preserve that contract.
    return { eraYear: eraYear ?? year, year, month, day }
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

    if (isNepaliCalendar(calendar)) {
        const np = NepaliPlainDate.fromNepaliFields({
            year: dateParts.year as number,
            month: dateParts.month as number,
            day: dateParts.day as number,
        })
        const iso = np.toIso()
        return { year: iso.year, month: iso.month, day: iso.day }
    }

    const adjustedParts = { ...dateParts }
    // The ethiopic calendar has two eras. We want the post-incarnation era.
    // In `@js-temporal/polyfill` 0.5.x the era codes were renamed from the
    // generic `era1`/`era2` to the calendar-specific `ethiopic`/`ethioaa`,
    // matching the names accepted by `Temporal.PlainDate.from`.
    if (calendar === 'ethiopic') {
        adjustedParts.eraYear = adjustedParts.year
        adjustedParts.era = 'ethiopic'
        delete adjustedParts.year
    }

    adjustedParts.calendar = calendar as Temporal.CalendarLike

    const { year, month, day } =
        Temporal.PlainDate.from(adjustedParts).withCalendar('iso8601')

    return { year, month, day }
}
