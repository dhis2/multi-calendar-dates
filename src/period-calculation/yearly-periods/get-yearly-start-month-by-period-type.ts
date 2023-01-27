import monthNumbers from '../month-numbers'
import { PeriodIdentifier } from '../types'

type Signature = (periodType: PeriodIdentifier) => number

const getYearlyStartMonthByPeriodType: Signature = (periodType) => {
    const yearType = periodType.replace('FY', '').toUpperCase()
    const monthInfo = monthNumbers[yearType as keyof typeof monthNumbers]

    return monthInfo?.value || 1
}

export default getYearlyStartMonthByPeriodType
