import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../types'
import calendarLocalisations from './calendarLocalisations'
import { NepaliCalendar } from './nepaliCalendar'

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
        calendar: Temporal.CalendarProtocol
        locales: Record<string, CalendarCustomLocale>
        defaultLocale: string
    }
}> = {
    nepali: {
        calendar: new NepaliCalendar(),
        locales: calendarLocalisations.nepali,
        defaultLocale: 'en-NP',
    },
}
