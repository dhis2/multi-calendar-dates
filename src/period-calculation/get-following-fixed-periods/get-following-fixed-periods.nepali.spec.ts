import { parseFixedPeriodId } from '../parse-fixed-period-id/index'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'
import getFollowingFixedPeriods from './get-following-fixed-periods'

describe('Nepali Calendar following periods calculation', () => {
    describe('unknown period type', () => {
        it('should throw an error when the period type is unknown', () => {
            expect(() => {
                getFollowingFixedPeriods({
                    calendar: 'nepali',
                    period: {
                        periodType: 'DOES NOT EXIST' as PeriodIdentifier,
                        name: '2015-01-01',
                        displayName: '2015-01-01',
                        id: '20150101',
                        iso: '20150101',
                        startDate: '2015-01-01',
                        endDate: '2015-01-01',
                    },
                })
            }).toThrow(
                new Error(
                    'Can not generate following fixed period for unrecognised period type "DOES NOT EXIST"'
                )
            )
        })
    })

    describe('period type: DAILY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getFollowingFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '20790101',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '20790101',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2-1-2079',
                    displayName: '2-1-2079',
                    id: '20790102',
                    iso: '20790102',
                    startDate: '2079-01-02',
                    endDate: '2079-01-02',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '20781229',
                    calendar: 'nepali',
                }),
                count: 2,
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
            const actual = getFollowingFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079W1',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079W1',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
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

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2078W52',
                    calendar: 'nepali',
                }),
                count: 2,
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: 'Week 1 - 2078-12-28 - 2079-01-04',
                    displayName: 'Week 1 - 2078-12-28 - 2079-01-04',
                    id: '2079W1',
                    iso: '2079W1',
                    startDate: '2078-12-28',
                    endDate: '2079-01-04',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
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
    })

    describe('period type: MONTHLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getFollowingFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '207901',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '207901',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'Jestha 2079',
                    displayName: 'Jestha 2079',
                    id: '207902',
                    iso: '207902',
                    startDate: '2079-02-01',
                    endDate: '2079-02-31',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '207901',
                    calendar: 'nepali',
                }),
                count: 24,
            })

            expect(actual).toHaveLength(24)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Jestha 2079',
                displayName: 'Jestha 2079',
                id: '207902',
                iso: '207902',
                startDate: '2079-02-01',
                endDate: '2079-02-31',
            })
            expect(actual[23]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Baisakh 2081',
                displayName: 'Baisakh 2081',
                id: '208101',
                iso: '208101',
                startDate: '2081-01-01',
                endDate: '2081-01-31',
            })
        })
    })

    describe('period type: YEARLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getFollowingFixedPeriods({
                count: 0,
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079',
                    calendar: 'nepali',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'nepali',
                period: parseFixedPeriodId({
                    periodId: '2079',
                    calendar: 'nepali',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2080',
                    displayName: '2080',
                    id: '2080',
                    iso: '2080',
                    startDate: '2080-01-01',
                    endDate: '2080-12-30',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
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
                    name: '2080',
                    displayName: '2080',
                    id: '2080',
                    iso: '2080',
                    startDate: '2080-01-01',
                    endDate: '2080-12-30',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2081',
                    displayName: '2081',
                    id: '2081',
                    iso: '2081',
                    startDate: '2081-01-01',
                    endDate: '2081-12-30',
                },
            ])
        })
    })
})
