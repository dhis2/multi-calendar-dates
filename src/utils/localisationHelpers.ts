import { Temporal } from '@js-temporal/polyfill-patched'
import { numberingSystems } from '../constants'
import {
    CalendarCustomLocale,
    customCalendars,
    CustomCalendarTypes,
} from '../custom-calendars'
import {
    PickerOptions,
    PickerOptionsWithResolvedCalendar,
    SupportedCalendar,
} from '../types'
import { formatDate, isCustomCalendar } from './helpers'
import { AnyPlainDate } from './plainDate'

const getPartialLocaleMatch: (
    locales: Record<string, CalendarCustomLocale>,
    locale: string | undefined
) => CalendarCustomLocale | undefined = (availableLocales, locale) => {
    // try to see if there is a language match (even if the region doesn't match)
    const partialLocaleMatch = Object.keys(availableLocales).find(
        (supportedLocale) =>
            supportedLocale.split('-')?.[0]?.toLowerCase() === locale
    )

    if (partialLocaleMatch) {
        return availableLocales[partialLocaleMatch]
    }
}

const getCustomCalendarLocale = (
    calendar: string,
    locale: string | undefined
): CalendarCustomLocale | undefined => {
    const customCalendar = customCalendars[calendar as CustomCalendarTypes]

    if (!customCalendar) {
        return undefined
    }

    const customLocalisations = customCalendar.locales || {}
    const result =
        (locale && customLocalisations?.[locale]) ??
        getPartialLocaleMatch(customLocalisations, locale) ??
        customLocalisations?.[customCalendar.defaultLocale]

    if (!result) {
        throw new Error(
            `no localisation found for custom calendar ${calendar}. Requested locale: ${locale}, Default locale ${customCalendar.defaultLocale}`
        )
    }
    return result
}

type LocaliseDateLabel = (
    selectedDate: AnyPlainDate,
    localeOptions: {
        calendar: SupportedCalendar
        locale: string
    },
    options?: { dateStyle: 'full' | 'long' | 'medium' | 'short' | undefined }
) => string

const localiseDateLabel: LocaliseDateLabel = (
    selectedDate,
    localeOptions,
    options = { dateStyle: 'full' }
) => {
    if (!localeOptions.calendar) {
        throw new Error('no calendar provided to localise function')
    }

    if (!selectedDate) {
        throw new Error('a date must be provided to localiseDateLabel')
    }

    const isCustom = isCustomCalendar(localeOptions.calendar)

    return isCustom
        ? formatDate(selectedDate)
        : (selectedDate as Temporal.PlainDate)
              .toLocaleString(localeOptions.locale, {
                  calendar: localeOptions.calendar,
                  dateStyle: options.dateStyle,
              })
              .toString()
}

const localiseWeekLabel = (
    date: AnyPlainDate,
    localeOptions: PickerOptions
) => {
    if (!localeOptions.calendar) {
        throw new Error('no calendar provided to localise function')
    }
    const isCustom = isCustomCalendar(localeOptions.calendar)
    const customLocale = getCustomCalendarLocale(
        localeOptions.calendar,
        localeOptions.locale
    )

    return isCustom
        ? customLocale?.numbers?.[date.day] || date.day
        : (date as Temporal.PlainDate).toLocaleString(localeOptions.locale, {
              calendar: localeOptions.calendar,
              numberingSystem: numberingSystems.includes(
                  localeOptions.numberingSystem as typeof numberingSystems[number]
              )
                  ? localeOptions.numberingSystem
                  : undefined,
              day: 'numeric',
          })
}

const localiseMonth = (
    date:
        | AnyPlainDate
        | Temporal.PlainYearMonth
        | Temporal.PlainDateLike
        | { month: number },
    localeOptions: PickerOptions,
    format: Intl.DateTimeFormatOptions
) => {
    if (!localeOptions.calendar) {
        throw new Error('no calendar provided to localise function')
    }
    const isCustom = isCustomCalendar(localeOptions.calendar)
    const customLocale = getCustomCalendarLocale(
        localeOptions.calendar,
        localeOptions.locale
    )

    return isCustom
        ? customLocale?.monthNames[date.month! - 1]
        : (date as Temporal.PlainYearMonth | Temporal.PlainDate).toLocaleString(
              localeOptions.locale,
              format
          )
}

export const localiseWeekDayLabel = (
    date: AnyPlainDate,
    localeOptions: PickerOptionsWithResolvedCalendar
) => {
    if (!localeOptions.calendar) {
        throw new Error('no calendar provided to localise function')
    }
    const isCustom = isCustomCalendar(localeOptions.calendar)

    const customCalendar = getCustomCalendarLocale(
        localeOptions.calendar,
        localeOptions.locale
    )
    const customDayString = customCalendar?.dayNamesShort[date.dayOfWeek - 1] // dayOfWeek is 1-based

    return isCustom && customDayString
        ? customDayString
        : (date as Temporal.PlainDate).toLocaleString(localeOptions.locale, {
              weekday: localeOptions.weekDayFormat,
              calendar: localeOptions.calendar,
          })
}

export const localiseYear = (
    date: AnyPlainDate,
    localeOptions: PickerOptions,
    format: Intl.DateTimeFormatOptions
) => {
    if (!localeOptions.calendar) {
        throw new Error('no calendar provided to localise function')
    }
    const isCustom = isCustomCalendar(localeOptions.calendar)

    return isCustom
        ? date.year
        : (date as Temporal.PlainDate)
              .toPlainYearMonth()
              .toLocaleString(localeOptions.locale, format)
}
const localisationHelpers = {
    localiseYear,
    localiseDateLabel,
    localiseWeekLabel,
    localiseMonth,
    localiseWeekDayLabel,
}

export default localisationHelpers
