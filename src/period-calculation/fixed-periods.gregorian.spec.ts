import { SupportedCalendar } from '../types'
import { getPeriodByDate, generateFixedPeriods } from './fixed-periods'

describe('Gregorian Calendar period by date calculation', () => {
    describe('daily periods', () => {
        it('should return "202201" for period type "DAILY" on "2022-01-01"', () => {
            const periodType = 'DAILY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('20220101')
        })
    })

    describe('weekly periods', () => {
        it('should return "2021W52" for period type "WEEKLY" on "2022-01-01"', () => {
            const periodType = 'WEEKLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021W52')
        })

        it('should return "2022W1" for period type "WEEKLY" on "2022-01-03"', () => {
            const periodType = 'WEEKLY'
            const date = '2022-01-03'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022W1')
        })

        it('should return "2018WedW52" for period type "WEEKLYWED" on "2019-01-01"', () => {
            const periodType = 'WEEKLYWED'
            const date = '2019-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2018WedW52')
        })

        it('should return "2022WedW1" for period type "WEEKLYWED" on "2022-01-01"', () => {
            const periodType = 'WEEKLYWED'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022WedW1')
        })

        it('should return "2018ThuW52" for period type "WEEKLYTHU" on "2019-01-01"', () => {
            const periodType = 'WEEKLYTHU'
            const date = '2019-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2018ThuW52')
        })

        it('should return "2022ThuW1" for period type "WEEKLYTHU" on "2022-01-01"', () => {
            const periodType = 'WEEKLYTHU'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022ThuW1')
        })

        it('should return "2020SatW52" for period type "WEEKLYSAT" on "2021-01-01"', () => {
            const periodType = 'WEEKLYSAT'
            const date = '2021-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020SatW52')
        })

        it('should return "2022SatW1" for period type "WEEKLYSAT" on "2022-01-01"', () => {
            const periodType = 'WEEKLYSAT'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022SatW1')
        })

        it('should return "2020SunW53" for period type "WEEKLYSUN" on "2021-01-01"', () => {
            const periodType = 'WEEKLYSUN'
            const date = '2021-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020SunW53')
        })

        it('should return "2023SunW1" for period type "WEEKLYSUN" on "2023-01-01"', () => {
            const periodType = 'WEEKLYSUN'
            const date = '2023-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2023SunW1')
        })

        it('should return "2020BiW26" for period type "BIWEEKLY" on "2021-01-01"', () => {
            const periodType = 'BIWEEKLY'
            const date = '2021-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020BiW26')
        })

        it('should return "2020SunW1" for period type "BIWEEKLY" on "2020-01-01"', () => {
            const periodType = 'BIWEEKLY'
            const date = '2020-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020BiW1')
        })
    })

    describe('monthly periods', () => {
        it('should return "202201" for period type "MONTHLY" on "2022-01-01"', () => {
            const periodType = 'MONTHLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202201')
        })

        it('should return "202202" for period type "MONTHLY" on "2022-02-01"', () => {
            const periodType = 'MONTHLY'
            const date = '2022-02-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202202')
        })

        it('should return "202201B" for period type "BIMONTHLY" on "2022-01-01"', () => {
            const periodType = 'BIMONTHLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202201B')
        })

        it('should return "202202B" for period type "BIMONTHLY" on "2022-03-01"', () => {
            const periodType = 'BIMONTHLY'
            const date = '2022-03-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202202B')
        })

        it('should return "2022Q1" for period type "QUARTERLY" on "2022-01-01"', () => {
            const periodType = 'QUARTERLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Q1')
        })

        it('should return "2022Q2" for period type "QUARTERLY" on "2022-04-01"', () => {
            const periodType = 'QUARTERLY'
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Q2')
        })

        it('should return "2021NovemberQ4" for period type "QUARTERLYNOV" on "2022-10-31"', () => {
            const periodType = 'QUARTERLYNOV'
            const date = '2022-10-31'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021NovemberQ4')
        })

        it('should return "2022NovemberQ1" for period type "QUARTERLYNOV" on "2022-11-01"', () => {
            const periodType = 'QUARTERLYNOV'
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022NovemberQ1')
        })

        it('should return "2022S1" for period type "SIXMONTHLY" on "2022-01-01"', () => {
            const periodType = 'SIXMONTHLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022S1')
        })

        it('should return "2022S2" for period type "SIXMONTHLY" on "2022-07-01"', () => {
            const periodType = 'SIXMONTHLY'
            const date = '2022-07-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022S2')
        })

        it('should return "2021NovemberS2" for period type "SIXMONTHLYNOV" on "2022-01-01"', () => {
            const periodType = 'SIXMONTHLYNOV'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021NovemberS2')
        })

        it('should return "2022NovemberS1" for period type "SIXMONTHLYNOV" on "2022-11-01"', () => {
            const periodType = 'SIXMONTHLYNOV'
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022NovemberS1')
        })

        it('should return "2021AprilS2" for period type "SIXMONTHLYAPR" on "2022-01-01"', () => {
            const periodType = 'SIXMONTHLYAPR'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021AprilS2')
        })

        it('should return "2022AprilS1" for period type "SIXMONTHLYAPR" on "2022-04-01"', () => {
            const periodType = 'SIXMONTHLYAPR'
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022AprilS1')
        })
    })

    describe('yearly periods', () => {
        it('should return "2022" for period type "YEARLY" on "2022-01-01"', () => {
            const periodType = 'YEARLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022')
        })

        it('should return "2021Nov" for period type "FYNOV" on "2022-01-01"', () => {
            const periodType = 'FYNOV'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021Nov')
        })

        it('should return "2022Nov" for period type "FYNOV" on "2022-11-01"', () => {
            const periodType = 'FYNOV'
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Nov')
        })

        it('should return "2021Oct" for period type "FYOCT" on "2022-01-01"', () => {
            const periodType = 'FYOCT'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021Oct')
        })

        it('should return "2022Oct" for period type "FYOCT" on "2022-10-01"', () => {
            const periodType = 'FYOCT'
            const date = '2022-10-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Oct')
        })

        it('should return "2021July" for period type "FYJUL" on "2022-01-01"', () => {
            const periodType = 'FYJUL'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021July')
        })

        it('should return "2022July" for period type "FYJUL" on "2022-07-01"', () => {
            const periodType = 'FYJUL'
            const date = '2022-07-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022July')
        })

        it('should return "2021April" for period type "FYAPR" on "2022-01-01"', () => {
            const periodType = 'FYAPR'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021April')
        })

        it('should return "2022April" for period type "FYAPR" on "2022-04-01"', () => {
            const periodType = 'FYAPR'
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022April')
        })
    })
})

