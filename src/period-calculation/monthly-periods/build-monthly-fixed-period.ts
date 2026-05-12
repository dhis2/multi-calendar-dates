import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import {
    formatDate,
    isCustomCalendar,
    padWithZeroes,
} from '../../utils/helpers'
import { localisationHelpers } from '../../utils/index'
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
        startDate: formatDate(month, 'startOfMonth'),
        endDate: formatDate(endDate, 'endOfMonth'),
    }
}

export default buildMonthlyFixedPeriod

const buildId: (options: {
    periodType: PeriodType
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

    // Avoid Temporal.PlainDate.toLocaleString here: the polyfill can route
    // Gregorian dates through Intl with calendar: 'iso8601', which is broken
    // in some Chrome versions. Formatting the underlying ISO date directly
    // keeps Intl in charge of locale-specific month/year ordering.
    const intlCalendar: SupportedCalendar =
        calendar === 'iso8601' ? 'gregory' : calendar
    const toUtcDate = (date: Temporal.PlainDate) => {
        const iso = date.getISOFields()
        return new Date(
            Date.UTC(iso.isoYear, iso.isoMonth - 1, iso.isoDay, 12, 0, 0)
        )
    }
    const cleanLabel = (label: string) =>
        // The ERA suffix is added by some calendars (e.g. Ethiopic) and is
        // not desired in DHIS2 period labels.
        label.replace(/ERA\d+\s*/g, '').trim()
    const formatMonthName = (date: Temporal.PlainDate) =>
        cleanLabel(
            new Intl.DateTimeFormat(locale, {
                month: 'long',
                calendar: intlCalendar,
                timeZone: 'UTC',
            }).format(toUtcDate(date))
        )
    const formatMonthNameWithYear = (date: Temporal.PlainDate) =>
        cleanLabel(
            new Intl.DateTimeFormat(locale, {
                month: 'long',
                year: 'numeric',
                calendar: intlCalendar,
                timeZone: 'UTC',
            }).format(toUtcDate(date))
        )

    if (multiMonthFixedPeriodTypes.includes(periodType)) {
        const sameYear = month.year === nextMonth.year
        return sameYear
            ? `${formatMonthName(month)} - ${formatMonthNameWithYear(
                  nextMonth
              )}`
            : `${formatMonthNameWithYear(
                  month
              )} - ${formatMonthNameWithYear(nextMonth)}`
    }

    return formatMonthNameWithYear(month)
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
