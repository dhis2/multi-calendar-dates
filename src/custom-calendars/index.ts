import { SupportedCalendar } from '../types'
import calendarLocalisations from './calendarLocalisations'

export type CustomCalendarTypes = 'nepali'

export type CalendarCustomLocale = {
    monthNames: string[]
    monthNamesShort?: string[] | undefined
    dayNamesShort: string[]
    dayNames?: string[] | undefined
    dayNamesMin?: string[] | undefined
    numbers?: string[] | undefined
}

export const customCalendars: Partial<{
    [key in SupportedCalendar]: {
        locales: Record<string, CalendarCustomLocale>
        defaultLocale: string
    }
}> = {
    nepali: {
        locales: calendarLocalisations.nepali,
        defaultLocale: 'en-NP',
    },
}

export {
    NepaliPlainDate,
    NepaliPlainYearMonth,
    NepaliZonedDateTime,
} from './nepaliCalendar'

export {
    isNepaliCalendar,
    isNepaliPlainDate,
    isNepaliZonedDateTime,
    isPlainDateLike,
    plainDateFrom,
    withCalendar,
    zonedDateTimeFrom,
    zonedDateTimeWithCalendar,
    comparePlainDates,
} from './calendar-routing'
export type {
    CalendarPlainDate,
    CalendarZonedDateTime,
} from './calendar-routing'
