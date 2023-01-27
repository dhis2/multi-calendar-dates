import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { formatYyyyMmDD, isCustomCalendar } from '../../utils/helpers'
import localisationHelpers from '../../utils/localisationHelpers'
import { FixedPeriod, PeriodIdentifier } from '../types'
import getYearlyStartMonthByPeriodType from './get-yearly-start-month-by-period-type'
import yearlyMonthValueKeys from './yearly-month-value-keys'

type BuildYearlyFixedPeriod = (args: {
    periodType: PeriodIdentifier
    year: number
    locale?: string
    calendar: SupportedCalendar
}) => FixedPeriod

const buildYearlyFixedPeriod: BuildYearlyFixedPeriod = ({
    periodType,
    year,
    locale = 'en',
    calendar,
}) => {
    const month = getYearlyStartMonthByPeriodType(periodType)
    const value = buildId({ periodType, year, month })
    const monthDateNumber = month.toString().padStart(2, '0')
    const startDate = Temporal.PlainDate.from(`${year}-${monthDateNumber}-01`)
    const endDate = startDate.add({ years: 1 }).subtract({ days: 1 })

    return {
        periodType,
        id: value,
        iso: value,
        name: buildLabel(periodType, startDate, {
            locale,
            calendar,
        }),
        startDate: formatYyyyMmDD(startDate, 'startOfMonth'),
        endDate: formatYyyyMmDD(endDate, 'endOfMonth'),
    }
}

export default buildYearlyFixedPeriod

type BuildId = (args: {
    periodType: PeriodIdentifier
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

const isFinancialYear = (periodType: PeriodIdentifier) => {
    return periodType.startsWith('FY')
}

const buildLabel = (
    periodType: PeriodIdentifier,
    currentYearDate: Temporal.PlainDate,
    options: { locale: string; calendar: SupportedCalendar }
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
