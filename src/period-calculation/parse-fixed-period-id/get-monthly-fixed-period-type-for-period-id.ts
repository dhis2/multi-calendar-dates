import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'

const regExpMonthlyPeriodIdNormal = new RegExp(`^[0-9]{6}$`)
const regExpBimonthlyPeriodId = new RegExp(`^[0-9]{6}B$`)
const regExpQuarterlyPeriodId = new RegExp(`^[0-9]{4}Q[0-9]$`)
const regExpQuarterlyPeriodIdNov = new RegExp(`^[0-9]{4}NovemberQ[0-9]$`)
const regExpSixmonthlyPeriodId = new RegExp(`^[0-9]{4}S[0-9]$`)
const regExpSixmonthlyPeriodIdApr = new RegExp(`^[0-9]{4}AprilS[0-9]$`)
const regExpSixmonthlyPeriodIdNov = new RegExp(`^[0-9]{4}NovemberS[0-9]$`)

type GetMonthlyFixedPeriodTypeForPeriodId = (
    periodId: string
) => PeriodIdentifier

const getMonthlyFixedPeriodTypeForPeriodId: GetMonthlyFixedPeriodTypeForPeriodId =
    (periodId) => {
        if (regExpMonthlyPeriodIdNormal.test(periodId)) {
            return FIXED_PERIOD_TYPES.MONTHLY
        }

        if (regExpBimonthlyPeriodId.test(periodId)) {
            return FIXED_PERIOD_TYPES.BIMONTHLY
        }

        if (regExpQuarterlyPeriodId.test(periodId)) {
            return FIXED_PERIOD_TYPES.QUARTERLY
        }

        if (regExpQuarterlyPeriodIdNov.test(periodId)) {
            return FIXED_PERIOD_TYPES.QUARTERLYNOV
        }

        if (regExpSixmonthlyPeriodId.test(periodId)) {
            return FIXED_PERIOD_TYPES.SIXMONTHLY
        }

        if (regExpSixmonthlyPeriodIdApr.test(periodId)) {
            return FIXED_PERIOD_TYPES.SIXMONTHLYAPR
        }

        if (regExpSixmonthlyPeriodIdNov.test(periodId)) {
            return FIXED_PERIOD_TYPES.SIXMONTHLYNOV
        }

        throw new Error(
            `Could not find a period type for period id "${periodId}"`
        )
    }

export default getMonthlyFixedPeriodTypeForPeriodId
