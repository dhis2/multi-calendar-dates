import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GetAdjacentDailyFixedPeriods = (args: {
    period: FixedPeriod
    steps: number
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod[]

const getAdjacentDailyFixedPeriods: GetAdjacentDailyFixedPeriods = ({
    period,
    steps,
    calendar,
    locale,
}) => {
    const startDate = fromAnyDate({ date: period.startDate, calendar })
    const adjacentPeriods: FixedPeriod[] = []

    const iterations = Math.abs(steps)
    for (let i = 0; i < iterations; ++i) {
        const days = i + 1
        const nextDay =
            steps > 0 ? startDate.add({ days }) : startDate.subtract({ days })

        const nextPeriod = buildDailyFixedPeriod({
            date: nextDay,
            calendar,
            locale,
        })

        steps > 0
            ? adjacentPeriods.push(nextPeriod)
            : adjacentPeriods.unshift(nextPeriod)
    }

    return adjacentPeriods
}

export default getAdjacentDailyFixedPeriods
