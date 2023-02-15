import { getStartingMonthByPeriodType } from '../get-starting-month-for-period-type'
import monthNumbers from '../month-numbers'
import { PeriodType } from '../types'

const getYearlyStartMonthByPeriodType = (periodType: PeriodType) => {
    if (periodType === 'YEARLY') {
        return 1
    }

    const yearType = getStartingMonthByPeriodType(periodType)
    const monthInfo = monthNumbers[yearType as keyof typeof monthNumbers]
    return monthInfo?.value || 1
}

export default getYearlyStartMonthByPeriodType
