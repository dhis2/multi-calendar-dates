import { SupportedCalendar } from '../../types'
import {
    FIXED_PERIOD_TYPES,
    MONTLY_FIXED_PERIOD_TYPES,
    WEEKLY_FIXED_PERIOD_TYPES,
    YEARLY_FIXED_PERIOD_TYPES,
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

    if (count < 0) {
        throw new Error(
            `Can not generate following fixed periods with a negative count, received "${count}"`
        )
    }

    if (periodType === FIXED_PERIOD_TYPES.DAILY) {
        return getFollowingFixedPeriodsDaily({ period, count })
    }

    if (WEEKLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsWeekly({ period, calendar, count })
    }

    if (MONTLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsMonthly({ period, calendar, count })
    }

    if (YEARLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsYearly({ period, calendar, count })
    }

    throw new Error(
        `Can not generate following fixed period for unrecognised period type "${periodType}"`
    )
}

export default getFollowingFixedPeriods
