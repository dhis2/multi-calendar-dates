import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import type { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomCalendarIfExists, isCustomCalendar } from './helpers'

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
          valid: boolean
          error: boolean
          warning?: never
          validationText: string
          validationCode: DateValidationResult
      }
    | {
          valid: boolean
          warning: boolean
          error?: never
          validationText: string
          validationCode: DateValidationResult
      }
    | {
          valid: true
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

    // Will throw if the format of the date is incorrect
    if (!dateString) {
        return {
            valid: false,
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
            valid: false,
            error: true,
            validationCode: DateValidationResult.WRONG_FORMAT,
            validationText: e?.message,
        }
    }

    let date: Temporal.PlainDate

    // Will throw if the year, month or day is out of range
    try {
        date = isCustomCalendar(resolvedCalendar)
            ? Temporal.Calendar.from(resolvedCalendar).dateFromFields(
                  dateParts,
                  { overflow: 'reject' }
              ) // need to be handled separately for custom calendars
            : Temporal.PlainDate.from(
                  { ...dateParts, calendar: resolvedCalendar },
                  { overflow: 'reject' }
              )
    } catch (err) {
        return {
            valid: false,
            error: true,
            validationCode: DateValidationResult.INVALID_DATE_IN_CALENDAR,
            validationText: i18n.t('Invalid date in specified calendar'),
        }
    }

    const validationType = strictValidation
        ? { error: true, valid: false }
        : { warning: true, valid: true }

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
        valid: true,
        error: false,
        warning: false,
    }
}
