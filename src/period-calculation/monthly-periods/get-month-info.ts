import monthNumbers from '../month-numbers'
import { PeriodIdentifier } from '../types'

const getMonthInfo = (periodType: PeriodIdentifier) => {
    const monthString = periodType.slice(-3)
    return monthNumbers[monthString as keyof typeof monthNumbers]
}

export default getMonthInfo
