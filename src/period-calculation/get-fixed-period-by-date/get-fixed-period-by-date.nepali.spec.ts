import getFixedPeriodByDate from './get-fixed-period-by-date'

describe('Nepali Calendar period by date calculation', () => {
    describe('daily periods', () => {
        it('should return "207801" for period type "DAILY" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'DAILY',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('20780101')
        })
    })

    describe('weekly periods', () => {
        it('should return "2075W52" for period type "WEEKLY" on "2076-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLY',
                date: '2076-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2075W52')
        })

        it('should return "2078W1" for period type "WEEKLY" on "2078-01-03"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLY',
                date: '2078-01-03',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078W1')
        })

        it('should return "2075WedW53" for period type "WEEKLYWED" on "2076-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYWED',
                date: '2076-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2075WedW53')
        })

        it('should return "2078WedW1" for period type "WEEKLYWED" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYWED',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078WedW1')
        })

        it('should return "2077ThuW52" for period type "WEEKLYTHU" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYTHU',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077ThuW52')
        })

        it('should return "2076ThuW1" for period type "WEEKLYTHU" on "2076-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYTHU',
                date: '2076-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2076ThuW1')
        })

        it('should return "2077SatW53" for period type "WEEKLYSAT" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSAT',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077SatW53')
        })

        it('should return "2077SatW1" for period type "WEEKLYSAT" on "2077-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSAT',
                date: '2077-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077SatW1')
        })

        it('should return "2074SunW52" for period type "WEEKLYSUN" on "2075-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSUN',
                date: '2075-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2074SunW52')
        })

        it('should return "2023SunW1" for period type "WEEKLYSUN" on "2023-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSUN',
                date: '2023-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2023SunW1')
        })

        it('should return "2075BiW26" for period type "BIWEEKLY" on "2076-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIWEEKLY',
                date: '2076-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2075BiW26')
        })

        it('should return "2078SunW1" for period type "BIWEEKLY" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIWEEKLY',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078BiW1')
        })
    })

    describe('monthly periods', () => {
        it('should return "207801" for period type "MONTHLY" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'MONTHLY',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('207801')
        })

        it('should return "207802" for period type "MONTHLY" on "2078-02-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'MONTHLY',
                date: '2078-02-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('207802')
        })

        it('should return "207801B" for period type "BIMONTHLY" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIMONTHLY',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('207801B')
        })

        it('should return "207802B" for period type "BIMONTHLY" on "2078-03-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIMONTHLY',
                date: '2078-03-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('207802B')
        })

        it('should return "2078Q1" for period type "QUARTERLY" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLY',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078Q1')
        })

        it('should return "2078Q2" for period type "QUARTERLY" on "2078-04-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLY',
                date: '2078-04-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078Q2')
        })

        it('should return "2077NovemberQ4" for period type "QUARTERLYNOV" on "2078-10-29"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLYNOV',
                date: '2078-10-29',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077NovemberQ4')
        })

        it('should return "2078NovemberQ1" for period type "QUARTERLYNOV" on "2078-11-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLYNOV',
                date: '2078-11-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078NovemberQ1')
        })

        it('should return "2078S1" for period type "SIXMONTHLY" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLY',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078S1')
        })

        it('should return "2078S2" for period type "SIXMONTHLY" on "2078-07-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLY',
                date: '2078-07-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078S2')
        })

        // @TODO
        it('should return "2077NovemberS2" for period type "SIXMONTHLYNOV" on "2078-05-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYNOV',
                date: '2078-05-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077NovemberS2')
        })

        it('should return "2078NovemberS1" for period type "SIXMONTHLYNOV" on "2078-11-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYNOV',
                date: '2078-11-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078NovemberS1')
        })

        it('should return "2077AprilS2" for period type "SIXMONTHLYAPR" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYAPR',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077AprilS2')
        })

        it('should return "2078AprilS1" for period type "SIXMONTHLYAPR" on "2078-04-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYAPR',
                date: '2078-04-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078AprilS1')
        })
    })

    describe('yearly periods', () => {
        it('should return "2078" for period type "YEARLY" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'YEARLY',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078')
        })

        it('should return "2077Nov" for period type "FYNOV" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYNOV',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077Nov')
        })

        it('should return "2078Nov" for period type "FYNOV" on "2078-11-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYNOV',
                date: '2078-11-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078Nov')
        })

        it('should return "2077Oct" for period type "FYOCT" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYOCT',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077Oct')
        })

        it('should return "2078Oct" for period type "FYOCT" on "2078-10-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYOCT',
                date: '2078-10-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078Oct')
        })

        it('should return "2077July" for period type "FYJUL" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYJUL',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077July')
        })

        it('should return "2078July" for period type "FYJUL" on "2078-07-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYJUL',
                date: '2078-07-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078July')
        })

        it('should return "2077April" for period type "FYAPR" on "2078-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYAPR',
                date: '2078-01-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2077April')
        })

        it('should return "2078April" for period type "FYAPR" on "2078-04-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYAPR',
                date: '2078-04-01',
                calendar: 'nepali',
                locale: 'en',
            })

            expect(actual.id).toBe('2078April')
        })
    })
})
