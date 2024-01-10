import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsMonthly } from '../generate-fixed-periods/index'
import { PeriodType, FixedPeriod } from '../types'

type GetMonthlyFixedPeriodByDate = (args: {
    periodType: PeriodType
    date: string
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getMonthlyFixedPeriodByDate: GetMonthlyFixedPeriodByDate = ({
    periodType,
    date,
    locale,
    calendar,
}) => {
    const year = parseInt(date.substring(0, 4), 10)
    const monthlyPeriods = generateFixedPeriodsMonthly({
        year,
        calendar,
        periodType,
        locale,
    })

    // if start date of first period of year is after current date get last
    // period of last year
    const isDateBeforeFirstDayOfFirstPeriod = date < monthlyPeriods[0].startDate
    if (isDateBeforeFirstDayOfFirstPeriod) {
        const fixedPeriodsLastYear = generateFixedPeriodsMonthly({
            year: year - 1,
            calendar,
            periodType,
            locale,
        })

        const lastFixedPeriodLastYear = fixedPeriodsLastYear.find(
            (curPeriod) => {
                const startDateOnOrBeforeDate = curPeriod.startDate <= date
                const endDateOnOrAfterDate = curPeriod.endDate >= date

                return startDateOnOrBeforeDate && endDateOnOrAfterDate
            }
        )

        if (!lastFixedPeriodLastYear) {
            throw new Error(`Could not find period for date "${date}"`)
        }

        return lastFixedPeriodLastYear
    }

    const fixedPeriod = monthlyPeriods.find((currentPeriod: FixedPeriod) => {
        return (
            // On or after start date of current period
            date >= currentPeriod.startDate &&
            // On or before end date of current period
            date <= currentPeriod.endDate
        )
    })

    if (fixedPeriod) {
        return fixedPeriod
    }

    throw new Error(
        `Something went wrong retrieving the fixed period of type "${periodType}" for date "${date}"`
    )
}

export default getMonthlyFixedPeriodByDate
