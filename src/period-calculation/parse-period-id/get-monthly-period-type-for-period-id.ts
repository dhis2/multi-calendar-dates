import { PeriodIdentifier } from '../types'

const regExpMonthlyPeriodIdNormal = new RegExp(`^[0-9]{6}$`)
const regExpBimonthlyPeriodId = new RegExp(`^[0-9]{6}B$`)
const regExpQuarterlyPeriodId = new RegExp(`^[0-9]{4}Q[0-9]$`)
const regExpQuarterlyPeriodIdNov = new RegExp(`^[0-9]{4}NovemberQ[0-9]$`)
const regExpSixmonthlyPeriodId = new RegExp(`^[0-9]{4}S[0-9]$`)
const regExpSixmonthlyPeriodIdApr = new RegExp(`^[0-9]{4}AprilS[0-9]$`)
const regExpSixmonthlyPeriodIdNov = new RegExp(`^[0-9]{4}NovemberS[0-9]$`)

type GetMonthlyPeriodTypeForPeriodId = (periodId: string) => PeriodIdentifier

const getMonthlyPeriodTypeForPeriodId: GetMonthlyPeriodTypeForPeriodId = (
    periodId
) => {
    if (regExpMonthlyPeriodIdNormal.test(periodId)) {
        return 'MONTHLY'
    }

    if (regExpBimonthlyPeriodId.test(periodId)) {
        return 'BIMONTHLY'
    }

    if (regExpQuarterlyPeriodId.test(periodId)) {
        return 'QUARTERLY'
    }

    if (regExpQuarterlyPeriodIdNov.test(periodId)) {
        return 'QUARTERLYNOV'
    }

    if (regExpSixmonthlyPeriodId.test(periodId)) {
        return 'SIXMONTHLY'
    }

    if (regExpSixmonthlyPeriodIdApr.test(periodId)) {
        return 'SIXMONTHLYAPR'
    }

    if (regExpSixmonthlyPeriodIdNov.test(periodId)) {
        return 'SIXMONTHLYNOV'
    }

    throw new Error(`Could not find a period type for period id "${periodId}"`)
}

export default getMonthlyPeriodTypeForPeriodId
