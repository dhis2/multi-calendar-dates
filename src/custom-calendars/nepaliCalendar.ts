import { Temporal } from '@js-temporal/polyfill'
import { NEPALI_CALENDAR_DATA } from './nepaliCalendarData'
type CalendarYMD = { year: number; month: number; day: number }

/**
 * https://tc39.es/proposal-temporal/docs/calendar.html
 *
 * This implementation is based on World-Calendars library by Keith Wood:
 * https://github.com/kbwood/world-calendars
 */
class NepaliCalendar extends Temporal.Calendar {
    constructor() {
        super('iso8601')
    }

    toString() {
        return 'nepali'
    }

    /**
     * The methods year, month, day return the Nepali date
     *
     * A custom implementation of these methods is used to convert the ISO calendar date to the calendar-space arguments.
     */
    year(date: Temporal.PlainDate | Temporal.PlainDateTime) {
        const {
            isoYear: year,
            isoMonth: month,
            isoDay: day,
        } = date.getISOFields()
        const nepaliYear = _isoToNepali({ year, month, day })?.year
        return nepaliYear
    }
    eraYear(date: Temporal.PlainDate | Temporal.PlainDateTime) {
        return this.year(date)
    }
    daysInMonth(date: Temporal.PlainDate | Temporal.PlainDateTime): number {
        const { year, month } = date
        return NEPALI_CALENDAR_DATA[year][month]
    }
    month(date: Temporal.PlainDate) {
        const {
            isoYear: year,
            isoMonth: month,
            isoDay: day,
        } = date.getISOFields()
        return _isoToNepali({ year, month, day })?.month
    }
    monthCode(date: Temporal.PlainDate) {
        const { month } = date
        return buildMonthCode(month)
    }
    day(date: Temporal.PlainDate) {
        const {
            isoYear: year,
            isoMonth: month,
            isoDay: day,
        } = date.getISOFields()
        const { day: nepaliDay } = _isoToNepali({ year, month, day })
        return nepaliDay
    }
    /**
     * The methods dateFromFields, yearMonthFromFields, monthDayFromFields convert from nepali to iso
     *
     * A custom implementation of these methods is used to convert the calendar-space arguments to the ISO calendar.
     */
    dateFromFields(fields: CalendarYMD): Temporal.PlainDate {
        const { year, day, month } = _nepaliToIso({
            year: fields.year,
            month: fields.month,
            day: fields.day,
        })
        return new Temporal.PlainDate(year, month, day, this)
    }
    yearMonthFromFields(fields: CalendarYMD): Temporal.PlainYearMonth {
        const { year, day, month } = _nepaliToIso({
            year: fields.year,
            month: fields.month,
            day: fields.day,
        })
        return new Temporal.PlainYearMonth(year, month, this, day)
    }
    monthDayFromFields(fields: CalendarYMD): Temporal.PlainMonthDay {
        const { year, day, month } = _nepaliToIso({
            year: fields.year,
            month: fields.month,
            day: fields.day,
        })
        return new Temporal.PlainMonthDay(day, month, this, year)
    }
}

const supportedNepaliYears = Object.keys(NEPALI_CALENDAR_DATA)
const firstSupportedNepaliYear = Number(supportedNepaliYears[0])
const lastSupportedNepaliYear = Number(
    supportedNepaliYears[supportedNepaliYears.length - 1]
)

const _nepaliToIso = (fields: { day: number; year: number; month: number }) => {
    let { year: nepaliYear } = fields

    if (
        nepaliYear < firstSupportedNepaliYear ||
        nepaliYear > lastSupportedNepaliYear
    ) {
        throw new Error(
            `Conversions are only possible between ${firstSupportedNepaliYear} and ${lastSupportedNepaliYear} in Nepali calendar`
        )
    }
    const { month: nepaliMonth, day: nepaliDay = 1 } = fields

    let gregorianDayOfYear = 0

    let monthCounter = nepaliMonth
    const gregorianYear =
        nepaliYear -
        (nepaliMonth > 9 ||
        (monthCounter === 9 && nepaliDay >= NEPALI_CALENDAR_DATA[nepaliYear][0])
            ? 56
            : 57)

    // First we add the amount of days in the actual Nepali month as the day of year in the
    // Gregorian one because at least these days are gone since the 1st Jan.
    if (nepaliMonth !== 9) {
        gregorianDayOfYear = nepaliDay
        monthCounter--
    }

    // Now we loop through all Nepali months and add the amount of days to gregorianDayOfYear
    // we do this till we reach Paush (9th month). 1st January always falls in this month.
    while (monthCounter !== 9) {
        if (monthCounter <= 0) {
            monthCounter = 12
            nepaliYear--
        }
        gregorianDayOfYear += NEPALI_CALENDAR_DATA[nepaliYear][monthCounter]
        monthCounter--
    }

    // If the date that has to be converted is in Paush (month no. 9) we have to do some other calculation
    if (nepaliMonth === 9) {
        // Add the days that are passed since the first day of Paush and substract the
        // amount of days that lie between 1st Jan and 1st Paush
        gregorianDayOfYear += nepaliDay - NEPALI_CALENDAR_DATA[nepaliYear][0]
        // For the first days of Paush we are now in negative values,
        // because in the end of the Gregorian year we substract
        // 365 / 366 days (P.S. remember math in school + - gives -)
        if (gregorianDayOfYear < 0) {
            gregorianDayOfYear += Temporal.PlainDate.from({
                year: gregorianYear,
                day: 1,
                month: 1,
            }).daysInYear
        }
    } else {
        gregorianDayOfYear +=
            NEPALI_CALENDAR_DATA[nepaliYear][9] -
            NEPALI_CALENDAR_DATA[nepaliYear][0]
    }

    const result = Temporal.PlainDate.from({
        year: gregorianYear,
        month: 1,
        day: 1,
    }).add({ days: gregorianDayOfYear })

    return {
        year: result.year,
        month: result.month,
        monthCode: buildMonthCode(result.month),
        day: result.day,
    }
}

