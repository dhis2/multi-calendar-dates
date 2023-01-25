import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import {
    MONTHLY_OFFSET_PERIOD_TYPES,
    QUARTERLY_PERIOD_TYPES,
    SIXMONTHLY_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod, GeneratedPeriodsFunc, PeriodIdentifier } from '../types'
import buildMonthlyPeriod from './build-monthly-period'
import getMonthInfo from './get-month-info'
import getMonthsToAdd from './get-months-to-add'

const NEPALI_FIRST_DAY_IN_MONTH = 14

export const getMonthlyPeriods: GeneratedPeriodsFunc = ({
    year,
    calendar,
    periodType,
    locale = 'en',
}) => {
    let currentMonth = Temporal.PlainDate.from({
        year,
        month: getStartingMonth(periodType),
        day: calendar.toString() === 'nepali' ? NEPALI_FIRST_DAY_IN_MONTH : 1,
        calendar,
    })

    const months: FixedPeriod[] = []
    const monthToAdd = getMonthsToAdd(periodType)

    let index = 1

    while (
        currentMonth.year === year ||
        needsExtraMonth(periodType, months.length)
    ) {
        const ignoreMonth = isEthiopic13thMonth(calendar, currentMonth)

        if (!ignoreMonth) {
            const period = buildMonthlyPeriod({
                periodType,
                month: currentMonth,
                year,
                index,
                calendar,
                locale,
            })

            months.push(period)
        }

        const nextMonth = currentMonth.add({ months: monthToAdd })
        currentMonth = Temporal.PlainDate.from(nextMonth)
        index++
    }

    return months
}

/**
 * special cases where we ignore a month
 */
const isEthiopic13thMonth = (
    calendar: SupportedCalendar,
    date: Temporal.PlainDate
) => {
    // in Ethiopic calendar, for periods more than bi-weekly, we ignore the 13th month
    if (calendar === 'ethiopic' && date.month === 13) {
        return true
    }

    return false
}

const getStartingMonth = (periodType: PeriodIdentifier): number => {
    return MONTHLY_OFFSET_PERIOD_TYPES.includes(periodType)
        ? getMonthInfo(periodType).value
        : 1
}

function needsExtraMonth(periodType: PeriodIdentifier, length: number) {
    if (SIXMONTHLY_PERIOD_TYPES.includes(periodType)) {
        return length < 2
    }

    if (QUARTERLY_PERIOD_TYPES.includes(periodType)) {
        return length < 4
    }

    return false
}
