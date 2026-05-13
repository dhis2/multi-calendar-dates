import { Temporal } from '@js-temporal/polyfill'
import { months, Month } from '../constants/months'
import {
    customCalendars,
    CustomCalendarTypes,
    CalendarPlainDate,
    CalendarZonedDateTime,
    isNepaliPlainDate,
    isNepaliZonedDateTime,
} from '../custom-calendars'
import { PickerOptions } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import getNowInCalendar from './getNowInCalendar'
import { validateDateString } from './validate-date-string'

export const isCustomCalendar = (calendar: string | undefined | null) =>
    !!calendar && !!customCalendars[calendar as CustomCalendarTypes]

export const padWithZeroes = (number: number, count = 2) =>
    String(number).padStart(count, '0')

type DayType = 'endOfMonth' | 'startOfMonth'

type customDate = Temporal.PlainDateLike & {
    format?: string
}

export const formatDate = (
    date: CalendarPlainDate | CalendarZonedDateTime,
    dayType?: DayType,
    format?: string
) => {
    const year =
        isNepaliPlainDate(date) || isNepaliZonedDateTime(date)
            ? date.year
            : date.eraYear ?? date.year
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

/**
 * Legacy shim retained for callers that still pass the result through
 * `Temporal.PlainDate.from({ calendar })`. With 0.5.x, calendars are strings
 * only; custom calendar identifiers (currently `'nepali'`) flow through
 * unchanged and dedicated routing helpers in `custom-calendars/` build the
 * appropriate shadow type.
 */
export const getCustomCalendarIfExists = (
    calendar: string | undefined | null
): string => (calendar ? String(calendar) : 'iso8601')

export const extractAndValidateDateString = (
    date: string,
    options: PickerOptions & {
        minDateString?: string
        maxDateString?: string
        strictValidation?: boolean
        format?: 'YYYY-MM-DD' | 'DD-MM-YYYY'
    }
): Temporal.PlainDateLike => {
    if (!date) {
        return getCurrentDateResult(options)
    }

    const validation = validateDateString(date, options)
    if (!validation.error) {
        return getValidDateResult(date, options)
    } else {
        return getInvalidDateResult(options)
    }
}

const getCurrentDateResult = (options: PickerOptions) => {
    const { year, month, day } = getNowInCalendar(
        options.calendar,
        options.timeZone
    )
    return { year, month, day, isValid: true }
}

const getValidDateResult = (date: string, options: PickerOptions) => {
    const { year, month, day, format } = extractDatePartsFromDateString(date)
    let result: customDate = {
        year,
        month,
        day,
        format,
    }

    if (options.calendar === 'ethiopic') {
        result = adjustForEthiopicCalendar(result)
    }

    return result
}

const getInvalidDateResult = (options: PickerOptions) => {
    const { year, month, day } = getNowInCalendar(
        options.calendar,
        options.timeZone
    )
    return { year, month, day }
}

const adjustForEthiopicCalendar = (result: customDate) => {
    result.era = 'ethiopic'
    result.eraYear = result.year
    delete result.year
    return result
}

export const getMonthsForCalendar = (calendarType: string): Month[] => {
    return months[calendarType.toLowerCase()] || months.gregory
}
