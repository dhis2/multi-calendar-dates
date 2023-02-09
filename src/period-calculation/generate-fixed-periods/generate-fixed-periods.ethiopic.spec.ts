import { SupportedCalendar } from '../../types'
import { FIXED_PERIOD_TYPES } from '../period-types'
import generateFixedPeriods from './generate-fixed-periods'

describe('Ethiopic Calendar fixed period calculation', () => {
    describe('weekly periods', () => {
        it('should respect starting day', () => {
            const resultStartingMonday = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                year: 2015,
                calendar: 'ethiopic',
                locale: 'en',
                startingDay: 1,
            })
            const resultStartingTuesday = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                year: 2015,
                calendar: 'ethiopic',
                locale: 'en',
                startingDay: 2,
            })

            expect(resultStartingMonday[0]).not.toEqual(
                resultStartingTuesday[0]
            )
        })
    })

    describe('financial year', () => {
        const date = {
            year: 2015,
            calendar: 'ethiopic' as SupportedCalendar,
            locale: 'en',
        }
        it('should build the label for Financial Year November properly', () => {
            const result = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.FYNOV,
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2015Nov',
                name: 'Hamle 2015 - Sene 2016',
                displayName: 'Hamle 2015 - Sene 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '1963Nov',
                name: 'Hamle 1963 - Sene 1964',
                displayName: 'Hamle 1963 - Sene 1964',
            })
        })

        it('should build the label for Financial Year April properly', () => {
            const result = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.FYAPR,
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2015April',
                name: 'Tahsas 2015 - Hedar 2016',
                displayName: 'Tahsas 2015 - Hedar 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '1970April',
                name: 'Tahsas 1970 - Hedar 1971',
                displayName: 'Tahsas 1970 - Hedar 1971',
            })
        })

        it('should build the label for Financial Year properly', () => {
            const result = generateFixedPeriods({
                periodType: FIXED_PERIOD_TYPES.YEARLY,
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2015',
                iso: '2015',
                name: '2015',
                displayName: '2015',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '1970',
                iso: '1970',
                name: '1970',
                displayName: '1970',
            })
        })
    })

    describe('start and end dates', () => {
        const date = {
            year: 2015,
            calendar: 'ethiopic' as const,
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
            expect(periods[0]).toEqual('2015-01-01/2015-13-06')
            expect(periods[1]).toEqual('2014-01-01/2014-13-05')
            expect(periods[periods.length - 1]).toEqual('1970-01-01/1970-13-05')
        })
        it('should add start and end dates for FYNOV', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.FYNOV,
                year: 2015,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-11-01/2016-10-30')
            expect(periods[periods.length - 1]).toEqual('1970-11-01/1971-10-30')
        })
        it('should add start and end dates for WEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2014-01-04/2014-01-10')
            expect(periods[periods.length - 1]).toEqual('2014-13-01/2015-01-02')
        })
        it('should add start and end dates for WEEKLYSUN', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.WEEKLYWED,
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(52)
            expect(periods[0]).toEqual('2013-13-04/2014-01-05') // starts from month Pagamen (13) as it should
            expect(periods[periods.length - 1]).toEqual('2014-12-26/2014-13-02')
        })
        it('should add start and end dates for BIWEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.BIWEEKLY,
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(26)
            expect(periods[0]).toEqual('2014-01-04/2014-01-17')
            expect(periods[periods.length - 1]).toEqual('2014-12-24/2015-01-02')
        })
        it('should add start and end dates for MONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(12) // 13th month is ignored
            expect(periods[0]).toEqual('2015-01-01/2015-01-30')
            expect(periods[1]).toEqual('2015-02-01/2015-02-30')
            expect(periods[periods.length - 2]).toEqual('2015-11-01/2015-11-30')
            // todo: check with Abyot what to do with the 13th month
            expect(periods[periods.length - 1]).toEqual('2015-12-01/2015-12-30')
        })
        it('should add start and end dates for SIXMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-06-30')
            // todo: check with Abyot where the 13th month go in SIXMONTHLY
            // expect(periods[periods.length - 1]).toEqual("2015-07-01/2015-12-30");
        })
        it('should add start and end dates for SIXMONTHLYAPR', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYAPR,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(2)
            expect(periods[0]).toEqual('2015-04-01/2015-09-30')
            // todo: ignore the 13th month here ¬
            // expect(periods[periods.length - 1]).toEqual("2015-10-01/2016-03-30");
        })
        it('should add start and end dates for QUARTERLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.QUARTERLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-03-30')
            // todo: check with Abyot where the 13th month go in QUARTERLY
            expect(periods[periods.length - 1]).toEqual('2015-10-01/2015-12-30')
        })

        it('should add start and end dates for BIMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: FIXED_PERIOD_TYPES.BIMONTHLY,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-02-30')
            // todo: check with Abyot if we want the 13th month as part of the end date
            // expect(periods[periods.length - 1]).toEqual("2015-11-01/2015-13-06");
        })
    })
})
