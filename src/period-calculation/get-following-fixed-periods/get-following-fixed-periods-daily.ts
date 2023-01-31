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

    for (let i = 0; i < count; ++i) {
        const nextDay = startDate.add({ days: i + 1 })
        const nextPeriod = buildDailyFixedPeriod({ date: nextDay })
        followingPeriods.push(nextPeriod)
    }

    return followingPeriods
}

export default getFollowingFixedPeriodsDaily
