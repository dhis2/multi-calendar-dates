import { Temporal } from '@js-temporal/polyfill-patched'
import { NepaliPlainDate } from '../custom-calendars/nepaliCalendar'
import { SupportedCalendar } from '../types'

/**
 * A date value that is either a real Temporal.PlainDate (any CLDR calendar)
 * or a hand-rolled implementation for a calendar Temporal doesn't support
 * natively (currently just NepaliPlainDate). Lives here rather than under
 * custom-calendars/ since it's a general date-representation concern used
 * throughout hooks and period-calculation, not something specific to the
 * Nepali calendar - a future second custom calendar would extend this union
 * and register itself in customPlainDateImplementations below, not change
 * anything Nepali-specific.
 */
export type AnyPlainDate = Temporal.PlainDate | NepaliPlainDate

export const isNepaliPlainDate = (
    date: AnyPlainDate
): date is NepaliPlainDate => date instanceof NepaliPlainDate

/**
 * Converts to a genuine ISO 8601 Temporal.PlainDate - for comparisons/arithmetic
 * that must be calendar-agnostic, and for re-deriving a date's ISO position
 * before reinterpreting it in a different calendar. A real (non-Nepali)
 * Temporal.PlainDate still carries its own calendar tag and must be
 * re-tagged via withCalendar - it is NOT already ISO just because it isn't
 * Nepali.
 */
export const toIsoPlainDate = (date: AnyPlainDate): Temporal.PlainDate =>
    isNepaliPlainDate(date) ? date.isoDate : date.withCalendar('iso8601')

/** Same day AND same calendar - mirrors Temporal.PlainDate.prototype.equals' calendar-sensitivity. */
export const isSameDate = (a: AnyPlainDate, b: AnyPlainDate): boolean =>
    a.calendarId === b.calendarId && toIsoPlainDate(a).equals(toIsoPlainDate(b))

type CustomPlainDateImplementation = {
    from: (
        fields: { year: number; month: number; day: number },
        options?: Temporal.AssignmentOptions
    ) => AnyPlainDate
    fromIso: (isoDate: Temporal.PlainDate) => AnyPlainDate
}

/**
 * Registers how to construct a date value for calendars Temporal doesn't
 * support natively. `getPlainDateFromCalendarFields`/`getPlainDateFromIso`
 * (in helpers.ts) read through this rather than hardcoding "is it Nepali?" -
 * supporting another custom calendar in the future means adding one entry
 * here (and to `customCalendars` in custom-calendars/index.ts for its
 * locale data), not editing every call site that builds dates from a
 * calendar name.
 */
const customPlainDateImplementations: Partial<
    Record<SupportedCalendar, CustomPlainDateImplementation>
> = {
    nepali: { from: NepaliPlainDate.from, fromIso: NepaliPlainDate.fromIso },
}

export const getCustomPlainDateImplementation = (
    calendar: SupportedCalendar
): CustomPlainDateImplementation | undefined =>
    customPlainDateImplementations[calendar]
