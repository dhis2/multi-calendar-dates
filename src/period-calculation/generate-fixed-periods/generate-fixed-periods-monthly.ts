import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { getStartingMonthByPeriodType } from '../get-starting-month-for-period-type'
import monthNumbers from '../month-numbers'
import { buildMonthlyFixedPeriod } from '../monthly-periods/index'
import {
    monthlyOffsetFixedPeriodTypes,
    quarterlyFixedPeriodTypes,
    sixmonthlyFixedPeriodTypes,
} from '../period-type-groups'
import { FixedPeriod, PeriodType } from '../types'
import doesPeriodEndBefore from './does-period-end-before'

type GenerateFixedPeriodsMonthly = (options: {
    year: number
    periodType: PeriodType
    calendar: SupportedCalendar
    locale: string
    endsBefore?: Temporal.PlainDate
}) => Array<FixedPeriod>

const generateFixedPeriodsMonthly: GenerateFixedPeriodsMonthly = ({
    year,
    calendar,
    periodType,
    endsBefore,
    locale,
}) => {
    let currentMonth = Temporal.PlainDate.from({
        year,
        month: getStartingMonth(periodType),
        // this should really just be 1 but have to set it to 14th because of a
        // quirk in custom calendars
        // @TODO: discuss this with the Temporal team
        day: calendar.toString() === 'nepali' ? 14 : 1,
        calendar,
    })

    const months: FixedPeriod[] = []

    while (
        currentMonth.year === year ||
        needsExtraMonth(periodType, months.length)
    ) {
        const monthToAdd = getMonthsToAdd({
            periodType,
            currentMonth: currentMonth.month,
            year,
            calendar,
        })
        const ignoreMonth = isEthiopic13thMonth(calendar, currentMonth)

        if (!ignoreMonth) {
            const period = buildMonthlyFixedPeriod({
                periodType,
                month: currentMonth,
                year,
                calendar,
                locale: locale as string,
            })

            if (
                endsBefore &&
                doesPeriodEndBefore({ period, date: endsBefore, calendar })
            ) {
                break
            }

            months.push(period)
        }

        const nextMonth = currentMonth.add({ months: monthToAdd })
        currentMonth = fromAnyDate({ date: nextMonth, calendar })
    }

    return months
}

const isEthiopic13thMonth = (
    calendar: SupportedCalendar,
    date: Temporal.PlainDate
) => {
    return calendar === 'ethiopic' && date.month === 13
}

const getStartingMonth = (periodType: PeriodType) => {
    if (monthlyOffsetFixedPeriodTypes.includes(periodType)) {
        const month = getStartingMonthByPeriodType(periodType)
        return monthNumbers[month].value
    }

    return 1
}

type NeedsExtraMonth = (periodType: PeriodType, length: number) => boolean

const needsExtraMonth: NeedsExtraMonth = (periodType, length) => {
    if (sixmonthlyFixedPeriodTypes.includes(periodType)) {
        return length < 2
    }

    if (quarterlyFixedPeriodTypes.includes(periodType)) {
        return length < 4
    }

    return false
}

type GetMonthsToAdd = (options: {
    periodType: PeriodType
    currentMonth: number
    year: number
    calendar: SupportedCalendar
}) => number

const getMonthsToAdd: GetMonthsToAdd = ({ periodType }) => {
    if (sixmonthlyFixedPeriodTypes.includes(periodType)) {
        return 6
    }

    if (quarterlyFixedPeriodTypes.includes(periodType)) {
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

export default generateFixedPeriodsMonthly
