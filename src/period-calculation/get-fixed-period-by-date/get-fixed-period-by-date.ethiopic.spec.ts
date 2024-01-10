import getFixedPeriodByDate from './get-fixed-period-by-date'

describe('Ethiopic Calendar period by date calculation', () => {
    describe('daily periods', () => {
        it('should return "201401" for period type "DAILY" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'DAILY',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('20140101')
        })
    })

    describe('weekly periods', () => {
        it('should return "2013W53" for period type "WEEKLY" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLY',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013W53')
        })

        it('should return "2014W1" for period type "WEEKLY" on "2014-01-04"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLY',
                date: '2014-01-04',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014W1')
        })

        it('should return "2010WedW52" for period type "WEEKLYWED" on "2011-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYWED',
                date: '2011-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2010WedW52')
        })

        it('should return "2014WedW1" for period type "WEEKLYWED" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYWED',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014WedW1')
        })

        it('should return "2010ThuW53" for period type "WEEKLYTHU" on "2011-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYTHU',
                date: '2011-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2010ThuW53')
        })

        it('should return "2014ThuW1" for period type "WEEKLYTHU" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYTHU',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014ThuW1')
        })

        it('should return "2012SatW52" for period type "WEEKLYSAT" on "2013-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSAT',
                date: '2013-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2012SatW52')
        })

        it('should return "2011SatW1" for period type "WEEKLYSAT" on "2011-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSAT',
                date: '2011-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2011SatW1')
        })

        it('should return "2012SunW53" for period type "WEEKLYSUN" on "2013-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSUN',
                date: '2013-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2012SunW53')
        })

        it('should return "2012SunW1" for period type "WEEKLYSUN" on "2012-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'WEEKLYSUN',
                date: '2012-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2012SunW1')
        })

        it('should return "2014BiW26" for period type "BIWEEKLY" on "2015-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIWEEKLY',
                date: '2015-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014BiW26')
        })

        it('should return "2012SunW1" for period type "BIWEEKLY" on "2012-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIWEEKLY',
                date: '2012-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2012BiW1')
        })
    })

    describe('monthly periods', () => {
        it('should return "201401" for period type "MONTHLY" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'MONTHLY',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('201401')
        })

        it('should return "201402" for period type "MONTHLY" on "2014-02-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'MONTHLY',
                date: '2014-02-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('201402')
        })

        it('should return "201401B" for period type "BIMONTHLY" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIMONTHLY',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('201401B')
        })

        it('should return "201402B" for period type "BIMONTHLY" on "2014-03-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'BIMONTHLY',
                date: '2014-03-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('201402B')
        })

        it('should return "2014Q1" for period type "QUARTERLY" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLY',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014Q1')
        })

        it('should return "2014Q2" for period type "QUARTERLY" on "2014-04-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLY',
                date: '2014-04-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014Q2')
        })

        // @TODO: What is the current period in this case? 2013NovemberQ4 end
        // on 2014-09-30, 2014NovemberQ1 starts on 2014-11-01
        it.skip('should return "2013NovemberQ4" for period type "QUARTERLYNOV" on "2014-10-31"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLYNOV',
                date: '2014-10-05',
                // 10th month only has 5 or 6 days, in this case 6 as it's a leap year
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013NovemberQ4')
        })

        it('should return "2014NovemberQ1" for period type "QUARTERLYNOV" on "2014-11-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'QUARTERLYNOV',
                date: '2014-11-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014NovemberQ1')
        })

        it('should return "2014S1" for period type "SIXMONTHLY" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLY',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014S1')
        })

        it('should return "2014S2" for period type "SIXMONTHLY" on "2014-07-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLY',
                date: '2014-07-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014S2')
        })

        it('should return "2013NovemberS1" for period type "SIXMONTHLYNOV" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYNOV',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013NovemberS1')
        })

        // @TODO: What is the current period in this case? 2013NovemberQ4 end
        // on 2014-09-30, 2014NovemberQ1 starts on 2014-11-01
        it.skip('should return "2013NovemberS2" for period type "SIXMONTHLYNOV" on "2014-05-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYNOV',
                date: '2014-10-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013NovemberS2')
        })

        it('should return "2014NovemberS1" for period type "SIXMONTHLYNOV" on "2014-11-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYNOV',
                date: '2014-11-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014NovemberS1')
        })

        it('should return "2013AprilS2" for period type "SIXMONTHLYAPR" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYAPR',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013AprilS2')
        })

        it('should return "2014AprilS1" for period type "SIXMONTHLYAPR" on "2014-04-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'SIXMONTHLYAPR',
                date: '2014-04-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014AprilS1')
        })
    })

    describe('yearly periods', () => {
        it('should return "2014" for period type "YEARLY" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'YEARLY',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014')
        })

        it('should return "2013Nov" for period type "FYNOV" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYNOV',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013Nov')
        })

        it('should return "2014Nov" for period type "FYNOV" on "2014-11-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYNOV',
                date: '2014-11-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014Nov')
        })

        it('should return "2013Oct" for period type "FYOCT" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYOCT',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013Oct')
        })

        it('should return "2014Oct" for period type "FYOCT" on "2014-10-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYOCT',
                date: '2014-10-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014Oct')
        })

        it('should return "2013July" for period type "FYJUL" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYJUL',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013July')
        })

        it('should return "2014July" for period type "FYJUL" on "2014-07-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYJUL',
                date: '2014-07-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014July')
        })

        it('should return "2013April" for period type "FYAPR" on "2014-01-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYAPR',
                date: '2014-01-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2013April')
        })

        it('should return "2014April" for period type "FYAPR" on "2014-04-01"', () => {
            const actual = getFixedPeriodByDate({
                periodType: 'FYAPR',
                date: '2014-04-01',
                calendar: 'ethiopic',
                locale: 'en',
            })

            expect(actual?.id).toBe('2014April')
        })
    })
})
