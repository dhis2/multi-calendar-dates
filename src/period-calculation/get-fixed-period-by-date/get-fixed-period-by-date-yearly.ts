import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { FixedPeriod, PeriodIdentifier } from '../types'

type GetFixedPeriodByDateYearly = (args: {
    periodType: PeriodIdentifier
    date: Temporal.PlainDate
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getFixedPeriodByDateYearly: GetFixedPeriodByDateYearly = ({
    date,
    calendar,
    locale,
    periodType,
}) => {
    const yearlyPeriods = generateFixedPeriodsYearly({
        year: date.year,
        calendar,
        periodType,
        yearsCount: 1,
        locale,
    })

    const [yearlyPeriod] = yearlyPeriods
    const yearlyPeriodStartDate = fromAnyDate({
        calendar,
        date: yearlyPeriod.startDate,
    })

    const isCurrentDateBeforePeriodStartDate =
        Temporal.PlainDate.compare(date, yearlyPeriodStartDate) === -1

    // In case the yearly period does not start on January 1, like financial years
    if (isCurrentDateBeforePeriodStartDate) {
        const yearlyPeriodsPrevYear = generateFixedPeriodsYearly({
            year: date.year - 1,
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
