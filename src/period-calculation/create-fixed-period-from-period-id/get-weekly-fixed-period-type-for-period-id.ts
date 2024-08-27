import i18n from '@dhis2/d2-i18n'
import {
    regexBiWeeklyPeriodId,
    regexWeeklyOffsetPeriodId,
    regexWeeklyStandardPeriodId,
} from '../period-id/index'
import { periodTypes } from '../period-types'
import { PeriodType } from '../types'

const getWeeklyFixedPeriodTypeForPeriodId = (periodId: string) => {
    if (regexWeeklyStandardPeriodId.test(periodId)) {
        return 'WEEKLY'
    }

    if (regexBiWeeklyPeriodId.test(periodId)) {
        return 'BIWEEKLY'
    }

    const weeklyOffsetPeriodMatch = periodId.match(regexWeeklyOffsetPeriodId)
    if (weeklyOffsetPeriodMatch) {
        const [, , name] = weeklyOffsetPeriodMatch
        const periodType = `WEEKLY${name.toUpperCase()}` as PeriodType

        if (!periodTypes.includes(periodType)) {
            throw new Error(
                i18n.t(
                    `Could not determine a period type for period id "{{periodId}}"`,
                    { periodId }
                )
            )
        }

        return periodType
    }

    throw new Error(
        i18n.t(
            `Couldn't find a period type for weekly period id "{{periodId}}"`,
            { periodId }
        )
    )
}

export default getWeeklyFixedPeriodTypeForPeriodId
