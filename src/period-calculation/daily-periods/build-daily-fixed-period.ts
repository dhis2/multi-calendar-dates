import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { formatDate, localisationHelpers } from '../../utils/index'
import { FixedPeriod } from '../types'

const { localiseDateLabel } = localisationHelpers

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
    const displayName = localiseDateLabel(
        date,
        { calendar, locale },
        { dateStyle: 'long' }
    )

    return {
        periodType: 'DAILY',
        id: value,
        iso: value,
        displayName,
        name: formatDate(date),
        startDate: formatDate(date),
        endDate: formatDate(date),
    }
}

export default buildDailyFixedPeriod
