import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { FixedPeriod, PeriodIdentifier } from '../types'

type GetFixedPeriodByDateYearly = (args: {
    periodType: PeriodIdentifier
    date: string
    locale?: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getFixedPeriodByDateYearly: GetFixedPeriodByDateYearly = ({
    date,
    calendar,
    locale,
    periodType,
}) => {
    const currentDate = Temporal.PlainDate.from(date)
    const yearlyPeriods = generateFixedPeriodsYearly({
        year: currentDate.year,
        calendar,
        periodType,
        yearsCount: 1,
        locale,
    })

    const [yearlyPeriod] = yearlyPeriods
    const yearlyPeriodStartDate = Temporal.PlainDate.from(
        yearlyPeriod.startDate
    )

    const isCurrentDateBeforePeriodStartDate =
        Temporal.PlainDate.compare(currentDate, yearlyPeriodStartDate) === -1

    // In case the yearly period does not start on January 1, like financial years
    if (isCurrentDateBeforePeriodStartDate) {
        const yearlyPeriodsPrevYear = generateFixedPeriodsYearly({
            year: currentDate.year - 1,
            calendar,
            periodType,
            yearsCount: 1,
            locale,
        })

        const [yearlyPeriodPrevYear] = yearlyPeriodsPrevYear
        return yearlyPeriodPrevYear
    }

    return yearlyPeriod
}
export default getFixedPeriodByDateYearly
