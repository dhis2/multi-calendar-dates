import { Temporal } from '@js-temporal/polyfill-patched'
import getNowInCalendar from './getNowInCalendar'

describe('getting Now', () => {
    beforeEach(() => {
        // 13 October 2021 UTC
        jest.spyOn(Date, 'now').mockReturnValue(1634089600000)
    })
    it('should get today date in Gregorian', () => {
        const { day, month, year } = getNowInCalendar('gregory', 'UTC')
        expect({ day, month, year }).toEqual({
            day: 13,
            month: 10,
            year: 2021,
        })
    })
    it('should get today date in Ethiopic', () => {
        const {
            day,
            month,
            eraYear: year,
        } = getNowInCalendar('ethiopic', 'UTC')
        expect({ day, month, year }).toEqual({
            day: 3,
            month: 2,
            year: 2014,
        })
    })
    it('should get today date in Ethiopic if the identifier passed is the DHIS2 identifier', () => {
        const {
            day,
            month,
            eraYear: year,
        } = getNowInCalendar('ethiopian', 'UTC')
        expect({ day, month, year }).toEqual({
            day: 3,
            month: 2,
            year: 2014,
        })
    })
    it('should get today date in Nepali', () => {
        const { day, month, year } = getNowInCalendar('nepali', 'UTC')
        expect({ day, month, year }).toEqual({
            day: 27,
            month: 6,
            year: 2078,
        })
    })
    it('should get today date in Persian', () => {
        const { day, month, year } = getNowInCalendar('persian', 'UTC')
        expect({ day, month, year }).toEqual({
            day: 21,
            month: 7,
            year: 1400,
        })
    })
    it('should return a valid date when no timezone is provided', () => {
        const result = getNowInCalendar('gregory')
        expect(result.year).toBeTruthy()
        expect(result.month).toBeGreaterThanOrEqual(1)
        expect(result.day).toBeGreaterThanOrEqual(1)
    })
    it('should default to Gregorian when called with no arguments', () => {
        // exercises the calendarToUse = 'gregory' parameter default. Doesn't
        // assert exact year/month/day since no timeZone is passed, so the
        // result depends on the test environment's default timezone - just
        // confirm it resolved to Gregorian (eraYear matches year, since
        // Gregorian's only era, AD, spans its entire supported range) with
        // plausible values.
        const result = getNowInCalendar()
        expect(result.eraYear).toEqual(result.year)
        expect(result.year).toBeGreaterThan(2000)
        expect(result.month).toBeGreaterThanOrEqual(1)
        expect(result.day).toBeGreaterThanOrEqual(1)
    })
})

// Regression guard for the vendored CLDR 48 / ICU 76 fix (see
// src/vendor/README.md): ICU 76 renamed the Ethiopic Intl.DateTimeFormat era
// codes to 'aa'/'am'. Constructing a date directly with those era codes
// exercises the polyfill's era-matching logic deterministically, regardless
// of which ICU version the test happens to run under (unlike going through
// Intl.DateTimeFormat's own era resolution, which only reproduces the bug on
// ICU 76+).
describe('Ethiopic CLDR 48 era codes (regression guard)', () => {
    it('should not throw for the Amete Mihret era code "am"', () => {
        expect(() =>
            Temporal.PlainDate.from({
                era: 'am',
                eraYear: 2016,
                month: 9,
                day: 15,
                calendar: 'ethiopic',
            })
        ).not.toThrow()
    })

    it('should not throw for the Amete Alem era code "aa"', () => {
        expect(() =>
            Temporal.PlainDate.from({
                era: 'aa',
                eraYear: 7508,
                month: 9,
                day: 15,
                calendar: 'ethiopic',
            })
        ).not.toThrow()
    })

    it('should resolve "am"-era fields to the correct ISO date', () => {
        const date = Temporal.PlainDate.from({
            era: 'am',
            eraYear: 2016,
            month: 9,
            day: 15,
            calendar: 'ethiopic',
        })
        expect(date.withCalendar('iso8601').toString()).toEqual('2024-05-23')
    })
})
