import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { generateFixedPeriods } from '../generate-fixed-periods/index'
import monthNumbers from '../month-numbers'
import {
    buildMonthlyFixedPeriod,
    computeMonthFromMonthlyIndex,
} from '../monthly-periods/index'
import { FixedPeriod } from '../types'
import {
    buildYearlyFixedPeriod,
    yearlyMonthValueKeys,
} from '../yearly-periods/index'
import getMonthlyFixedPeriodTypeForPeriodId from './get-monthly-fixed-period-type-for-period-id'
import getWeeklyFixedPeriodTypeForPeriodId from './get-weekly-fixed-period-type-for-period-id'
import getYearlyFixedPeriodTypeForPeriodId from './get-yearly-fixed-period-type-for-period-id'

// slice(1) => remove non-financial-year entry
const FinancialYearlyMonths = Object.values(yearlyMonthValueKeys)
    .slice(1)
    .join('|')

const isYearly = (periodId: string) =>
    new RegExp(`^[0-9]{4}(${FinancialYearlyMonths})?$`).test(periodId)

const monthNames = Object.values(monthNumbers)
    .map(({ name }) => name)
    .join('|')
const monthlyRegExps = [
    '^[0-9]{6}$',
    '^[0-9]{6}B$',
    `^[0-9]{4}(${monthNames})?Q[0-9]$`,
    `^[0-9]{4}(${monthNames})?S[0-9]$`,
].join('|')
const isMonthly = (periodId: string) =>
    new RegExp(monthlyRegExps).test(periodId)

const extractMonthlyIndexFromPeriodId = (periodId: string) => {
    return parseInt(periodId.replace(/^[0-9]{4}|[a-zA-Z]/g, ''), 10)
}

const isWeekly = (periodId: string) =>
    /^[0-9]{4}([A-Z][a-z]{2}|Bi)?W[0-9]+$/.test(periodId)

const isDaily = (periodId: string) => /^[0-9]{8}$/.test(periodId)

type ParseFixedPeriodId = (args: {
    periodId: string
    calendar: SupportedCalendar
}) => FixedPeriod

const parseFixedPeriodId: ParseFixedPeriodId = ({ periodId, calendar }) => {
    if (isYearly(periodId)) {
        const year = parseInt(periodId.substring(0, 4), 10)
        const periodType = getYearlyFixedPeriodTypeForPeriodId(periodId)
        return buildYearlyFixedPeriod({ year, periodType, calendar })
    }

    if (isMonthly(periodId)) {
        const periodType = getMonthlyFixedPeriodTypeForPeriodId(periodId)
        const year = parseInt(periodId.substring(0, 4), 10)
        const index = extractMonthlyIndexFromPeriodId(periodId)
        const month = computeMonthFromMonthlyIndex({ periodType, index })

        return buildMonthlyFixedPeriod({
            periodType,
            month,
            year,
            calendar,
        })
    }

    if (isWeekly(periodId)) {
        const year = parseInt(periodId.substring(0, 4), 10)
        const periodType = getWeeklyFixedPeriodTypeForPeriodId(periodId)
        const weeklyPeriodsForYear = generateFixedPeriods({
            year,
            periodType,
            calendar,
        })

        const foundThisYear = weeklyPeriodsForYear.find(
            ({ id }) => id === periodId
        )

        if (foundThisYear) {
            return foundThisYear
        }

        // If the period is not in this year, it might have started at the
        // end of last year but is still considered the first week of this
        // year
        const [lastPeriodOfLastYear] = generateFixedPeriods({
            year: year - 1,
            periodType,
            calendar,
        }).slice(-1)

        if (lastPeriodOfLastYear.id === periodId) {
            return lastPeriodOfLastYear
        }

        throw new Error(
            `Couldn't find a weekly period for weekly period id "${periodId}"`
        )
    }

    if (isDaily(periodId)) {
        const year = periodId.substring(0, 4)
        const month = periodId.substring(4, 6)
        const day = periodId.substring(6)
        const date = Temporal.PlainDate.from(`${year}-${month}-${day}`)

        return buildDailyFixedPeriod({ date })
    }

    throw new Error(`Couldn't handle unknown period id "${periodId}"`)
}

export default parseFixedPeriodId
