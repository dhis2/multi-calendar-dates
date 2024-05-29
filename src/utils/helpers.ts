import { Temporal } from '@js-temporal/polyfill'
import { customCalendars, CustomCalendarTypes } from '../custom-calendars'

export const isCustomCalendar = (calendar: Temporal.CalendarLike) =>
    !!customCalendars[calendar as CustomCalendarTypes]

export const padWithZeroes = (number: number, count = 2) =>
    String(number).padStart(count, '0')

type DayType = 'endOfMonth' | 'startOfMonth'

export const formatYyyyMmDD = (
    date: Temporal.PlainDate | Temporal.ZonedDateTime,
    format?: string,
    dayType?: DayType
) => {
    const year = date.eraYear ?? date.year
    const month = padWithZeroes(date.month)
    let day = date.day

    if (dayType === 'endOfMonth') {
        day = date.daysInMonth
    } else if (dayType === 'startOfMonth') {
        day = 1
    }

    const dayString = padWithZeroes(day)

    return format === 'DD-MM-YYYY'
        ? `${dayString}-${month}-${year}`
        : `${year}-${month}-${dayString}`
}

// capitalize method taking into account locales that have different way of lower/upper case
// based on https://stackoverflow.com/a/53930826
export const capitalize = (
    [firstLetter = '', ...rest]: string,
    locale = 'en'
) => [firstLetter.toLocaleUpperCase(locale), ...rest].join('')

export const getCustomCalendarIfExists = (
    calendar: Temporal.CalendarLike
): Temporal.CalendarProtocol | Temporal.CalendarLike => {
    const isCustom = isCustomCalendar(calendar)
    if (!isCustom) {
        return calendar
    }

    const customCalendar = customCalendars[
        calendar as keyof typeof customCalendars
    ]?.calendar as Temporal.CalendarProtocol

    if (!customCalendar) {
        throw new Error(
            `No implemenation found for custom calendar ${calendar}`
        )
    }

    return customCalendar
}
