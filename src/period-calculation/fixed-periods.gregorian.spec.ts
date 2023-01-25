import { SupportedCalendar } from '../types'
import { getPeriodByDate, generateFixedPeriods } from './fixed-periods'

describe('Gregorian Calendar period by date calculation', () => {
    describe('monthly periods', () => {
        it('should return "MONTHLY" for period type "2022-01-01" on "202201"', () => {
            const periodType = 'MONTHLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202201')
        })

        it('should return "MONTHLY" for period type "2022-02-01" on "202202"', () => {
            const periodType = 'MONTHLY'
            const date = '2022-02-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202202')
        })

        it('should return "BIMONTHLY" for period type "2022-01-01" on "202201B"', () => {
            const periodType = 'BIMONTHLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202201B')
        })

        it('should return "BIMONTHLY" for period type "2022-03-01" on "202202B"', () => {
            const periodType = 'BIMONTHLY'
            const date = '2022-03-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202202B')
        })

        it('should return "QUARTERLY" for period type "2022-01-01" on "2022Q1"', () => {
            const periodType = 'QUARTERLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Q1')
        })

        it('should return "QUARTERLY" for period type "2022-04-01" on "2022Q2"', () => {
            const periodType = 'QUARTERLY'
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Q2')
        })

        it('should return "QUARTERLYNOV" for period type "2022-10-31" on "2021NovemberQ4"', () => {
            const periodType = 'QUARTERLYNOV'
            const date = '2022-10-31'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021NovemberQ4')
        })

        it('should return "QUARTERLYNOV" for period type "2022-11-01" on "2022NovemberQ1"', () => {
            const periodType = 'QUARTERLYNOV'
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022NovemberQ1')
        })

        it('should return "SIXMONTHLY" for period type "2022-01-01" on "2022S1"', () => {
            const periodType = 'SIXMONTHLY'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022S1')
        })

        it('should return "SIXMONTHLY" for period type "2022-07-01" on "2022S2"', () => {
            const periodType = 'SIXMONTHLY'
            const date = '2022-07-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022S2')
        })

        it('should return "SIXMONTHLYNOV" for period type "2022-01-01" on "2021NovemberS2"', () => {
            const periodType = 'SIXMONTHLYNOV'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021NovemberS2')
        })

        it('should return "SIXMONTHLYNOV" for period type "2022-11-01" on "2022NovemberS1"', () => {
            const periodType = 'SIXMONTHLYNOV'
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022NovemberS1')
        })

        it('should return "SIXMONTHLYAPR" for period type "2022-01-01" on "2021AprilS2"', () => {
            const periodType = 'SIXMONTHLYAPR'
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021AprilS2')
        })

        it('should return "SIXMONTHLYAPR" for period type "2022-04-01" on "2022AprilS1"', () => {
            const periodType = 'SIXMONTHLYAPR'
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022AprilS1')
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
