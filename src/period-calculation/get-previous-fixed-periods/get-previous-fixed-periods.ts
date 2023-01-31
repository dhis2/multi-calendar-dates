import { SupportedCalendar } from '../../types'
import {
    FIXED_PERIOD_TYPES,
    MONTLY_FIXED_PERIOD_TYPES,
    WEEKLY_FIXED_PERIOD_TYPES,
    YEARLY_FIXED_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod } from '../types'
import getPreviousFixedPeriodsDaily from './get-previous-fixed-periods-daily'
import getPreviousFixedPeriodsMonthly from './get-previous-fixed-periods-monthly'
import getPreviousFixedPeriodsWeekly from './get-previous-fixed-periods-weekly'
import getPreviousFixedPeriodsYearly from './get-previous-fixed-periods-yearly'

type GetPreviousFixedPeriods = (args: {
    period: FixedPeriod
    calendar: SupportedCalendar
    count?: number
}) => FixedPeriod[]

const getPreviousFixedPeriods: GetPreviousFixedPeriods = ({
    period,
    calendar,
    count = 1,
}) => {
    const { periodType } = period

    if (periodType === FIXED_PERIOD_TYPES.DAILY) {
        return getPreviousFixedPeriodsDaily({ period, count })
    }

    if (WEEKLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getPreviousFixedPeriodsWeekly({ period, calendar, count })
    }

    if (MONTLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getPreviousFixedPeriodsMonthly({ period, calendar, count })
    }

    if (YEARLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getPreviousFixedPeriodsYearly({ period, calendar, count })
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default getPreviousFixedPeriods
