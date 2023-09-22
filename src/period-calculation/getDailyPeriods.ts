import {
    CalendarType,
    PeriodGenerator,
    PeriodOptions,
    PeriodType,
} from 'dhis2-period-generator'
import Calendar from '../utils/calendarUtils'
import { GeneratedPeriodsFunc } from './fixed-periods'

/**
 *
 * Notes about consuming Kotlin Multi-Platform from JS:
 * - Generally, it is very straightforwrd
 * - There is a directive generateTypeScriptDefinitions() in gradle that generate TypeScript types
 * (a.k.a Make Birk Happy)
 * - Generated types have some issues, but still good enough
 * - Generated code is more Object Oriented than functional, which doesn't fit nicely with JS patterns but that can be further abstracted with a façade like multi-calendar-dates library
 *
 * Already some improvements in this implementation because of bringing FE and BE closer together:
 * - Start and end dates are converted to Gregorian which is inline with what the BE expects
 * - Start and end dates are encoded using the IS8601 / RFC 3339 for date serialisation which introduced a "calendar extension"
 *
 */
export const getDailyPeriods: GeneratedPeriodsFunc = ({
    year,
    calendar: calendarToUse,
}) => {
    const calendar: CalendarType = Calendar.fromString(calendarToUse) // would be nice to be able to just pass a string
    const options = new PeriodOptions(year, PeriodType.DAILY, calendar)
    const result = new PeriodGenerator().generatePeriod(options)

    return result
}
