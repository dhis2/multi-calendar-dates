import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { NEPALI_CALENDAR_DATA } from '../custom-calendars/nepaliCalendarData'
import type { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomCalendarIfExists } from './helpers'

type ValidateNepaliDateFn = (
    year: number,
    month: number,
    day: number
) => ValidationResult

const validateNepaliDate: ValidateNepaliDateFn = (year, month, day) => {
    const nepaliYearData = NEPALI_CALENDAR_DATA[year]
    if (!nepaliYearData) {
        return {
            error: true,
            validationCode: DateValidationResult.INVALID_DATE_IN_CALENDAR,
            validationText: i18n.t(`Year {{year}} is out of range.`, { year }),
        }
    }

    if (month < 1 || month > 12) {
        return {
            error: true,
            validationCode: DateValidationResult.INVALID_DATE_IN_CALENDAR,
            validationText: i18n.t(
                `Month {{month}} is out of range | 1 <= {{month}} <= 12.`,
                { month }
            ),
        }
    }

    const daysInMonth = nepaliYearData[month]

    if (day < 1 || day > daysInMonth) {
        return {
            error: true,
            validationCode: DateValidationResult.INVALID_DATE_IN_CALENDAR,
            validationText: i18n.t(
                `Day {{day}} is out of range | 1 <= {{day}} <= {{daysInMonth}}.`,
                { day, daysInMonth }
            ),
        }
    }

    return {
        error: false,
        warning: false,
    }
}

type ValidationOptions = {
    calendar?: SupportedCalendar
    minDateString?: string
    maxDateString?: string
    strictValidation?: boolean
    format?: 'YYYY-MM-DD' | 'DD-MM-YYYY'
}

export enum DateValidationResult {
    INVALID_DATE_IN_CALENDAR = 'INVALID_DATE_IN_CALENDAR',
    WRONG_FORMAT = 'WRONG_FORMAT',
    LESS_THAN_MIN = 'LESS_THAN_MIN',
    MORE_THAN_MAX = 'INVALID_DATE_MORE_THAN_MAX',
}

type ValidationResult =
    | {
          error: boolean
          warning?: never
          validationText: string
          validationCode: DateValidationResult
      }
    | {
          warning: boolean
          error?: never
          validationText: string
          validationCode: DateValidationResult
      }
    | {
          error: false
          warning: false
          validationText: undefined
          validationCode: undefined
      }

type ValidateDateStringFn = (
    dateString: string,
    options?: ValidationOptions
) => ValidationResult

export const validateDateString: ValidateDateStringFn = (
    dateString,
    options = {}
) => {
    const {
        calendar = 'gregory',
        minDateString,
        maxDateString,
        strictValidation = true,
        format,
    } = options
    const resolvedCalendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[calendar] ?? calendar
    )

    const validationType = strictValidation
        ? { error: true }
        : { warning: true }

    // Will throw if the format of the date is incorrect
    if (!dateString) {
        return {
            error: true,
            validationCode: DateValidationResult.WRONG_FORMAT,
            validationText: i18n.t(`Date is not given`),
        }
    }

    let dateParts: {
        year: number
        month: number
        day: number
        format: string
    }

    try {
        dateParts = extractDatePartsFromDateString(dateString, format)
    } catch (e: any) {
        return {
            error: true,
            validationCode: DateValidationResult.WRONG_FORMAT,
            validationText: e?.message,
        }
    }
    if (resolvedCalendar.toString() === 'nepali') {
        // ToDo: double check why nepali can't just be handle with Temporal.PlainDate.from
        return validateNepaliDate(
            dateParts.year,
            dateParts.month,
            dateParts.day
        )
    }

    let date: Temporal.PlainDate

    // Will throw if the year, month or day is out of range
    try {
        date = Temporal.PlainDate.from(
            { ...dateParts, calendar: resolvedCalendar },
            { overflow: 'reject' }
        )
    } catch (err) {
        return {
            error: true,
            validationCode: DateValidationResult.INVALID_DATE_IN_CALENDAR,
            validationText: i18n.t('Invalid date in specified calendar'),
        }
    }

    if (minDateString) {
        const minDateParts = extractDatePartsFromDateString(minDateString)
        const minDate = Temporal.PlainDate.from({
            ...minDateParts,
            calendar: resolvedCalendar,
        })

        if (Temporal.PlainDate.compare(date, minDate) < 0) {
            const result: ValidationResult = {
                ...validationType,
                validationCode: DateValidationResult.LESS_THAN_MIN,
                validationText: i18n.t(
                    `Date {{dateString}} is less than the minimum allowed date {{minDateString}}.`,
                    { dateString, minDateString }
                ),
            }

            return result
        }
    }

    if (maxDateString) {
        const maxDateParts = extractDatePartsFromDateString(maxDateString)
        const maxDate = Temporal.PlainDate.from({
            ...maxDateParts,
            calendar: resolvedCalendar,
        })

        if (Temporal.PlainDate.compare(date, maxDate) > 0) {
            const result: ValidationResult = {
                ...validationType,
                validationCode: DateValidationResult.MORE_THAN_MAX,
                validationText: i18n.t(
                    `Date {{dateString}} is greater than the maximum allowed date {{maxDateString}}.`,
                    { dateString, maxDateString }
                ),
            }

            return result
        }
    }
    return {
        error: false,
        warning: false,
    }
}
