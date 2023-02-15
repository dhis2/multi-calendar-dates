import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { getCustomCalendarIfExists } from '../../utils/index'
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
    locale?: string
}) => FixedPeriod[]

const getFollowingFixedPeriods: GetFollowingFixedPeriods = ({
    period,
    calendar: requestedCalendar,
    count = 1,
    locale = 'en',
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar

    const { periodType } = period
    const payload = { period, calendar, count, locale }

    if (count < 0) {
        throw new Error(
            `Can not generate following fixed periods with a negative count, received "${count}"`
        )
    }

    if (periodType === FIXED_PERIOD_TYPES.DAILY) {
        return getFollowingFixedPeriodsDaily(payload)
    }

    if (WEEKLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsWeekly(payload)
    }

    if (MONTLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsMonthly(payload)
    }

    if (YEARLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFollowingFixedPeriodsYearly(payload)
    }

    throw new Error(
        `Can not generate following fixed period for unrecognised period type "${periodType}"`
    )
}

export default getFollowingFixedPeriods
