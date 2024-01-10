import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import {
    fromAnyDate,
    formatYyyyMmDD,
    isCustomCalendar,
} from '../../utils/index'
import localisationHelpers from '../../utils/localisationHelpers'
import { financialYearFixedPeriodTypes } from '../period-type-groups'
import { FixedPeriod, PeriodType } from '../types'
import getYearlyStartMonthByPeriodType from './get-yearly-start-month-by-period-type'
import yearlyMonthValueKeys from './yearly-month-value-keys'

type BuildYearlyFixedPeriod = (args: {
    periodType: PeriodType
    year: number
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const buildYearlyFixedPeriod: BuildYearlyFixedPeriod = ({
    periodType,
    year,
    locale,
    calendar,
}) => {
    const month = getYearlyStartMonthByPeriodType(periodType)
    const value = buildId({ periodType, year, month })
    const monthDateNumber = month.toString().padStart(2, '0')
    const startDate = fromAnyDate({
        date: `${year}-${monthDateNumber}-01`,
        calendar,
    })

    // @TODO: startDate.add({ years: 1 }).subtract({ days: 1 }) produces
    // wrong values when using nepali calendar
    const endDate = fromAnyDate({
        date: `${year + 1}-${monthDateNumber}-01`,
        calendar,
    }).subtract({ days: 1 })

    const name = buildLabel(periodType, startDate, { locale, calendar })

    return {
        periodType,
        id: value,
        iso: value,
        name,
        displayName: name,
        startDate: formatYyyyMmDD(startDate, 'startOfMonth'),
        endDate: formatYyyyMmDD(endDate, 'endOfMonth'),
    }
}

export default buildYearlyFixedPeriod

type BuildId = (args: {
    periodType: PeriodType
    year: number
    month: number
}) => string

const buildId: BuildId = ({ periodType, year, month }) => {
    if (periodType === 'YEARLY') {
        return year.toString()
    }
    // financial year
    if (isFinancialYear(periodType)) {
        const yearType = yearlyMonthValueKeys[month]
        return `${year}${yearType}`
    }

    throw new Error(
        `can not build value for unrecognised yearly type "${periodType}"`
    )
}

const isFinancialYear = (periodType: PeriodType) => {
    return financialYearFixedPeriodTypes.includes(periodType)
}

const buildLabel = (
    periodType: PeriodType,
    currentYearDate: Temporal.PlainDate,
    options: {
        locale: string
        calendar: SupportedCalendar
    }
) => {
    if (periodType === 'YEARLY') {
        return currentYearDate.year.toString()
    }

    if (isCustomCalendar(options.calendar)) {
        return buildLabelForCustomCalendar(currentYearDate, options)
    }
    const format = {
        month: 'long' as const,
        year: 'numeric' as const,
        calendar: options.calendar,
    }
    const fromYear = localisationHelpers.localiseMonth(
        currentYearDate,
        options,
        format
    )

    const toYear = localisationHelpers.localiseMonth(
        currentYearDate.add({ months: currentYearDate.monthsInYear - 1 }),
        options,
        format
    )

    let result = `${fromYear} - ${toYear}`

    // needed for Ethiopic calendar
    result = result.replace(/ERA\d+\s*/g, '').trim()

    return result
}

const buildLabelForCustomCalendar = (
    date: Temporal.PlainDate,
    options: { locale: string; calendar: SupportedCalendar }
) => {
    const localiseMonth = (dateToDisplay: Temporal.PlainDate) =>
        `${localisationHelpers.localiseMonth(dateToDisplay, options, {})} ${
            dateToDisplay.year
        }`

    const nextYearDate = Temporal.PlainDate.from({
        year: date.year + 1,
        month: date.month - 1,
        day: 1,
        calendar: options.calendar,
    })
    const result = `${localiseMonth(date)} - ${localiseMonth(nextYearDate)}`

    return result
}
