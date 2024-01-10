import { SupportedCalendar } from '../../types'
import generateFixedPeriods from './generate-fixed-periods'

describe('Gregorian Calendar fixed period calculation', () => {
    describe('daily periods', () => {
        it('should omit every period on/after the exclude date', () => {
            const results = generateFixedPeriods({
                periodType: 'DAILY',
                year: 2023,
                calendar: 'gregory',
                locale: 'en',
                endsBefore: '2023-03-03',
            })

            expect(results.length).toBe(61)
            expect(results[0]).toMatchObject({
                periodType: 'DAILY',
                name: '2023-01-01',
                displayName: 'January 1, 2023',
                id: '20230101',
                iso: '20230101',
                startDate: '2023-01-01',
                endDate: '2023-01-01',
            })
            expect(results[results.length - 1]).toMatchObject({
                periodType: 'DAILY',
                name: '2023-03-02',
                displayName: 'March 2, 2023',
                id: '20230302',
                iso: '20230302',
                startDate: '2023-03-02',
                endDate: '2023-03-02',
            })
        })

        it('should generate all daily periods for a year', () => {
            const results = generateFixedPeriods({
                periodType: 'DAILY',
                year: 2023,
                calendar: 'gregory',
                locale: 'en',
            })

            expect(results.length).toBe(365)
            expect(results[0]).toMatchObject({
                periodType: 'DAILY',
                name: '2023-01-01',
                displayName: 'January 1, 2023',
                id: '20230101',
                iso: '20230101',
                startDate: '2023-01-01',
                endDate: '2023-01-01',
            })
            expect(results[results.length - 1]).toMatchObject({
                periodType: 'DAILY',
                name: '2023-12-31',
                displayName: 'December 31, 2023',
                id: '20231231',
                iso: '20231231',
                startDate: '2023-12-31',
                endDate: '2023-12-31',
            })
        })
    })

    describe('weekly periods', () => {
        it('should omit every period on/after the exclude date', () => {
            const results = generateFixedPeriods({
                periodType: 'WEEKLY',
                year: 2014,
                calendar: 'gregory',
                locale: 'en',
                endsBefore: '2014-07-12',
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
                displayName: 'Week 52 - 2014-12-22 - 2014-12-28',
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

    describe('all monthly periods', () => {
        describe('periodType: MONTHLY', () => {
            it('should omit every period on/after the exclude date', () => {
                const results = generateFixedPeriods({
                    periodType: 'MONTHLY',
                    year: 2014,
                    calendar: 'gregory',
                    locale: 'en',
                    endsBefore: '2014-07-12',
                })

                expect(results.length).toBe(6)
                expect(results[0]).toMatchObject({
                    periodType: 'MONTHLY',
                    id: '201401',
                    iso: '201401',
                    name: 'January 2014',
                    displayName: 'January 2014',
                    startDate: '2014-01-01',
                    endDate: '2014-01-31',
                })
                expect(results[results.length - 1]).toMatchObject({
                    periodType: 'MONTHLY',
                    id: '201406',
                    iso: '201406',
                    name: 'June 2014',
                    displayName: 'June 2014',
                    startDate: '2014-06-01',
                    endDate: '2014-06-30',
                })
            })

            it('should omit every period on/after the exclude date', () => {
                const results = generateFixedPeriods({
                    periodType: 'MONTHLY',
                    year: 2014,
                    calendar: 'gregory',
                    locale: 'en',
                })

                expect(results.length).toBe(12)
                expect(results[0]).toMatchObject({
                    periodType: 'MONTHLY',
                    id: '201401',
                    iso: '201401',
                    name: 'January 2014',
                    displayName: 'January 2014',
                    startDate: '2014-01-01',
                    endDate: '2014-01-31',
                })
                expect(results[results.length - 1]).toMatchObject({
                    periodType: 'MONTHLY',
                    id: '201412',
                    iso: '201412',
                    name: 'December 2014',
                    displayName: 'December 2014',
                    startDate: '2014-12-01',
                    endDate: '2014-12-31',
                })
            })
        })

        describe('periodType: SIXMONTHLYAPR', () => {
            it('should return only one period due to "endsBefore"', () => {
                const results = generateFixedPeriods({
                    periodType: 'SIXMONTHLYAPR',
                    year: 2014,
                    calendar: 'gregory',
                    locale: 'en',
                    endsBefore: '2014-11-12',
                })

                expect(results.length).toBe(1)
                expect(results[0]).toMatchObject({
                    periodType: 'SIXMONTHLYAPR',
                    id: '2014AprilS1',
                    iso: '2014AprilS1',
                    name: 'April - September 2014',
                    displayName: 'April - September 2014',
                    startDate: '2014-04-01',
                    endDate: '2014-09-30',
                })
            })

            it('should generate all periods for a year', () => {
                const results = generateFixedPeriods({
                    periodType: 'SIXMONTHLYAPR',
                    year: 2014,
                    calendar: 'gregory',
                    locale: 'en',
                })

                expect(results.length).toBe(2)
                expect(results[0]).toMatchObject({
                    periodType: 'SIXMONTHLYAPR',
                    id: '2014AprilS1',
                    iso: '2014AprilS1',
                    name: 'April - September 2014',
                    displayName: 'April - September 2014',
                    startDate: '2014-04-01',
                    endDate: '2014-09-30',
                })
                expect(results[1]).toMatchObject({
                    periodType: 'SIXMONTHLYAPR',
                    id: '2014AprilS2',
                    iso: '2014AprilS2',
                    name: 'October 2014 - March 2015',
                    displayName: 'October 2014 - March 2015',
                    startDate: '2014-10-01',
                    endDate: '2015-03-31',
                })
            })
        })
    })

    describe('year period types', () => {
        const gregorianDate = {
            year: 2015,
            calendar: 'gregory' as SupportedCalendar,
            locale: 'en',
        }

        it('should return all years until 1970 when passing "undefined" as yearsCount', () => {
            const result = generateFixedPeriods({
                periodType: 'YEARLY',
                ...gregorianDate,
                yearsCount: null,
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

        it('should build the label for Financial Year November properly', () => {
            const result = generateFixedPeriods({
                ...gregorianDate,
                periodType: 'FYNOV',
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
                periodType: 'FYAPR',
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
                periodType: 'YEARLY',
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
                calendar: 'gregory' as const,
                locale: 'en',
                startingDay: 1,
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
