import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import {
    formatYyyyMmDD,
    isCustomCalendar,
    padWithZeroes,
} from '../../utils/helpers'
import { localisationHelpers } from '../../utils/index'
import { computeMonthlyIndex } from '../monthly-periods/index'
import {
    FIXED_PERIOD_TYPES,
    MULTI_MONTH_FIXED_PERIOD_TYPES,
    QUARTERLY_FIXED_PERIOD_TYPES,
    SIXMONTHLY_FIXED_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod, PeriodIdentifier } from '../types'
import getMonthInfoByPeriodType from './get-month-info-by-period-type'

type BuildMonthlyFixedPeriod = (args: {
    periodType: PeriodIdentifier
    month: Temporal.PlainDate
    year: number
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod

const buildMonthlyFixedPeriod: BuildMonthlyFixedPeriod = ({
    periodType,
    month,
    year: yearArg,
    calendar,
    locale,
}) => {
    const index = computeMonthlyIndex({ periodType, month: month.month })
    const monthToAdd = getMonthsToAdd(periodType)
    const nextMonth = month.add({ months: monthToAdd })
    const id = buildId({
        periodType,
        currentMonth: month,
        year: yearArg,
        index,
    })

    if (month.calendar === ('ethiopic' as Temporal.CalendarLike)) {
        // @TODO(jira): Create issue
        // @TODO: Confirm the special cases for the 13th month with Abyot, then
        // update the start/end dates for Ethiopic calendar'
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

    const name = buildLabel({
        periodType,
        month,
        locale,
        calendar,
        nextMonth: nextMonth.subtract({ months: 1 }), // when we display, we want to show the range using previous month
        index,
    })

    return {
        periodType,
        id,
        iso: id,
        name,
        displayName: name,
        startDate: formatYyyyMmDD(month, 'startOfMonth'),
        endDate: formatYyyyMmDD(endDate, 'endOfMonth'),
    }
}

export default buildMonthlyFixedPeriod

const buildId: (options: {
    periodType: PeriodIdentifier
    currentMonth: Temporal.PlainDate
    year: number
    index: number
}) => string = ({ periodType, currentMonth, year, index }) => {
    if (periodType === FIXED_PERIOD_TYPES.BIMONTHLY) {
        return `${year}${padWithZeroes(index)}B`
    }
    if (periodType === FIXED_PERIOD_TYPES.QUARTERLY) {
        return `${year}Q${index}`
    }
    if (periodType === FIXED_PERIOD_TYPES.SIXMONTHLY) {
        return `${year}S${index}`
    }

    if (QUARTERLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        const month = getMonthInfoByPeriodType(periodType)?.name
        return `${year}${month}Q${index}`
    }

    if (SIXMONTHLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        const month = getMonthInfoByPeriodType(periodType)?.name
        return `${year}${month}S${index}`
    }

    return `${year}${padWithZeroes(currentMonth.month)}`
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

    if (MULTI_MONTH_FIXED_PERIOD_TYPES.includes(periodType)) {
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

    if (MULTI_MONTH_FIXED_PERIOD_TYPES.includes(periodType)) {
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
