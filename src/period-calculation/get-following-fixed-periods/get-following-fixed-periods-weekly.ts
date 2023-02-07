import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { generateFixedPeriodsWeekly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetFollowingFixedPeriodsWeekly = (args: {
    period: FixedPeriod
    count: number
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod[]

const getFollowingFixedPeriodsWeekly: GetFollowingFixedPeriodsWeekly = ({
    period,
    count,
    calendar,
    locale,
}) => {
    // We need to get the year this way, can't use period.startDate as that
    // might be in the previous year (Week 1), can't use period.endDate as that
    // might be in the next year (Week 52/53)
    const startYear = parseInt(period.id.substring(0, 4), 10)
    const startDate = fromAnyDate({ date: period.startDate, calendar })
    const followingPeriods: FixedPeriod[] = []

    let curYear = startYear
    while (followingPeriods.length < count) {
        const periodsForYear = generateFixedPeriodsWeekly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            startingDay: 1,
            locale,
        })

        const index =
            curYear === startYear
                ? periodsForYear.findIndex((curPeriod) => {
                      const curStartDate = fromAnyDate({
                          calendar,
                          date: curPeriod.startDate,
                      })
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
