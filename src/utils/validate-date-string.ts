import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { NEPALI_CALENDAR_DATA } from '../custom-calendars/nepaliCalendarData'
import type { SupportedCalendar } from '../types'
import { extractDatePartsFromDateString } from './extract-date-parts-from-date-string'
import { getCustomCalendarIfExists } from './helpers'

function validateNepaliDate(year: number, month: number, day: number) {
    const nepaliYearData = NEPALI_CALENDAR_DATA[year]
    if (!nepaliYearData) {
        return {
            isValid: false,
            errorMessage: i18n.t(`Year {{year}} is out of range.`, { year }),
        }
    }

    if (month < 1 || month > 12) {
        return {
            isValid: false,
            errorMessage: i18n.t(
                `Month {{month}} is out of range | 1 <= {{month}} <= 12.`,
                { month }
            ),
        }
    }

    const daysInMonth = nepaliYearData[month]

    if (day < 1 || day > daysInMonth) {
        return {
            isValid: false,
            errorMessage: i18n.t(
                `Day {{day}} is out of range | 1 <= {{day}} <= {{daysInMonth}}.`,
                { day, daysInMonth }
            ),
        }
    }

    return {
        isValid: true,
        errorMessage: '',
    }
}

export function validateDateString(
    dateString: string,
    {
        calendar = 'gregory',
        minDateString,
        maxDateString,
        strictValidation = true,
        format,
    }: {
        calendar?: SupportedCalendar
        minDateString?: string
        maxDateString?: string
        strictValidation?: boolean
        format?: 'YYYY-MM-DD' | 'DD-MM-YYYY'
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
    )

    try {
        // Will throw if the format of the date is incorrect
        if (!dateString) {
            throw new Error(i18n.t(`Date is not given`))
        }
        const dateParts = extractDatePartsFromDateString(dateString, format)

        if (resolvedCalendar.toString() === 'nepali') {
            const { isValid, errorMessage } = validateNepaliDate(
                dateParts.year,
                dateParts.month,
                dateParts.day
            )

            if (!isValid) {
                throw new Error(errorMessage)
            }
        }

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
                if (strictValidation) {
                    throw new Error(
                        i18n.t(
                            `Date {{dateString}} is less than the minimum allowed date {{minDateString}}.`,
                            { dateString, minDateString }
                        )
                    )
                } else {
                    warningMessage = i18n.t(
                        `Date {{dateString}} is less than the minimum allowed date {{minDateString}}.`,
                        { dateString, minDateString }
                    )
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
                if (strictValidation) {
                    throw new Error(
                        i18n.t(
                            `Date {{dateString}} is greater than the maximum allowed date {{maxDateString}}.`,
                            { dateString, maxDateString }
                        )
                    )
                } else {
                    warningMessage = i18n.t(
                        `Date {{dateString}} is greater than the maximum allowed date {{maxDateString}}.`,
                        { dateString, maxDateString }
                    )
                }
            }
        }
        return {
            isValid: true,
            errorMessage: '',
            warningMessage,
        }
    } catch (e) {
        return {
            isValid: false,
            errorMessage: (e as Error).message,
            warningMessage: '',
        }
    }
}
