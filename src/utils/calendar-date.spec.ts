import { SupportedCalendar } from '../types'
import {
    addToCalendarDate,
    formatCalendarDate,
    getDaysInMonth,
} from './calendar-date'
import { convertFromIso8601 } from './convert-date'
import getNowInCalendar from './getNowInCalendar'

describe('getDaysInMonth', () => {
    it.each([
        { calendar: 'gregory', year: 2024, month: 2, days: 29 },
        { calendar: 'gregory', year: 2023, month: 2, days: 28 },
        { calendar: 'iso8601', year: 2024, month: 4, days: 30 },
        { calendar: 'ethiopic', year: 2016, month: 1, days: 30 },
        { calendar: 'ethiopic', year: 2015, month: 13, days: 6 }, // leap year
        { calendar: 'ethiopian', year: 2016, month: 13, days: 5 },
        { calendar: 'nepali', year: 2081, month: 2, days: 32 },
        { calendar: 'nepali', year: 2081, month: 12, days: 31 },
        { calendar: 'islamic', year: 1445, month: 12, days: 29 },
    ])(
        '$calendar $year-$month has $days days',
        ({ calendar, year, month, days }) => {
            expect(getDaysInMonth({ year, month }, calendar)).toBe(days)
        }
    )

    it('reads the Ethiopic year from eraYear, as returned by convertFromIso8601', () => {
        // 2024-06-15 is 2016-10-08 in Ethiopic, where `year` is 7516
        const date = convertFromIso8601('2024-06-15', 'ethiopic')
        expect(getDaysInMonth({ ...date, month: 13 }, 'ethiopic')).toBe(5)
    })

    it('throws for an invalid month', () => {
        expect(() =>
            getDaysInMonth({ year: 2024, month: 13 }, 'gregory')
        ).toThrow()
    })

    it('throws for a Nepali year that is out of range', () => {
        expect(() =>
            getDaysInMonth({ year: 2101, month: 1 }, 'nepali')
        ).toThrow(
            'Conversions are only possible between 1970 and 2100 in Nepali calendar'
        )
    })
})

