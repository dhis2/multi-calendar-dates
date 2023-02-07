import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetPreviousFixedPeriodsYearly = (args: {
    period: FixedPeriod
    calendar: SupportedCalendar
    count: number
    locale: string
}) => FixedPeriod[]

const getPreviousFixedPeriodsYearly: GetPreviousFixedPeriodsYearly = ({
    period,
    calendar,
    count,
    locale,
}) => {
    const endYear = fromAnyDate({ date: period.startDate, calendar }).year - 1
    return generateFixedPeriodsYearly({
        year: endYear,
        calendar,
        yearsCount: count,
        periodType: period.periodType,
        locale,
    })
}

export default getPreviousFixedPeriodsYearly
