import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetFollowingFixedPeriodsYearly = (args: {
    period: FixedPeriod
    calendar: SupportedCalendar
    count: number
    locale?: string
}) => FixedPeriod[]

const getFollowingFixedPeriodsYearly: GetFollowingFixedPeriodsYearly = ({
    period,
    calendar,
    count,
    locale,
}) => {
    const endYear = Temporal.PlainDate.from(period.startDate).year + count
    return generateFixedPeriodsYearly({
        year: endYear,
        calendar,
        yearsCount: count,
        periodType: period.periodType,
        locale,
    }).reverse()
}

export default getFollowingFixedPeriodsYearly
