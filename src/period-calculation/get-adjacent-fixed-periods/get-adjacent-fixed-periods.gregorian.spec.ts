import { createFixedPeriodFromPeriodId } from '../create-fixed-period-from-period-id/index'
import { PeriodType } from '../types'
import getAdjacentFixedPeriods from './get-adjacent-fixed-periods'

describe('Gregorian/getAdjacentFixedPeriods', () => {
    describe('Invalid input', () => {
        it('should throw an error when the steps is 0', () => {
            expect(() => {
                getAdjacentFixedPeriods({
                    steps: 0,
                    calendar: 'gregory',
                    period: {
                        periodType: 'DAILY',
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
                    'Can not generate zero fixed periods, please choose either a negative or positive value for "steps"'
                )
            )
        })

        it('should throw an error when the period type is unknown', () => {
            expect(() => {
                getAdjacentFixedPeriods({
                    steps: 1,
                    calendar: 'gregory',
                    period: {
                        periodType: 'DOES NOT EXIST' as PeriodType,
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

    describe('default values', () => {
        it('should return one following period by default', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '20230101',
                    calendar: 'gregory',
                }),
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2023-01-02',
                    displayName: 'January 2, 2023',
                    id: '20230102',
                    iso: '20230102',
                    startDate: '2023-01-02',
                    endDate: '2023-01-02',
                },
            ]

            expect(actual).toEqual(expected)
        })
    })

    describe('period type: DAILY', () => {
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '20221230',
                    calendar: 'gregory',
                }),
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2022-12-31',
                    displayName: 'December 31, 2022',
                    id: '20221231',
                    iso: '20221231',
                    startDate: '2022-12-31',
                    endDate: '2022-12-31',
                },
                {
                    periodType: 'DAILY',
                    name: '2023-01-01',
                    displayName: 'January 1, 2023',
                    id: '20230101',
                    iso: '20230101',
                    startDate: '2023-01-01',
                    endDate: '2023-01-01',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the previous and current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '20230102',
                    calendar: 'gregory',
                }),
                steps: -3,
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2022-12-30',
                    displayName: 'December 30, 2022',
                    id: '20221230',
                    iso: '20221230',
                    startDate: '2022-12-30',
                    endDate: '2022-12-30',
                },
                {
                    periodType: 'DAILY',
                    name: '2022-12-31',
                    displayName: 'December 31, 2022',
                    id: '20221231',
                    iso: '20221231',
                    startDate: '2022-12-31',
                    endDate: '2022-12-31',
                },
                {
                    periodType: 'DAILY',
                    name: '2023-01-01',
                    displayName: 'January 1, 2023',
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
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2022W52',
                    calendar: 'gregory',
                }),
            })

            const expected = [
                {
                    periodType: 'WEEKLY',
                    name: 'Week 1 - 2023-01-02 - 2023-01-08',
                    displayName: 'Week 1 - 2023-01-02 - 2023-01-08',
                    id: '2023W1',
                    iso: '2023W1',
                    startDate: '2023-01-02',
                    endDate: '2023-01-08',
                },
                {
                    periodType: 'WEEKLY',
                    name: 'Week 2 - 2023-01-09 - 2023-01-15',
                    displayName: 'Week 2 - 2023-01-09 - 2023-01-15',
                    id: '2023W2',
                    iso: '2023W2',
                    startDate: '2023-01-09',
                    endDate: '2023-01-15',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the previous and current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2023W2',
                    calendar: 'gregory',
                }),
                steps: -54,
            })

            expect(actual).toHaveLength(54)
            expect(actual[0]).toEqual({
                periodType: 'WEEKLY',
                name: 'Week 52 - 2021-12-27 - 2022-01-02',
                displayName: 'Week 52 - 2021-12-27 - 2022-01-02',
                id: '2021W52',
                iso: '2021W52',
                startDate: '2021-12-27',
                endDate: '2022-01-02',
            })
            expect(actual[53]).toEqual({
                periodType: 'WEEKLY',
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
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 24,
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '202301',
                    calendar: 'gregory',
                }),
            })

            expect(actual).toHaveLength(24)
            expect(actual[0]).toEqual({
                periodType: 'MONTHLY',
                name: 'February 2023',
                displayName: 'February 2023',
                id: '202302',
                iso: '202302',
                startDate: '2023-02-01',
                endDate: '2023-02-28',
            })
            expect(actual[23]).toEqual({
                periodType: 'MONTHLY',
                name: 'January 2025',
                displayName: 'January 2025',
                id: '202501',
                iso: '202501',
                startDate: '2025-01-01',
                endDate: '2025-01-31',
            })
        })

        it('should return some periods of the two previous years and the current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '202302',
                    calendar: 'gregory',
                }),
                steps: -14,
            })

            expect(actual).toHaveLength(14)
            expect(actual[0]).toEqual({
                periodType: 'MONTHLY',
                name: 'December 2021',
                displayName: 'December 2021',
                id: '202112',
                iso: '202112',
                startDate: '2021-12-01',
                endDate: '2021-12-31',
            })
            expect(actual[13]).toEqual({
                periodType: 'MONTHLY',
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
        it('should return the periods for the three following years', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 3,
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2023',
                    calendar: 'gregory',
                }),
            })

            const expected = [
                {
                    periodType: 'YEARLY',
                    name: '2024',
                    displayName: '2024',
                    id: '2024',
                    iso: '2024',
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                },
                {
                    periodType: 'YEARLY',
                    name: '2025',
                    displayName: '2025',
                    id: '2025',
                    iso: '2025',
                    startDate: '2025-01-01',
                    endDate: '2025-12-31',
                },
                {
                    periodType: 'YEARLY',
                    name: '2026',
                    displayName: '2026',
                    id: '2026',
                    iso: '2026',
                    startDate: '2026-01-01',
                    endDate: '2026-12-31',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return the periods of the two previous years', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'gregory',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2023',
                    calendar: 'gregory',
                }),
                steps: -3,
            })

            expect(actual).toEqual([
                {
                    periodType: 'YEARLY',
                    name: '2022',
                    displayName: '2022',
                    id: '2022',
                    iso: '2022',
                    startDate: '2022-01-01',
                    endDate: '2022-12-31',
                },
                {
                    periodType: 'YEARLY',
                    name: '2021',
                    displayName: '2021',
                    id: '2021',
                    iso: '2021',
                    startDate: '2021-01-01',
                    endDate: '2021-12-31',
                },
                {
                    periodType: 'YEARLY',
                    name: '2020',
                    displayName: '2020',
                    id: '2020',
                    iso: '2020',
                    startDate: '2020-01-01',
                    endDate: '2020-12-31',
                },
            ])
        })
    })
})
