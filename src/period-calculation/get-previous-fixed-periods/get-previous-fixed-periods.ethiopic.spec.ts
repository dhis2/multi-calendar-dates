import { parseFixedPeriodId } from '../parse-fixed-period-id/index'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'
import getPreviousFixedPeriods from './get-previous-fixed-periods'

describe('Ethiopic Calendar previous periods calculation', () => {
    describe('unknown period type', () => {
        it('should throw an error when the period type is unknown', () => {
            expect(() => {
                getPreviousFixedPeriods({
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
                    'can not generate period for unrecognised period type "DOES NOT EXIST"'
                )
            )
        })
    })

    describe('period type: DAILY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '20150101',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '20150101',
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
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '20150102',
                    calendar: 'ethiopic',
                }),
                count: 3,
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: 'Pagumen 4, 2014 ERA0',
                    displayName: 'Pagumen 4, 2014 ERA0',
                    id: '20141304',
                    iso: '20141304',
                    startDate: '2014-13-04',
                    endDate: '2014-13-04',
                },
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
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015W1',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015W1',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: 'Week 52 - 2014-13-01 - 2015-01-02',
                    displayName: 'Week 52 - 2014-13-01 - 2015-01-02',
                    id: '2014W52',
                    iso: '2014W52',
                    startDate: '2014-13-01',
                    endDate: '2015-01-02',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015W2',
                    calendar: 'ethiopic',
                }),
                count: 54,
            })

            expect(actual).toHaveLength(54)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                name: 'Week 53 - 2013-13-02 - 2014-01-03',
                displayName: 'Week 53 - 2013-13-02 - 2014-01-03',
                id: '2013W53',
                iso: '2013W53',
                startDate: '2013-13-02',
                endDate: '2014-01-03',
            })
            expect(actual[53]).toEqual({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                name: 'Week 1 - 2015-01-03 - 2015-01-09',
                displayName: 'Week 1 - 2015-01-03 - 2015-01-09',
                id: '2015W1',
                iso: '2015W1',
                endDate: '2015-01-09',
                startDate: '2015-01-03',
            })
        })
    })

    describe('period type: MONTHLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '201501',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '201501',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'Nehasse 2014',
                    displayName: 'Nehasse 2014',
                    id: '201412',
                    iso: '201412',
                    endDate: '2014-12-30',
                    startDate: '2014-12-01',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '201502',
                    calendar: 'ethiopic',
                }),
                count: 14,
            })

            expect(actual).toHaveLength(14)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Nehasse 2013',
                displayName: 'Nehasse 2013',
                id: '201312',
                iso: '201312',
                startDate: '2013-12-01',
                endDate: '2013-12-30',
            })
            expect(actual[13]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Meskerem 2015',
                displayName: 'Meskerem 2015',
                id: '201501',
                iso: '201501',
                startDate: '2015-01-01',
                endDate: '2015-01-30',
            })
        })
    })

    describe('period type: YEARLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'ethiopic',
                period: parseFixedPeriodId({
                    periodId: '2015',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2014',
                    displayName: '2014',
                    id: '2014',
                    iso: '2014',
                    startDate: '2014-01-01',
                    endDate: '2014-13-05',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
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
                    name: '2014',
                    displayName: '2014',
                    id: '2014',
                    iso: '2014',
                    startDate: '2014-01-01',
                    endDate: '2014-13-05',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2013',
                    displayName: '2013',
                    id: '2013',
                    iso: '2013',
                    startDate: '2013-01-01',
                    endDate: '2013-13-05',
                },
            ])
        })
    })
})
