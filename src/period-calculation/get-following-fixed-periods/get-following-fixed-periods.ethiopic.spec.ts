import { parseFixedPeriodId } from '../parse-fixed-period-id/index'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'
import getFollowingFixedPeriods from './get-following-fixed-periods'

describe('Ethiopic Calendar following periods calculation', () => {
    describe('unknown period type', () => {
        it('should throw an error when the period type is unknown', () => {
            expect(() => {
                getFollowingFixedPeriods({
                    calendar: 'ethiopic',
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
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '20150101',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '20150101',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: 'Meskerem 2, 2015 ERA0',
                    displayName: 'Meskerem 2, 2015 ERA0',
                    id: '20150102',
                    iso: '20150102',
                    startDate: '2015-01-02',
                    endDate: '2015-01-02',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                count: 2,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '20141304',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: 'Pagumen 5, 2014 ERA0',
                    displayName: 'Pagumen 5, 2014 ERA0',
                    id: '20141305',
                    iso: '20141305',
                    startDate: '2014-13-05',
                    endDate: '2014-13-05',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: 'Meskerem 1, 2015 ERA0',
                    displayName: 'Meskerem 1, 2015 ERA0',
                    id: '20150101',
                    iso: '20150101',
                    startDate: '2015-01-01',
                    endDate: '2015-01-01',
                },
            ]

            expect(actual).toEqual(expected)
        })
    })

    describe('period type: WEEKLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getFollowingFixedPeriods({
                count: 0,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015W1',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015W1',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: 'Weekly',
                    id: '2015W2',
                    iso: '2015W2',
                    name: 'Week 2 - 2015-01-10 - 2015-01-16',
                    displayName: 'Week 2 - 2015-01-10 - 2015-01-16',
                    startDate: '2015-01-10',
                    endDate: '2015-01-16',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2014W52',
                    calendar: 'ethiopic',
                }),
                count: 2,
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: 'Week 1 - 2015-01-03 - 2015-01-09',
                    displayName: 'Week 1 - 2015-01-03 - 2015-01-09',
                    id: '2015W1',
                    iso: '2015W1',
                    startDate: '2015-01-03',
                    endDate: '2015-01-09',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: 'Week 2 - 2015-01-10 - 2015-01-16',
                    displayName: 'Week 2 - 2015-01-10 - 2015-01-16',
                    id: '2015W2',
                    iso: '2015W2',
                    startDate: '2015-01-10',
                    endDate: '2015-01-16',
                },
            ]

            expect(actual).toEqual(expected)
        })
    })

    describe('period type: MONTHLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getFollowingFixedPeriods({
                count: 0,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '201501',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '201501',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'Tekemt 2015',
                    displayName: 'Tekemt 2015',
                    id: '201502',
                    iso: '201502',
                    startDate: '2015-02-01',
                    endDate: '2015-02-30',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '201501',
                    calendar: 'ethiopic',
                }),
                count: 24,
            })

            expect(actual).toHaveLength(24)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Tekemt 2015',
                displayName: 'Tekemt 2015',
                id: '201502',
                iso: '201502',
                startDate: '2015-02-01',
                endDate: '2015-02-30',
            })
            expect(actual[23]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Meskerem 2017',
                displayName: 'Meskerem 2017',
                id: '201701',
                iso: '201701',
                startDate: '2017-01-01',
                endDate: '2017-01-30',
            })
        })
    })

    describe('period type: YEARLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getFollowingFixedPeriods({
                count: 0,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2016',
                    displayName: '2016',
                    id: '2016',
                    iso: '2016',
                    startDate: '2016-01-01',
                    endDate: '2016-13-05',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015',
                    calendar: 'ethiopic',
                }),
                count: 2,
            })

            expect(actual).toEqual([
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2016',
                    displayName: '2016',
                    id: '2016',
                    iso: '2016',
                    startDate: '2016-01-01',
                    endDate: '2016-13-05',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2017',
                    displayName: '2017',
                    id: '2017',
                    iso: '2017',
                    startDate: '2017-01-01',
                    endDate: '2017-13-05',
                },
            ])
        })
    })
})
