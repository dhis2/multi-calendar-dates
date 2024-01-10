import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { getCustomCalendarIfExists } from '../../utils/index'
import {
    weeklyFixedPeriodTypes,
    monthlyFixedPeriodTypes,
    yearlyFixedPeriodTypes,
} from '../period-type-groups'
import { FixedPeriod } from '../types'
import getAdjacentDailyFixedPeriods from './get-adjacent-daily-fixed-periods'
import getAdjacentMonthlyFixedPeriods from './get-adjacent-monthly-fixed-periods'
import getAdjacentWeeklyFixedPeriods from './get-adjacent-weekly-fixed-periods'
import getAdjacentYearlyFixedPeriods from './get-adjacent-yearly-fixed-periods'

type GetAdjacentFixedPeriods = (args: {
    period: FixedPeriod
    calendar: SupportedCalendar
    steps?: number
    locale?: string
}) => FixedPeriod[]

const getAdjacentFixedPeriods: GetAdjacentFixedPeriods = ({
    period,
    calendar: requestedCalendar,
    steps = 1,
    locale = 'en',
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar

    const { periodType } = period
    const payload = { period, calendar, steps, locale }

    if (steps === 0) {
        throw new Error(
            'Can not generate zero fixed periods, please choose either a negative or positive value for "steps"'
        )
    }

    if (periodType === 'DAILY') {
        return getAdjacentDailyFixedPeriods(payload)
    }

    if (weeklyFixedPeriodTypes.includes(periodType)) {
        return getAdjacentWeeklyFixedPeriods(payload)
    }

    if (monthlyFixedPeriodTypes.includes(periodType)) {
        return getAdjacentMonthlyFixedPeriods(payload)
    }

    if (yearlyFixedPeriodTypes.includes(periodType)) {
        return getAdjacentYearlyFixedPeriods(payload)
    }

    throw new Error(
        `Can not generate following fixed period for unrecognised period type "${periodType}"`
    )
}

export default getAdjacentFixedPeriods
