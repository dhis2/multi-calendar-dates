import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { getCustomCalendarIfExists } from '../../utils/helpers'
import {
    MONTLY_PERIOD_TYPES,
    WEEKLY_PERIOD_TYPES,
    YEARLY_PERIOD_TYPES,
} from '../period-types'
import { GeneratedPeriodsFunc } from '../types'
import generateFixedPeriodsDaily from './generate-fixed-periods-daily'
import generateFixedPeriodsMonthly from './generate-fixed-periods-monthly'
import generateFixedPeriodsWeekly from './generate-fixed-periods-weekly'
import generateFixedPeriodsYearly from './generate-fixed-periods-yearly'

const generateFixedPeriods: GeneratedPeriodsFunc = ({
    year: yearString,
    periodType,
    calendar: requestedCalendar,
    locale = 'en',
    startingDay = 1,
    excludeDay,
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
        return generateFixedPeriodsWeekly({
            year,
            periodType,
            locale,
            calendar,
            startingDay,
            excludeDay,
        })
    }

    if (YEARLY_PERIOD_TYPES.includes(periodType)) {
        // financial year
        return generateFixedPeriodsYearly({
            year,
            periodType,
            locale,
            calendar,
            excludeDay,
        })
    }

    if (MONTLY_PERIOD_TYPES.includes(periodType)) {
        return generateFixedPeriodsMonthly({
            year,
            periodType,
            locale,
            calendar,
            excludeDay,
        })
    }

    if (periodType === 'DAILY') {
        return generateFixedPeriodsDaily({
            year,
            periodType,
            locale,
            calendar,
            excludeDay,
        })
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default generateFixedPeriods
