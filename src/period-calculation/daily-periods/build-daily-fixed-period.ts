import { Temporal } from '@js-temporal/polyfill'
import { formatYyyyMmDD } from '../../utils/helpers'

const buildDailyFixedPeriod = ({ date }: { date: Temporal.PlainDate }) => {
    const year = date.year
    const nextDayMonthLabel = String(date.month).padStart(2, '0')
    const nextDayLabel = String(date.day).padStart(2, '0')
    const value = `${year}${nextDayMonthLabel}${nextDayLabel}`

    return {
        id: value,
        iso: value,
        name: formatYyyyMmDD(date),
        startDate: formatYyyyMmDD(date),
        endDate: formatYyyyMmDD(date),
    }
}

export default buildDailyFixedPeriod
