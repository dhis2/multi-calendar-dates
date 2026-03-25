import { Temporal } from '@js-temporal/polyfill'
import { NepaliPlainDate } from './nepaliCalendar'

const calendar = 'nepali'
describe('from nepali to gregorian', () => {
    it('should convert from nepali calendar to gregorian', () => {
        const nepaliDate = {
            year: 2079,
            month: 7,
            day: 1,
        } // 1st of Kartik 2079 is 18th of October 2022

        const result = NepaliPlainDate.from(nepaliDate)
        expect(result.toString()).toEqual('2022-10-18[u-ca=nepali]')
        expect(result.calendarId).toEqual('nepali')
    })

    it('should convert from nepali calendar to gregorian for the last n years', () => {
        // year 2100 in Nepali is year 2043 in gregorian
        const gregorianStartYear = 2043
        const nepaliStartYear = 2100

        for (let i = 0; i < 100; i++) {
            const nepaliDate = {
                year: nepaliStartYear - i,
                month: 7,
                day: 1,
            }

            const date = NepaliPlainDate.from(nepaliDate)
            expect(date.toString()).toMatch(`${gregorianStartYear - i}-10-`)
        }
    })

    it('should throw an error if nepali year is out of range of supported dates', () => {
        expect(() =>
            NepaliPlainDate.from({
                year: 1969,
                month: 7,
                day: 1,
            })
        ).toThrow(
            'Conversions are only possible between 1970 and 2100 in Nepali calendar'
        )
        expect(() =>
            NepaliPlainDate.from({
                year: 2101,
                month: 7,
                day: 1,
            })
        ).toThrow(
            'Conversions are only possible between 1970 and 2100 in Nepali calendar'
        )
    })

    // it.only('should convert a year/month from nepali calendar to gregorian', () => {
    //     const nepaliDate = {
    //         year: 2079,
    //         month: 7,
    //     }

    //     const result = NepaliPlainDate.from(nepaliDate).toPlainYearMonth()
    //     expect(result.year).toEqual(2079)
    //     expect(result.month).toEqual(7)
    // })
})

describe('from greogorian to nepali', () => {
    it('should convert from gregorian calendar to nepali', () => {
        const nepaliDate = new NepaliPlainDate(2022, 10, 18)

        expect(nepaliDate.year).toEqual(2079)
        expect(nepaliDate.day).toEqual(1)
        expect(nepaliDate.month).toEqual(7)
    })
    it('should convert from gregorian calendar to nepali for the last/next n years', () => {
        // year 2043 in gregorian is year 2100 in Nepali
        const gregorianStartYear = 2043
        const nepaliStartYear = 2100

        for (let i = 0; i < 100; i++) {
            const nepaliDate = new NepaliPlainDate(
                `${gregorianStartYear - i}-10-18`
            )

            expect(nepaliDate.year).toEqual(nepaliStartYear - i)
        }
    })

    it('should throw an error if nepali year is out of range of supported dates', () => {
        expect(() => {
            new NepaliPlainDate('2044-10-18').year
        }).toThrow(
            'Conversions are only possible between 1970 and 2100 in Nepali calendar'
        )
    })
})

describe('nepali calendar arithmetic', () => {
    it('should get the next month correctly for all nepali years from 1971 to 2100', () => {
        for (let year = 1971; year < 2100; year++) {
            const date = NepaliPlainDate.from({
                year,
                month: 1,
                day: 14,
                calendar,
            })

            const afterOneMonth = date.add({ months: 1 })
            const afterTwelveMonth = date.add({ months: 12 })

            expect(afterOneMonth.year).toEqual(year)
            expect(afterOneMonth.month).toEqual(2)
            expect(afterTwelveMonth.month).toEqual(1)
            expect(afterTwelveMonth.year).toEqual(year + 1)

            expect(date.add({ months: 2 }).month).toEqual(3)
            expect(date.add({ months: 3 }).month).toEqual(4)
            expect(date.add({ months: 4 }).month).toEqual(5)
            expect(date.add({ months: 5 }).month).toEqual(6)
            expect(date.add({ months: 6 }).month).toEqual(7)
            expect(date.add({ months: 7 }).month).toEqual(8)
            expect(date.add({ months: 8 }).month).toEqual(9)
            expect(date.add({ months: 9 }).month).toEqual(10)
            expect(date.add({ months: 10 }).month).toEqual(11)
            expect(date.add({ months: 11 }).month).toEqual(12)
            expect(date.add({ months: 11 }).year).toEqual(year)
        }
    })
})

describe('some random conversions nepali <-> gregorian', () => {
    const RANDOM_CONVERSION_MAPS = [
        {
            bs: { year: 2013, month: 2, day: 8 },
            ad: { year: 1956, month: 5, day: 21 },
        },
        {
            bs: { year: 2051, month: 10, day: 1 },
            ad: { year: 1995, month: 1, day: 15 },
        },
        {
            bs: { year: 2076, month: 6, day: 27 },
            ad: { year: 2019, month: 10, day: 14 },
        },
        {
            bs: { year: 2077, month: 4, day: 4 },
            ad: { year: 2020, month: 7, day: 19 },
        },
    ]

    it.each(RANDOM_CONVERSION_MAPS)(
        `it should convert from nepali to gregorian and vice versa`,
        ({
            bs: nepaliDate,
            ad: gregorianDate,
        }: typeof RANDOM_CONVERSION_MAPS[number]) => {
            const result = NepaliPlainDate.from(nepaliDate).getISOFields()

            const isoYear = result.year
            const isoMonth = result.month
            const isoDay = result.day

            expect({ year: isoYear, month: isoMonth, day: isoDay }).toEqual(
                gregorianDate
            )

            const nepaliResult = new NepaliPlainDate(
                gregorianDate.year,
                gregorianDate.month,
                gregorianDate.day
            )
            // Temporal.PlainDate.from(gregorianDate).withCalendar(calendar)

            expect(nepaliResult.year).toEqual(nepaliDate.year)
            expect(nepaliResult.month).toEqual(nepaliDate.month)
            expect(nepaliResult.day).toEqual(nepaliDate.day)
        }
    )
})
