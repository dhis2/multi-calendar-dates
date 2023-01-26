import { Temporal } from '@js-temporal/polyfill'
import { buildDailyFixedPeriod } from '../daily-periods/index'

const getFixedPeriodByDateDaily = ({ date: dateStr }: { date: string }) => {
    const date = Temporal.PlainDate.from(dateStr)
    return buildDailyFixedPeriod({ date })
}

export default getFixedPeriodByDateDaily
