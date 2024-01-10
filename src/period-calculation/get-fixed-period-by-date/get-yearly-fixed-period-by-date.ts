import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { FixedPeriod, PeriodType } from '../types'

type GetYearlyFixedPeriodByDate = (args: {
    periodType: PeriodType
    date: string
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getYearlyFixedPeriodByDate: GetYearlyFixedPeriodByDate = ({
    date,
    calendar,
    locale,
    periodType,
}) => {
    const year = parseInt(date.substring(0, 4), 10)
    const yearlyPeriods = generateFixedPeriodsYearly({
        year,
        calendar,
        periodType,
        yearsCount: 1,
        locale,
    })

    // For a particular year, there is only one period with `yearsCount: 1`,
    // so we can extract that particular period right away
    const [yearlyPeriod] = yearlyPeriods
    const isCurrentDateBeforePeriodStartDate = date < yearlyPeriod.startDate

    // In case the yearly period does not start on January 1, like financial years
    if (isCurrentDateBeforePeriodStartDate) {
        const yearlyPeriodsPrevYear = generateFixedPeriodsYearly({
            year: year - 1,
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
export default getYearlyFixedPeriodByDate
