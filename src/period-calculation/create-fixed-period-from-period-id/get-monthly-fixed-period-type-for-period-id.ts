import monthNumbers from '../month-numbers'
import {
    regexMonthlyStandardPeriodId,
    regexBiMonthlyPeriodId,
    regexQuarterlyStandardPeriodId,
    regexQuarterlyOffsetPeriodId,
    regexSixmonthlyStandardPeriodId,
    regexSixmonthlyOffsetPeriodId,
} from '../period-id/index'
import { PeriodType } from '../types'

type GetMonthlyFixedPeriodTypeForPeriodId = (periodId: string) => PeriodType

const getMonthlyFixedPeriodTypeForPeriodId: GetMonthlyFixedPeriodTypeForPeriodId =
    (periodId) => {
        if (regexMonthlyStandardPeriodId.test(periodId)) {
            return 'MONTHLY'
        }

        if (regexBiMonthlyPeriodId.test(periodId)) {
            return 'BIMONTHLY'
        }

        if (regexQuarterlyStandardPeriodId.test(periodId)) {
            return 'QUARTERLY'
        }

        const quarterlyFixedPeriodMatch = periodId.match(
            regexQuarterlyOffsetPeriodId
        )
        if (quarterlyFixedPeriodMatch) {
            const monthName = quarterlyFixedPeriodMatch[2]
            const result = Object.entries(monthNumbers).find(
                ([, { name }]) => name === monthName
            )

            if (!result) {
                throw new Error('@TODO')
            }

            const [month] = result
            return `QUARTERLY${month}` as PeriodType
        }

        if (regexSixmonthlyStandardPeriodId.test(periodId)) {
            return 'SIXMONTHLY'
        }

        const sixmonthlyFixedPeriodMatch = periodId.match(
            regexSixmonthlyOffsetPeriodId
        )
        if (sixmonthlyFixedPeriodMatch) {
            const monthName = sixmonthlyFixedPeriodMatch[2]
            const result = Object.entries(monthNumbers).find(
                ([, { name }]) => name === monthName
            )

            if (!result) {
                throw new Error('@TODO')
            }

            const [month] = result
            return `SIXMONTHLY${month}` as PeriodType
        }

        throw new Error(
            `Could not find a period type for period id "${periodId}"`
        )
    }

export default getMonthlyFixedPeriodTypeForPeriodId
