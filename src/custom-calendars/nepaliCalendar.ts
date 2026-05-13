import { Temporal } from '@js-temporal/polyfill'
import { NEPALI_CALENDAR_DATA } from './nepaliCalendarData'

// `@js-temporal/polyfill` 0.5.x removed user-defined calendars entirely, so
// Nepali (which is not in CLDR / the polyfill's built-in calendar list) can no
// longer be expressed as a `Temporal.Calendar` subclass. Instead we provide
// `NepaliPlainDate` / `NepaliZonedDateTime` shadow types that mirror the
// subset of the `Temporal.PlainDate` / `Temporal.ZonedDateTime` API surface
// that the rest of this library uses.
//
// Internally each shadow holds an iso8601-backed Temporal value and the cached
// Nepali year/month/day, computed via the same hardcoded data table the
// original `Temporal.Calendar` subclass used. Conversion logic
// (`_isoToNepali` / `_nepaliToIso`) is unchanged from the 0.4.x implementation
// and is still based on the World-Calendars library by Keith Wood.
// https://github.com/kbwood/world-calendars

type NepaliFields = { year: number; month: number; day: number }

const supportedNepaliYears = Object.keys(NEPALI_CALENDAR_DATA)
const firstSupportedNepaliYear = Number(supportedNepaliYears[0])
const lastSupportedNepaliYear = Number(
    supportedNepaliYears[supportedNepaliYears.length - 1]
)

const padTwo = (n: number) => String(n).padStart(2, '0')
const buildMonthCode = (month: number | string) =>
    `M${month.toString().padStart(2, '0')}`

const clampNepaliDay = (year: number, month: number, day: number) => {
    const dim = NEPALI_CALENDAR_DATA[year][month]
    if (day < 1) {
        return 1
    }
    if (day > dim) {
        return dim
    }
    return day
}

const computeDaysInNepaliYear = (year: number) => {
    let total = 0
    for (let m = 1; m <= 12; m++) {
        total += NEPALI_CALENDAR_DATA[year][m]
    }
    return total
}

const computeDayOfYearInNepali = (year: number, month: number, day: number) => {
    let total = day
    for (let m = 1; m < month; m++) {
        total += NEPALI_CALENDAR_DATA[year][m]
    }
    return total
}

const _nepaliToIso = (
    fields: NepaliFields,
    { overflow }: Temporal.AssignmentOptions = {}
): { year: number; month: number; day: number } => {
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

    if (nepaliMonth !== 9) {
        gregorianDayOfYear = nepaliDay
        monthCounter--
    }

    while (monthCounter !== 9) {
        if (monthCounter <= 0) {
            monthCounter = 12
            nepaliYear--
        }
        gregorianDayOfYear += NEPALI_CALENDAR_DATA[nepaliYear][monthCounter]
        monthCounter--
    }

    if (nepaliMonth === 9) {
        gregorianDayOfYear += nepaliDay - NEPALI_CALENDAR_DATA[nepaliYear][0]
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
        day: result.day,
    }
}

const _isoToNepali = (isoDate: {
    year: number
    month: number
    day: number
}): NepaliFields => {
    const gregorianDate = Temporal.PlainDate.from({
        year: isoDate.year,
        month: isoDate.month,
        day: isoDate.day,
    })

    const gregorianYear = gregorianDate.year
    const gregorianDayOfYear = gregorianDate.dayOfYear

    // not final, could be +57 but +56 is always true for 1 Jan
    let nepaliYear = gregorianYear + 56

    if (!NEPALI_CALENDAR_DATA[nepaliYear]) {
        throw new Error(
            `Conversions are only possible between ${firstSupportedNepaliYear} and ${lastSupportedNepaliYear} in Nepali calendar`
        )
    }

    // 1 Jan always falls in Paush (month 9)
    let nepaliMonth = 9
    const dayOfFirstJanInPaush = NEPALI_CALENDAR_DATA[nepaliYear][0]
    let daysSinceJanFirstToEndOfNepaliMonth =
        NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] - dayOfFirstJanInPaush + 1

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
    const nepaliDayOfMonth =
        NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] -
        (daysSinceJanFirstToEndOfNepaliMonth - gregorianDayOfYear)

    return {
        year: nepaliYear,
        month: nepaliMonth,
        day: nepaliDayOfMonth,
    }
}

type WithFields = {
    year?: number
    month?: number
    monthCode?: string
    day?: number
}

