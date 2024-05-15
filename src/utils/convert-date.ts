import { Temporal } from '@js-temporal/polyfill'
import { NepaliCalendar } from '../custom-calendars/nepaliCalendar'
import { SupportedCalendar } from '../types'

type ConvertDateFn = (
    date: string | Temporal.PlainDate,
    calendar: SupportedCalendar
) => Temporal.PlainDate

export const convertDate: ConvertDateFn = (date, calendar) => {
    if (calendar === 'nepali') {
        return Temporal.PlainDate.from(date).withCalendar(new NepaliCalendar())
    }
    return Temporal.PlainDate.from(date).withCalendar(calendar)
}
