import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GetPreviousFixedPeriodsDaily = (args: {
    period: FixedPeriod
    count: number
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod[]

const getPreviousFixedPeriodsDaily: GetPreviousFixedPeriodsDaily = ({
    period,
    count,
    calendar,
    locale,
}) => {
    const startDate = fromAnyDate({ date: period.startDate, calendar })
    const previousPeriods: FixedPeriod[] = []

    for (let i = 0; i < count; ++i) {
        const prevDay = startDate.subtract({ days: i + 1 })
        const prevPeriod = buildDailyFixedPeriod({
            date: prevDay,
            calendar,
            locale,
        })
        previousPeriods.unshift(prevPeriod)
    }

    return previousPeriods
}

export default getPreviousFixedPeriodsDaily
