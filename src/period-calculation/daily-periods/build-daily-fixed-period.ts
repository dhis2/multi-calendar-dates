import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { formatYyyyMmDD } from '../../utils/helpers'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { FixedPeriod } from '../types'

type BuildDailyFixedPeriod = (args: {
    date: Temporal.PlainDate
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod

const buildDailyFixedPeriod: BuildDailyFixedPeriod = ({
    date,
    calendar,
    locale,
}) => {
    const year = date.year
    const nextDayMonthLabel = String(date.month).padStart(2, '0')
    const nextDayLabel = String(date.day).padStart(2, '0')
    const value = `${year}${nextDayMonthLabel}${nextDayLabel}`
    const name = date.toLocaleString(locale, {
        month: 'long' as const,
        year: 'numeric' as const,
        calendar,
    })

    return {
        periodType: FIXED_PERIOD_TYPES.DAILY,
        id: value,
        iso: value,
        name,
        displayName: name,
        startDate: formatYyyyMmDD(date),
        endDate: formatYyyyMmDD(date),
    }
}

export default buildDailyFixedPeriod
