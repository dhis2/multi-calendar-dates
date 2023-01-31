import monthNumbers from '../month-numbers'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'

type Signature = (periodType: PeriodIdentifier) => number

const getYearlyStartMonthByPeriodType: Signature = (periodType) => {
    if (periodType === FIXED_PERIOD_TYPES.YEARLY) {
        return 1
    }

    const yearType = periodType
        .replace('Financial', '')
        .substring(0, 3)
        .toUpperCase()

    const monthInfo = monthNumbers[yearType as keyof typeof monthNumbers]
    return monthInfo?.value || 1
}

export default getYearlyStartMonthByPeriodType
