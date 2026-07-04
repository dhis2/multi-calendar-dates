import { Temporal } from '@js-temporal/polyfill-patched'
import { months, Month } from '../constants/months'
import { customCalendars, CustomCalendarTypes } from '../custom-calendars'
import { PickerOptions, SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import getNowInCalendar from './getNowInCalendar'
import { AnyPlainDate, getCustomPlainDateImplementation } from './plainDate'
import { validateDateString } from './validate-date-string'

export const isCustomCalendar = (calendar: string) =>
    !!customCalendars[calendar as CustomCalendarTypes]

export const padWithZeroes = (number: number, count = 2) =>
    String(number).padStart(count, '0')

type DayType = 'endOfMonth' | 'startOfMonth'

type customDate = Temporal.PlainDateLike & {
    format?: string
}

export const formatDate = (
    date: AnyPlainDate,
    dayType?: DayType,
    format?: string
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

/**
 * Constructs a date value in `calendar` from that calendar's own year/month/day
 * fields (e.g. Nepali fields for 'nepali', or era/eraYear fields for
 * Ethiopic). Custom calendars never use the era/eraYear form, so it's safe
 * to read `fields.year` directly when a custom implementation exists.
 */
export const getPlainDateFromCalendarFields = (
    fields: Temporal.PlainDateLike,
    calendar: SupportedCalendar,
    options?: Temporal.AssignmentOptions
): AnyPlainDate => {
    const customImpl = getCustomPlainDateImplementation(calendar)
    if (customImpl) {
        return customImpl.from(
            {
                year: fields.year as number,
                month: fields.month as number,
                day: fields.day as number,
            },
            options
        )
    }

    // era-aware calendars (gregory, ethiopic, hebrew, japanese, ...) require
    // era and eraYear to be provided together. A CalendarDate (e.g.
    // round-tripped from getNowInCalendar/convertFromIso8601) only ever
    // carries `eraYear` on its own (no `era` string) - forwarding that
    // `eraYear` without a matching `era` trips the "must be provided
    // together" validation (it isn't the same as omitting eraYear
    // entirely). Only forward era/eraYear when BOTH are present; `year`
    // (the proleptic year) is always valid on its own for every calendar.
    const { era, eraYear, ...rest } = fields
    const calendarFields =
        era !== undefined && eraYear !== undefined
            ? { ...rest, era, eraYear }
            : rest

    return Temporal.PlainDate.from({ ...calendarFields, calendar }, options)
}

/** Re-interprets an ISO year/month/day in `calendar` (e.g. converts "today, ISO" into "today, Nepali"). */
export const getPlainDateFromIso = (
    isoFields: { year: number; month: number; day: number },
    calendar: SupportedCalendar
): AnyPlainDate => {
    const isoDate = Temporal.PlainDate.from(isoFields)
    const customImpl = getCustomPlainDateImplementation(calendar)
    return customImpl
        ? customImpl.fromIso(isoDate)
        : isoDate.withCalendar(calendar)
}

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
        options.timeZone as string | undefined
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
        options.timeZone as string | undefined
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
