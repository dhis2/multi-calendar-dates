import { Temporal } from '@js-temporal/polyfill-patched'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { CalendarDateTime, SupportedCalendar } from '../types'
import { getPlainDateFromIso } from './helpers'

/**
 * Gets the current date and time of day in the specified calendar and timeZone.
 *
 * @param calendarToUse the calendar to use
 * @param timeZone the timeZone to use
 * @returns a plain `{ year, month, day, eraYear?, hour, minute, second }`
 * object for the current moment in the specified calendar and timeZone - no
 * Temporal (or other date-engine) types attached. The date fields match
 * `convertFromIso8601`/`convertToIso8601`; `hour`/`minute`/`second` are the
 * wall-clock time in `timeZone`, read from the same instant as the date.
 */
const getNowInCalendar = (
    // widened beyond SupportedCalendar to also accept DHIS2 calendar
    // identifiers (e.g. 'ethiopian', 'gregorian') resolved via dhis2CalendarsMap below
    calendarToUse = 'gregory',
    timeZone: string = Intl?.DateTimeFormat?.().resolvedOptions?.()?.timeZone ||
        'UTC'
): CalendarDateTime => {
    const now = Temporal.Now.plainDateTimeISO(timeZone)
    const calendar = (dhis2CalendarsMap[calendarToUse as string] ??
        calendarToUse) as SupportedCalendar

    const date = getPlainDateFromIso(
        { year: now.year, month: now.month, day: now.day },
        calendar
    )

    return {
        eraYear: date.eraYear,
        year: date.year,
        month: date.month,
        day: date.day,
        hour: now.hour,
        minute: now.minute,
        second: now.second,
    }
}

export default getNowInCalendar
