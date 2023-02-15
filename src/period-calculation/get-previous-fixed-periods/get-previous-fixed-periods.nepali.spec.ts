import { parseFixedPeriodId } from '../parse-fixed-period-id/index'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'
import getPreviousFixedPeriods from './get-previous-fixed-periods'

describe('Nepali Calendar previous periods calculation', () => {
    describe('unknown period type', () => {
        it('should throw an error when the period type is unknown', () => {
            expect(() => {
                getPreviousFixedPeriods({
                    calendar: 'nepali',
                    period: {
                        periodType: 'DOES NOT EXIST' as PeriodIdentifier,
                        name: '2079-01-01',
                        displayName: '2079-01-01',
                        id: '20790101',
                        iso: '20790101',
                        startDate: '2079-01-01',
                        endDate: '2079-01-01',
                    },
                })
            }).toThrow(
                new Error(
                    'can not generate period for unrecognised period type "DOES NOT EXIST"'
                )
            )
        })
    })

    describe('period type: DAILY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '20790101',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '20790101',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '30-12-2078',
                    displayName: '30-12-2078',
                    id: '20781230',
                    iso: '20781230',
                    startDate: '2078-12-30',
                    endDate: '2078-12-30',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '20790102',
                    calendar: 'nepali',
                }),
                count: 3,
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '29-12-2078',
                    displayName: '29-12-2078',
                    id: '20781229',
                    iso: '20781229',
                    startDate: '2078-12-29',
                    endDate: '2078-12-29',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '30-12-2078',
                    displayName: '30-12-2078',
                    id: '20781230',
                    iso: '20781230',
                    startDate: '2078-12-30',
                    endDate: '2078-12-30',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '1-1-2079',
                    displayName: '1-1-2079',
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
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079W1',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079W1',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: 'Week 52 - 2078-12-21 - 2078-12-27',
                    displayName: 'Week 52 - 2078-12-21 - 2078-12-27',
                    id: '2078W52',
                    iso: '2078W52',
                    startDate: '2078-12-21',
                    endDate: '2078-12-27',
                },
            ]

            expect(actual.length).toBe(1)
            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079W2',
                    calendar: 'nepali',
                }),
                count: 54,
            })

            expect(actual).toHaveLength(54)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                name: 'Week 52 - 2077-12-23 - 2077-12-29',
                displayName: 'Week 52 - 2077-12-23 - 2077-12-29',
                id: '2077W52',
                iso: '2077W52',
                startDate: '2077-12-23',
                endDate: '2077-12-29',
            })
            expect(actual[53]).toEqual({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
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
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '207901',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '207901',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'Chaitra 2078',
                    displayName: 'Chaitra 2078',
                    id: '207812',
                    iso: '207812',
                    startDate: '2078-12-01',
                    endDate: '2078-12-30',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '207902',
                    calendar: 'nepali',
                }),
                count: 14,
            })

            expect(actual).toHaveLength(14)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Chaitra 2077',
                displayName: 'Chaitra 2077',
                id: '207712',
                iso: '207712',
                startDate: '2077-12-01',
                endDate: '2077-12-31',
            })
            expect(actual[13]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
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
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2078',
                    displayName: '2078',
                    id: '2078',
                    iso: '2078',
                    startDate: '2078-01-01',
                    endDate: '2078-12-30',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079',
                    calendar: 'nepali',
                }),
                count: 2,
            })

            expect(actual).toEqual([
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2078',
                    displayName: '2078',
                    id: '2078',
                    iso: '2078',
                    startDate: '2078-01-01',
                    endDate: '2078-12-30',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
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
