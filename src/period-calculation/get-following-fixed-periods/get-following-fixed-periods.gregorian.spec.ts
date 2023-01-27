import { PeriodIdentifier } from '../types'
import getFollowingFixedPeriods from './get-following-fixed-periods'

describe('Gregorian Calendar following periods calculation', () => {
    describe('unknown period type', () => {
        it('should throw an error when the period type is unknown', () => {
            expect(() => {
                getFollowingFixedPeriods({
                    calendar: 'gregory',
                    period: {
                        periodType: 'DOES NOT EXIST' as PeriodIdentifier,
                        name: '2023-01-01',
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
        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'DAILY',
                    name: '2023-01-01',
                    id: '20230101',
                    iso: '20230101',
                    startDate: '2023-01-01',
                    endDate: '2023-01-01',
                },
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2023-01-02',
                    id: '20230102',
                    iso: '20230102',
                    startDate: '2023-01-02',
                    endDate: '2023-01-02',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'DAILY',
                    name: '2022-12-30',
                    id: '20221230',
                    iso: '20221230',
                    startDate: '2022-12-30',
                    endDate: '2022-12-30',
                },
                count: 2,
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2022-12-31',
                    id: '20221231',
                    iso: '20221231',
                    startDate: '2022-12-31',
                    endDate: '2022-12-31',
                },
                {
                    periodType: 'DAILY',
                    name: '2023-01-01',
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
        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'WEEKLY',
                    name: '2023-01-02',
                    id: '2023W1',
                    iso: '2023W1',
                    startDate: '2023-01-02',
                    endDate: '2023-01-08',
                },
            })

            const expected = [
                {
                    periodType: 'WEEKLY',
                    name: 'Week 2 - 2023-01-09 - 2023-01-15',
                    id: '2023W2',
                    iso: '2023W2',
                    startDate: '2023-01-09',
                    endDate: '2023-01-15',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'WEEKLY',
                    name: '2022-12-26',
                    id: '2022W52',
                    iso: '2022W52',
                    startDate: '2022-12-26',
                    endDate: '2023-01-01',
                },
                count: 2,
            })

            const expected = [
                {
                    periodType: 'WEEKLY',
                    name: 'Week 1 - 2023-01-02 - 2023-01-08',
                    id: '2023W1',
                    iso: '2023W1',
                    startDate: '2023-01-02',
                    endDate: '2023-01-08',
                },
                {
                    periodType: 'WEEKLY',
                    name: 'Week 2 - 2023-01-09 - 2023-01-15',
                    id: '2023W2',
                    iso: '2023W2',
                    startDate: '2023-01-09',
                    endDate: '2023-01-15',
                },
            ]

            expect(actual).toEqual(expected)
        })
    })

    describe('period type: MONTHLY', () => {
        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'MONTHLY',
                    name: 'January 2023',
                    id: '202301',
                    iso: '202301',
                    startDate: '2023-01-01',
                    endDate: '2023-01-31',
                },
            })

            const expected = [
                {
                    periodType: 'MONTHLY',
                    name: 'February 2023',
                    id: '202302',
                    iso: '202302',
                    startDate: '2023-02-01',
                    endDate: '2023-02-28',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'MONTHLY',
                    name: 'January 2023',
                    id: '202301',
                    iso: '202301',
                    startDate: '2023-01-01',
                    endDate: '2023-01-31',
                },
                count: 24,
            })

            expect(actual).toHaveLength(24)
            expect(actual[0]).toEqual({
                periodType: 'MONTHLY',
                name: 'February 2023',
                id: '202302',
                iso: '202302',
                startDate: '2023-02-01',
                endDate: '2023-02-28',
            })
            expect(actual[23]).toEqual({
                periodType: 'MONTHLY',
                name: 'January 2025',
                id: '202501',
                iso: '202501',
                startDate: '2025-01-01',
                endDate: '2025-01-31',
            })
        })
    })

    describe('period type: YEARLY', () => {
        it('should return one following period by default', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'YEARLY',
                    name: '2023',
                    id: '2023',
                    iso: '2023',
                    startDate: '2023-01-01',
                    endDate: '2023-12-31',
                },
            })

            const expected = [
                {
                    periodType: 'YEARLY',
                    name: '2024',
                    id: '2024',
                    iso: '2024',
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the current and the next year', () => {
            const actual = getFollowingFixedPeriods({
                calendar: 'gregory',
                period: {
                    periodType: 'YEARLY',
                    name: '2023',
                    id: '2023',
                    iso: '2023',
                    startDate: '2023-01-01',
                    endDate: '2023-12-31',
                },
                count: 2,
            })

            expect(actual).toEqual([
                {
                    periodType: 'YEARLY',
                    name: '2024',
                    id: '2024',
                    iso: '2024',
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                },
                {
                    periodType: 'YEARLY',
                    name: '2025',
                    id: '2025',
                    iso: '2025',
                    startDate: '2025-01-01',
                    endDate: '2025-12-31',
                },
            ])
        })
    })
})
