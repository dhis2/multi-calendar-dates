import { CalendarType } from 'dhis2-period-generator'
import { SupportedCalendar } from '../types'

const Calendar = {
    fromString: (calendar: SupportedCalendar) => {
        if (calendar === 'ethiopic') {
            return new CalendarType.Ethiopian()
        }

        if (calendar === 'nepali') {
            return new CalendarType.Nepali()
        }

        return new CalendarType.Gregorian()
    },
}

export default Calendar
