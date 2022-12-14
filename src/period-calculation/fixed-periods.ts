import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../types'
import { getCustomCalendarIfExists } from '../utils/helpers'
import { getDailyPeriods } from './getDailyPeriods'
import { getMonthlyPeriods } from './getMonthlyPeriods'
import { getWeeklyPeriods } from './getWeeklyPeriods'
import { getYearlyPeriods } from './getYearlyPeriods'

const periodIdentifiers = [
    'DAILY',
    'WEEKLY',
    'WEEKLYWED',
    'WEEKLYTHU',
    'WEEKLYSAT',
    'WEEKLYSUN',
    'BIWEEKLY',
    'MONTHLY',
    'BIMONTHLY',
    'QUARTERLY',
    'QUARTERLYNOV', // used in Ethiopia
    'SIXMONTHLY',
    'SIXMONTHLYAPR',
    'SIXMONTHLYNOV', // used in Ethiopia
    'YEARLY',
    'FYNOV',
    'FYOCT',
    'FYJUL',
    'FYAPR',
] as const

export type PeriodIdentifier = typeof periodIdentifiers[number]
export type FixedPeriod = {
    id: string
    iso?: string
    name: string
    startDate: string
    endDate: string
}
type GeneratedPeriodParams = {
    year: number
    periodType: PeriodIdentifier
    calendar: SupportedCalendar
    locale?: string
    startingDay?: number /** 1 is Monday */
    yearsCount?: number
}
export type GeneratedPeriodsFunc = (
    options: GeneratedPeriodParams
) => Array<FixedPeriod>

const generateFixedPeriods: GeneratedPeriodsFunc = ({
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

    if (periodType?.match('WEEKLY')) {
        return getWeeklyPeriods({
            year,
            periodType,
            locale,
            calendar,
            startingDay,
        })
    }
    if (periodType?.startsWith('FY') || periodType === 'YEARLY') {
        // financial year
        return getYearlyPeriods({ year, periodType, locale, calendar })
    }
    if (periodType.match(/SIXMONTHLY/) || periodType.match(/QUARTERLY/)) {
        return getMonthlyPeriods({ year, periodType, locale, calendar })
    }
    switch (periodType) {
        case 'MONTHLY':
        case 'BIMONTHLY':
        case 'QUARTERLY':
        case 'SIXMONTHLY':
        case 'SIXMONTHLYAPR':
            return getMonthlyPeriods({ year, periodType, locale, calendar })
        case 'DAILY':
            return getDailyPeriods({ year, periodType, locale, calendar })
        default:
            throw new Error(
                `can not generate period for unrecognised period type "${periodType}"`
            )
    }
}

export default generateFixedPeriods
