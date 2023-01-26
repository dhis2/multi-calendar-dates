import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { generateFixedPeriodsYearly } from '../generate-fixed-periods/index'
import { PeriodIdentifier } from '../types'

type args = {
    periodType: PeriodIdentifier
    date: string
    locale?: string
    calendar: SupportedCalendar
}

const getFixedPeriodByDateYearly = ({
    date,
    calendar,
    locale,
    periodType,
}: args) => {
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

    if (Temporal.PlainDate.compare(currentDate, yearlyPeriodStartDate) === -1) {
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
