import { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getPlainDateFromCalendarFields } from './helpers'
import { AnyPlainDate } from './plainDate'

type FromDateString = (args: {
    date: string
    calendar: SupportedCalendar
}) => AnyPlainDate

const fromDateString: FromDateString = ({ date, calendar }) => {
    const { year, month, day } = extractDatePartsFromDateString(date)
    return getPlainDateFromCalendarFields({ year, month, day }, calendar)
}

export default fromDateString
