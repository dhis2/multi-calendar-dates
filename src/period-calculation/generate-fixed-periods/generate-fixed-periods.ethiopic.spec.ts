import { SupportedCalendar } from '../../types'
import generateFixedPeriods from './generate-fixed-periods'

describe('Ethiopic Calendar fixed period calculation', () => {
    describe('weekly periods', () => {
        it('should respect starting day', () => {
            const resultStartingMonday = generateFixedPeriods({
                periodType: 'WEEKLY',
                year: 2015,
                calendar: 'ethiopic',
                locale: 'en',
                startingDay: 1,
            })
            const resultStartingTuesday = generateFixedPeriods({
                periodType: 'WEEKLY',
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

    /**
     * As the ethiopic calendar years don't start on January 1,
     * when going back to 2006 in gregorian time, we'll end up somewhen in
     * 2006, not on 01-01-2007. To simplify things, we include 2006.
     */
    describe('year period types', () => {
        const date = {
            year: 2015,
            calendar: 'ethiopic' as SupportedCalendar,
            locale: 'en',
        }

        it('should return all years until 1962 when passing "undefined" as yearsCount', () => {
            const result = generateFixedPeriods({
                periodType: 'YEARLY',
                ...date,
                yearsCount: null,
            })

            expect(result[0]).toMatchObject({
                id: '2015',
                iso: '2015',
                name: '2015',
                displayName: '2015',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '1962',
                iso: '1962',
                name: '1962',
                displayName: '1962',
            })
        })

        it('should build the label for Financial Year November properly', () => {
            const result = generateFixedPeriods({
                periodType: 'FYNOV',
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2015Nov',
                name: 'Hamle 2015 - Sene 2016',
                displayName: 'Hamle 2015 - Sene 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006Nov',
                name: 'Hamle 2006 - Sene 2007',
                displayName: 'Hamle 2006 - Sene 2007',
            })
        })

        it('should build the label for Financial Year April properly', () => {
            const result = generateFixedPeriods({
                periodType: 'FYAPR',
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2015April',
                name: 'Tahsas 2015 - Hedar 2016',
                displayName: 'Tahsas 2015 - Hedar 2016',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2006April',
                name: 'Tahsas 2006 - Hedar 2007',
                displayName: 'Tahsas 2006 - Hedar 2007',
            })
        })

        it('should build the label for Financial Year properly', () => {
            const result = generateFixedPeriods({
                periodType: 'YEARLY',
                ...date,
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
            calendar: 'ethiopic' as const,
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
            expect(periods[0]).toEqual('2015-01-01/2015-13-06')
            expect(periods[1]).toEqual('2014-01-01/2014-13-05')
            expect(periods[periods.length - 1]).toEqual('2006-01-01/2006-13-05')
        })

        it('should add start and end dates for FYNOV', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'FYNOV',
                year: 2015,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-11-01/2016-10-30')
            expect(periods[periods.length - 1]).toEqual('2006-11-01/2007-10-30')
        })
        it('should add start and end dates for WEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'WEEKLY',
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2014-01-04/2014-01-10')
            expect(periods[periods.length - 1]).toEqual('2014-13-01/2015-01-02')
        })
        it('should add start and end dates for WEEKLYSUN', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'WEEKLYWED',
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(52)
            expect(periods[0]).toEqual('2013-13-04/2014-01-05') // starts from month Pagamen (13) as it should
            expect(periods[periods.length - 1]).toEqual('2014-12-26/2014-13-02')
        })
        it('should add start and end dates for BIWEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'BIWEEKLY',
                year: 2014,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(26)
            expect(periods[0]).toEqual('2014-01-04/2014-01-17')
            expect(periods[periods.length - 1]).toEqual('2014-12-24/2015-01-02')
        })
        it('should add start and end dates for MONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'MONTHLY',
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
                periodType: 'SIXMONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-06-30')
            // todo: check with Abyot where the 13th month go in SIXMONTHLY
            // expect(periods[periods.length - 1]).toEqual("2015-07-01/2015-12-30");
        })
        it('should add start and end dates for SIXMONTHLYAPR', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'SIXMONTHLYAPR',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(2)
            expect(periods[0]).toEqual('2015-04-01/2015-09-30')
            // @TODO(13th month): ignore the 13th month here ¬
            // expect(periods[periods.length - 1]).toEqual("2015-10-01/2016-03-30");
        })

        // @TODO(13th month): ignore the 13th month here ¬
        it.skip('should add start and end dates for SIXMONTHLYJUL', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'SIXMONTHLYJUL',
            })

            expect(periods).toEqual([
                {
                    periodType: 'SIXMONTHLYJUL',
                    name: 'Megabit - Nehasse 2015',
                    displayName: 'Megabit - Nehasse 2015',
                    id: '2015JulyS1',
                    iso: '2015JulyS1',
                    startDate: '2015-07-01',
                    endDate: '2015-12-30',
                },
                {
                    periodType: 'SIXMONTHLYJUL',
                    name: 'Yekatit - Hamle 2016',
                    displayName: 'Yekatit - Hamle 2016',
                    id: '2015JulyS2',
                    iso: '2015JulyS2',
                    startDate: '2016-13-01',
                    endDate: '2016-05-30',
                },
            ])
        })

        it('should add start and end dates for SIXMONTHLYNOV', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'SIXMONTHLYNOV',
            }).map((p) => `${p.startDate}/${p.endDate}`)

            expect(periods).toEqual([
                // @TODO(13th month): should this end in the third or fourth month?
                '2015-11-01/2016-03-30',
                '2016-04-01/2016-09-30',
            ])
        })

        it('should add start and end dates for QUARTERLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'QUARTERLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-03-30')

            // @TODO(13th month): check with Abyot where the 13th month go in QUARTERLY
            expect(periods[periods.length - 1]).toEqual('2015-10-01/2015-12-30')
        })

        it('should add start and end dates for QUARTERLYNOV', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'QUARTERLYNOV',
            }).map((p) => `${p.startDate}/${p.endDate}`)

            expect(periods).toEqual([
                '2015-11-01/2015-13-06',
                '2016-01-01/2016-03-30',
                '2016-04-01/2016-06-30',
                '2016-07-01/2016-09-30',
            ])
        })

        it('should add start and end dates for BIMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'BIMONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2015-01-01/2015-02-30')
            // todo: check with Abyot if we want the 13th month as part of the end date
            // expect(periods[periods.length - 1]).toEqual("2015-11-01/2015-13-06");
        })
    })
})
