import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import {
    formatYyyyMmDD,
    isCustomCalendar,
    padWithZeroes,
} from '../../utils/helpers'
import localisationHelpers from '../../utils/localisationHelpers'
import { computeMonthlyIndex } from '../monthly-periods/index'
import {
    MONTHLY_STANDARD_PERIOD_TYPES,
    MULTI_MONTH_PERIOD_TYPES,
    QUARTERLY_PERIOD_TYPES,
    SIXMONTHLY_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod, PeriodIdentifier } from '../types'
import getMonthInfoByPeriodType from './get-month-info-by-period-type'

type BuildMonthlyFixedPeriod = (args: {
    periodType: PeriodIdentifier
    month: number
    year: number
    calendar: SupportedCalendar
    locale?: string
}) => FixedPeriod

const buildMonthlyFixedPeriod: BuildMonthlyFixedPeriod = ({
    periodType,
    month: monthNr,
    year: yearArg,
    calendar,
    locale = 'en',
}) => {
    const index = computeMonthlyIndex({ periodType, month: monthNr })
    const year = computeStartYear({ periodType, year: yearArg, index })
    const monthToAdd = getMonthsToAdd(periodType)
    const monthStr = monthNr.toString().padStart(2, '0')
    const month = Temporal.PlainDate.from(`${year}-${monthStr}-01`)
    const nextMonth = month.add({ months: monthToAdd })
    const id = buildId({
        periodType,
        currentMonth: month,
        year: yearArg,
        index,
    })

    if (month.calendar === ('ethiopic' as Temporal.CalendarLike)) {
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
        periodType,
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
        const month = getMonthInfoByPeriodType(periodType)?.name
        return `${year}${month}Q${index}`
    }

    if (SIXMONTHLY_PERIOD_TYPES.includes(periodType)) {
        const month = getMonthInfoByPeriodType(periodType)?.name
        return `${year}${month}S${index}`
    }

    return `${year}${padWithZeroes(currentMonth.month)}`
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

type ComputeStartYear = (args: {
    periodType: PeriodIdentifier
    year: number
    index: number
}) => number

const computeStartYear: ComputeStartYear = ({ periodType, year, index }) => {
    if (MONTHLY_STANDARD_PERIOD_TYPES.includes(periodType)) {
        return year
    }

    if (periodType === 'QUARTERLYNOV') {
        return index === 1 ? year : year + 1
    }

    if (periodType === 'SIXMONTHLYNOV') {
        return index === 1 ? year : year + 1
    }

    // SIXMONTHLYAPR is always starts in the same year
    return year
}