describe('Gregorian Calendar fixed period calculation', () => {
    describe('weekly periods', () => {
        it('should omit last week if most of it is in next year', () => {
            const results = generateFixedPeriods({
                periodType: 'WEEKLY',
                year: 2014,
                calendar: 'gregory',
                locale: 'en',
                startingDay: 1,
            })
            expect(results[results.length - 1]).toMatchObject({
                id: '2014W52',
                iso: '2014W52',
                name: 'Week 52 - 2014-12-22 - 2014-12-28',
            })
        })
        it('should start the year before if necessary', () => {
            const results = generateFixedPeriods({
                periodType: 'WEEKLYSUN',
                year: 2014,
                calendar: 'gregory',
                locale: 'en',
                startingDay: 1,
            })
            expect(results[0]).toMatchObject({
                id: '2014SunW1',
                iso: '2014SunW1',
                name: 'Week 1 - 2013-12-29 - 2014-01-04',
            })
            expect(results[52]).toMatchObject({
                id: '2014SunW53',
                iso: '2014SunW53',
                name: 'Week 53 - 2014-12-28 - 2015-01-03',
            })
        })
    })

    describe('financial year', () => {
        const gregorianDate = {
            year: 2015,
            calendar: 'gregory' as SupportedCalendar,
            locale: 'en',
        }
        it('should build the label for Financial Year November properly', () => {
            const result = generateFixedPeriods({
                ...gregorianDate,
                periodType: 'FYNOV',
            })

            expect(result[0]).toMatchObject({
                id: '2015Nov',
                name: 'November 2015 - October 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006Nov',
                name: 'November 2006 - October 2007',
            })
        })

        it('should build the label for Financial Year April properly', () => {
            const result = generateFixedPeriods({
                periodType: 'FYAPR',
                ...gregorianDate,
            })

            expect(result[0]).toMatchObject({
                id: '2015April',
                name: 'April 2015 - March 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006April',
                name: 'April 2006 - March 2007',
            })
        })

        it('should build the label for Financial Year properly', () => {
            const result = generateFixedPeriods({
                periodType: 'YEARLY',
                ...gregorianDate,
            })

            expect(result[0]).toMatchObject({
                id: '2015',
                iso: '2015',
                name: '2015',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006',
                iso: '2006',
                name: '2006',
            })
        })
    })

    describe('start and end dates', () => {
        const date = {
            year: 2015,
            calendar: 'gregory' as const,
            locale: 'en',
            startingDay: 1,
        }
        it('should add start and end dates for DAILY', () => {
            const [firstPeriod] = generateFixedPeriods({
                periodType: 'DAILY',
                ...date,
            })
            expect(firstPeriod.startDate).toEqual(firstPeriod.endDate)
            expect(firstPeriod.startDate).toEqual('2015-01-01')
        })
        it('should add start and end dates for YEARLY', () => {
            const periods = generateFixedPeriods({
                periodType: 'YEARLY',
                ...date,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-12-31')
            expect(periods[1]).toEqual('2014-01-01/2014-12-31')
            expect(periods[periods.length - 1]).toEqual('2006-01-01/2006-12-31')
        })
        it('should add start and end dates for FYNOV', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'FYNOV',
                year: 2005,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2005-11-01/2006-10-31')
            expect(periods[periods.length - 1]).toEqual('1996-11-01/1997-10-31')
        })
        it('should add start and end dates for FYOCT', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'FYOCT',
                year: 2005,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2005-10-01/2006-09-30')
            expect(periods[periods.length - 1]).toEqual('1996-10-01/1997-09-30')
        })
        it('should add start and end dates for WEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'WEEKLY',
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2013-12-30/2014-01-05')
            expect(periods[periods.length - 1]).toEqual('2014-12-22/2014-12-28')
        })
        it('should add start and end dates for WEEKLYSUN', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'WEEKLYSUN',
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2013-12-29/2014-01-04')
            expect(periods[periods.length - 1]).toEqual('2014-12-28/2015-01-03')
        })
        it('should add start and end dates for BIWEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'BIWEEKLY',
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2013-12-30/2014-01-12')
            expect(periods[periods.length - 1]).toEqual('2014-12-15/2014-12-28')
        })
        it('should add start and end dates for MONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'MONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-01-31')
            expect(periods[1]).toEqual('2015-02-01/2015-02-28')
            expect(periods[periods.length - 1]).toEqual('2015-12-01/2015-12-31')
        })
        it('should add start and end dates for SIXMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'SIXMONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-06-30')
            expect(periods[periods.length - 1]).toEqual('2015-07-01/2015-12-31')
        })
        it('should add start and end dates for SIXMONTHLYAPR', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'SIXMONTHLYAPR',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-04-01/2015-09-30')
            expect(periods[periods.length - 1]).toEqual('2015-10-01/2016-03-31')
        })
        it('should add start and end dates for QUARTERLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'QUARTERLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-03-31')
            expect(periods[periods.length - 1]).toEqual('2015-10-01/2015-12-31')
        })
        it('should add start and end dates for BIMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'BIMONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-02-28')
            expect(periods[periods.length - 1]).toEqual('2015-11-01/2015-12-31')
        })
    })
})
