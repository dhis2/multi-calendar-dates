import { Temporal } from '@js-temporal/polyfill'
import { FixedPeriod, GeneratedPeriodsFunc } from '../types'
import buildDailyPeriod from './build-daily-period'

const getDailyPeriods: GeneratedPeriodsFunc = ({ year, calendar }) => {
    const day = Temporal.PlainDate.from({
        year,
        month: 1,
        day: 1,
        calendar,
    })

    const days: FixedPeriod[] = []

    for (let i = 0; i < day.daysInYear; i++) {
        const nextDay = day.add({ days: i })
        const period = buildDailyPeriod({ date: nextDay })
        days.push(period)
    }

    return days
}

export default getDailyPeriods
