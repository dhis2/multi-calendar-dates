import monthNumbers from '../month-numbers'
import { yearlyMonthValueKeys } from '../yearly-periods/index'

const FinancialYearlyMonths = Object.values(yearlyMonthValueKeys)
    .slice(1)
    .join('|')
const yearlyRegExp = new RegExp(`^[0-9]{4}(${FinancialYearlyMonths})?$`)
export const isAnyYearlyPeriodId = (periodId: string) =>
    yearlyRegExp.test(periodId)

const monthNames = Object.values(monthNumbers)
    .map(({ name }) => name)
    .join('|')
const monthlyRegExps = [
    '^[0-9]{6}$',
    '^[0-9]{6}B$',
    `^[0-9]{4}(${monthNames})?Q[0-9]$`,
    `^[0-9]{4}(${monthNames})?S[0-9]$`,
].join('|')
const monthlyRegExp = new RegExp(monthlyRegExps)
export const isAnyMonthlyPeriodId = (periodId: string) =>
    monthlyRegExp.test(periodId)

export const isAnyWeeklyPeriodId = (periodId: string) =>
    /^[0-9]{4}([A-Z][a-z]{2}|Bi)?W[0-9]+$/.test(periodId)

export const isDailyPeriodId = (periodId: string) => /^[0-9]{8}$/.test(periodId)
