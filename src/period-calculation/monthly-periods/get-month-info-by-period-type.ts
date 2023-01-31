import monthNumbers from '../month-numbers'
import { PeriodIdentifier } from '../types'

const getMonthInfoByPeriodType = (periodType: PeriodIdentifier) => {
    const monthString = periodType
        .replace(/Quarterly|SixMonthly/, '')
        .substring(0, 3)
        .toUpperCase()

    return monthNumbers[monthString as keyof typeof monthNumbers]
}

export default getMonthInfoByPeriodType
