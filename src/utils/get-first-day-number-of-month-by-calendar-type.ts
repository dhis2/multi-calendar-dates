import { SupportedCalendar } from '../types'

const getFirstDayNumberOfMonthByCalendarType = (
    calendarType: SupportedCalendar
) => {
    if (calendarType === 'nepali') {
        return 14
    }

    return 1
}

export default getFirstDayNumberOfMonthByCalendarType
