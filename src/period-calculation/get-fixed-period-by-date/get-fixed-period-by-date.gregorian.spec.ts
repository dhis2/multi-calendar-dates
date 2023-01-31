import { FIXED_PERIOD_TYPES } from '../period-types'
import getFixedPeriodByDate from './get-fixed-period-by-date'

describe('Gregorian Calendar period by date calculation', () => {
    describe('daily periods', () => {
        it('should return "202201" for period type "DAILY" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.DAILY
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('20220101')
        })
    })

    describe('weekly periods', () => {
        it('should return "2021W52" for period type "WEEKLY" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLY
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021W52')
        })

        it('should return "2022W1" for period type "WEEKLY" on "2022-01-03"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLY
            const date = '2022-01-03'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022W1')
        })

        it('should return "2018WedW52" for period type "WEEKLYWED" on "2019-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYWED
            const date = '2019-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2018WedW52')
        })

        it('should return "2022WedW1" for period type "WEEKLYWED" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYWED
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022WedW1')
        })

        it('should return "2018ThuW52" for period type "WEEKLYTHU" on "2019-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYTHU
            const date = '2019-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2018ThuW52')
        })

        it('should return "2022ThuW1" for period type "WEEKLYTHU" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYTHU
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022ThuW1')
        })

        it('should return "2020SatW52" for period type "WEEKLYSAT" on "2021-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYSAT
            const date = '2021-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020SatW52')
        })

        it('should return "2022SatW1" for period type "WEEKLYSAT" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYSAT
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022SatW1')
        })

        it('should return "2020SunW53" for period type "WEEKLYSUN" on "2021-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYSUN
            const date = '2021-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020SunW53')
        })

        it('should return "2023SunW1" for period type "WEEKLYSUN" on "2023-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.WEEKLYSUN
            const date = '2023-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2023SunW1')
        })

        it('should return "2020BiW26" for period type "BIWEEKLY" on "2021-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.BIWEEKLY
            const date = '2021-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020BiW26')
        })

        it('should return "2020SunW1" for period type "BIWEEKLY" on "2020-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.BIWEEKLY
            const date = '2020-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2020BiW1')
        })
    })

    describe('monthly periods', () => {
        it('should return "202201" for period type "MONTHLY" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.MONTHLY
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202201')
        })

        it('should return "202202" for period type "MONTHLY" on "2022-02-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.MONTHLY
            const date = '2022-02-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202202')
        })

        it('should return "202201B" for period type "BIMONTHLY" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.BIMONTHLY
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202201B')
        })

        it('should return "202202B" for period type "BIMONTHLY" on "2022-03-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.BIMONTHLY
            const date = '2022-03-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('202202B')
        })

        it('should return "2022Q1" for period type "QUARTERLY" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.QUARTERLY
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Q1')
        })

        it('should return "2022Q2" for period type "QUARTERLY" on "2022-04-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.QUARTERLY
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Q2')
        })

        it('should return "2021NovemberQ4" for period type "QUARTERLYNOV" on "2022-10-31"', () => {
            const periodType = FIXED_PERIOD_TYPES.QUARTERLYNOV
            const date = '2022-10-31'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021NovemberQ4')
        })

        it('should return "2022NovemberQ1" for period type "QUARTERLYNOV" on "2022-11-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.QUARTERLYNOV
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022NovemberQ1')
        })

        it('should return "2022S1" for period type "SIXMONTHLY" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.SIXMONTHLY
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022S1')
        })

        it('should return "2022S2" for period type "SIXMONTHLY" on "2022-07-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.SIXMONTHLY
            const date = '2022-07-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022S2')
        })

        it('should return "2021NovemberS1" for period type "SIXMONTHLYNOV" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.SIXMONTHLYNOV
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021NovemberS1')
        })

        it('should return "2021NovemberS2" for period type "SIXMONTHLYNOV" on "2022-05-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.SIXMONTHLYNOV
            const date = '2022-05-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021NovemberS2')
        })

        it('should return "2022NovemberS1" for period type "SIXMONTHLYNOV" on "2022-11-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.SIXMONTHLYNOV
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022NovemberS1')
        })

        it('should return "2021AprilS2" for period type "SIXMONTHLYAPR" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.SIXMONTHLYAPR
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021AprilS2')
        })

        it('should return "2022AprilS1" for period type "SIXMONTHLYAPR" on "2022-04-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.SIXMONTHLYAPR
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022AprilS1')
        })
    })

    describe('yearly periods', () => {
        it('should return "2022" for period type "YEARLY" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.YEARLY
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022')
        })

        it('should return "2021Nov" for period type "FYNOV" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYNOV
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021Nov')
        })

        it('should return "2022Nov" for period type "FYNOV" on "2022-11-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYNOV
            const date = '2022-11-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Nov')
        })

        it('should return "2021Oct" for period type "FYOCT" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYOCT
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021Oct')
        })

        it('should return "2022Oct" for period type "FYOCT" on "2022-10-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYOCT
            const date = '2022-10-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022Oct')
        })

        it('should return "2021July" for period type "FYJUL" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYJUL
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021July')
        })

        it('should return "2022July" for period type "FYJUL" on "2022-07-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYJUL
            const date = '2022-07-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022July')
        })

        it('should return "2021April" for period type "FYAPR" on "2022-01-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYAPR
            const date = '2022-01-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2021April')
        })

        it('should return "2022April" for period type "FYAPR" on "2022-04-01"', () => {
            const periodType = FIXED_PERIOD_TYPES.FYAPR
            const date = '2022-04-01'
            const calendar = 'gregory'
            const actual = getFixedPeriodByDate({ periodType, date, calendar })

            expect(actual?.id).toBe('2022April')
        })
    })
})
