import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { generateFixedPeriodsWeekly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetAdjacentWeeklyFixedPeriods = (args: {
    period: FixedPeriod
    steps: number
    calendar: SupportedCalendar
}) => FixedPeriod[]

const getAdjacentWeeklyFixedPeriods: GetAdjacentWeeklyFixedPeriods = (args) => {
    const { steps: stepsInput } = args
    const steps = Math.abs(stepsInput)
    return stepsInput > 0
        ? getFollowingWeeklyFixedPeriods({ ...args, steps })
        : getPreviousWeeklyFixedPeriods({ ...args, steps })
}

export default getAdjacentWeeklyFixedPeriods

const getFollowingWeeklyFixedPeriods: GetAdjacentWeeklyFixedPeriods = ({
    period,
    steps,
    calendar,
}) => {
    // We need to get the year this way, can't use period.startDate as that
    // might be in the previous year (Week 1), can't use period.endDate as that
    // might be in the next year (Week 52/53)
    const startYear = parseInt(period.id.substring(0, 4), 10)
    const startDate = fromAnyDate({ date: period.startDate, calendar })
    const followingPeriods: FixedPeriod[] = []

    let curYear = startYear
    while (followingPeriods.length < steps) {
        const periodsForYear = generateFixedPeriodsWeekly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            startingDay: 1,
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

        const nextCount = steps - followingPeriods.length
        const nextPeriods = periodsForYear.slice(index, index + nextCount)

        followingPeriods.push(...nextPeriods)
        curYear++
    }

    return followingPeriods
}

const getPreviousWeeklyFixedPeriods: GetAdjacentWeeklyFixedPeriods = ({
    period,
    steps,
    calendar,
}) => {
    const startDate = fromAnyDate({ date: period.startDate, calendar })
    const previousPeriods: FixedPeriod[] = []

    let curYear = startDate.year
    while (previousPeriods.length < steps) {
        const nextCount = steps - previousPeriods.length
        const periodsForYear = generateFixedPeriodsWeekly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            startingDay: 1,
        })

        if (curYear < startDate.year) {
            const startIndex = Math.max(0, periodsForYear.length - nextCount)
            const prevPeriods = periodsForYear.slice(startIndex)
            previousPeriods.unshift(...prevPeriods)
            curYear--
            continue
        }

        const foundIndex = periodsForYear.findIndex((curPeriod) => {
            const curStartDate = fromAnyDate({
                calendar,
                date: curPeriod.startDate,
            })

            const startDateIsLowerThanCurStartDate =
                Temporal.PlainDate.compare(startDate, curStartDate) === -1

            return startDateIsLowerThanCurStartDate
        })

        const endIndex =
            foundIndex !== -1
                ? // have to remove 1 to exclude the current one
                  foundIndex - 1
                : // This is the case when the "startDate" is the first day of the
                  // first period of the next year
                  periodsForYear.length
        const startIndex = Math.max(0, endIndex - nextCount)
        const prevPeriods = periodsForYear.slice(startIndex, endIndex)
        previousPeriods.push(...prevPeriods)
        curYear--
    }

    return previousPeriods
}
