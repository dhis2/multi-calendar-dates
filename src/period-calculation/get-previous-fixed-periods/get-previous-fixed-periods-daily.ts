import { Temporal } from '@js-temporal/polyfill'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GetPreviousFixedPeriodsDaily = (args: {
    period: FixedPeriod
    count: number
}) => FixedPeriod[]

const getPreviousFixedPeriodsDaily: GetPreviousFixedPeriodsDaily = ({
    period,
    count,
}) => {
    const startDate = Temporal.PlainDate.from(period.startDate)
    const previousPeriods: FixedPeriod[] = []

    for (let i = 0; i < count; ++i) {
        const prevDay = startDate.subtract({ days: i + 1 })
        const prevPeriod = buildDailyFixedPeriod({ date: prevDay })
        previousPeriods.unshift(prevPeriod)
    }

    return previousPeriods
}

export default getPreviousFixedPeriodsDaily
