import { SupportedCalendar } from '../types'
import { generateFixedPeriods } from './fixed-periods'

describe('Nepali Calendar fixed period calculation', () => {
    describe('financial year', () => {
        const date = {
            year: 2078,
            calendar: 'nepali' as SupportedCalendar,
            locale: 'en',
        }
        it('should build the label for Financial Year November properly', () => {
            const result = generateFixedPeriods({
                periodType: 'FYNOV',
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2078Nov',
                name: 'Falgun 2078 - Mangh 2079',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2069Nov',
                name: 'Falgun 2069 - Mangh 2070',
            })
        })

        it('should build the label for Financial Year April properly', () => {
            const result = generateFixedPeriods({
                periodType: 'FYAPR',
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2078April',
                name: 'Shrawan 2078 - Ashadh 2079',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2069April',
                name: 'Shrawan 2069 - Ashadh 2070',
            })
        })

        it('should build the label for Financial Year properly', () => {
            const result = generateFixedPeriods({
                periodType: 'YEARLY',
                ...date,
            })

            expect(result[0]).toMatchObject({
                id: '2078',
                iso: '2078',
                name: '2078',
            })

            expect(result[result.length - 1]).toMatchObject({
                id: '2069',
                iso: '2069',
                name: '2069',
            })
        })
    })

    describe('start and end dates', () => {
        const date = {
            year: 2079,
            calendar: 'nepali' as const,
            locale: 'en',
            startingDay: 1,
        }
        it('should add start and end dates for DAILY', () => {
            const [firstPeriod] = generateFixedPeriods({
                periodType: 'DAILY',
                ...date,
            })
            expect(firstPeriod.startDate).toEqual(firstPeriod.endDate)
            expect(firstPeriod.startDate).toEqual('2079-01-01')
        })
        it('should add start and end dates for YEARLY', () => {
            const periods = generateFixedPeriods({
                periodType: 'YEARLY',
                ...date,
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2079-01-01/2079-12-30')
            expect(periods[1]).toEqual('2078-01-01/2078-12-30')
            expect(periods[2]).toEqual('2077-01-01/2077-12-31') // 2077 ends on the 31st not 30th
            expect(periods[periods.length - 1]).toEqual('2070-01-01/2070-12-30')
        })
        it('should add start and end dates for FYNOV', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'FYNOV',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2079-11-01/2080-10-29')
            expect(periods[3]).toEqual('2076-11-01/2077-10-30') // 2077 has 30 days in the 10th month
            expect(periods[periods.length - 1]).toEqual('2070-11-01/2071-10-29')
        })
        it('should add start and end dates for WEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'WEEKLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2078-12-28/2079-01-04')
            expect(periods[periods.length - 1]).toEqual('2079-12-27/2080-01-03')
        })
        it('should add start and end dates for WEEKLYSUN', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'WEEKLYWED',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(52)
            expect(periods[0]).toEqual('2078-12-30/2079-01-06')
            expect(periods[periods.length - 1]).toEqual('2079-12-22/2079-12-28')
        })
        it('should add start and end dates for BIWEEKLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'BIWEEKLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(26)
            expect(periods[0]).toEqual('2078-12-28/2079-01-11')
            expect(periods[periods.length - 1]).toEqual('2079-12-13/2079-12-26')
        })
        it('should add start and end dates for MONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'MONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(12)
            expect(periods[0]).toEqual('2079-01-01/2079-01-31')
            expect(periods[1]).toEqual('2079-02-01/2079-02-31')
            expect(periods[periods.length - 2]).toEqual('2079-11-01/2079-11-30')
            expect(periods[periods.length - 1]).toEqual('2079-12-01/2079-12-30')
        })
        it('should add start and end dates for SIXMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'SIXMONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2079-01-01/2079-06-31')
            expect(periods[periods.length - 1]).toEqual('2079-07-01/2079-12-30')
        })
        it('should add start and end dates for SIXMONTHLYAPR', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'SIXMONTHLYAPR',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods.length).toEqual(2)
            expect(periods[0]).toEqual('2079-04-01/2079-09-30')
            expect(periods[periods.length - 1]).toEqual('2079-10-01/2080-03-31')
        })
        it('should add start and end dates for QUARTERLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'QUARTERLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2079-01-01/2079-03-32')
            expect(periods[periods.length - 1]).toEqual('2079-10-01/2079-12-30')
        })
        it('should add start and end dates for BIMONTHLY', () => {
            const periods = generateFixedPeriods({
                ...date,
                periodType: 'BIMONTHLY',
            }).map((p) => `${p.startDate}/${p.endDate}`)
            expect(periods[0]).toEqual('2079-01-01/2079-02-31')
            expect(periods[periods.length - 1]).toEqual('2079-11-01/2079-12-30')
        })
    })
})
