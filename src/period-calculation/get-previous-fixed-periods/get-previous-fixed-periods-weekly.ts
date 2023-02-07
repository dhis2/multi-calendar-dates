import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { generateFixedPeriodsWeekly } from '../generate-fixed-periods/index'
import { FixedPeriod } from '../types'

type GetPreviousFixedPeriodsWeekly = (args: {
    period: FixedPeriod
    count: number
    calendar: SupportedCalendar
    locale: string
}) => FixedPeriod[]

const getPreviousFixedPeriodsWeekly: GetPreviousFixedPeriodsWeekly = ({
    period,
    count,
    calendar,
    locale,
}) => {
    const startDate = fromAnyDate({ date: period.startDate, calendar })
    const previousPeriods: FixedPeriod[] = []

    let curYear = startDate.year
    while (previousPeriods.length < count) {
        const nextCount = count - previousPeriods.length
        const periodsForYear = generateFixedPeriodsWeekly({
            year: curYear,
            calendar: calendar,
            periodType: period.periodType,
            startingDay: 1,
            locale,
        })

        if (curYear < startDate.year) {
            const startIndex = Math.max(0, periodsForYear.length - nextCount)
            const prevPeriods = periodsForYear.slice(startIndex)
            previousPeriods.unshift(...prevPeriods)
            curYear--
            continue
        }

        const endIndex =
            periodsForYear.findIndex((curPeriod) => {
                const curStartDate = fromAnyDate({
                    calendar,
                    date: curPeriod.startDate,
                })
                return (
                    Temporal.PlainDate.compare(startDate, curStartDate) === -1
                )
            }) - 1 // have to remove 1 to exclude the current one

        const startIndex = Math.max(0, endIndex - nextCount)
        const prevPeriods = periodsForYear.slice(startIndex, endIndex)
        previousPeriods.push(...prevPeriods)
        curYear--
    }

    return previousPeriods
}

export default getPreviousFixedPeriodsWeekly
