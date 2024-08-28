import { createFixedPeriodFromPeriodId } from '../create-fixed-period-from-period-id/index'
import getAdjacentFixedPeriods from './get-adjacent-fixed-periods'

describe('Nepali/getAdjacentFixedPeriods', () => {
    describe('period type: DAILY', () => {
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '20781229',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2078-12-30',
                    displayName: '2078-12-30',
                    id: '20781230',
                    iso: '20781230',
                    startDate: '2078-12-30',
                    endDate: '2078-12-30',
                },
                {
                    periodType: 'DAILY',
                    name: '2079-01-01',
                    displayName: '2079-01-01',
                    id: '20790101',
                    iso: '20790101',
                    startDate: '2079-01-01',
                    endDate: '2079-01-01',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the previous and the current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '20790102',
                    calendar: 'nepali',
                }),
                steps: -3,
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2078-12-29',
                    displayName: '2078-12-29',
                    id: '20781229',
                    iso: '20781229',
                    startDate: '2078-12-29',
                    endDate: '2078-12-29',
                },
                {
                    periodType: 'DAILY',
                    name: '2078-12-30',
                    displayName: '2078-12-30',
                    id: '20781230',
                    iso: '20781230',
                    startDate: '2078-12-30',
                    endDate: '2078-12-30',
                },
                {
                    periodType: 'DAILY',
                    name: '2079-01-01',
                    displayName: '2079-01-01',
                    id: '20790101',
                    iso: '20790101',
                    startDate: '2079-01-01',
                    endDate: '2079-01-01',
                },
            ]

            expect(actual).toEqual(expected)
        })
    })

    describe('period type: WEEKLY', () => {
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2078W52',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: 'WEEKLY',
                    name: 'Week 1 - 2078-12-28 - 2079-01-04',
                    displayName: 'Week 1 - 2078-12-28 - 2079-01-04',
                    id: '2079W1',
                    iso: '2079W1',
                    startDate: '2078-12-28',
                    endDate: '2079-01-04',
                },
                {
                    periodType: 'WEEKLY',
                    name: 'Week 2 - 2079-01-05 - 2079-01-11',
                    displayName: 'Week 2 - 2079-01-05 - 2079-01-11',
                    id: '2079W2',
                    iso: '2079W2',
                    startDate: '2079-01-05',
                    endDate: '2079-01-11',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the two previous and current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2079W2',
                    calendar: 'nepali',
                }),
                steps: -54,
            })

            expect(actual).toHaveLength(54)
            expect(actual[0]).toEqual({
                periodType: 'WEEKLY',
                name: 'Week 52 - 2077-12-23 - 2077-12-29',
                displayName: 'Week 52 - 2077-12-23 - 2077-12-29',
                id: '2077W52',
                iso: '2077W52',
                startDate: '2077-12-23',
                endDate: '2077-12-29',
            })
            expect(actual[53]).toEqual({
                periodType: 'WEEKLY',
                name: 'Week 1 - 2078-12-28 - 2079-01-04',
                displayName: 'Week 1 - 2078-12-28 - 2079-01-04',
                id: '2079W1',
                iso: '2079W1',
                startDate: '2078-12-28',
                endDate: '2079-01-04',
            })
        })
    })

    describe('period type: MONTHLY', () => {
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 24,
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '207901',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toHaveLength(24)
            expect(actual[0]).toEqual({
                periodType: 'MONTHLY',
                name: 'Jestha 2079',
                displayName: 'Jestha 2079',
                id: '207902',
                iso: '207902',
                startDate: '2079-02-01',
                endDate: '2079-02-31',
            })
            expect(actual[23]).toEqual({
                periodType: 'MONTHLY',
                name: 'Baisakh 2081',
                displayName: 'Baisakh 2081',
                id: '208101',
                iso: '208101',
                startDate: '2081-01-01',
                endDate: '2081-01-31',
            })
        })

        it('should return some periods of the two previous and current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '207902',
                    calendar: 'nepali',
                }),
                steps: -14,
            })

            expect(actual).toHaveLength(14)
            expect(actual[0]).toEqual({
                periodType: 'MONTHLY',
                name: 'Chaitra 2077',
                displayName: 'Chaitra 2077',
                id: '207712',
                iso: '207712',
                startDate: '2077-12-01',
                endDate: '2077-12-31',
            })
            expect(actual[13]).toEqual({
                periodType: 'MONTHLY',
                name: 'Baisakh 2079',
                displayName: 'Baisakh 2079',
                id: '207901',
                iso: '207901',
                startDate: '2079-01-01',
                endDate: '2079-01-31',
            })
        })
    })

    describe('period type: YEARLY', () => {
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2079',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([
                {
                    periodType: 'YEARLY',
                    name: '2080',
                    displayName: '2080',
                    id: '2080',
                    iso: '2080',
                    startDate: '2080-01-01',
                    endDate: '2080-12-30',
                },
                {
                    periodType: 'YEARLY',
                    name: '2081',
                    displayName: '2081',
                    id: '2081',
                    iso: '2081',
                    startDate: '2081-01-01',
                    endDate: '2081-12-31',
                },
            ])
        })

        it('should return periods of the two previous years', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'nepali',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2079',
                    calendar: 'nepali',
                }),
                steps: -2,
            })

            expect(actual).toEqual([
                {
                    periodType: 'YEARLY',
                    name: '2078',
                    displayName: '2078',
                    id: '2078',
                    iso: '2078',
                    startDate: '2078-01-01',
                    endDate: '2078-12-30',
                },
                {
                    periodType: 'YEARLY',
                    name: '2077',
                    displayName: '2077',
                    id: '2077',
                    iso: '2077',
                    startDate: '2077-01-01',
                    endDate: '2077-12-31',
                },
            ])
        })
    })
})
