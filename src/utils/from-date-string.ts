import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'

type FromDateString = (args: {
    date: string
    calendar: SupportedCalendar
}) => Temporal.PlainDate

const fromDateString: FromDateString = ({ date, calendar }) => {
    const { year, month, day } = extractDatePartsFromDateString(date)
    return Temporal.PlainDate.from({ year, month, day, calendar })
}

export default fromDateString
