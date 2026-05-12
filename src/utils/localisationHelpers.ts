import { Temporal } from '@js-temporal/polyfill'
import { numberingSystems } from '../constants'
import {
    CalendarCustomLocale,
    CalendarPlainDate,
    CalendarZonedDateTime,
    customCalendars,
    CustomCalendarTypes,
    isNepaliPlainDate,
    isNepaliZonedDateTime,
} from '../custom-calendars'
import {
    PickerOptions,
    PickerOptionsWithResolvedCalendar,
    SupportedCalendar,
} from '../types'
import { formatDate, isCustomCalendar } from './helpers'

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
    calendar: string | undefined,
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
    selectedDateZdt: CalendarZonedDateTime | CalendarPlainDate,
    localeOptions: {
        calendar: SupportedCalendar
        locale: string
    },
    options?: { dateStyle: 'full' | 'long' | 'medium' | 'short' | undefined }
) => string

const localiseDateLabel: LocaliseDateLabel = (
    selectedDateZdt,
    localeOptions,
    options = { dateStyle: 'full' }
) => {
    if (!localeOptions.calendar) {
        throw new Error('no calendar provided to localise function')
    }

    if (!selectedDateZdt) {
        throw new Error('a date must be provided to localiseDateLabel')
    }

    const isCustom = isCustomCalendar(localeOptions.calendar)

    if (isCustom) {
        return formatDate(selectedDateZdt)
    }

    const nonCustomDate =
        selectedDateZdt instanceof Temporal.ZonedDateTime
            ? selectedDateZdt.toPlainDate()
            : (selectedDateZdt as Temporal.PlainDate)

    return nonCustomDate
        .withCalendar(localeOptions.calendar as Temporal.CalendarLike)
        .toLocaleString(localeOptions.locale, {
            calendar: localeOptions.calendar,
            dateStyle: options.dateStyle,
        })
        .toString()
}

const localiseWeekLabel = (
    zdt: CalendarZonedDateTime,
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

    if (isCustom) {
        return customLocale?.numbers?.[zdt.day] || zdt.day
    }

    return (zdt as Temporal.ZonedDateTime)
        .toPlainDate()
        .withCalendar(localeOptions.calendar as Temporal.CalendarLike)
        .toLocaleString(localeOptions.locale, {
            calendar: localeOptions.calendar,
            numberingSystem: numberingSystems.includes(
                localeOptions.numberingSystem as typeof numberingSystems[number]
            )
                ? localeOptions.numberingSystem
                : undefined,
            day: 'numeric',
        })
}

type LocaliseMonthInput =
    | CalendarZonedDateTime
    | CalendarPlainDate
    | Temporal.PlainYearMonth
    | Temporal.PlainDateLike

const localiseMonth = (
    zdt: LocaliseMonthInput,
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

    if (isCustom) {
        return customLocale?.monthNames[(zdt.month as number) - 1]
    }

    const targetCalendar =
        (format as { calendar?: string }).calendar ?? localeOptions.calendar
    const reprojected =
        zdt instanceof Temporal.ZonedDateTime
            ? zdt
                  .toPlainDate()
                  .withCalendar(targetCalendar as Temporal.CalendarLike)
            : zdt instanceof Temporal.PlainDate
            ? zdt.withCalendar(targetCalendar as Temporal.CalendarLike)
            : (zdt as Temporal.PlainDate)
    return reprojected.toLocaleString(localeOptions.locale, format)
}

export const localiseWeekDayLabel = (
    zdt: CalendarZonedDateTime,
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
    const customDayString = customCalendar?.dayNamesShort[zdt.dayOfWeek - 1] // dayOfWeek is 1-based

    if (isCustom && customDayString) {
        return customDayString
    }

    return (zdt as Temporal.ZonedDateTime)
        .toPlainDate()
        .withCalendar(localeOptions.calendar as Temporal.CalendarLike)
        .toLocaleString(localeOptions.locale, {
            weekday: localeOptions.weekDayFormat,
            calendar: localeOptions.calendar,
        })
}

export const localiseYear = (
    zdt: CalendarZonedDateTime,
    localeOptions: PickerOptions,
    format: Intl.DateTimeFormatOptions
) => {
    if (!localeOptions.calendar) {
        throw new Error('no calendar provided to localise function')
    }
    const isCustom = isCustomCalendar(localeOptions.calendar)

    if (isCustom) {
        return zdt.year
    }

    if (isNepaliZonedDateTime(zdt) || isNepaliPlainDate(zdt)) {
        return zdt.year
    }

    // `@js-temporal/polyfill` 0.5.x rejects formatting a PlainYearMonth in a
    // calendar that differs from `format.calendar`, so reproject first.
    const targetCalendar =
        (format as { calendar?: string }).calendar ?? localeOptions.calendar
    return (zdt as Temporal.ZonedDateTime)
        .toPlainDate()
        .withCalendar(targetCalendar as Temporal.CalendarLike)
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
