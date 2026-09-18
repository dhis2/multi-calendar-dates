import { Temporal } from '@js-temporal/polyfill-patched'
import { NEPALI_CALENDAR_DATA } from './nepaliCalendarData'
type CalendarYMD = { year: number; month: number; day: number }

/**
 * `@js-temporal/polyfill` 0.5.x removed the `Temporal.Calendar` class and the
 * user-defined calendar protocol entirely - calendars are now plain string
 * identifiers understood natively by the polyfill, and Nepali (a luni-solar
 * calendar not in CLDR) can no longer be registered with Temporal's engine.
 *
 * `NepaliPlainDate` is a standalone, hand-rolled replacement that wraps a
 * real ISO `Temporal.PlainDate`. It intentionally mirrors the previous
 * `NepaliCalendar` class's actual behaviour rather than "fixing" it:
 * `dateAdd`/`dateUntil`/`fields`/`mergeFields` were never overridden on the
 * old `NepaliCalendar extends Temporal.Calendar` class - they were inherited
 * from its `super('iso8601')` call. This meant `.add()`/`.subtract()` on a
 * Nepali-tagged date always did plain ISO-calendar arithmetic on the
 * underlying ISO date, then re-derived Nepali fields from the result - not
 * genuine Nepali calendar arithmetic. `add`/`subtract`/`with` below
 * reproduce that exact "ISO-then-reconvert" behaviour by delegating to
 * `isoDate`, since existing workarounds elsewhere (e.g. the day-14 clamp in
 * `useNavigation.ts` and `generate-fixed-periods-monthly.ts`) depend on it.
 *
 * This implementation is based on World-Calendars library by Keith Wood:
 * https://github.com/kbwood/world-calendars
 */
class NepaliPlainDate {
    readonly calendarId = 'nepali' as const
    readonly isoDate: Temporal.PlainDate

    private constructor(isoDate: Temporal.PlainDate) {
        this.isoDate = isoDate
    }

    /** Tags an existing ISO date as Nepali (reads its ISO y/m/d, converts to Nepali fields lazily). */
    static fromIso(
        isoDate: Temporal.PlainDate | Temporal.PlainDateLike | string
    ): NepaliPlainDate {
        return new NepaliPlainDate(Temporal.PlainDate.from(isoDate))
    }

    /** Constructs from Nepali-calendar-space fields (year/month/day as displayed in Nepali). */
    static from(
        fields: CalendarYMD,
        options?: Temporal.AssignmentOptions
    ): NepaliPlainDate {
        const { year, month, day } = _nepaliToIso(fields, options)
        return new NepaliPlainDate(
            Temporal.PlainDate.from({ year, month, day })
        )
    }

    get year() {
        return _isoToNepali(this.isoDate).year
    }
    get eraYear() {
        return this.year
    }
    get month() {
        return _isoToNepali(this.isoDate).month
    }
    get monthCode() {
        return buildMonthCode(this.month)
    }
    get day() {
        return _isoToNepali(this.isoDate).day
    }
    get daysInMonth(): number {
        return NEPALI_CALENDAR_DATA[this.year][this.month]
    }
    get monthsInYear() {
        return 12
    }
    get dayOfWeek() {
        return this.isoDate.dayOfWeek
    }
    get daysInWeek() {
        return this.isoDate.daysInWeek
    }
    get dayOfYear() {
        return this.isoDate.dayOfYear
    }
    // era/daysInYear/inLeapYear were never overridden on the old NepaliCalendar
    // class either, so they fell back to the iso8601 default implementation it
    // was constructed with - matched here by delegating straight to the
    // underlying ISO date. This means these three report the ISO year's
    // length/leap-ness, not Nepali's real (variable) year length - see
    // src/vendor/README.md's TC39-cookbook comparison note for the one place
    // (daily period generation) this can actually matter.
    get era() {
        return this.isoDate.era
    }
    get daysInYear() {
        return this.isoDate.daysInYear
    }
    get inLeapYear() {
        return this.isoDate.inLeapYear
    }
    // Unlike the properties above, weekOfYear/yearOfWeek are not given the
    // "fall back to ISO" treatment: Nepali has no defined week-numbering
    // scheme, so - matching the TC39 cookbook reference implementation
    // (https://tc39.es/proposal-temporal/docs/cookbook-nepali-calendar.html) -
    // these are always undefined rather than reporting the ISO week, which
    // would be actively misleading if ever surfaced. Nothing in this codebase
    // currently reads either property.
    get weekOfYear() {
        return undefined
    }
    get yearOfWeek() {
        return undefined
    }

    with(
        fields: Partial<CalendarYMD>,
        options?: Temporal.AssignmentOptions
    ): NepaliPlainDate {
        return NepaliPlainDate.from(
            {
                year: fields.year ?? this.year,
                month: fields.month ?? this.month,
                day: fields.day ?? this.day,
            },
            options
        )
    }

    add(
        duration: Temporal.Duration | Temporal.DurationLike | string,
        options?: Temporal.ArithmeticOptions
    ): NepaliPlainDate {
        return NepaliPlainDate.fromIso(this.isoDate.add(duration, options))
    }

    subtract(
        duration: Temporal.Duration | Temporal.DurationLike | string,
        options?: Temporal.ArithmeticOptions
    ): NepaliPlainDate {
        return NepaliPlainDate.fromIso(this.isoDate.subtract(duration, options))
    }

    equals(other: NepaliPlainDate): boolean {
        return (
            other instanceof NepaliPlainDate &&
            this.isoDate.equals(other.isoDate)
        )
    }

    // Matches what a real Temporal.PlainDate.prototype.toString() produces
    // for a calendar-tagged date: the ISO position plus a calendar
    // annotation, not the calendar-space y/m/d. (Nothing in this codebase
    // currently calls this directly - dates are always formatted via
    // formatDate/localisationHelpers instead - but keeping it convention-
    // compliant avoids surprises for anyone who logs or serializes one of
    // these.)
    toString(options?: Temporal.ShowCalendarOption) {
        const showCalendar = options?.calendarName ?? 'auto'
        const isoString = this.isoDate.toString({
            ...options,
            calendarName: 'never',
        })
        return showCalendar === 'never'
            ? isoString
            : `${isoString}[u-ca=nepali]`
    }

    toJSON() {
        return `${this.isoDate.toString({
            calendarName: 'never',
        })}[u-ca=nepali]`
    }
}

const supportedNepaliYears = Object.keys(NEPALI_CALENDAR_DATA)
const firstSupportedNepaliYear = Number(supportedNepaliYears[0])
const lastSupportedNepaliYear = Number(
    supportedNepaliYears[supportedNepaliYears.length - 1]
)

const _nepaliToIso = (
    fields: { day: number; year: number; month: number },
    { overflow }: Temporal.AssignmentOptions = {}
) => {
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

    if (
        overflow === 'reject' &&
        (nepaliMonth < 1 ||
            nepaliMonth > 12 ||
            nepaliDay > NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth])
    ) {
        throw new Error('Invalid date in Nepali calendar')
    }

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

export { NepaliPlainDate }
