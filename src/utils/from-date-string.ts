import { plainDateFrom, CalendarPlainDate } from '../custom-calendars'
import { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'

type FromDateString = (args: {
    date: string
    calendar: SupportedCalendar
}) => CalendarPlainDate

const fromDateString: FromDateString = ({ date, calendar }) => {
    const { year, month, day } = extractDatePartsFromDateString(date)
    return plainDateFrom({ year, month, day }, calendar)
}

export default fromDateString
