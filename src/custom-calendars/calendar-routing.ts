import { Temporal } from '@js-temporal/polyfill'
import { NepaliPlainDate, NepaliZonedDateTime } from './nepaliCalendar'

// Calendar-agnostic shapes the rest of the library can hold and read from.
// `NepaliPlainDate` / `NepaliZonedDateTime` mirror the same API surface as
// their Temporal counterparts for everything this library actually consumes
// (year/month/day getters, `with`, `add`, `subtract`, `equals`, `toString`,
// etc.) so most call sites can stay duck-typed.
export type CalendarPlainDate = Temporal.PlainDate | NepaliPlainDate
export type CalendarZonedDateTime = Temporal.ZonedDateTime | NepaliZonedDateTime

export const isNepaliCalendar = (
    calendar: string | undefined | null
): boolean => calendar === 'nepali'

export const isNepaliPlainDate = (value: unknown): value is NepaliPlainDate =>
    value instanceof NepaliPlainDate

export const isNepaliZonedDateTime = (
    value: unknown
): value is NepaliZonedDateTime => value instanceof NepaliZonedDateTime

type PlainDateFields = {
    year?: number
    month?: number
    monthCode?: string
    day: number
    era?: string
    eraYear?: number
}

/**
 * Build a `Temporal.PlainDate` (or `NepaliPlainDate` if `calendar` is
 * `'nepali'`) from a fields object or ISO-style date string. Routes around
 * the fact that 0.5.x's `Temporal.PlainDate.from` only accepts built-in
 * calendar identifiers.
 */
export const plainDateFrom = (
    input: PlainDateFields | string,
    calendar?: string,
    options?: Temporal.AssignmentOptions
): CalendarPlainDate => {
    if (isNepaliCalendar(calendar)) {
        if (typeof input === 'string') {
            return NepaliPlainDate.from(input, options)
        }
        const { year, month, monthCode, day } = input
        const resolvedMonth =
            month ??
            (monthCode ? Number(monthCode.replace(/^M/, '')) : undefined)
        if (year === undefined || resolvedMonth === undefined) {
            throw new Error(
                'NepaliPlainDate requires year + month (or monthCode) + day'
            )
        }
        return NepaliPlainDate.fromNepaliFields(
            { year, month: resolvedMonth, day },
            options
        )
    }

    if (typeof input === 'string') {
        const date = Temporal.PlainDate.from(input, options)
        if (calendar && calendar !== 'iso8601') {
            return date.withCalendar(calendar)
        }
        return date
    }
    return Temporal.PlainDate.from(
        {
            ...input,
            ...(calendar ? { calendar } : {}),
        } as Temporal.PlainDateLike,
        options
    )
}

/**
 * Returns a date in the requested calendar, given any source date.
 */
export const withCalendar = (
    source: CalendarPlainDate | Temporal.PlainDateLike | string,
    calendar: string
): CalendarPlainDate => {
    if (isNepaliCalendar(calendar)) {
        if (isNepaliPlainDate(source)) {
            return source
        }
        if (source instanceof Temporal.PlainDate) {
            return NepaliPlainDate.fromIso(source)
        }
        if (typeof source === 'string') {
            const iso = Temporal.PlainDate.from(source)
            return NepaliPlainDate.fromIso(iso)
        }
        // Plain object source — assume iso8601 fields
        const obj = source as Temporal.PlainDateLike
        return NepaliPlainDate.fromIso(
            Temporal.PlainDate.from({
                year: obj.year as number,
                month: obj.month as number,
                day: obj.day as number,
            })
        )
    }

    if (isNepaliPlainDate(source)) {
        return source.withCalendar(calendar) as Temporal.PlainDate
    }
    if (source instanceof Temporal.PlainDate) {
        return source.withCalendar(calendar)
    }
    if (typeof source === 'string') {
        return Temporal.PlainDate.from(source).withCalendar(calendar)
    }
    return Temporal.PlainDate.from(source).withCalendar(calendar)
}

type ZdtFields = {
    year?: number
    month?: number
    monthCode?: string
    day: number
    hour?: number
    minute?: number
    second?: number
    era?: string
    eraYear?: number
}

export const zonedDateTimeFrom = (
    input: ZdtFields | CalendarZonedDateTime,
    calendar: string,
    timeZone: string
): CalendarZonedDateTime => {
    if (isNepaliCalendar(calendar)) {
        if (isNepaliZonedDateTime(input)) {
            return input
        }
        const fields = input as ZdtFields
        const month =
            fields.month ??
            (fields.monthCode
                ? Number(fields.monthCode.replace(/^M/, ''))
                : undefined)
        if (fields.year === undefined || month === undefined) {
            throw new Error(
                'NepaliZonedDateTime requires year + month (or monthCode) + day'
            )
        }
        return NepaliZonedDateTime.fromNepaliFields({
            year: fields.year,
            month,
            day: fields.day,
            hour: fields.hour,
            minute: fields.minute,
            second: fields.second,
            timeZone,
        })
    }

    if (isNepaliZonedDateTime(input)) {
        // converting from Nepali → built-in calendar
        return input.withCalendar(calendar) as Temporal.ZonedDateTime
    }
    if (input instanceof Temporal.ZonedDateTime) {
        return input.withCalendar(calendar as Temporal.CalendarLike)
    }
    const fields = { ...(input as ZdtFields) } as Record<string, unknown>
    // Drop keys whose value is `undefined` so the polyfill doesn't see them
    // as set (e.g. `year: undefined` collides with `era`/`eraYear`).
    Object.keys(fields).forEach((key) => {
        if (fields[key] === undefined) {
            delete fields[key]
        }
    })
    return Temporal.ZonedDateTime.from({
        ...fields,
        calendar,
        timeZone,
    } as Temporal.ZonedDateTimeLike)
}

/**
 * Convert a built-in-calendar ZonedDateTime → Nepali (or no-op if already
 * Nepali / non-Nepali target).
 */
export const zonedDateTimeWithCalendar = (
    source: CalendarZonedDateTime,
    calendar: string
): CalendarZonedDateTime => {
    if (isNepaliCalendar(calendar)) {
        if (isNepaliZonedDateTime(source)) {
            return source
        }
        return NepaliZonedDateTime.fromIso(source)
    }
    if (isNepaliZonedDateTime(source)) {
        return source.withCalendar(calendar) as Temporal.ZonedDateTime
    }
    return source.withCalendar(calendar as Temporal.CalendarLike)
}

export const comparePlainDates = (
    a: CalendarPlainDate,
    b: CalendarPlainDate
): -1 | 0 | 1 => {
    const aIso = isNepaliPlainDate(a) ? a.toIso() : a
    const bIso = isNepaliPlainDate(b) ? b.toIso() : b
    return Temporal.PlainDate.compare(aIso, bIso)
}

/** True when the value behaves like a `Temporal.PlainDate` (real or shadow). */
export const isPlainDateLike = (value: unknown): value is CalendarPlainDate =>
    value instanceof Temporal.PlainDate || isNepaliPlainDate(value)
