import { Temporal } from '@js-temporal/polyfill-patched'
import { SupportedCalendar } from '../../types'
import {
    formatDate,
    isCustomCalendar,
    padWithZeroes,
} from '../../utils/helpers'
import { localisationHelpers } from '../../utils/index'
import { AnyPlainDate } from '../../utils/plainDate'
import { getStartingMonthByPeriodType } from '../get-starting-month-for-period-type'
import monthNumbers from '../month-numbers'
import { computeMonthlyPeriodIndex } from '../monthly-periods/index'
import {
    multiMonthFixedPeriodTypes,
    quarterlyFixedPeriodTypes,
    sixmonthlyFixedPeriodTypes,
} from '../period-type-groups'
import { FixedPeriod, PeriodType } from '../types'

type BuildMonthlyFixedPeriod = (args: {
    periodType: PeriodType
    month: AnyPlainDate
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
    const index = computeMonthlyPeriodIndex({
        periodType,
        month: month.month,
        monthsInYear: month.monthsInYear,
    })
    const monthToAdd = getMonthsToAdd(periodType)
    const nextMonth = month.add({ months: monthToAdd })
    const id = buildId({
        periodType,
        currentMonth: month,
        year: yearArg,
        index,
    })

    if (month.calendarId === 'ethiopic') {
        // @TODO(jira): Create issue
        // @TODO: Confirm the special cases for the 13th month with Abyot, then
        // update the start/end dates for Ethiopic calendar'
        console.warn(
            'todo: confirm the special cases for the 13th month with Abyot, then update the start/end dates for Ethiopic calendar'
        )
    }

    const endDate = nextMonth.with({ day: 1 }).subtract({ days: 1 })

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
        startDate: formatDate(month, 'startOfMonth'),
        endDate: formatDate(endDate, 'endOfMonth'),
    }
}

export default buildMonthlyFixedPeriod

const buildId: (options: {
    periodType: PeriodType
    currentMonth: AnyPlainDate
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

    if (quarterlyFixedPeriodTypes.includes(periodType)) {
        const month =
            monthNumbers[getStartingMonthByPeriodType(periodType)].name
        return `${year}${month}Q${index}`
    }

    if (sixmonthlyFixedPeriodTypes.includes(periodType)) {
        const month =
            monthNumbers[getStartingMonthByPeriodType(periodType)].name
        return `${year}${month}S${index}`
    }

    return `${year}${padWithZeroes(currentMonth.month)}`
}

const getMonthsToAdd = (periodType: PeriodType) => {
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

type BuildLabelFunc = (options: {
    periodType: PeriodType
    month: AnyPlainDate
    nextMonth: AnyPlainDate
    index: number
    locale: string
    calendar: SupportedCalendar
}) => string

const buildLabel: BuildLabelFunc = (options) => {
    const { periodType, month, nextMonth, calendar, locale } = options

    if (isCustomCalendar(calendar)) {
        return buildLabelForCustomCalendar(options)
    }

    // isCustomCalendar(calendar) is false here, so month/nextMonth are
    // guaranteed to be real Temporal.PlainDate instances at runtime.
    const realMonth = month as Temporal.PlainDate
    const realNextMonth = nextMonth as Temporal.PlainDate

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

    if (multiMonthFixedPeriodTypes.includes(periodType)) {
        const format =
            realMonth.year === realNextMonth.year
                ? monthOnlyFormat
                : withYearFormat
        result = `${realMonth.toLocaleString(
            locale,
            format
        )} - ${realNextMonth.toLocaleString(locale, withYearFormat)}`
    } else {
        result = `${realMonth.toLocaleString(locale, withYearFormat)}`
    }

    // needed for ethiopic calendar - the default formatter adds the era, which is not what we want in DHIS2
    // ERA\d+ is the old CLDR format (e.g. ERA0); AA/AM are the CLDR 48+ abbreviations (Amete Alem/Amete Mihret)
    result = result.replace(/\b(ERA\d+|AA|AM)\b\s*/g, '').trim()
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

    if (multiMonthFixedPeriodTypes.includes(periodType)) {
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
