import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import {
    CalendarZonedDateTime,
    isNepaliCalendar,
    NepaliZonedDateTime,
} from '../custom-calendars'

/**
 * Gets the Now DateTime in the specified calendar and timeZone
 *
 * @param calendarToUse the calendar to use
 * @param timeZone the timeZone to use
 * @returns A `Temporal.ZonedDateTime` (or `NepaliZonedDateTime` for Nepali)
 * whose `.year`/`.month`/`.day` etc. are in the requested calendar.
 */
const getNowInCalendar = (
    calendarToUse = 'gregory',
    timeZone = Intl?.DateTimeFormat?.().resolvedOptions?.()?.timeZone || 'UTC'
): CalendarZonedDateTime => {
    const gregorianNow = Temporal.Now.zonedDateTimeISO(timeZone)
    const resolvedCalendar = dhis2CalendarsMap[calendarToUse] ?? calendarToUse

    if (isNepaliCalendar(resolvedCalendar)) {
        return NepaliZonedDateTime.fromIso(gregorianNow)
    }

    return gregorianNow.withCalendar(resolvedCalendar)
}

export default getNowInCalendar
