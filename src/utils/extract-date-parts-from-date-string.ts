import { dateStringRegExp } from './date-string-regexp'

export function extractDatePartsFromDateString(dateString: string) {
    const parts = dateString.match(dateStringRegExp)

    if (!parts) {
        throw new Error(`Date string is invalid, received "${dateString}"`)
    }

    const [, yearStr, , monthStr, , dayStr] = parts
    const year = parseInt(yearStr, 10)
    const month = parseInt(monthStr, 10)
    const day = parseInt(dayStr, 10)

    return { year, month, day }
}
