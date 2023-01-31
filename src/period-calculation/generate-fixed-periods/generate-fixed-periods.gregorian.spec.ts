import { SupportedCalendar } from '../../types'
import { FIXED_PERIOD_TYPES } from '../period-types'
import generateFixedPeriods from './generate-fixed-periods'

describe('Gregorian Calendar fixed period calculation', () => {
    describe('weekly periods', () => {
        it('should omit every period on/after the exclude date', () => {
            const results = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                year: 2014,
                calendar: 'gregory',
                locale: 'en',
                excludeDay: '2014-07-12',
                startingDay: 1,
            })

            expect(results[results.length - 1]).toMatchObject({
                id: '2014W27',
                iso: '2014W27',
                name: 'Week 27 - 2014-06-30 - 2014-07-06',
                displayName: 'Week 27 - 2014-06-30 - 2014-07-06',
            })
        })

        it('should omit last week if most of it is in next year', () => {
            const results = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                year: 2014,
                calendar: 'gregory',
                locale: 'en',
                startingDay: 1,
            })
            expect(results[results.length - 1]).toMatchObject({
                id: '2014W52',
                iso: '2014W52',
                name: 'Week 52 - 2014-12-22 - 2014-12-28',
                displayName: 'Week 52 - 2014-12-22 - 2014-12-28',
            })
        })
        it('should start the year before if necessary', () => {
            const results = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.WEEKLYSUN,
                year: 2014,
                calendar: 'gregory',
                locale: 'en',
                startingDay: 1,
            })
            expect(results[0]).toMatchObject({
                id: '2014SunW1',
                iso: '2014SunW1',
                name: 'Week 1 - 2013-12-29 - 2014-01-04',
                displayName: 'Week 1 - 2013-12-29 - 2014-01-04',
            })
            expect(results[52]).toMatchObject({
                id: '2014SunW53',
                iso: '2014SunW53',
                name: 'Week 53 - 2014-12-28 - 2015-01-03',
                displayName: 'Week 53 - 2014-12-28 - 2015-01-03',
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
                periodType: FIXED_PERIOD_TYPES.FYNOV,
            })

            expect(result[0]).toMatchObject({
                id: '2015Nov',
                name: 'November 2015 - October 2016',
                displayName: 'November 2015 - October 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006Nov',
                name: 'November 2006 - October 2007',
                displayName: 'November 2006 - October 2007',
            })
        })

        it('should build the label for Financial Year April properly', () => {
            const result = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.FYAPR,
                ...gregorianDate,
            })

            expect(result[0]).toMatchObject({
                id: '2015April',
                name: 'April 2015 - March 2016',
                displayName: 'April 2015 - March 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006April',
                name: 'April 2006 - March 2007',
                displayName: 'April 2006 - March 2007',
            })
        })

        it('should build the label for Financial Year properly', () => {
            const result = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.YEARLY,
                ...gregorianDate,
            })

            expect(result[0]).toMatchObject({
                id: '2015',
                iso: '2015',
                name: '2015',
                displayName: '2015',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006',
                iso: '2006',
                name: '2006',
                displayName: '2006',
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
                periodType: FIXED_PERIOD_TYPES.DAILY,
                ...date,
            })
            expect(firstPeriod.startDate).toEqual(firstPeriod.endDate)
            expect(firstPeriod.startDate).toEqual('2015-01-01')
        })
        it('should add start and end dates for YEARLY', () => {
            const periods = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.YEARLY,
                ...date,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-12-31')
            expect(periods[1]).toEqual('2014-01-01/2014-12-31')
            expect(periods[periods.length - 1]).toEqual('2006-01-01/2006-12-31')
        })
        it('should add start and end dates for FYNOV', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.FYNOV,
                year: 2005,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2005-11-01/2006-10-31')
            expect(periods[periods.length - 1]).toEqual('1996-11-01/1997-10-31')
        })
        it('should add start and end dates for FYOCT', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.FYOCT,
                year: 2005,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2005-10-01/2006-09-30')
            expect(periods[periods.length - 1]).toEqual('1996-10-01/1997-09-30')
        })
        it('should add start and end dates for WEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2013-12-30/2014-01-05')
            expect(periods[periods.length - 1]).toEqual('2014-12-22/2014-12-28')
        })
        it('should add start and end dates for WEEKLYSUN', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.WEEKLYSUN,
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2013-12-29/2014-01-04')
            expect(periods[periods.length - 1]).toEqual('2014-12-28/2015-01-03')
        })
        it('should add start and end dates for BIWEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.BIWEEKLY,
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2013-12-30/2014-01-12')
            expect(periods[periods.length - 1]).toEqual('2014-12-15/2014-12-28')
        })
        it('should add start and end dates for MONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-01-31')
            expect(periods[1]).toEqual('2015-02-01/2015-02-28')
            expect(periods[periods.length - 1]).toEqual('2015-12-01/2015-12-31')
        })
        it('should add start and end dates for SIXMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-06-30')
            expect(periods[periods.length - 1]).toEqual('2015-07-01/2015-12-31')
        })
        it('should add start and end dates for SIXMONTHLYAPR', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYAPR,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-04-01/2015-09-30')
            expect(periods[periods.length - 1]).toEqual('2015-10-01/2016-03-31')
        })
        it('should add start and end dates for QUARTERLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.QUARTERLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-03-31')
            expect(periods[periods.length - 1]).toEqual('2015-10-01/2015-12-31')
        })
        it('should add start and end dates for BIMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.BIMONTHLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-02-28')
            expect(periods[periods.length - 1]).toEqual('2015-11-01/2015-12-31')
        })
    })
})
