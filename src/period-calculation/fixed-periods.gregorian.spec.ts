import { SupportedCalendar } from '../types'
import generateFixedPeriods from './fixed-periods'

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

    describe('localising the periods', () => {
        const date = {
            year: 2015,
            calendar: 'gregory' as const,
            startingDay: 1,
            periodType: 'MONTHLY' as const,
        }
        it('should accept a locale without a region specifier', () => {
            const periods = generateFixedPeriods({
                ...date,
                locale: 'fr',
            })
            expect(periods[0].name).toEqual('Janvier 2015')
        })

        it('should accept a locale with a region specifier', () => {
            const colombianSpanishperiods = generateFixedPeriods({
                ...date,
                locale: 'es-CO',
            })
            const genericSpanishPeriods = generateFixedPeriods({
                ...date,
                locale: 'es',
            })
            expect(colombianSpanishperiods[0].name).toEqual('Enero de 2015')
            expect(genericSpanishPeriods[0].name).toEqual('Enero de 2015')
        })
        it('should accept a locale if it uses underscore instead of dash as DHIS does', () => {
            const periods = generateFixedPeriods({
                ...date,
                locale: 'ar_TN', // DHIS sends underscore instead of hyphen
            })

            expect(periods[0].name).toEqual('جانفي 2015')
        })
        it('should fallback to english if a wrong locale is passed', () => {
            const periods = generateFixedPeriods({
                ...date,
                locale: 'xx_YY',
            })

            expect(periods[0].name).toEqual('January 2015')
        })
        it('should fallback to english if a no locale is passed', () => {
            const periods = generateFixedPeriods({
                ...date,
                locale: undefined,
            })

            expect(periods[0].name).toEqual('January 2015')
        })
    })

    describe('capitalising first letter (when the language allows it)', () => {
        const date = {
            year: 2015,
            calendar: 'gregory' as const,
            startingDay: 1,
            periodType: 'MONTHLY' as const,
        }
        it('should capitalise the first letter of a month', () => {
            const frenchPeriods = generateFixedPeriods({
                ...date,
                locale: 'fr',
            })
            const englishPeriods = generateFixedPeriods({
                ...date,
                locale: 'en',
            })
            const arabicPeriods = generateFixedPeriods({
                ...date,
                locale: 'ar-SD', // no capitals in Arabic
            })
            expect(englishPeriods[0].name).toEqual('January 2015')
            expect(frenchPeriods[0].name).toEqual('Janvier 2015')
            expect(arabicPeriods[0].name).toEqual('يناير ٢٠١٥')
        })

        it('should capitalise the first letter of a SIXMONTHLY periods', () => {
            const date = {
                year: 2015,
                calendar: 'gregory' as const,
                startingDay: 1,
                periodType: 'SIXMONTHLY' as const,
            }
            const frenchPeriods = generateFixedPeriods({
                ...date,
                locale: 'fr',
            })
            const englishPeriods = generateFixedPeriods({
                ...date,
                locale: 'en',
            })
            const arabicPeriods = generateFixedPeriods({
                ...date,
                locale: 'ar-SD', // no capitals in Arabic
            })
            expect(englishPeriods[0].name).toEqual('January - June 2015')
            expect(frenchPeriods[0].name).toEqual('Janvier - Juin 2015')
            expect(arabicPeriods[0].name).toEqual('يناير - يونيو ٢٠١٥')
        })
        it('should capitalise the first letter of a QUARTERLY periods', () => {
            const date = {
                year: 2015,
                calendar: 'gregory' as const,
                startingDay: 1,
                periodType: 'QUARTERLY' as const,
            }
            const frenchPeriods = generateFixedPeriods({
                ...date,
                locale: 'fr',
            })
            const englishPeriods = generateFixedPeriods({
                ...date,
                locale: 'en',
            })
            const arabicPeriods = generateFixedPeriods({
                ...date,
                locale: 'ar-SD', // no capitals in Arabic
            })
            expect(englishPeriods[0].name).toEqual('January - March 2015')
            expect(frenchPeriods[0].name).toEqual('Janvier - Mars 2015')
            expect(arabicPeriods[0].name).toEqual('يناير - مارس ٢٠١٥')
        })
    })
})
