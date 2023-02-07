import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import {
    fromAnyDate,
    getFirstDayNumberOfMonthByCalendarType,
} from '../../utils/index'
import {
    buildMonthlyFixedPeriod,
    getMonthInfoByPeriodType,
} from '../monthly-periods/index'
import {
    FIXED_PERIOD_TYPES,
    MONTHLY_OFFSET_FIXED_PERIOD_TYPES,
    QUARTERLY_FIXED_PERIOD_TYPES,
    SIXMONTHLY_FIXED_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod, GeneratedPeriodsFunc, PeriodIdentifier } from '../types'
import isExcludedPeriod from './is-excluded-period'

const generateFixedPeriodsMonthly: GeneratedPeriodsFunc = ({
    year,
    calendar,
    periodType,
    excludeDay: _excludeDay,
    locale,
}) => {
    const excludeDay = _excludeDay
        ? fromAnyDate({ date: _excludeDay, calendar })
        : null

    let currentMonth = Temporal.PlainDate.from({
        year,
        month: getStartingMonth(periodType),
        day: getFirstDayNumberOfMonthByCalendarType(
            calendar.toString() as SupportedCalendar
        ),
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
                month: currentMonth,
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
        currentMonth = fromAnyDate({ date: nextMonth, calendar })
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
    return MONTHLY_OFFSET_FIXED_PERIOD_TYPES.includes(periodType)
        ? getMonthInfoByPeriodType(periodType).value
        : 1
}

function needsExtraMonth(periodType: PeriodIdentifier, length: number) {
    if (SIXMONTHLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return length < 2
    }

    if (QUARTERLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return length < 4
    }

    return false
}

const getMonthsToAdd = (periodType: PeriodIdentifier) => {
    if (SIXMONTHLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return 6
    }
    if (QUARTERLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return 3
    }
    if (periodType === FIXED_PERIOD_TYPES.MONTHLY) {
        return 1
    }
    if (periodType === FIXED_PERIOD_TYPES.BIMONTHLY) {
        return 2
    }

    throw new Error(`unrecognised monthly period type ${periodType}`)
}

export default generateFixedPeriodsMonthly
