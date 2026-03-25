import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomPlainDate } from './helpers'

type FromDateString = (args: {
    date: string
    calendar: SupportedCalendar
}) => Temporal.PlainDate

const fromDateString: FromDateString = ({ date, calendar }) => {
    const { year, month, day } = extractDatePartsFromDateString(date)
    const PlainDateObject = getCustomPlainDate(calendar)

    return PlainDateObject.from({ year, month, day, calendar })
}

export default fromDateString
