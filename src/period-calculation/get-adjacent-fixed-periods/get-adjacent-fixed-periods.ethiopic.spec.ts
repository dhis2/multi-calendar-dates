import { createFixedPeriodFromPeriodId } from '../create-fixed-period-from-period-id/index'
import getAdjacentFixedPeriods from './get-adjacent-fixed-periods'

describe('Ethiopic/getAdjacentFixedPeriods', () => {
    describe('period type: DAILY', () => {
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '20141304',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2014-13-05',
                    displayName: 'Pagumen 5, 2014 ERA0',
                    id: '20141305',
                    iso: '20141305',
                    startDate: '2014-13-05',
                    endDate: '2014-13-05',
                },
                {
                    periodType: 'DAILY',
                    name: '2015-01-01',
                    displayName: 'Meskerem 1, 2015 ERA0',
                    id: '20150101',
                    iso: '20150101',
                    startDate: '2015-01-01',
                    endDate: '2015-01-01',
                },
            ]

            expect(actual).toEqual(expected)
        })

        it('should return some periods of the previous and current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '20150102',
                    calendar: 'ethiopic',
                }),
                steps: -3,
            })

            const expected = [
                {
                    periodType: 'DAILY',
                    name: '2014-13-04',
                    displayName: 'Pagumen 4, 2014 ERA0',
                    id: '20141304',
                    iso: '20141304',
                    startDate: '2014-13-04',
                    endDate: '2014-13-04',
                },
                {
                    periodType: 'DAILY',
                    name: '2014-13-05',
                    displayName: 'Pagumen 5, 2014 ERA0',
                    id: '20141305',
                    iso: '20141305',
                    startDate: '2014-13-05',
                    endDate: '2014-13-05',
                },
                {
                    periodType: 'DAILY',
                    name: '2015-01-01',
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
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2014W52',
                    calendar: 'ethiopic',
                }),
            })

            const expected = [
                {
                    periodType: 'WEEKLY',
                    name: 'Week 1 - 2015-01-03 - 2015-01-09',
                    displayName: 'Week 1 - 2015-01-03 - 2015-01-09',
                    id: '2015W1',
                    iso: '2015W1',
                    startDate: '2015-01-03',
                    endDate: '2015-01-09',
                },
                {
                    periodType: 'WEEKLY',
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

        it('should return some periods of the previous and current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2015W2',
                    calendar: 'ethiopic',
                }),
                steps: -54,
            })

            expect(actual).toHaveLength(54)
            expect(actual[0]).toEqual({
                periodType: 'WEEKLY',
                name: 'Week 53 - 2013-13-02 - 2014-01-03',
                displayName: 'Week 53 - 2013-13-02 - 2014-01-03',
                id: '2013W53',
                iso: '2013W53',
                startDate: '2013-13-02',
                endDate: '2014-01-03',
            })
            expect(actual[53]).toEqual({
                periodType: 'WEEKLY',
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
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 24,
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '201501',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toHaveLength(24)
            expect(actual[0]).toEqual({
                periodType: 'MONTHLY',
                name: 'Tekemt 2015',
                displayName: 'Tekemt 2015',
                id: '201502',
                iso: '201502',
                startDate: '2015-02-01',
                endDate: '2015-02-30',
            })
            expect(actual[23]).toEqual({
                periodType: 'MONTHLY',
                name: 'Meskerem 2017',
                displayName: 'Meskerem 2017',
                id: '201701',
                iso: '201701',
                startDate: '2017-01-01',
                endDate: '2017-01-30',
            })
        })

        it('should return some periods of the two previous and current year', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '201502',
                    calendar: 'ethiopic',
                }),
                steps: -14,
            })

            expect(actual).toHaveLength(14)
            expect(actual[0]).toEqual({
                periodType: 'MONTHLY',
                name: 'Nehasse 2013',
                displayName: 'Nehasse 2013',
                id: '201312',
                iso: '201312',
                startDate: '2013-12-01',
                endDate: '2013-12-30',
            })
            expect(actual[13]).toEqual({
                periodType: 'MONTHLY',
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
        it('should return some periods of the current and the next year', () => {
            const actual = getAdjacentFixedPeriods({
                steps: 2,
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2015',
                    calendar: 'ethiopic',
                }),
            })

            expect(actual).toEqual([
                {
                    periodType: 'YEARLY',
                    name: '2016',
                    displayName: '2016',
                    id: '2016',
                    iso: '2016',
                    startDate: '2016-01-01',
                    endDate: '2016-13-05',
                },
                {
                    periodType: 'YEARLY',
                    name: '2017',
                    displayName: '2017',
                    id: '2017',
                    iso: '2017',
                    startDate: '2017-01-01',
                    endDate: '2017-13-05',
                },
            ])
        })

        it('should return the periods of the previous two years', () => {
            const actual = getAdjacentFixedPeriods({
                calendar: 'ethiopic',
                period: createFixedPeriodFromPeriodId({
                    periodId: '2015',
                    calendar: 'ethiopic',
                }),
                steps: -2,
            })

            expect(actual).toEqual([
                {
                    periodType: 'YEARLY',
                    name: '2014',
                    displayName: '2014',
                    id: '2014',
                    iso: '2014',
                    startDate: '2014-01-01',
                    endDate: '2014-13-05',
                },
                {
                    periodType: 'YEARLY',
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
