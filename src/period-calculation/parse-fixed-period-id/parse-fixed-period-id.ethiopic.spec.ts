import { FIXED_PERIOD_TYPES } from '../period-types'
import parseFixedPeriodId from './parse-fixed-period-id'

describe('Gregorian parse period id', () => {
    describe('yearly period types', () => {
        it('should return "YEARLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.YEARLY,
                name: '2015',
                displayName: '2015',
                id: '2015',
                iso: '2015',
                startDate: '2015-01-01',
                endDate: '2015-13-06',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYAPR"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015April',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYAPR,
                name: 'Tahsas 2015 - Hedar 2016',
                displayName: 'Tahsas 2015 - Hedar 2016',
                id: '2015April',
                iso: '2015April',
                startDate: '2015-04-01',
                endDate: '2016-03-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYJUL"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015July',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYJUL,
                name: 'Megabit 2015 - Yekatit 2016',
                displayName: 'Megabit 2015 - Yekatit 2016',
                id: '2015July',
                iso: '2015July',
                startDate: '2015-07-01',
                endDate: '2016-06-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYOCT"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015Oct',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYOCT,
                name: 'Sene 2015 - Genbot 2016',
                displayName: 'Sene 2015 - Genbot 2016',
                id: '2015Oct',
                iso: '2015Oct',
                startDate: '2015-10-01',
                endDate: '2016-09-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015Nov',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.FYNOV,
                name: 'Hamle 2015 - Sene 2016',
                displayName: 'Hamle 2015 - Sene 2016',
                id: '2015Nov',
                iso: '2015Nov',
                startDate: '2015-11-01',
                endDate: '2016-10-30',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('monthly period types', () => {
        it('should return period of type "MONTHLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '201501',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.MONTHLY,
                name: 'Meskerem 2015',
                displayName: 'Meskerem 2015',
                id: '201501',
                iso: '201501',
                startDate: '2015-01-01',
                endDate: '2015-01-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "BIMONTHLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '201502B',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.BIMONTHLY,
                name: 'Hedar - Tahsas 2015',
                displayName: 'Hedar - Tahsas 2015',
                id: '201502B',
                iso: '201502B',
                startDate: '2015-03-01',
                endDate: '2015-04-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "QUARTERLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015Q1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.QUARTERLY,
                name: 'Meskerem - Hedar 2015',
                displayName: 'Meskerem - Hedar 2015',
                id: '2015Q1',
                iso: '2015Q1',
                startDate: '2015-01-01',
                endDate: '2015-03-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period of type "QUARTERLYNOV" in 2015/2016', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015NovemberQ1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.QUARTERLYNOV,
                name: 'Hamle - Pagumen 2015',
                displayName: 'Hamle - Pagumen 2015',
                id: '2015NovemberQ1',
                iso: '2015NovemberQ1',
                startDate: '2015-11-01',
                endDate: '2015-13-06',
            }

            expect(actual).toEqual(expected)
        })

        // @TODO(13th month):
        // This doesn't work because the ethiopic year has 13 months and the
        // last month is currently missing from the 4 quarters
        it.skip('should return the last period period of type "QUARTERLYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015NovemberQ4',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.QUARTERLYNOV,
                name: 'August - Sene 2016',
                displayName: 'August - Sene 2016',
                id: '2015NovemberQ4',
                iso: '2015NovemberQ4',
                startDate: '2016-08-01',
                endDate: '2016-10-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYAPR"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015AprilS1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYAPR,
                name: 'Tahsas - Genbot 2015',
                displayName: 'Tahsas - Genbot 2015',
                id: '2015AprilS1',
                iso: '2015AprilS1',
                startDate: '2015-04-01',
                endDate: '2015-09-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "SIXMONTHLYAPR"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015AprilS2',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYAPR,
                name: 'Sene 2015 - Tekemt 2016',
                displayName: 'Sene 2015 - Tekemt 2016',
                id: '2015AprilS2',
                iso: '2015AprilS2',
                startDate: '2015-10-01',
                endDate: '2016-02-30',
            }

            expect(actual).toEqual(expected)
        })

        // @TODO(13th month):
        // This doesn't work because the ethiopic year has 13 months and the
        // last month is currently missing from the 4 quarters
        it.skip('should return the first period period of type "SIXMONTHLYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015NovemberS1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYNOV,
                name: 'Hamle 2015 - Tahsas 2016',
                displayName: 'Hamle 2015 - Tahsas 2016',
                id: '2015NovemberS1',
                iso: '2015NovemberS1',
                startDate: '2015-11-01',
                endDate: '2016-04-30',
            }

            expect(actual).toEqual(expected)
        })

        // @TODO(13th month):
        // This doesn't work because the ethiopic year has 13 months and the
        // last month is currently missing from the 4 quarters
        it.skip('should return the last period period of type "SIXMONTHLYNOV"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015NovemberS2',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.SIXMONTHLYNOV,
                name: 'May - Sene 2016',
                displayName: 'May - Sene 2016',
                id: '2015NovemberS2',
                iso: '2015NovemberS2',
                startDate: '2016-05-01',
                endDate: '2016-10-31',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('weekly period types', () => {
        it('should return period of type "WEEKLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015W1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLY,
                name: 'Week 1 - 2015-01-03 - 2015-01-09',
                displayName: 'Week 1 - 2015-01-03 - 2015-01-09',
                id: '2015W1',
                iso: '2015W1',
                startDate: '2015-01-03',
                endDate: '2015-01-09',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "BIWEEKLY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015BiW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.BIWEEKLY,
                name: 'Bi-Week 1 - 2015-01-03 - 2015-01-16',
                displayName: 'Bi-Week 1 - 2015-01-03 - 2015-01-16',
                id: '2015BiW1',
                iso: '2015BiW1',
                startDate: '2015-01-03',
                endDate: '2015-01-16',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYWED"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015WedW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYWED,
                name: 'Week 1 - 2014-13-03 - 2015-01-04',
                displayName: 'Week 1 - 2014-13-03 - 2015-01-04',
                id: '2015WedW1',
                iso: '2015WedW1',
                startDate: '2014-13-03',
                endDate: '2015-01-04',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYTHU"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015ThuW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYTHU,
                name: 'Week 1 - 2014-13-04 - 2015-01-05',
                displayName: 'Week 1 - 2014-13-04 - 2015-01-05',
                id: '2015ThuW1',
                iso: '2015ThuW1',
                startDate: '2014-13-04',
                endDate: '2015-01-05',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYSAT"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015SatW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYSAT,
                name: 'Week 1 - 2015-01-01 - 2015-01-07',
                displayName: 'Week 1 - 2015-01-01 - 2015-01-07',
                id: '2015SatW1',
                iso: '2015SatW1',
                startDate: '2015-01-01',
                endDate: '2015-01-07',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYSUN"', () => {
            const actual = parseFixedPeriodId({
                periodId: '2015SunW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.WEEKLYSUN,
                name: 'Week 1 - 2015-01-02 - 2015-01-08',
                displayName: 'Week 1 - 2015-01-02 - 2015-01-08',
                id: '2015SunW1',
                iso: '2015SunW1',
                startDate: '2015-01-02',
                endDate: '2015-01-08',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('daily period types', () => {
        it('should return period of type "DAILY"', () => {
            const actual = parseFixedPeriodId({
                periodId: '20150101',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: FIXED_PERIOD_TYPES.DAILY,
                name: 'Meskerem 1, 2015 ERA0',
                displayName: 'Meskerem 1, 2015 ERA0',
                id: '20150101',
                iso: '20150101',
                startDate: '2015-01-01',
                endDate: '2015-01-01',
            }

            expect(actual).toEqual(expected)
        })
    })
})
