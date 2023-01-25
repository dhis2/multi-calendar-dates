import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import {
    formatYyyyMmDD,
    isCustomCalendar,
    padWithZeroes,
} from '../../utils/helpers'
import localisationHelpers from '../../utils/localisationHelpers'
import monthNumbers from '../month-numbers'
import {
    MONTHLY_OFFSET_PERIOD_TYPES,
    MULTI_MONTH_PERIOD_TYPES,
    QUARTERLY_PERIOD_TYPES,
    SIXMONTHLY_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod, GeneratedPeriodsFunc, PeriodIdentifier } from '../types'

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

type buildMonthlyPeriodArgs = {
    periodType: PeriodIdentifier
    month: Temporal.PlainDate
    year: number
    index: number
    calendar: SupportedCalendar
    locale?: string
}

const buildMonthlyPeriod = ({
    periodType,
    month,
    year,
    index,
    calendar,
    locale = 'en',
}: buildMonthlyPeriodArgs) => {
    const monthToAdd = getMonthsToAdd(periodType)
    const nextMonth = month.add({ months: monthToAdd })
    const id = buildId({ periodType, currentMonth: month, year, index })

    return {
        id,
        iso: id,
        name: buildLabel({
            periodType,
            month,
            locale,
            calendar,
            nextMonth: nextMonth.subtract({ months: 1 }), // when we display, we want to show the range using previous month
            index,
        }),
        ...buildStartAndEndDate(month, nextMonth),
    }
}

const buildStartAndEndDate = (
    currentMonth: Temporal.PlainDate,
    nextMonth: Temporal.PlainDate
) => {
    if (currentMonth.calendar === ('ethiopic' as Temporal.CalendarLike)) {
        console.warn(
            'todo: confirm the special cases for the 13th month with Abyot, then update the start/end dates for Ethiopic calendar'
        )
    }
    const endDate = Temporal.PlainDate.from({
        year: nextMonth.year,
        month: nextMonth.month,
        day: 1,
        calendar: nextMonth.calendar,
    }).subtract({ days: 1 })
    return {
        startDate: formatYyyyMmDD(currentMonth, 'startOfMonth'),
        endDate: formatYyyyMmDD(endDate, 'endOfMonth'),
    }
}

type BuildLabelFunc = (options: {
    periodType: PeriodIdentifier
    month: Temporal.PlainDate
    nextMonth: Temporal.PlainDate
    index: number
    locale: string
    calendar: SupportedCalendar
}) => string

const buildLabel: BuildLabelFunc = (options) => {
    const { periodType, month, nextMonth, calendar, locale } = options

    if (isCustomCalendar(calendar)) {
        return buildLabelForCustomCalendar(options)
    }

    const withYearFormat = {
        month: 'long' as const,
        year: 'numeric' as const,
        calendar,
    }
    const monthOnlyFormat = {
        month: 'long' as const,
        calendar,
    }

    let result = ''

    if (MULTI_MONTH_PERIOD_TYPES.includes(periodType)) {
        const format =
            month.year === nextMonth.year ? monthOnlyFormat : withYearFormat
        result = `${month.toLocaleString(
            locale,
            format
        )} - ${nextMonth.toLocaleString(locale, withYearFormat)}`
    } else {
        result = `${month.toLocaleString(locale, withYearFormat)}`
    }

    // needed for ethiopic calendar - the default formatter adds the era, which is not what we want in DHIS2
    result = result.replace(/ERA\d+\s*/g, '').trim()
    return result
}

const buildLabelForCustomCalendar: BuildLabelFunc = ({
    periodType,
    month,
    nextMonth,
    calendar,
    locale,
}) => {
    let result = ''

    if (MULTI_MONTH_PERIOD_TYPES.includes(periodType)) {
        const showYear = month.year !== nextMonth.year
        result = `${localisationHelpers.localiseMonth(
            month,
            { locale, calendar },
            {}
        )}${
            showYear ? ` ${month.year}` : ''
        } - ${localisationHelpers.localiseMonth(
            nextMonth,
            { locale, calendar },
            {}
        )} ${nextMonth.year}`
    } else {
        result = `${localisationHelpers.localiseMonth(
            month,
            { locale, calendar },
            {}
        )} ${nextMonth.year}`
    }
    return result
}

const buildId: (options: {
    periodType: PeriodIdentifier
    currentMonth: Temporal.PlainDate
    year: number
    index: number
}) => string = ({ periodType, currentMonth, year, index }) => {
    if (periodType === 'BIMONTHLY') {
        return `${year}${padWithZeroes(index)}B`
    }
    if (periodType === 'QUARTERLY') {
        return `${year}Q${index}`
    }
    if (periodType === 'SIXMONTHLY') {
        return `${year}S${index}`
    }

    if (QUARTERLY_PERIOD_TYPES.includes(periodType)) {
        const month = getMonthInfo(periodType)?.name
        return `${year}${month}Q${index}`
    }

    if (SIXMONTHLY_PERIOD_TYPES.includes(periodType)) {
        const month = getMonthInfo(periodType)?.name
        return `${year}${month}S${index}`
    }

    return `${year}${padWithZeroes(currentMonth.month)}`
}
