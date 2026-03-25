import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { convertFromIso8601 } from './convert-date'

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
): Temporal.PlainDate => {
    const gregorianDate = Temporal.Now.plainDateISO(timeZone)
    const calendar = dhis2CalendarsMap[calendarToUse as string] ?? calendarToUse

    // if (isCustomCalendar(calendar)) {
    //     calendar = getCustomCalendarIfExists(calendar)
    // }

    const result = convertFromIso8601(gregorianDate, calendar)

    // Temporal.PlainDate.from(gregorianDate).withCalendar(calendar)

    return result as Temporal.PlainDate
}

export default getNowInCalendar
