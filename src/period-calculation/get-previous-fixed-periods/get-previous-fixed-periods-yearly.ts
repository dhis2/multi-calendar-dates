import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetPreviousFixedPeriodsYearly = (args: {
    period: FixedPeriod
    calendar: SupportedCalendar
    count: number
    locale?: string
}) => FixedPeriod[]

const getPreviousFixedPeriodsYearly: GetPreviousFixedPeriodsYearly = ({
    period,
    calendar,
    count,
    locale,
}) => {
    const endYear = Temporal.PlainDate.from(period.startDate).year - 1
    return generateFixedPeriodsYearly({
        year: endYear,
        calendar,
        yearsCount: count,
        periodType: period.periodType,
        locale,
    })
}

export default getPreviousFixedPeriodsYearly
