import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../types'

const dateStringRegExp = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/

type FromDateString = (args: {
    date: string
    calendar: SupportedCalendar
}) => Temporal.PlainDate

const fromDateString: FromDateString = ({ date, calendar }) => {
    const parts = date.match(dateStringRegExp)

    if (!parts) {
        throw new Error(`Date string is invalid, received "${date}"`)
    }

    const [, yearStr, monthStr, dayStr] = parts
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const day = parseInt(dayStr, 10)

    return Temporal.PlainDate.from({ year, month, day, calendar })
}

export default fromDateString
