import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GetFollowingFixedPeriodsDaily = (args: {
    period: FixedPeriod
    count: number
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod[]

const getFollowingFixedPeriodsDaily: GetFollowingFixedPeriodsDaily = ({
    period,
    count,
    calendar,
    locale,
}) => {
    const startDate = fromAnyDate({ date: period.startDate, calendar })
    const followingPeriods: FixedPeriod[] = []

    for (let i = 0; i < count; ++i) {
        const nextDay = startDate.add({ days: i + 1 })
        const nextPeriod = buildDailyFixedPeriod({
            date: nextDay,
            calendar,
            locale,
        })
        followingPeriods.push(nextPeriod)
    }

    return followingPeriods
}

export default getFollowingFixedPeriodsDaily
