import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsWeekly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetFollowingFixedPeriodsWeekly = (args: {
    period: FixedPeriod
    count: number
    calendar: SupportedCalendar
}) => FixedPeriod[]

const getFollowingFixedPeriodsWeekly: GetFollowingFixedPeriodsWeekly = ({
    period,
    count,
    calendar,
}) => {
    const startDate = Temporal.PlainDate.from(period.startDate)
    const followingPeriods: FixedPeriod[] = []

    let curYear = startDate.year
    while (followingPeriods.length < count) {
        const periodsForYear = generateFixedPeriodsWeekly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            startingDay: 1,
        })

        const index =
            curYear === startDate.year
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

export default getFollowingFixedPeriodsWeekly
