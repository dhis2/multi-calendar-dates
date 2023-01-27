import { Temporal } from '@js-temporal/polyfill'
import { formatYyyyMmDD } from '../../utils/helpers'
import { FixedPeriod } from '../types'

type BuildDailyFixedPeriod = (args: { date: Temporal.PlainDate }) => FixedPeriod

const buildDailyFixedPeriod: BuildDailyFixedPeriod = ({ date }) => {
    const year = date.year
    const nextDayMonthLabel = String(date.month).padStart(2, '0')
    const nextDayLabel = String(date.day).padStart(2, '0')
    const value = `${year}${nextDayMonthLabel}${nextDayLabel}`

    return {
        periodType: 'DAILY',
        id: value,
        iso: value,
        name: formatYyyyMmDD(date),
        startDate: formatYyyyMmDD(date),
        endDate: formatYyyyMmDD(date),
    }
}

export default buildDailyFixedPeriod
