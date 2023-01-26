import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsMonthly } from '../generate-fixed-periods/index'
import { PeriodIdentifier, FixedPeriod } from '../types'

type args = {
    periodType: PeriodIdentifier
    date: string
    locale?: string
    calendar: SupportedCalendar
}

const getFixedPeriodByDateMonthly = ({
    periodType,
    date,
    locale = 'en',
    calendar,
}: args) => {
    const currentDate = Temporal.PlainDate.from(date)
    const monthlyPeriods = generateFixedPeriodsMonthly({
        year: currentDate.year,
        calendar,
        periodType,
        locale,
    })

    // if start date of first period of year is after current date get last
    // period of last year
    const startDateFirstPeriodInYear = Temporal.PlainDate.from(
        monthlyPeriods[0].startDate
    )
    if (
        Temporal.PlainDate.compare(startDateFirstPeriodInYear, currentDate) ===
        1
    ) {
        return generateFixedPeriodsMonthly({
            year: currentDate.year - 1,
            calendar,
            periodType,
            locale,
        }).slice(-1)[0]
    }

    return monthlyPeriods.find((currentPeriod: FixedPeriod) => {
        const curStartDate = Temporal.PlainDate.from(currentPeriod.startDate)
        const curEndDate = Temporal.PlainDate.from(currentPeriod.endDate)

        return (
            // On or after start date of current period
            Temporal.PlainDate.compare(currentDate, curStartDate) > -1 &&
            // On or before end date of current period
            Temporal.PlainDate.compare(currentDate, curEndDate) < 1
        )
    })
}

export default getFixedPeriodByDateMonthly
