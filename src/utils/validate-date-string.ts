import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import type { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomCalendarIfExists } from './helpers'

export function validateDateString(
    dateString: string,
    { calendar = 'gregory' }: { calendar?: SupportedCalendar } = {}
): undefined | string {
    const resolvedCalendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[calendar] ?? calendar
    ) as SupportedCalendar

    try {
        // will throw if the format of the date is incorrect
        const { year, month, day } = extractDatePartsFromDateString(dateString)

        // will throw if the year, month or day is out of range
        Temporal.PlainDate.from(
            { year, month, day, calendar: resolvedCalendar },
            { overflow: 'reject' }
        )
    } catch (e) {
        return (e as Error).message
    }

    return undefined
}
