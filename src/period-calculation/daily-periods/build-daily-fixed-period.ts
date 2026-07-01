import { Temporal } from '@js-temporal/polyfill-patched'
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
    // ERA\d+ is the old CLDR format (e.g. ERA0); AA/AM are the CLDR 48+ abbreviations (Amete Alem/Amete Mihret)
    const displayName = localiseDateLabel(
        date,
        { calendar, locale },
        { dateStyle: 'long' }
    )
        .replace(/\b(ERA\d+|AA|AM)\b\s*/g, '')
        .trim()

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
