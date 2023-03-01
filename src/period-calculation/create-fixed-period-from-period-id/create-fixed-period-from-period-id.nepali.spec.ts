import createFixedPeriodFromPeriodId from './create-fixed-period-from-period-id'

describe('Nepali/createFixedPeriodFromPeriodId', () => {
    describe('yearly period types', () => {
        it('should return "YEARLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'YEARLY',
                name: '2079',
                displayName: '2079',
                id: '2079',
                iso: '2079',
                startDate: '2079-01-01',
                endDate: '2079-12-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYAPR"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079April',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'FYAPR',
                name: 'Shrawan 2079 - Ashadh 2080',
                displayName: 'Shrawan 2079 - Ashadh 2080',
                id: '2079April',
                iso: '2079April',
                startDate: '2079-04-01',
                endDate: '2080-03-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYJUL"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079July',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'FYJUL',
                name: 'Kartik 2079 - Ashwin 2080',
                displayName: 'Kartik 2079 - Ashwin 2080',
                id: '2079July',
                iso: '2079July',
                startDate: '2079-07-01',
                endDate: '2080-06-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYOCT"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079Oct',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'FYOCT',
                name: 'Mangh 2079 - Paush 2080',
                displayName: 'Mangh 2079 - Paush 2080',
                id: '2079Oct',
                iso: '2079Oct',
                startDate: '2079-10-01',
                endDate: '2080-09-29',
            }

            expect(actual).toEqual(expected)
        })

        it('should return "FYNOV"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079Nov',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'FYNOV',
                name: 'Falgun 2079 - Mangh 2080',
                displayName: 'Falgun 2079 - Mangh 2080',
                id: '2079Nov',
                iso: '2079Nov',
                startDate: '2079-11-01',
                endDate: '2080-10-29',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('monthly period types', () => {
        it('should return period of type "MONTHLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '207901',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'MONTHLY',
                name: 'Baisakh 2079',
                displayName: 'Baisakh 2079',
                id: '207901',
                iso: '207901',
                startDate: '2079-01-01',
                endDate: '2079-01-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "BIMONTHLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '207902B',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'BIMONTHLY',
                name: 'Ashadh - Shrawan 2079',
                displayName: 'Ashadh - Shrawan 2079',
                id: '207902B',
                iso: '207902B',
                startDate: '2079-03-01',
                endDate: '2079-04-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "QUARTERLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079Q1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'QUARTERLY',
                name: 'Baisakh - Ashadh 2079',
                displayName: 'Baisakh - Ashadh 2079',
                id: '2079Q1',
                iso: '2079Q1',
                startDate: '2079-01-01',
                endDate: '2079-03-32',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period of type "QUARTERLYNOV" in 2079/2080', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079NovemberQ1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'QUARTERLYNOV',
                name: 'Falgun 2079 - Baisakh 2080',
                displayName: 'Falgun 2079 - Baisakh 2080',
                id: '2079NovemberQ1',
                iso: '2079NovemberQ1',
                startDate: '2079-11-01',
                endDate: '2080-01-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "QUARTERLYNOV"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079NovemberQ4',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'QUARTERLYNOV',
                name: 'Mangsir - Mangh 2080',
                displayName: 'Mangsir - Mangh 2080',
                id: '2079NovemberQ4',
                iso: '2079NovemberQ4',
                startDate: '2080-08-01',
                endDate: '2080-10-29',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYAPR"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079AprilS1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'SIXMONTHLYAPR',
                name: 'Shrawan - Paush 2079',
                displayName: 'Shrawan - Paush 2079',
                id: '2079AprilS1',
                iso: '2079AprilS1',
                startDate: '2079-04-01',
                endDate: '2079-09-30',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "SIXMONTHLYAPR"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079AprilS2',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'SIXMONTHLYAPR',
                name: 'Mangh 2079 - Ashadh 2080',
                displayName: 'Mangh 2079 - Ashadh 2080',
                id: '2079AprilS2',
                iso: '2079AprilS2',
                startDate: '2079-10-01',
                endDate: '2080-03-31',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the first period period of type "SIXMONTHLYNOV"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079NovemberS1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'SIXMONTHLYNOV',
                name: 'Falgun 2079 - Shrawan 2080',
                displayName: 'Falgun 2079 - Shrawan 2080',
                id: '2079NovemberS1',
                iso: '2079NovemberS1',
                startDate: '2079-11-01',
                endDate: '2080-04-32',
            }

            expect(actual).toEqual(expected)
        })

        it('should return the last period period of type "SIXMONTHLYNOV"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079NovemberS2',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'SIXMONTHLYNOV',
                name: 'Bhadra - Mangh 2080',
                displayName: 'Bhadra - Mangh 2080',
                id: '2079NovemberS2',
                iso: '2079NovemberS2',
                startDate: '2080-05-01',
                endDate: '2080-10-29',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('weekly period types', () => {
        it('should return period of type "WEEKLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079W1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'WEEKLY',
                name: 'Week 1 - 2078-12-28 - 2079-01-04',
                displayName: 'Week 1 - 2078-12-28 - 2079-01-04',
                id: '2079W1',
                iso: '2079W1',
                startDate: '2078-12-28',
                endDate: '2079-01-04',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "BIWEEKLY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079BiW1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'BIWEEKLY',
                name: 'Bi-Week 1 - 2078-12-28 - 2079-01-11',
                displayName: 'Bi-Week 1 - 2078-12-28 - 2079-01-11',
                id: '2079BiW1',
                iso: '2079BiW1',
                startDate: '2078-12-28',
                endDate: '2079-01-11',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYWED"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079WedW1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'WEEKLYWED',
                name: 'Week 1 - 2078-12-30 - 2079-01-06',
                displayName: 'Week 1 - 2078-12-30 - 2079-01-06',
                id: '2079WedW1',
                iso: '2079WedW1',
                startDate: '2078-12-30',
                endDate: '2079-01-06',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYTHU"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079ThuW1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'WEEKLYTHU',
                name: 'Week 1 - 2079-01-01 - 2079-01-07',
                displayName: 'Week 1 - 2079-01-01 - 2079-01-07',
                id: '2079ThuW1',
                iso: '2079ThuW1',
                startDate: '2079-01-01',
                endDate: '2079-01-07',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYSAT"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079SatW1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'WEEKLYSAT',
                name: 'Week 1 - 2079-01-03 - 2079-01-09',
                displayName: 'Week 1 - 2079-01-03 - 2079-01-09',
                id: '2079SatW1',
                iso: '2079SatW1',
                startDate: '2079-01-03',
                endDate: '2079-01-09',
            }

            expect(actual).toEqual(expected)
        })

        it('should return period of type "WEEKLYSUN"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '2079SunW1',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'WEEKLYSUN',
                name: 'Week 1 - 2079-01-04 - 2079-01-10',
                displayName: 'Week 1 - 2079-01-04 - 2079-01-10',
                id: '2079SunW1',
                iso: '2079SunW1',
                startDate: '2079-01-04',
                endDate: '2079-01-10',
            }

            expect(actual).toEqual(expected)
        })
    })

    describe('daily period types', () => {
        it('should return period of type "DAILY"', () => {
            const actual = createFixedPeriodFromPeriodId({
                periodId: '20790101',
                calendar: 'nepali',
            })

            const expected = {
                periodType: 'DAILY',
                name: '2079-01-01',
                displayName: '2079-01-01',
                id: '20790101',
                iso: '20790101',
                startDate: '2079-01-01',
                endDate: '2079-01-01',
            }

            expect(actual).toEqual(expected)
        })
    })
})
