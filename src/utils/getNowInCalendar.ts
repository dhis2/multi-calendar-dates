import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { getCustomCalendarIfExists, isCustomCalendar } from '../utils/helpers'

/**
 * Gets the Now DateTime in the specified calendar and timeZone
 *
 * @param calendarToUse the calendar to use
 * @param timeZone the timeZone to use
 * @returns Temporal.ZoneDateTime which can be destructured to .year, .month, .day, .hour etc... (returning the values in the specified calendar) or can .getISOFields() to return the underlying iso8601 date
 */
const getNowInCalendar = (
    calendarToUse: Temporal.CalendarLike = 'gregory',
    timeZone: Temporal.TimeZoneLike = Intl?.DateTimeFormat?.().resolvedOptions?.()
        ?.timeZone || 'UTC'
): Temporal.ZonedDateTime => {
    const gregorianDate = Temporal.Now.zonedDateTime('gregory', timeZone)
    let calendar: Temporal.CalendarLike =
        dhis2CalendarsMap[calendarToUse as string] ?? calendarToUse

    if (isCustomCalendar(calendar)) {
        calendar = getCustomCalendarIfExists(calendar)
    }

    const result =
        Temporal.ZonedDateTime.from(gregorianDate).withCalendar(calendar)

    return result
}

export default getNowInCalendar
