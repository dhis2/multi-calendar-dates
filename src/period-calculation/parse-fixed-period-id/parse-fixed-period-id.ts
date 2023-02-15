import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { fromAnyDate, getCustomCalendarIfExists } from '../../utils/index'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { generateFixedPeriods } from '../generate-fixed-periods/index'
import monthNumbers from '../month-numbers'
import { FixedPeriod } from '../types'
import {
    buildYearlyFixedPeriod,
    yearlyMonthValueKeys,
} from '../yearly-periods/index'
import getMonthlyFixedPeriodTypeForPeriodId from './get-monthly-fixed-period-type-for-period-id'
import getWeeklyFixedPeriodTypeForPeriodId from './get-weekly-fixed-period-type-for-period-id'
import getYearlyFixedPeriodTypeForPeriodId from './get-yearly-fixed-period-type-for-period-id'

type ParseFixedPeriodId = (args: {
    periodId: string
    calendar: SupportedCalendar
    locale?: string
}) => FixedPeriod

const parseFixedPeriodId: ParseFixedPeriodId = ({
    periodId,
    calendar: requestedCalendar,
    locale = 'en',
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar

    if (isYearly(periodId)) {
        const year = parseInt(periodId.substring(0, 4), 10)
        const periodType = getYearlyFixedPeriodTypeForPeriodId(periodId)
        return buildYearlyFixedPeriod({ year, periodType, calendar, locale })
    }

    if (isMonthly(periodId)) {
        const periodType = getMonthlyFixedPeriodTypeForPeriodId(periodId)
        const year = parseInt(periodId.substring(0, 4), 10)

        const monthlyPeriodsForYear = generateFixedPeriods({
            periodType,
            year,
            calendar,
            locale,
        })

        const foundThisYear = monthlyPeriodsForYear.find(
            ({ id }) => id === periodId
        )

        if (foundThisYear) {
            return foundThisYear
        }

        // If we can't find the period in "this" year, it is in the next year.
        // E.g. 2023NovemberQ4 is actually in 2024
        const monthlyPeriodsForNextYear = generateFixedPeriods({
            year: year + 1,
            periodType,
            calendar,
            locale,
        }).slice(-1)

        const foundNextYear = monthlyPeriodsForNextYear.find(
            ({ id }) => id === periodId
        )

        if (!foundNextYear) {
            throw new Error(
                `Couldn't find a monthly period for weekly period id "${periodId}"`
            )
        }

        return foundNextYear
    }

    if (isWeekly(periodId)) {
        const year = parseInt(periodId.substring(0, 4), 10)
        const periodType = getWeeklyFixedPeriodTypeForPeriodId(periodId)
        const weeklyPeriodsForYear = generateFixedPeriods({
            year,
            periodType,
            calendar,
            locale,
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
            locale,
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
        const date = fromAnyDate({ date: `${year}-${month}-${day}`, calendar })

        return buildDailyFixedPeriod({ date, locale, calendar })
    }

    throw new Error(`Couldn't handle unknown period id "${periodId}"`)
}

export default parseFixedPeriodId

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

const isWeekly = (periodId: string) =>
    /^[0-9]{4}([A-Z][a-z]{2}|Bi)?W[0-9]+$/.test(periodId)

const isDaily = (periodId: string) => /^[0-9]{8}$/.test(periodId)
