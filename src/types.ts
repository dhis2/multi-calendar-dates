import { Temporal } from '@js-temporal/polyfill'
import { calendars } from './constants/calendars'
import { numberingSystems } from './constants/numberingSystems'

export type SupportedCalendar = typeof calendars[number]
export type SupportedNumberingSystem = typeof numberingSystems[number]

export type WeekDayFormat = 'narrow' | 'short' | 'long'

export type PickerOptions = Partial<ResolvedLocaleOptions>

export type ResolvedLocaleOptions = {
    calendar: SupportedCalendar
    locale: string
    timeZone: Temporal.TimeZoneLike
    numberingSystem: string
    weekDayFormat: WeekDayFormat
}

export type ValidationOptions = {
    minDateString?: string
    maxDateString?: string
}
