import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsMonthly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetFollowingFixedPeriodsMonthly = (args: {
    period: FixedPeriod
    count: number
    calendar: SupportedCalendar
}) => FixedPeriod[]

const getFollowingFixedPeriodsMonthly: GetFollowingFixedPeriodsMonthly = ({
    period,
    count,
    calendar,
}) => {
    // We need to get the year this way, can't use period.startDate as that
    // might be in the previous year (Week 1), can't use period.endDate as that
    // might be in the next year (Week 52/53)
    const startYear = parseInt(period.id.substring(0, 4), 10)
    const startDate = Temporal.PlainDate.from(period.startDate)
    const followingPeriods: FixedPeriod[] = []

    let curYear = startYear
    while (followingPeriods.length < count) {
        const periodsForYear = generateFixedPeriodsMonthly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            startingDay: 1,
        })

        const index =
            curYear === startYear
                ? periodsForYear.findIndex((curPeriod) => {
                      const curStartDate = Temporal.PlainDate.from(
                          curPeriod.startDate
                      )
                      return (
                          Temporal.PlainDate.compare(
                              startDate,
                              curStartDate
                          ) === -1
                      )
                  })
                : 0

        const nextCount = count - followingPeriods.length
        const nextPeriods = periodsForYear.slice(index, index + nextCount)
        followingPeriods.push(...nextPeriods)
        curYear++
    }

    return followingPeriods
}

export default getFollowingFixedPeriodsMonthly
