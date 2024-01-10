import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetAdjacentYearlyFixedPeriods = (args: {
    period: FixedPeriod
    calendar: SupportedCalendar
    steps: number
    locale: string
}) => FixedPeriod[]

const getAdjacentYearlyFixedPeriods: GetAdjacentYearlyFixedPeriods = ({
    period,
    calendar,
    steps,
    locale,
}) => {
    const count = Math.abs(steps)
    const startYear = parseInt(period.startDate.substring(0, 4), 10)

    /**
     * generateFixedPeriodsYearly generates year from the given year backwards
     * until as many periods as "yearsCount" have been generated
     */
    const year = steps > 0 ? startYear + count : startYear - 1

    const periods = generateFixedPeriodsYearly({
        year,
        calendar,
        yearsCount: count,
        periodType: period.periodType,
        locale,
    })

    return steps > 0 ? periods.reverse() : periods
}

export default getAdjacentYearlyFixedPeriods
