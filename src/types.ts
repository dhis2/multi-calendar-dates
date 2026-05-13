import { calendars } from './constants/calendars'
import { numberingSystems } from './constants/numberingSystems'

export type SupportedCalendar = typeof calendars[number]
export type SupportedNumberingSystem = typeof numberingSystems[number]

export type WeekDayFormat = 'narrow' | 'short' | 'long'

export type PickerOptions = Partial<ResolvedLocaleOptions>

export type PickerOptionsWithResolvedCalendar = Omit<
    PickerOptions,
    'calendar'
> & {
    calendar: SupportedCalendar
    pastOnly?: boolean
}

export type ResolvedLocaleOptions = {
    calendar: SupportedCalendar
    locale: string
    timeZone: string
    numberingSystem: string
    weekDayFormat: WeekDayFormat
    maxDate?: string | undefined
    minDate?: string | undefined
    pastOnly?: boolean
}