type Duration = {
    years?: number
    months?: number
    weeks?: number
    days?: number
}

const monthFromCode = (monthCode: string) => {
    const m = monthCode.match(/^M(\d{2})$/)
    if (!m) {
        throw new Error(`Invalid Nepali monthCode "${monthCode}"`)
    }
    return Number(m[1])
}

/**
 * A `Temporal.PlainDate`-compatible value living in the Nepali calendar.
 *
 * Year/month/day getters return Nepali values; date arithmetic respects
 * Nepali month lengths. An iso8601-backed `Temporal.PlainDate` is cached
 * for cheap conversion via `withCalendar('iso8601')`.
 */
class NepaliPlainDate {
    readonly calendarId = 'nepali'
    private readonly _nepali: NepaliFields
    private readonly _iso: Temporal.PlainDate // iso8601 calendar

    constructor(nepali: NepaliFields, iso: Temporal.PlainDate) {
        this._nepali = nepali
        this._iso = iso
    }

    static fromNepaliFields(
        fields: NepaliFields,
        options?: Temporal.AssignmentOptions
    ): NepaliPlainDate {
        if (
            fields.year < firstSupportedNepaliYear ||
            fields.year > lastSupportedNepaliYear
        ) {
            throw new Error(
                `Conversions are only possible between ${firstSupportedNepaliYear} and ${lastSupportedNepaliYear} in Nepali calendar`
            )
        }
        const overflow = options?.overflow ?? 'constrain'
        const day =
            overflow === 'reject'
                ? fields.day
                : clampNepaliDay(fields.year, fields.month, fields.day)
        const iso = _nepaliToIso({ ...fields, day }, options)
        const isoDate = Temporal.PlainDate.from({
            year: iso.year,
            month: iso.month,
            day: iso.day,
        })
        return new NepaliPlainDate(
            { year: fields.year, month: fields.month, day },
            isoDate
        )
    }

    static fromIso(isoDate: Temporal.PlainDate): NepaliPlainDate {
        const iso = isoDate.withCalendar('iso8601')
        const nepali = _isoToNepali({
            year: iso.year,
            month: iso.month,
            day: iso.day,
        })
        return new NepaliPlainDate(nepali, iso)
    }

    static from(
        input: NepaliPlainDate | NepaliFields | string,
        options?: Temporal.AssignmentOptions
    ): NepaliPlainDate {
        if (input instanceof NepaliPlainDate) {
            return input
        }
        if (typeof input === 'string') {
            const m = input.match(/^(\d{4})-(\d{2})-(\d{2})/)
            if (!m) {
                throw new Error(`Invalid Nepali date string "${input}"`)
            }
            return NepaliPlainDate.fromNepaliFields(
                { year: +m[1], month: +m[2], day: +m[3] },
                options
            )
        }
        return NepaliPlainDate.fromNepaliFields(input, options)
    }

    static compare(a: NepaliPlainDate, b: NepaliPlainDate): -1 | 0 | 1 {
        return Temporal.PlainDate.compare(a._iso, b._iso)
    }

    // Iso-backed read-throughs
    get dayOfWeek() {
        return this._iso.dayOfWeek
    }
    get dayOfYear() {
        return computeDayOfYearInNepali(
            this._nepali.year,
            this._nepali.month,
            this._nepali.day
        )
    }
    get daysInWeek() {
        return 7
    }
    get daysInYear() {
        return computeDaysInNepaliYear(this._nepali.year)
    }
    get monthsInYear() {
        return 12
    }
    get inLeapYear() {
        return false
    }
    get era(): string | undefined {
        return undefined
    }

    // Nepali-space getters
    get year() {
        return this._nepali.year
    }
    get eraYear() {
        return this._nepali.year
    }
    get month() {
        return this._nepali.month
    }
    get monthCode() {
        return buildMonthCode(this._nepali.month)
    }
    get day() {
        return this._nepali.day
    }
    get daysInMonth() {
        return NEPALI_CALENDAR_DATA[this._nepali.year][this._nepali.month]
    }

    /** Underlying iso8601 PlainDate */
    toIso(): Temporal.PlainDate {
        return this._iso
    }

    withCalendar(
        calendar: string | NepaliPlainDate
    ): Temporal.PlainDate | NepaliPlainDate {
        if (calendar === 'nepali') {
            return this
        }
        return this._iso.withCalendar(calendar as Temporal.CalendarLike)
    }

