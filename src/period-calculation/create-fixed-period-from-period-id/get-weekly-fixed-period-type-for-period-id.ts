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
                `Could not determine a period type for period id "${periodId}"`
            )
        }

        return periodType
    }

    throw new Error(
        `Couldn't find a period type for weekly period id "${periodId}"`
    )
}

export default getWeeklyFixedPeriodTypeForPeriodId
