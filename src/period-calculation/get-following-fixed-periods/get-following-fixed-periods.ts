import { SupportedCalendar } from '../../types'
import {
    MONTLY_PERIOD_TYPES,
    WEEKLY_PERIOD_TYPES,
    YEARLY_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod } from '../types'
import getFollowingFixedPeriodsDaily from './get-following-fixed-periods-daily'
import getFollowingFixedPeriodsMonthly from './get-following-fixed-periods-monthly'
import getFollowingFixedPeriodsWeekly from './get-following-fixed-periods-weekly'
import getFollowingFixedPeriodsYearly from './get-following-fixed-periods-yearly'

type GetFollowingFixedPeriods = (args: {
    period: FixedPeriod
    calendar: SupportedCalendar
    count?: number
}) => FixedPeriod[]

const getFollowingFixedPeriods: GetFollowingFixedPeriods = ({
    period,
    calendar,
    count = 1,
}) => {
    const { periodType } = period

    if (periodType === 'DAILY') {
        return getFollowingFixedPeriodsDaily({ period, count })
    }

    if (WEEKLY_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsWeekly({ period, calendar, count })
    }

    if (MONTLY_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsMonthly({ period, calendar, count })
    }

    if (YEARLY_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsYearly({ period, calendar, count })
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default getFollowingFixedPeriods
