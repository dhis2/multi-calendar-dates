import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'
import getPreviousFixedPeriods from './get-previous-fixed-periods'

describe('Gregorian Calendar previous periods calculation', () => {
    describe('unknown period type', () => {
        it('should throw an error when the period type is unknown', () => {
            expect(() => {
                getPreviousFixedPeriods({
                    calendar: 'gregory',
                    period: {
                        periodType: 'DOES NOT EXIST' as PeriodIdentifier,
                        name: '2023-01-01',
                        displayName: '2023-01-01',
                        id: '20230101',
                        iso: '20230101',
                        startDate: '2023-01-01',
                        endDate: '2023-01-01',
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
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2023-01-01',
                    displayName: '2023-01-01',
                    id: '20230101',
                    iso: '20230101',
                    startDate: '2023-01-01',
                    endDate: '2023-01-01',
                },
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2023-01-01',
                    displayName: '2023-01-01',
                    id: '20230101',
                    iso: '20230101',
                    startDate: '2023-01-01',
                    endDate: '2023-01-01',
                },
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2022-12-31',
                    displayName: '2022-12-31',
                    id: '20221231',
                    iso: '20221231',
                    startDate: '2022-12-31',
                    endDate: '2022-12-31',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2023-01-02',
                    displayName: '2023-01-02',
                    id: '20230102',
                    iso: '20230102',
                    startDate: '2023-01-02',
                    endDate: '2023-01-02',
                },
                count: 3,
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2022-12-30',
                    displayName: '2022-12-30',
                    id: '20221230',
                    iso: '20221230',
                    startDate: '2022-12-30',
                    endDate: '2022-12-30',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2022-12-31',
                    displayName: '2022-12-31',
                    id: '20221231',
                    iso: '20221231',
                    startDate: '2022-12-31',
                    endDate: '2022-12-31',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.DAILY,
                    name: '2023-01-01',
                    displayName: '2023-01-01',
                    id: '20230101',
                    iso: '20230101',
                    startDate: '2023-01-01',
                    endDate: '2023-01-01',
                },
            ]

            expect(actual).toEqual(expected)
        })
    })

    describe('period type: WEEKLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: '2023-01-02',
                    displayName: '2023-01-02',
                    id: '2023W1',
                    iso: '2023W1',
                    startDate: '2023-01-02',
                    endDate: '2023-01-08',
                },
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: '2023-01-02',
                    displayName: '2023-01-02',
                    id: '2023W1',
                    iso: '2023W1',
                    startDate: '2023-01-02',
                    endDate: '2023-01-08',
                },
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: 'Week 52 - 2022-12-26 - 2023-01-01',
                    displayName: 'Week 52 - 2022-12-26 - 2023-01-01',
                    id: '2022W52',
                    iso: '2022W52',
                    startDate: '2022-12-26',
                    endDate: '2023-01-01',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.WEEKLY,
                    name: 'Week 2 - 2023-01-09 - 2023-01-15',
                    displayName: 'Week 2 - 2023-01-09 - 2023-01-15',
                    id: '2023W2',
                    iso: '2023W2',
                    startDate: '2023-01-09',
                    endDate: '2023-01-15',
                },
                count: 54,
            })

            expect(actual).toHaveLength(54)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                name: 'Week 52 - 2021-12-27 - 2022-01-02',
                displayName: 'Week 52 - 2021-12-27 - 2022-01-02',
                id: '2021W52',
                iso: '2021W52',
                startDate: '2021-12-27',
                endDate: '2022-01-02',
            })
            expect(actual[53]).toEqual({
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                name: 'Week 1 - 2023-01-02 - 2023-01-08',
                displayName: 'Week 1 - 2023-01-02 - 2023-01-08',
                id: '2023W1',
                iso: '2023W1',
                startDate: '2023-01-02',
                endDate: '2023-01-08',
            })
        })
    })

    describe('period type: MONTHLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'January 2023',
                    displayName: 'January 2023',
                    id: '202301',
                    iso: '202301',
                    startDate: '2023-01-01',
                    endDate: '2023-01-31',
                },
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'January 2023',
                    displayName: 'January 2023',
                    id: '202301',
                    iso: '202301',
                    startDate: '2023-01-01',
                    endDate: '2023-01-31',
                },
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'December 2022',
                    displayName: 'December 2022',
                    id: '202212',
                    iso: '202212',
                    startDate: '2022-12-01',
                    endDate: '2022-12-31',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.MONTHLY,
                    name: 'February 2023',
                    displayName: 'February 2023',
                    id: '202302',
                    iso: '202302',
                    startDate: '2023-02-01',
                    endDate: '2023-01-28',
                },
                count: 14,
            })

            expect(actual).toHaveLength(14)
            expect(actual[0]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'December 2021',
                displayName: 'December 2021',
                id: '202112',
                iso: '202112',
                startDate: '2021-12-01',
                endDate: '2021-12-31',
            })
            expect(actual[13]).toEqual({
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'January 2023',
                displayName: 'January 2023',
                id: '202301',
                iso: '202301',
                startDate: '2023-01-01',
                endDate: '2023-01-31',
            })
        })
    })

    describe('period type: YEARLY', () => {
        it('should return an empty collection when count is 0', () => {
            const actual = getPreviousFixedPeriods({
                count: 0,
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2023',
                    displayName: '2023',
                    id: '2023',
                    iso: '2023',
                    startDate: '2023-01-01',
                    endDate: '2023-12-31',
                },
            })

            expect(actual).toEqual([])
        })

        it('should return one previous period by default', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2023',
                    displayName: '2023',
                    id: '2023',
                    iso: '2023',
                    startDate: '2023-01-01',
                    endDate: '2023-12-31',
                },
            })

            const expected = [
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2022',
                    displayName: '2022',
                    id: '2022',
                    iso: '2022',
                    startDate: '2022-01-01',
                    endDate: '2022-12-31',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getPreviousFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2023',
                    displayName: '2023',
                    id: '2023',
                    iso: '2023',
                    startDate: '2023-01-01',
                    endDate: '2023-12-31',
                },
                count: 2,
            })

            expect(actual).toEqual([
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2022',
                    displayName: '2022',
                    id: '2022',
                    iso: '2022',
                    startDate: '2022-01-01',
                    endDate: '2022-12-31',
                },
                {
                    periodType: FIXED_PERIOD_TYPES.YEARLY,
                    name: '2021',
                    displayName: '2021',
                    id: '2021',
                    iso: '2021',
                    startDate: '2021-01-01',
                    endDate: '2021-12-31',
                },
            ])
        })
    })
})
