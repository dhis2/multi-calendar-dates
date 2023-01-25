import { Temporal } from '@js-temporal/polyfill'
import buildDailyPeriod from './build-daily-period'

const getDailyPeriodByDate = ({ date: dateStr }: { date: string }) => {
    const date = Temporal.PlainDate.from(dateStr)
    return buildDailyPeriod({ date })
}

export default getDailyPeriodByDate