    with(
        fields: WithFields,
        options?: Temporal.AssignmentOptions
    ): NepaliPlainDate {
        const month =
            fields.month ??
            (fields.monthCode
                ? monthFromCode(fields.monthCode)
                : this._nepali.month)
        const next = {
            year: fields.year ?? this._nepali.year,
            month,
            day: fields.day ?? this._nepali.day,
        }
        return NepaliPlainDate.fromNepaliFields(next, options)
    }

    add(duration: Duration): NepaliPlainDate {
        const { years = 0, months = 0, weeks = 0, days = 0 } = duration

        // Year / month arithmetic in Nepali space (so month #s stay sensible).
        let y = this._nepali.year
        let m = this._nepali.month
        const d = this._nepali.day

        if (years || months) {
            let total = m + months + years * 12
            // normalize into 1..12
            while (total > 12) {
                total -= 12
                y += 1
            }
            while (total < 1) {
                total += 12
                y -= 1
            }
            m = total
        }

        let result = NepaliPlainDate.fromNepaliFields({
            year: y,
            month: m,
            day: clampNepaliDay(y, m, d),
        })

        const dayDelta = weeks * 7 + days
        if (dayDelta !== 0) {
            result = NepaliPlainDate.fromIso(
                result._iso.add({ days: dayDelta })
            )
        }
        return result
    }

    subtract(duration: Duration): NepaliPlainDate {
        return this.add({
            years: -(duration.years ?? 0),
            months: -(duration.months ?? 0),
            weeks: -(duration.weeks ?? 0),
            days: -(duration.days ?? 0),
        })
    }

    since(other: NepaliPlainDate | Temporal.PlainDate): Temporal.Duration {
        const otherIso = other instanceof NepaliPlainDate ? other._iso : other
        return this._iso.since(otherIso)
    }

    equals(other: NepaliPlainDate | Temporal.PlainDate): boolean {
        const otherIso = other instanceof NepaliPlainDate ? other._iso : other
        return this._iso.equals(otherIso)
    }

    toString(options?: Temporal.ShowCalendarOption): string {
        const iso = `${this._iso.year}-${padTwo(this._iso.month)}-${padTwo(
            this._iso.day
        )}`
        const display = options?.calendarName ?? 'auto'
        if (display === 'never') {
            return iso
        }
        return `${iso}[u-ca=nepali]`
    }

    toLocaleString() {
        // Nepali is not in CLDR; we only render a stable numeric form here.
        // Localised month/day labels are produced by `localisationHelpers`.
        return `${this._nepali.year}-${padTwo(this._nepali.month)}-${padTwo(
            this._nepali.day
        )}`
    }

    toPlainYearMonth() {
        return new NepaliPlainYearMonth(this._nepali.year, this._nepali.month)
    }
}

class NepaliPlainYearMonth {
    readonly calendarId = 'nepali'
    constructor(readonly year: number, readonly month: number) {}
    get monthCode() {
        return buildMonthCode(this.month)
    }
    get daysInMonth() {
        return NEPALI_CALENDAR_DATA[this.year][this.month]
    }
    get daysInYear() {
        return computeDaysInNepaliYear(this.year)
    }
    get monthsInYear() {
        return 12
    }
    toLocaleString() {
        return `${this.year}-${padTwo(this.month)}`
    }
    toString() {
        return `${this.year}-${padTwo(this.month)}-01[u-ca=nepali]`
    }
}

/**
 * A `Temporal.ZonedDateTime`-compatible value living in the Nepali calendar.
 * Internally wraps an iso8601-backed `Temporal.ZonedDateTime`, plus the
 * Nepali year/month/day for that instant.
 */
class NepaliZonedDateTime {
    readonly calendarId = 'nepali'
    private readonly _nepali: NepaliFields
    private readonly _iso: Temporal.ZonedDateTime // iso8601 calendar

    constructor(nepali: NepaliFields, iso: Temporal.ZonedDateTime) {
        this._nepali = nepali
        this._iso = iso
    }

    static fromIso(isoZdt: Temporal.ZonedDateTime): NepaliZonedDateTime {
        const iso = isoZdt.withCalendar('iso8601')
        const nepali = _isoToNepali({
            year: iso.year,
            month: iso.month,
            day: iso.day,
        })
        return new NepaliZonedDateTime(nepali, iso)
    }

