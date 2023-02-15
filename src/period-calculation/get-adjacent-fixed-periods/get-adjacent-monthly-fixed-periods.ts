import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsMonthly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetAdjacentMonthlyFixedPeriods = (args: {
    period: FixedPeriod
    steps: number
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod[]

const getAdjacentMonthlyFixedPeriods: GetAdjacentMonthlyFixedPeriods = (
    args
) => {
    const { steps: stepsInput } = args
    const steps = Math.abs(stepsInput)
    return stepsInput > 0
        ? getFollowingMonthlyFixedPeriods({ ...args, steps })
        : getPreviousMonthlyFixedPeriods({ ...args, steps })
}

export default getAdjacentMonthlyFixedPeriods

const getFollowingMonthlyFixedPeriods: GetAdjacentMonthlyFixedPeriods = ({
    period,
    steps,
    calendar,
    locale,
}) => {
    // We need to get the year this way, can't use period.startDate as that
    // might be in the previous year (Week 1), can't use period.endDate as that
    // might be in the next year (Week 52/53)
    const startYear = parseInt(period.id.substring(0, 4), 10)
    const followingPeriods: FixedPeriod[] = []

    let curYear = startYear
    while (followingPeriods.length < steps) {
        const periodsForYear = generateFixedPeriodsMonthly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            locale,
        })

        const index =
            curYear === startYear
                ? periodsForYear.findIndex(
                      (curPeriod) => period.startDate < curPeriod.startDate
                  )
                : 0

        const nextCount = steps - followingPeriods.length
        const nextPeriods = periodsForYear.slice(index, index + nextCount)
        followingPeriods.push(...nextPeriods)
        curYear++
    }

    return followingPeriods
}

const getPreviousMonthlyFixedPeriods: GetAdjacentMonthlyFixedPeriods = ({
    period,
    steps,
    calendar,
    locale,
}) => {
    // This is different from the startYear calculation in
    // `getFollowingMonthlyFixedPeriods` as a period might start in a year
    // following the year specified in the period's id
    const startYear = parseInt(period.startDate.substring(0, 4), 10)
    const previousPeriods: FixedPeriod[] = []

    let curYear = startYear
    while (previousPeriods.length < steps) {
        const nextCount = steps - previousPeriods.length
        const periodsForYear = generateFixedPeriodsMonthly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            locale,
        })

        if (curYear < startYear) {
            const startIndex = Math.max(0, periodsForYear.length - nextCount)
            const prevPeriods = periodsForYear.slice(startIndex)
            previousPeriods.unshift(...prevPeriods)
            curYear--
            continue
        }

        const endIndex =
            periodsForYear.findIndex(
                (curPeriod) => period.startDate < curPeriod.startDate
            ) - 1 // have to remove 1 to exclude the current one

        const startIndex = Math.max(0, endIndex - nextCount)
        const prevPeriods = periodsForYear.slice(startIndex, endIndex)
        previousPeriods.push(...prevPeriods)
        curYear--
    }

    return previousPeriods
}
