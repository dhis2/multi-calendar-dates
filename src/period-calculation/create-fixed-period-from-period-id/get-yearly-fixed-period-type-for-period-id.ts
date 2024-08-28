import i18n from '@dhis2/d2-i18n'
import monthNumbers from '../month-numbers'
import {
    regexYearlyStandardPeriodId,
    regexYearlyFinancialPeriodId,
} from '../period-id/index'
import { PeriodType } from '../types'

const getYearlyFixedPeriodTypeForPeriodId = (periodId: string): PeriodType => {
    if (regexYearlyStandardPeriodId.test(periodId)) {
        return 'YEARLY'
    }

    const financialYearFixedPeriodMatch = periodId.match(
        regexYearlyFinancialPeriodId
    )
    if (financialYearFixedPeriodMatch) {
        const monthName = financialYearFixedPeriodMatch[2].slice(0, 3)
        const result = Object.entries(monthNumbers).find(([, { name }]) =>
            name.startsWith(monthName)
        )

        if (!result) {
            throw new Error('@TODO')
        }

        const [month] = result
        return `FY${month}` as PeriodType
    }

    throw new Error(
        i18n.t(`Could not find a period type for period id "{{periodId}}"`, {
            periodId,
        })
    )
}

export default getYearlyFixedPeriodTypeForPeriodId
