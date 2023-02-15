import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { generateFixedPeriodsMonthly } from '../generate-fixed-periods/index'
import { PeriodIdentifier, FixedPeriod } from '../types'

type GetFixedPeriodByDateMonthly = (args: {
    periodType: PeriodIdentifier
    date: Temporal.PlainDate
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getFixedPeriodByDateMonthly: GetFixedPeriodByDateMonthly = ({
    periodType,
    date,
    locale,
    calendar,
}) => {
    const monthlyPeriods = generateFixedPeriodsMonthly({
        year: date.year,
        calendar,
        periodType,
        locale,
    })

    // if start date of first period of year is after current date get last
    // period of last year
    const startDateFirstPeriodInYear = fromAnyDate({
        calendar,
        date: monthlyPeriods[0].startDate,
    })

    const isDateBeforeFirstDayOfFirstPeriod =
        Temporal.PlainDate.compare(startDateFirstPeriodInYear, date) === 1

    if (isDateBeforeFirstDayOfFirstPeriod) {
        const fixedPeriodsLastYear = generateFixedPeriodsMonthly({
            year: date.year - 1,
            calendar,
            periodType,
            locale,
        })

        const lastFixedPeriodLastYear = fixedPeriodsLastYear.find(
            (curPeriod) => {
                const startDate = fromAnyDate({
                    calendar,
                    date: curPeriod.startDate,
                })
                const endDate = fromAnyDate({
                    calendar,
                    date: curPeriod.endDate,
                })

                return (
                    // date >= startDate
                    Temporal.PlainDate.compare(startDate, date) < 1 &&
                    // endDate >= date
                    Temporal.PlainDate.compare(date, endDate) < 1
                )
            }
        )

        if (!lastFixedPeriodLastYear) {
            throw new Error(`Could not find period for date "${date}"`)
        }

        return lastFixedPeriodLastYear
    }

    const fixedPeriod = monthlyPeriods.find((currentPeriod: FixedPeriod) => {
        const curStartDate = fromAnyDate({
            calendar,
            date: currentPeriod.startDate,
        })
        const curEndDate = fromAnyDate({
            calendar,
            date: currentPeriod.endDate,
        })

        return (
            // On or after start date of current period
            Temporal.PlainDate.compare(date, curStartDate) > -1 &&
            // On or before end date of current period
            Temporal.PlainDate.compare(date, curEndDate) < 1
        )
    })

    if (fixedPeriod) {
        return fixedPeriod
    }

    throw new Error(
        `Something went wrong retrieving the fixed period of type "${periodType}" for date "${date}"`
    )
}

export default getFixedPeriodByDateMonthly
