import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../types'
import fromDateString from './from-date-string'

type FromAnyDate = (args: {
    date: string | Date | Temporal.PlainDate
    calendar: SupportedCalendar
}) => Temporal.PlainDate

const fromAnyDate: FromAnyDate = ({ date, calendar }) => {
    if (typeof date === 'string') {
        return fromDateString({ date, calendar })
    }

    if (date instanceof Date) {
        return Temporal.PlainDate.from({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            calendar,
        })
    }

    if (date instanceof Temporal.PlainDate) {
        return Temporal.PlainDate.from({
            year: date.year,
            month: date.month,
            day: date.day,
            calendar,
        })
    }

    throw new Error(`Unrecognized date, received "${date}"`)
}

export default fromAnyDate
