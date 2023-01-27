import { Temporal } from '@js-temporal/polyfill'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod, GeneratedPeriodsFunc } from '../types'

const generateFixedPeriodsDaily: GeneratedPeriodsFunc = ({
    year,
    calendar,
    excludeDay: _excludeDay,
}) => {
    const excludeDay = _excludeDay ? Temporal.PlainDate.from(_excludeDay) : null
    const day = Temporal.PlainDate.from({
        year,
        month: 1,
        day: 1,
        calendar,
    })

    const days: FixedPeriod[] = []

    for (let i = 0; i < day.daysInYear; i++) {
        const nextDay = day.add({ days: i })

        if (excludeDay && Temporal.PlainDate.compare(nextDay, excludeDay) < 1) {
            break
        }

        const period = buildDailyFixedPeriod({ date: nextDay })
        days.push(period)
    }

    return days
}

export default generateFixedPeriodsDaily
