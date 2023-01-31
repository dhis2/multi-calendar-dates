import { FIXED_PERIOD_TYPES } from '../period-types'
import parseFixedPeriodId from './parse-fixed-period-id'

describe('Gregorian parse period id', () => {
    describe('yearly period types', () => {
        it('should return "YEARLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.YEARLY,
                name: '2023',
                displayName: '2023',
                id: '2023',
                iso: '2023',
                startDate: '2023-01-01',
                endDate: '2023-12-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYAPR"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023April',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYAPR,
                name: 'April 2023 - March 2024',
                displayName: 'April 2023 - March 2024',
                id: '2023April',
                iso: '2023April',
                startDate: '2023-04-01',
                endDate: '2024-03-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYJUL"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023July',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYJUL,
                name: 'July 2023 - June 2024',
                displayName: 'July 2023 - June 2024',
                id: '2023July',
                iso: '2023July',
                startDate: '2023-07-01',
                endDate: '2024-06-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYOCT"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023Oct',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYOCT,
                name: 'October 2023 - September 2024',
                displayName: 'October 2023 - September 2024',
                id: '2023Oct',
                iso: '2023Oct',
                startDate: '2023-10-01',
                endDate: '2024-09-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023Nov',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYNOV,
                name: 'November 2023 - October 2024',
                displayName: 'November 2023 - October 2024',
                id: '2023Nov',
                iso: '2023Nov',
                startDate: '2023-11-01',
                endDate: '2024-10-31',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('monthly period types', () => {
        it('should return period of type "MONTHLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '202301',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'January 2023',
                displayName: 'January 2023',
                id: '202301',
                iso: '202301',
                startDate: '2023-01-01',
                endDate: '2023-01-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "BIMONTHLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '202302B',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.BIMONTHLY,
                name: 'March - April 2023',
                displayName: 'March - April 2023',
                id: '202302B',
                iso: '202302B',
                startDate: '2023-03-01',
                endDate: '2023-04-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "QUARTERLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023Q1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.QUARTERLY,
                name: 'January - March 2023',
                displayName: 'January - March 2023',
                id: '2023Q1',
                iso: '2023Q1',
                startDate: '2023-01-01',
                endDate: '2023-03-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period of type "QUARTERLYNOV" in 2023/2024', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023NovemberQ1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.QUARTERLYNOV,
                name: 'November 2023 - January 2024',
                displayName: 'November 2023 - January 2024',
                id: '2023NovemberQ1',
                iso: '2023NovemberQ1',
                startDate: '2023-11-01',
                endDate: '2024-01-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "QUARTERLYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023NovemberQ4',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.QUARTERLYNOV,
                name: 'August - October 2024',
                displayName: 'August - October 2024',
                id: '2023NovemberQ4',
                iso: '2023NovemberQ4',
                startDate: '2024-08-01',
                endDate: '2024-10-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYAPR"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023AprilS1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYAPR,
                name: 'April - September 2023',
                displayName: 'April - September 2023',
                id: '2023AprilS1',
                iso: '2023AprilS1',
                startDate: '2023-04-01',
                endDate: '2023-09-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "SIXMONTHLYAPR"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023AprilS2',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYAPR,
                name: 'October 2023 - March 2024',
                displayName: 'October 2023 - March 2024',
                id: '2023AprilS2',
                iso: '2023AprilS2',
                startDate: '2023-10-01',
                endDate: '2024-03-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023NovemberS1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYNOV,
                name: 'November 2023 - April 2024',
                displayName: 'November 2023 - April 2024',
                id: '2023NovemberS1',
                iso: '2023NovemberS1',
                startDate: '2023-11-01',
                endDate: '2024-04-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "SIXMONTHLYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023NovemberS2',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYNOV,
                name: 'May - October 2024',
                displayName: 'May - October 2024',
                id: '2023NovemberS2',
                iso: '2023NovemberS2',
                startDate: '2024-05-01',
                endDate: '2024-10-31',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('weekly period types', () => {
        it('should return period of type "WEEKLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023W1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                name: 'Week 1 - 2023-01-02 - 2023-01-08',
                displayName: 'Week 1 - 2023-01-02 - 2023-01-08',
                id: '2023W1',
                iso: '2023W1',
                startDate: '2023-01-02',
                endDate: '2023-01-08',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "BIWEEKLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023BiW1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.BIWEEKLY,
                name: 'Bi-Week 1 - 2023-01-02 - 2023-01-15',
                displayName: 'Bi-Week 1 - 2023-01-02 - 2023-01-15',
                id: '2023BiW1',
                iso: '2023BiW1',
                startDate: '2023-01-02',
                endDate: '2023-01-15',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYWED"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023WedW1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYWED,
                name: 'Week 1 - 2023-01-04 - 2023-01-10',
                displayName: 'Week 1 - 2023-01-04 - 2023-01-10',
                id: '2023WedW1',
                iso: '2023WedW1',
                startDate: '2023-01-04',
                endDate: '2023-01-10',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYTHU"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023ThuW1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYTHU,
                name: 'Week 1 - 2022-12-29 - 2023-01-04',
                displayName: 'Week 1 - 2022-12-29 - 2023-01-04',
                id: '2023ThuW1',
                iso: '2023ThuW1',
                startDate: '2022-12-29',
                endDate: '2023-01-04',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYSAT"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023SatW1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYSAT,
                name: 'Week 1 - 2022-12-31 - 2023-01-06',
                displayName: 'Week 1 - 2022-12-31 - 2023-01-06',
                id: '2023SatW1',
                iso: '2023SatW1',
                startDate: '2022-12-31',
                endDate: '2023-01-06',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYSUN"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2023SunW1',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYSUN,
                name: 'Week 1 - 2023-01-01 - 2023-01-07',
                displayName: 'Week 1 - 2023-01-01 - 2023-01-07',
                id: '2023SunW1',
                iso: '2023SunW1',
                startDate: '2023-01-01',
                endDate: '2023-01-07',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('daily period types', () => {
        it('should return period of type "DAILY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '20230101',
                calendar: 'gregory',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.DAILY,
                name: '2023-01-01',
                displayName: '2023-01-01',
                id: '20230101',
                iso: '20230101',
                startDate: '2023-01-01',
                endDate: '2023-01-01',
            }

            expect(actual).toEqual(expected)
        })
    })
})
