import { Temporal } from '@js-temporal/polyfill'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GetFollowingFixedPeriodsDaily = (args: {
    period: FixedPeriod
    count: number
}) => FixedPeriod[]

const getFollowingFixedPeriodsDaily: GetFollowingFixedPeriodsDaily = ({
    period,
    count,
}) => {
    const startDate = Temporal.PlainDate.from(period.startDate)
    const followingPeriods: FixedPeriod[] = []

    let prevDate = startDate
    for (let i = 0; i < count; ++i) {
        const nextDay = prevDate.add({ days: 1 })
        const nextPeriod = buildDailyFixedPeriod({ date: nextDay })
        followingPeriods.push(nextPeriod)
        prevDate = nextDay
    }

    return followingPeriods
}

export default getFollowingFixedPeriodsDaily
