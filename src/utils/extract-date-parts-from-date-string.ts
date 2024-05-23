import { dateStringRegExp } from './date-string-regexp'

export function extractDatePartsFromDateString(dateString: string) {
    const parts = dateString.match(dateStringRegExp)

    if (!parts) {
        throw new Error(`Date string is invalid, received "${dateString}"`)
    }

    let yearStr, monthStr, dayStr, format

    if (parts[1]) {
        // Match for YYYY-MM-DD
        ;[, yearStr, , monthStr, , dayStr] = parts
        format = 'YYYY-MM-DD'
    } else {
        // Match for DD-MM-YYYY
        ;[, , , , , , dayStr, , monthStr, , yearStr] = parts
        format = 'DD-MM-YYYY'
    }

    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const day = parseInt(dayStr, 10)

    return { year, month, day, format }
}
