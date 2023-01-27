import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import monthNumbers from '../month-numbers'
import { buildMonthlyFixedPeriod } from '../monthly-periods/index'
import {
    MONTHLY_OFFSET_PERIOD_TYPES,
    QUARTERLY_PERIOD_TYPES,
    SIXMONTHLY_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod, GeneratedPeriodsFunc, PeriodIdentifier } from '../types'
import isExcludedPeriod from './is-excluded-period'

const NEPALI_FIRST_DAY_IN_MONTH = 14

const generateFixedPeriodsMonthly: GeneratedPeriodsFunc = ({
    year,
    calendar,
    periodType,
    excludeDay: _excludeDay,
    locale = 'en',
}) => {
    const excludeDay = _excludeDay ? Temporal.PlainDate.from(_excludeDay) : null
    let currentMonth = Temporal.PlainDate.from({
        year,
        month: getStartingMonth(periodType),
        day: calendar.toString() === 'nepali' ? NEPALI_FIRST_DAY_IN_MONTH : 1,
        calendar,
    })

    const months: FixedPeriod[] = []
    const monthToAdd = getMonthsToAdd(periodType)

    while (
        currentMonth.year === year ||
        needsExtraMonth(periodType, months.length)
    ) {
        const ignoreMonth = isEthiopic13thMonth(calendar, currentMonth)

        if (!ignoreMonth) {
            const period = buildMonthlyFixedPeriod({
                periodType,
                month: currentMonth.month,
                year,
                calendar,
                locale,
            })

            if (excludeDay && isExcludedPeriod({ period, excludeDay })) {
                break
            }

            months.push(period)
        }

        const nextMonth = currentMonth.add({ months: monthToAdd })
        currentMonth = Temporal.PlainDate.from(nextMonth)
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

const getMonthsToAdd = (periodType: PeriodIdentifier) => {
    if (SIXMONTHLY_PERIOD_TYPES.includes(periodType)) {
        return 6
    }
    if (QUARTERLY_PERIOD_TYPES.includes(periodType)) {
        return 3
    }
    if (periodType === 'MONTHLY') {
        return 1
    }
    if (periodType === 'BIMONTHLY') {
        return 2
    }

    throw new Error(`unrecognised monthly period type ${periodType}`)
}

const getMonthInfo = (periodType: PeriodIdentifier) => {
    const monthString = periodType.slice(-3)
    return monthNumbers[monthString as keyof typeof monthNumbers]
}

export default generateFixedPeriodsMonthly
