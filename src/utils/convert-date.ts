import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../types'
import { getCustomCalendarIfExists } from './helpers'

type ConvertDateFn = (
    date: string | Temporal.PlainDate,
    calendar: SupportedCalendar
) => Temporal.PlainDate

export const convertDate: ConvertDateFn = (date, userCalendar) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[userCalendar] ?? userCalendar
    ) as SupportedCalendar

    return Temporal.PlainDate.from(date).withCalendar(calendar)
}
