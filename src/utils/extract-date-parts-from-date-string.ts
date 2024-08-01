import { dateStringRegExp } from './date-string-regexp'

export function extractDatePartsFromDateString(
    dateString: string,
    format?: 'YYYY-MM-DD' | 'DD-MM-YYYY'
) {
    const parts = dateString.match(dateStringRegExp)

    if (!parts) {
        throw new Error(`Date string is invalid, received "${dateString}"`)
    }

    let yearStr, monthStr, dayStr, detectedFormat

    if (parts[1]) {
        // Match for YYYY-MM-DD
        yearStr = parts[1]
        monthStr = parts[3]
        dayStr = parts[5]
        detectedFormat = 'YYYY-MM-DD'
    } else {
        // Match for DD-MM-YYYY
        dayStr = parts[6]
        monthStr = parts[8]
        yearStr = parts[10]
        detectedFormat = 'DD-MM-YYYY'
    }

    if (format && detectedFormat !== format.toUpperCase()) {
        throw new Error(
            `Date string format does not match the specified format. Expected ${format}, but got ${detectedFormat}`
        )
    }

    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const day = parseInt(dayStr, 10)

    return { year, month, day, format: detectedFormat }
}
