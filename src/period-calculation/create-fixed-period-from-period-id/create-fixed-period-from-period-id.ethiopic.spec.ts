import createFixedPeriodFromPeriodId from './create-fixed-period-from-period-id'

describe('Ethiopic/createFixedPeriodFromPeriodId', () => {
    describe('yearly period types', () => {
        it('should return "YEARLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'YEARLY',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015April',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'FYAPR',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015July',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'FYJUL',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015Oct',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'FYOCT',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015Nov',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'FYNOV',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '201501',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'MONTHLY',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '201502B',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'BIMONTHLY',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015Q1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'QUARTERLY',
                name: 'Meskerem - Hedar 2015',
                displayName: 'Meskerem - Hedar 2015',
                id: '2015Q1',
                iso: '2015Q1',
                startDate: '2015-01-01',
                endDate: '2015-03-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period of type "QUARTERLYJUL" in 2015/2016', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015JulyQ1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'QUARTERLYJUL',
                name: 'Megabit - Genbot 2015',
                displayName: 'Megabit - Genbot 2015',
                id: '2015JulyQ1',
                iso: '2015JulyQ1',
                startDate: '2015-07-01',
                endDate: '2015-09-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "QUARTERLYJUL"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015JulyQ4',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'QUARTERLYJUL',
                name: 'Hedar - Ter 2016',
                displayName: 'Hedar - Ter 2016',
                id: '2015JulyQ4',
                iso: '2015JulyQ4',
                startDate: '2016-03-01',
                endDate: '2016-05-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period of type "QUARTERLYNOV" in 2015/2016', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015NovemberQ1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'QUARTERLYNOV',
                name: 'Hamle - Pagumen 2015',
                displayName: 'Hamle - Pagumen 2015',
                id: '2015NovemberQ1',
                iso: '2015NovemberQ1',
                startDate: '2015-11-01',
                endDate: '2015-13-06',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "QUARTERLYNOV"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015NovemberQ4',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'QUARTERLYNOV',
                name: 'Megabit - Genbot 2016',
                displayName: 'Megabit - Genbot 2016',
                id: '2015NovemberQ4',
                iso: '2015NovemberQ4',
                startDate: '2016-07-01',
                endDate: '2016-09-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYAPR"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015AprilS1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'SIXMONTHLYAPR',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015AprilS2',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'SIXMONTHLYAPR',
                name: 'Sene 2015 - Tekemt 2016',
                displayName: 'Sene 2015 - Tekemt 2016',
                id: '2015AprilS2',
                iso: '2015AprilS2',
                startDate: '2015-10-01',
                endDate: '2016-02-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYJUL"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015JulyS1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'SIXMONTHLYJUL',
                name: 'Megabit - Nehasse 2015',
                displayName: 'Megabit - Nehasse 2015',
                id: '2015JulyS1',
                iso: '2015JulyS1',
                startDate: '2015-07-01',
                endDate: '2015-12-30',
            }

            expect(actual).toEqual(expected)
        })

        // @TODO(13th month): ignore the 13th month here ¬
        it.skip('should return the last period period of type "SIXMONTHLYJUL"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015JulyS2',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'SIXMONTHLYJUL',
                name: 'Tahsas 2015 - Genbot 2016',
                displayName: 'Tahsas 2015 - Genbot 2016',
                id: '2015JulyS2',
                iso: '2015JulyS2',
                startDate: '2015-13-01',
                endDate: '2016-05-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYNOV"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015NovemberS1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'SIXMONTHLYNOV',
                name: 'Hamle 2015 - Hedar 2016',
                displayName: 'Hamle 2015 - Hedar 2016',
                id: '2015NovemberS1',
                iso: '2015NovemberS1',
                startDate: '2015-11-01',
                endDate: '2016-03-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "SIXMONTHLYNOV"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015NovemberS2',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'SIXMONTHLYNOV',
                name: 'Tahsas - Genbot 2016',
                displayName: 'Tahsas - Genbot 2016',
                id: '2015NovemberS2',
                iso: '2015NovemberS2',
                startDate: '2016-04-01',
                endDate: '2016-09-30',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('weekly period types', () => {
        it('should return period of type "WEEKLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015W1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'WEEKLY',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015BiW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'BIWEEKLY',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015WedW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'WEEKLYWED',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015ThuW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'WEEKLYTHU',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015SatW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'WEEKLYSAT',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2015SunW1',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'WEEKLYSUN',
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
            const actual = createFixedPeriodFromPeriodId({
                periodId: '20150101',
                calendar: 'ethiopic',
            })

            const expected = {
                periodType: 'DAILY',
                name: '2015-01-01',
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