describe('addToCalendarDate', () => {
    describe('gregory', () => {
        it('clamps the day to the end of the month', () => {
            expect(
                addToCalendarDate(
                    { year: 2024, month: 3, day: 31 },
                    { months: -1 },
                    'gregory'
                )
            ).toEqual({ eraYear: 2024, year: 2024, month: 2, day: 29 })
        })

        it('clamps 29 February when going back a year', () => {
            expect(
                addToCalendarDate(
                    { year: 2024, month: 2, day: 29 },
                    { years: -1 },
                    'gregory'
                )
            ).toMatchObject({ year: 2023, month: 2, day: 28 })
        })

        it('adds years, then months, then days', () => {
            expect(
                addToCalendarDate(
                    { year: 2024, month: 1, day: 31 },
                    { years: 1, months: 1, days: 1 },
                    'gregory'
                )
            ).toMatchObject({ year: 2025, month: 3, day: 1 })
        })

        it('returns the same date for an empty duration', () => {
            expect(
                addToCalendarDate(
                    { year: 2024, month: 6, day: 15 },
                    {},
                    'iso8601'
                )
            ).toMatchObject({ year: 2024, month: 6, day: 15 })
        })
    })

    describe('ethiopic', () => {
        it('takes the output of convertFromIso8601 as-is', () => {
            const date = convertFromIso8601('2024-06-15', 'ethiopic')
            expect(addToCalendarDate(date, { years: -1 }, 'ethiopic')).toEqual({
                eraYear: 2015,
                year: 7515,
                month: 10,
                day: 8,
            })
        })

        it('counts the 13th month when adding months', () => {
            expect(
                addToCalendarDate(
                    { year: 2016, month: 10, day: 8 },
                    { months: -12 },
                    'ethiopian'
                )
            ).toMatchObject({ eraYear: 2015, month: 11, day: 8 })
        })

        it('clamps the 13th month to its length', () => {
            // 2015 is a leap year (6 days in the 13th month), 2016 isn't
            expect(
                addToCalendarDate(
                    { year: 2015, month: 13, day: 6 },
                    { years: 1 },
                    'ethiopian'
                )
            ).toMatchObject({ eraYear: 2016, month: 13, day: 5 })
        })

        it('adds days across the 13th month and into the next year', () => {
            expect(
                addToCalendarDate(
                    { year: 2016, month: 12, day: 28 },
                    { days: 10 },
                    'ethiopian'
                )
            ).toMatchObject({ eraYear: 2017, month: 1, day: 3 })
        })
    })

    describe('nepali', () => {
        it('keeps the day of the month when adding months', () => {
            expect(
                addToCalendarDate(
                    { year: 2081, month: 3, day: 1 },
                    { months: -1 },
                    'nepali'
                )
            ).toEqual({ eraYear: 2081, year: 2081, month: 2, day: 1 })
        })

        it('clamps the day to the end of the month', () => {
            // month 2 of 2081 has 32 days, month 3 has 31
            expect(
                addToCalendarDate(
                    { year: 2081, month: 2, day: 32 },
                    { months: 1 },
                    'nepali'
                )
            ).toMatchObject({ year: 2081, month: 3, day: 31 })
        })

        it('crosses into the next year', () => {
            expect(
                addToCalendarDate(
                    { year: 2081, month: 12, day: 30 },
                    { months: 1, days: 1 },
                    'nepali'
                )
            ).toMatchObject({ year: 2082, month: 1, day: 31 })
        })

        it('goes back years', () => {
            expect(
                addToCalendarDate(
                    { year: 2081, month: 3, day: 1 },
                    { years: -2 },
                    'nepali'
                )
            ).toMatchObject({ year: 2079, month: 3, day: 1 })
        })
    })

    describe('islamic', () => {
        it('uses year, since there is no eraYear', () => {
            expect(
                addToCalendarDate(
                    { year: 1445, month: 12, day: 9 },
                    { years: -1 },
                    'islamic'
                )
            ).toEqual({ eraYear: undefined, year: 1444, month: 12, day: 9 })
        })
    })

    it('throws for an invalid date', () => {
        expect(() =>
            addToCalendarDate(
                { year: 2023, month: 2, day: 29 },
                { days: 1 },
                'gregory'
            )
        ).toThrow()
    })
})

describe('formatCalendarDate', () => {
    beforeEach(() => {
        // 13 October 2021, 01:46:40 UTC
        jest.spyOn(Date, 'now').mockReturnValue(1634089600000)
    })

    it.each([
        ['gregory', '2024-06-15'],
        ['ethiopic', '2016-10-08'],
        ['nepali', '2081-03-01'],
        ['islamic', '1445-12-09'],
    ])('formats a %s date as %s', (calendar, expected) => {
        expect(
            formatCalendarDate(
                convertFromIso8601('2024-06-15', calendar as SupportedCalendar)
            )
        ).toBe(expected)
    })

    it('formats as DD-MM-YYYY', () => {
        expect(
            formatCalendarDate(
                { year: 2016, month: 13, day: 5 },
                { format: 'DD-MM-YYYY' }
            )
        ).toBe('05-13-2016')
    })

    it('pads the year to 4 digits', () => {
        expect(formatCalendarDate({ year: 142, month: 1, day: 1 })).toBe(
            '0142-01-01'
        )
    })

    it('includes the time of day from getNowInCalendar', () => {
        expect(
            formatCalendarDate(getNowInCalendar('ethiopian', 'UTC'), {
                includeTime: true,
            })
        ).toBe('2014-02-03T01:46:40')
    })

    it('throws when asked to include a time the date does not have', () => {
        expect(() =>
            formatCalendarDate(
                { year: 2024, month: 6, day: 15 },
                { includeTime: true }
            )
        ).toThrow('includeTime needs a date with hour, minute and second')
    })
})
