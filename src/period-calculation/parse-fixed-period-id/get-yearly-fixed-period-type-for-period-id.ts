import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'
import { yearlyMonthValueKeys } from '../yearly-periods/index'

const regExpYearlyPeriodIdNormal = new RegExp(`^[0-9]{4}$`)
const regExpYearlyPeriodIdApr = new RegExp(
    `^[0-9]{4}${yearlyMonthValueKeys['4']}$`
)
const regExpYearlyPeriodIdJul = new RegExp(
    `^[0-9]{4}${yearlyMonthValueKeys['7']}$`
)
const regExpYearlyPeriodIdOct = new RegExp(
    `^[0-9]{4}${yearlyMonthValueKeys['10']}$`
)
const regExpYearlyPeriodIdNov = new RegExp(
    `^[0-9]{4}${yearlyMonthValueKeys['11']}$`
)

type GetYearlyFixedPeriodTypeForPeriodId = (periodId: string) => PeriodIdentifier

const getYearlyFixedPeriodTypeForPeriodId: GetYearlyFixedPeriodTypeForPeriodId = (
    periodId
) => {
    if (regExpYearlyPeriodIdNormal.test(periodId)) {
        return FIXED_PERIOD_TYPES.YEARLY
    }

    if (regExpYearlyPeriodIdApr.test(periodId)) {
        return FIXED_PERIOD_TYPES.FYAPR
    }

    if (regExpYearlyPeriodIdJul.test(periodId)) {
        return FIXED_PERIOD_TYPES.FYJUL
    }

    if (regExpYearlyPeriodIdOct.test(periodId)) {
        return FIXED_PERIOD_TYPES.FYOCT
    }

    if (regExpYearlyPeriodIdNov.test(periodId)) {
        return FIXED_PERIOD_TYPES.FYNOV
    }

    throw new Error(`Could not find a period type for period id "${periodId}"`)
}

export default getYearlyFixedPeriodTypeForPeriodId
