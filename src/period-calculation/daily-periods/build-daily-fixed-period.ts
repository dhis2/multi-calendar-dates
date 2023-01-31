import { Temporal } from '@js-temporal/polyfill'
import { formatYyyyMmDD } from '../../utils/helpers'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { FixedPeriod } from '../types'

type BuildDailyFixedPeriod = (args: { date: Temporal.PlainDate }) => FixedPeriod

const buildDailyFixedPeriod: BuildDailyFixedPeriod = ({ date }) => {
    const year = date.year
    const nextDayMonthLabel = String(date.month).padStart(2, '0')
    const nextDayLabel = String(date.day).padStart(2, '0')
    const value = `${year}${nextDayMonthLabel}${nextDayLabel}`

    return {
        periodType: FIXED_PERIOD_TYPES.DAILY,
        id: value,
        iso: value,
        name: formatYyyyMmDD(date),
        displayName: formatYyyyMmDD(date),
        startDate: formatYyyyMmDD(date),
        endDate: formatYyyyMmDD(date),
    }
}

export default buildDailyFixedPeriod
