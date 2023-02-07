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
    locale?: string
}) => FixedPeriod[]

const getPreviousFixedPeriods: GetPreviousFixedPeriods = ({
    period,
    calendar,
    count = 1,
    locale = 'en',
}) => {
    const { periodType } = period
    const payload = { period, calendar, count, locale }

    if (periodType === FIXED_PERIOD_TYPES.DAILY) {
        return getPreviousFixedPeriodsDaily(payload)
    }

    if (WEEKLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getPreviousFixedPeriodsWeekly(payload)
    }

    if (MONTLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getPreviousFixedPeriodsMonthly(payload)
    }

    if (YEARLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getPreviousFixedPeriodsYearly(payload)
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default getPreviousFixedPeriods
