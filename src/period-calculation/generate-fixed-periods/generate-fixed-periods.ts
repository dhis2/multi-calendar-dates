import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { getCustomCalendarIfExists } from '../../utils/index'
import {
    monthlyFixedPeriodTypes,
    weeklyFixedPeriodTypes,
    yearlyFixedPeriodTypes,
} from '../period-type-groups'
import { FixedPeriod, PeriodType } from '../types'
import generateFixedPeriodsDaily from './generate-fixed-periods-daily'
import generateFixedPeriodsMonthly from './generate-fixed-periods-monthly'
import generateFixedPeriodsWeekly from './generate-fixed-periods-weekly'
import generateFixedPeriodsYearly from './generate-fixed-periods-yearly'

type GenerateFixedPeriods = (options: {
    year: number
    periodType: PeriodType
    calendar: SupportedCalendar
    locale?: string
    startingDay?: number /** 1 is Monday */
    yearsCount?: number | null
}) => Array<FixedPeriod>

const generateFixedPeriods: GenerateFixedPeriods = ({
    periodType,
    year: yearString,
    calendar: requestedCalendar,
    locale = 'en',
    yearsCount = 10,
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

    if (weeklyFixedPeriodTypes.includes(periodType)) {
        return generateFixedPeriodsWeekly({
            year,
            periodType,
            calendar,
            startingDay,
        })
    }

    if (yearlyFixedPeriodTypes.includes(periodType)) {
        return generateFixedPeriodsYearly({
            year,
            periodType,
            locale,
            calendar,
            yearsCount,
        })
    }

    if (monthlyFixedPeriodTypes.includes(periodType)) {
        return generateFixedPeriodsMonthly({
            year,
            periodType,
            locale,
            calendar,
        })
    }

    if (periodType === 'DAILY') {
        return generateFixedPeriodsDaily({
            year,
            locale,
            calendar,
        })
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default generateFixedPeriods