    static fromNepaliFields(
        fields: NepaliFields & {
            hour?: number
            minute?: number
            second?: number
            timeZone: string
        }
    ): NepaliZonedDateTime {
        const iso = _nepaliToIso(fields)
        const isoZdt = Temporal.PlainDateTime.from({
            year: iso.year,
            month: iso.month,
            day: iso.day,
            hour: fields.hour ?? 0,
            minute: fields.minute ?? 0,
            second: fields.second ?? 0,
        }).toZonedDateTime(fields.timeZone)
        return new NepaliZonedDateTime(
            { year: fields.year, month: fields.month, day: fields.day },
            isoZdt
        )
    }

    get timeZoneId() {
        return this._iso.timeZoneId
    }
    get year() {
        return this._nepali.year
    }
    get eraYear() {
        return this._nepali.year
    }
    get month() {
        return this._nepali.month
    }
    get monthCode() {
        return buildMonthCode(this._nepali.month)
    }
    get day() {
        return this._nepali.day
    }
    get dayOfWeek() {
        return this._iso.dayOfWeek
    }
    get dayOfYear() {
        return computeDayOfYearInNepali(
            this._nepali.year,
            this._nepali.month,
            this._nepali.day
        )
    }
    get daysInWeek() {
        return 7
    }
    get daysInMonth() {
        return NEPALI_CALENDAR_DATA[this._nepali.year][this._nepali.month]
    }
    get daysInYear() {
        return computeDaysInNepaliYear(this._nepali.year)
    }
    get monthsInYear() {
        return 12
    }
    get hour() {
        return this._iso.hour
    }
    get minute() {
        return this._iso.minute
    }
    get second() {
        return this._iso.second
    }

    toPlainDate(): NepaliPlainDate {
        return new NepaliPlainDate(
            this._nepali,
            this._iso.toPlainDate().withCalendar('iso8601')
        )
    }

    toIsoZonedDateTime(): Temporal.ZonedDateTime {
        return this._iso
    }

    startOfDay(): NepaliZonedDateTime {
        return new NepaliZonedDateTime(this._nepali, this._iso.startOfDay())
    }

    withCalendar(
        calendar: string
    ): Temporal.ZonedDateTime | NepaliZonedDateTime {
        if (calendar === 'nepali') {
            return this
        }
        return this._iso.withCalendar(calendar as Temporal.CalendarLike)
    }

    with(fields: WithFields & { hour?: number }): NepaliZonedDateTime {
        const month =
            fields.month ??
            (fields.monthCode
                ? monthFromCode(fields.monthCode)
                : this._nepali.month)
        const next: NepaliFields & {
            hour?: number
            minute?: number
            second?: number
            timeZone: string
        } = {
            year: fields.year ?? this._nepali.year,
            month,
            day: clampNepaliDay(
                fields.year ?? this._nepali.year,
                month,
                fields.day ?? this._nepali.day
            ),
            hour: this._iso.hour,
            minute: this._iso.minute,
            second: this._iso.second,
            timeZone: this._iso.timeZoneId,
        }
        return NepaliZonedDateTime.fromNepaliFields(next)
    }

    add(duration: Duration): NepaliZonedDateTime {
        const plain = this.toPlainDate().add(duration)
        const isoBacking = plain.toIso()
        const isoZdt = isoBacking
            .toPlainDateTime({
                hour: this._iso.hour,
                minute: this._iso.minute,
                second: this._iso.second,
                millisecond: this._iso.millisecond,
                microsecond: this._iso.microsecond,
                nanosecond: this._iso.nanosecond,
            })
            .toZonedDateTime(this._iso.timeZoneId)
        return new NepaliZonedDateTime(
            { year: plain.year, month: plain.month, day: plain.day },
            isoZdt
        )
    }

    subtract(duration: Duration): NepaliZonedDateTime {
        return this.add({
            years: -(duration.years ?? 0),
            months: -(duration.months ?? 0),
            weeks: -(duration.weeks ?? 0),
            days: -(duration.days ?? 0),
        })
    }

    equals(other: NepaliZonedDateTime | Temporal.ZonedDateTime): boolean {
        const otherIso =
            other instanceof NepaliZonedDateTime ? other._iso : other
        return this._iso.equals(otherIso)
    }
}

export { NepaliPlainDate, NepaliPlainYearMonth, NepaliZonedDateTime }
