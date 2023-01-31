import { FIXED_PERIOD_TYPES } from '../period-types'

const getWeeklyFixedPeriodTypeForPeriodId = (periodId: string) => {
    if (periodId.match(/^[0-9]{4}W[0-9]+$/)) {
        return FIXED_PERIOD_TYPES.WEEKLY
    }

    if (periodId.match(/^[0-9]{4}BiW[0-9]+$/)) {
        return FIXED_PERIOD_TYPES.BIWEEKLY
    }

    if (periodId.match(/^[0-9]{4}WedW[0-9]+$/)) {
        return FIXED_PERIOD_TYPES.WEEKLYWED
    }

    if (periodId.match(/^[0-9]{4}ThuW[0-9]+$/)) {
        return FIXED_PERIOD_TYPES.WEEKLYTHU
    }

    if (periodId.match(/^[0-9]{4}SatW[0-9]+$/)) {
        return FIXED_PERIOD_TYPES.WEEKLYSAT
    }

    if (periodId.match(/^[0-9]{4}SunW[0-9]+$/)) {
        return FIXED_PERIOD_TYPES.WEEKLYSUN
    }

    throw new Error(
        `Couldn't find a period type for weekly period id "${periodId}"`
    )
}

export default getWeeklyFixedPeriodTypeForPeriodId
