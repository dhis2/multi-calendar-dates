import { dateStringRegExp } from './date-string-regexp'

export function extractDatePartsFromDateString(dateString: string) {
    const parts = dateString.match(dateStringRegExp)

    if (!parts) {
        throw new Error(`Date string is invalid, received "${dateString}"`)
    }

    let yearStr, monthStr, dayStr, format

    if (parts[1]) {
        // Match for YYYY-MM-DD
        yearStr = parts[1]
        monthStr = parts[3]
        dayStr = parts[5]
        format = 'YYYY-MM-DD'
    } else {
        // Match for DD-MM-YYYY
        dayStr = parts[6]
        monthStr = parts[8]
        yearStr = parts[10]
        format = 'DD-MM-YYYY'
    }

    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const day = parseInt(dayStr, 10)

    return { year, month, day, format }
}
