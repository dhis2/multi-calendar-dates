const getWeeklyPeriodTypeForPeriodId = (periodId: string) => {
    if (periodId.match(/^[0-9]{4}W[0-9]+$/)) {
        return 'WEEKLY'
    }

    if (periodId.match(/^[0-9]{4}BiW[0-9]+$/)) {
        return 'BIWEEKLY'
    }

    if (periodId.match(/^[0-9]{4}WedW[0-9]+$/)) {
        return 'WEEKLYWED'
    }

    if (periodId.match(/^[0-9]{4}ThuW[0-9]+$/)) {
        return 'WEEKLYTHU'
    }

    if (periodId.match(/^[0-9]{4}SatW[0-9]+$/)) {
        return 'WEEKLYSAT'
    }

    if (periodId.match(/^[0-9]{4}SunW[0-9]+$/)) {
        return 'WEEKLYSUN'
    }

    throw new Error(
        `Couldn't find a period type for weekly period id "${periodId}"`
    )
}

export default getWeeklyPeriodTypeForPeriodId
