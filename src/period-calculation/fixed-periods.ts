import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../types'
import { getCustomCalendarIfExists } from '../utils/helpers'
import { getDailyPeriods, getDailyPeriodByDate } from './daily-periods/index'
import {
    getMonthlyPeriods,
    getMonthlyPeriodByDate,
} from './monthly-periods/index'
import {
    MONTLY_PERIOD_TYPES,
    WEEKLY_PERIOD_TYPES,
    YEARLY_PERIOD_TYPES,
} from './period-types'
import { PeriodIdentifier, GeneratedPeriodsFunc } from './types'
import { getWeeklyPeriods, getWeeklyPeriodByDate } from './weekly-periods/index'
import { getYearlyPeriods, getYearlyPeriodByDate } from './yearly-periods/index'

export const getPeriodByDate = ({
    periodType,
    date,
    calendar: requestedCalendar,
    locale = 'en',
}: {
    periodType: PeriodIdentifier
    date: string
    calendar: SupportedCalendar
    locale?: string
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar
    const payload = { periodType, date, calendar, locale }

    if (periodType === 'DAILY') {
        return getDailyPeriodByDate(payload)
    }

    if (MONTLY_PERIOD_TYPES.includes(periodType)) {
        return getMonthlyPeriodByDate(payload)
    }

    if (WEEKLY_PERIOD_TYPES.includes(periodType)) {
        return getWeeklyPeriodByDate(payload)
    }

    if (YEARLY_PERIOD_TYPES.includes(periodType)) {
        return getYearlyPeriodByDate(payload)
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export const generateFixedPeriods: GeneratedPeriodsFunc = ({
    year: yearString,
    periodType,
    calendar: requestedCalendar,
    locale = 'en',
    startingDay = 1,
}) => {
    let year: number
    if (typeof yearString === 'number') {
        year = yearString
    } else {
        if (!isNaN(yearString) && !isNaN(parseInt(yearString))) {
            year = parseInt(yearString)
        } else {
            throw new Error('year must be a number')
        }
    }
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar

    if (WEEKLY_PERIOD_TYPES.includes(periodType)) {
        return getWeeklyPeriods({
            year,
            periodType,
            locale,
            calendar,
            startingDay,
        })
    }

    if (YEARLY_PERIOD_TYPES.includes(periodType)) {
        // financial year
        return getYearlyPeriods({ year, periodType, locale, calendar })
    }

    if (MONTLY_PERIOD_TYPES.includes(periodType)) {
        return getMonthlyPeriods({ year, periodType, locale, calendar })
    }

    if (periodType === 'DAILY') {
        return getDailyPeriods({ year, periodType, locale, calendar })
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}
