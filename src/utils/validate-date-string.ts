import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import type { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomCalendarIfExists } from './helpers'

export function validateDateString(
    dateString: string,
    {
        calendar = 'gregory',
        minDateString,
        maxDateString,
        validation = 'error', // "error" | "warning"
    }: {
        calendar?: SupportedCalendar
        minDateString?: string
        maxDateString?: string
        validation?: string
    } = {}
): {
    isValid: boolean
    errorMessage?: string
    warningMessage?: string
    year?: number
    month?: number
    day?: number
} {
    const resolvedCalendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[calendar] ?? calendar
    ) as SupportedCalendar

    try {
        // Will throw if the format of the date is incorrect
        const dateParts = extractDatePartsFromDateString(dateString)

        // Will throw if the year, month or day is out of range
        const date = Temporal.PlainDate.from(
            { ...dateParts, calendar: resolvedCalendar },
            { overflow: 'reject' }
        )

        let warningMessage = ''

        if (minDateString) {
            const minDateParts = extractDatePartsFromDateString(minDateString)
            const minDate = Temporal.PlainDate.from({
                ...minDateParts,
                calendar: resolvedCalendar,
            })

            if (Temporal.PlainDate.compare(date, minDate) < 0) {
                if (validation === 'error') {
                    throw new Error(
                        `Date ${dateString} is less than the minimum allowed date ${minDateString}.`
                    )
                } else {
                    warningMessage = `Date ${dateString} is less than the minimum allowed date ${minDateString}.`
                }
            }
        }

        if (maxDateString) {
            const maxDateParts = extractDatePartsFromDateString(maxDateString)
            const maxDate = Temporal.PlainDate.from({
                ...maxDateParts,
                calendar: resolvedCalendar,
            })

            if (Temporal.PlainDate.compare(date, maxDate) > 0) {
                if (validation === 'error') {
                    throw new Error(
                        `Date ${dateString} is greater than the maximum allowed date ${maxDateString}.`
                    )
                } else {
                    warningMessage = `Date ${dateString} is greater than the maximum allowed date ${maxDateString}.`
                }
            }
        }
        return {
            isValid: true,
            errorMessage: '',
            warningMessage,
        }
    } catch (e) {
        console.warn(e)
        return {
            isValid: false,
            errorMessage: (e as Error).message,
            warningMessage: '',
        }
    }
}
