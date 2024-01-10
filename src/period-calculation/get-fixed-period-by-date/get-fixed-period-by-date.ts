import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { getCustomCalendarIfExists } from '../../utils/index'
import {
    monthlyFixedPeriodTypes,
    weeklyFixedPeriodTypes,
    yearlyFixedPeriodTypes,
} from '../period-type-groups'
import { FixedPeriod, PeriodType } from '../types'
import getDailyFixedPeriodByDate from './get-daily-fixed-period-by-date'
import getMonthlyFixedPeriodByDate from './get-monthly-fixed-period-by-date'
import getWeeklyFixedPeriodByDate from './get-weekly-fixed-period-by-date'
import getYearlyFixedPeriodByDate from './get-yearly-fixed-period-by-date'

type GetFixedPeriodByDate = (args: {
    periodType: PeriodType
    date: string
    calendar: SupportedCalendar
    locale?: string
}) => FixedPeriod

const getFixedPeriodByDate: GetFixedPeriodByDate = ({
    periodType,
    date,
    calendar: requestedCalendar,
    locale = 'en',
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar

    // const date = fromAnyDate({ date: dateInput, calendar })
    const payload = { periodType, date, calendar, locale }

    if (periodType === 'DAILY') {
        return getDailyFixedPeriodByDate(payload)
    }

    if (monthlyFixedPeriodTypes.includes(periodType)) {
        return getMonthlyFixedPeriodByDate(payload)
    }

    if (weeklyFixedPeriodTypes.includes(periodType)) {
        return getWeeklyFixedPeriodByDate(payload)
    }

    if (yearlyFixedPeriodTypes.includes(periodType)) {
        return getYearlyFixedPeriodByDate(payload)
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default getFixedPeriodByDate
