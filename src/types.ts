import { Temporal } from '@js-temporal/polyfill-patched'
import { calendars } from './constants/calendars'
import { numberingSystems } from './constants/numberingSystems'

export type SupportedCalendar = typeof calendars[number]
export type SupportedNumberingSystem = typeof numberingSystems[number]

export type WeekDayFormat = 'narrow' | 'short' | 'long'

/**
 * A calendar date as plain data, with no Temporal (or other date-engine)
 * types attached - part of the public interface (returned by
 * `getNowInCalendar`, `convertFromIso8601`, `convertToIso8601`) so that
 * consumers, and this library's own choice of date engine, can change
 * independently of each other. `eraYear` is only populated for calendars
 * that have an era concept - this includes not just Ethiopic but also
 * Gregorian (AD) and others; Islamic, for example, has none and always
 * leaves it undefined. Always read `eraYear ?? year`.
 */
export type CalendarDate = {
    year: number
    month: number
    day: number
    eraYear?: number
}

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
    timeZone: Temporal.TimeZoneLike
    numberingSystem: string
    weekDayFormat: WeekDayFormat
    maxDate?: string | undefined
    minDate?: string | undefined
    pastOnly?: boolean
}
