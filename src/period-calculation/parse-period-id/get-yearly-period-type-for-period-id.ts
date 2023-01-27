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

type GetYearlyPeriodTypeForPeriodId = (periodId: string) => PeriodIdentifier

const getYearlyPeriodTypeForPeriodId: GetYearlyPeriodTypeForPeriodId = (
    periodId
) => {
    if (regExpYearlyPeriodIdNormal.test(periodId)) {
        return 'YEARLY'
    }

    if (regExpYearlyPeriodIdApr.test(periodId)) {
        return 'FYAPR'
    }

    if (regExpYearlyPeriodIdJul.test(periodId)) {
        return 'FYJUL'
    }

    if (regExpYearlyPeriodIdOct.test(periodId)) {
        return 'FYOCT'
    }

    if (regExpYearlyPeriodIdNov.test(periodId)) {
        return 'FYNOV'
    }

    throw new Error(`Could not find a period type for period id "${periodId}"`)
}

export default getYearlyPeriodTypeForPeriodId
