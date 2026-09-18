import { Temporal } from '@js-temporal/polyfill-patched'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { CalendarDate, SupportedCalendar } from '../types'
import { getPlainDateFromIso } from './helpers'

/**
 * Gets the current date in the specified calendar and timeZone.
 *
 * @param calendarToUse the calendar to use
 * @param timeZone the timeZone to use
 * @returns a plain `{ year, month, day, eraYear? }` object for the current
 * date in the specified calendar - no Temporal (or other date-engine) types
 * attached, matching `convertFromIso8601`/`convertToIso8601`. Note: unlike
 * previous versions, this no longer carries time-of-day/timezone
 * information - the timeZone parameter is only used to resolve which
 * calendar date is "now".
 */
const getNowInCalendar = (
    // widened beyond SupportedCalendar to also accept DHIS2 calendar
    // identifiers (e.g. 'ethiopian', 'gregorian') resolved via dhis2CalendarsMap below
    calendarToUse = 'gregory',
    timeZone: string = Intl?.DateTimeFormat?.().resolvedOptions?.()?.timeZone ||
        'UTC'
): CalendarDate => {
    const isoDate = Temporal.Now.plainDateISO(timeZone)
    const calendar = (dhis2CalendarsMap[calendarToUse as string] ??
        calendarToUse) as SupportedCalendar

    const date = getPlainDateFromIso(
        { year: isoDate.year, month: isoDate.month, day: isoDate.day },
        calendar
    )

    return {
        eraYear: date.eraYear,
        year: date.year,
        month: date.month,
        day: date.day,
    }
}

export default getNowInCalendar