const _isoToNepali = (
    isoDate:
        | Temporal.PlainDate
        | Temporal.PlainDateTime
        | Temporal.PlainDateLike
) => {
    // make sure this is iso8601
    const gregorianDate = Temporal.PlainDate.from({
        year: isoDate.year,
        month: isoDate.month,
        day: isoDate.day,
    })

    const gregorianYear = gregorianDate.year

    const gregorianDayOfYear = gregorianDate.dayOfYear
    let nepaliYear = gregorianYear + 56 // this is not final, it could be also +57 but +56 is always true for 1st Jan.

    if (!NEPALI_CALENDAR_DATA[nepaliYear]) {
        throw new Error(
            `Conversions are only possible between ${firstSupportedNepaliYear} and ${lastSupportedNepaliYear} in Nepali calendar`
        )
    }

    let nepaliMonth = 9 // Jan 1 always fall in Nepali month Paush which is the 9th month of Nepali calendar.
    // Get the Nepali day in Paush (month 9) of 1st January

    const dayOfFirstJanInPaush = NEPALI_CALENDAR_DATA[nepaliYear][0]
    // Check how many days are left of Paush.
    // Days calculated from 1st Jan till the end of the actual Nepali month,
    // we use this value to check if the Gregorian date is in the actual Nepali month.
    let daysSinceJanFirstToEndOfNepaliMonth =
        NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] - dayOfFirstJanInPaush + 1

    // If the Gregorian day-of-year is smaller than or equal to the sum of days between the 1st January and
    // the end of the actual Nepali month we have found the correct Nepali month.
    // Example:
    // The 4th February 2011 is the gregorianDayOfYear 35 (31 days of January + 4)
    // 1st January 2011 is in the Nepali year 2067, where 1st January is the 17th day of Paush (9th month).
    // In 2067 Paush has 30 days, which means (30-17+1=14) there are 14 days between 1st January and end of Paush
    // (including 17th January).
    // The gregorianDayOfYear (35) is bigger than 14, so we check the next month.
    // The next Nepali month (Mangh) has 29 days
    // 29+14=43, this is bigger than gregorianDayOfYear (35) so, we have found the correct Nepali month.
    while (gregorianDayOfYear > daysSinceJanFirstToEndOfNepaliMonth) {
        nepaliMonth++
        if (nepaliMonth > 12) {
            nepaliMonth = 1
            nepaliYear++
        }
        daysSinceJanFirstToEndOfNepaliMonth +=
            NEPALI_CALENDAR_DATA[nepaliYear]?.[nepaliMonth]
    }
    if (!NEPALI_CALENDAR_DATA[nepaliYear]) {
        throw new Error(
            `Conversions are only possible between ${firstSupportedNepaliYear} and ${lastSupportedNepaliYear} in Nepali calendar`
        )
    }
    // The last step is to calculate the Nepali day-of-month.
    // To continue our example from before:
    // we calculated there are 43 days from 1st January (17 Paush) till end of Mangh (29 days).
    // When we subtract from this 43 days the day-of-year of the the Gregorian date (35),
    // we know how far the searched day is away from the end of the Nepali month.
    // So we simply subtract this number from the amount of days in this month (30).
    const nepaliDayOfMonth =
        NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] -
        (daysSinceJanFirstToEndOfNepaliMonth - gregorianDayOfYear)

    return {
        year: nepaliYear,
        month: nepaliMonth,
        day: nepaliDayOfMonth,
    }
}

function buildMonthCode(month: number | string) {
    return `M${month.toString().padStart(2, '0')}`
}

export { NepaliCalendar }
