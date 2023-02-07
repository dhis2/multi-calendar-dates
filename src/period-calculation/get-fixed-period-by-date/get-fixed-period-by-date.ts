import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { fromAnyDate, getCustomCalendarIfExists } from '../../utils/index'
import {
    FIXED_PERIOD_TYPES,
    MONTLY_FIXED_PERIOD_TYPES,
    WEEKLY_FIXED_PERIOD_TYPES,
    YEARLY_FIXED_PERIOD_TYPES,
} from '../period-types'
import { FixedPeriod, PeriodIdentifier } from '../types'
import getFixedPeriodByDateDaily from './get-fixed-period-by-date-daily'
import getFixedPeriodByDateMonthly from './get-fixed-period-by-date-monthly'
import getFixedPeriodByDateWeekly from './get-fixed-period-by-date-weekly'
import getFixedPeriodByDateYearly from './get-fixed-period-by-date-yearly'

type GetFixedPeriodByDate = (args: {
    periodType: PeriodIdentifier
    date: string | Date | Temporal.PlainDate
    calendar: SupportedCalendar
    locale?: string
}) => FixedPeriod

const getFixedPeriodByDate: GetFixedPeriodByDate = ({
    periodType,
    date: dateInput,
    calendar: requestedCalendar,
    locale = 'en',
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar

    const date = fromAnyDate({ date: dateInput, calendar })
    const payload = { periodType, date, calendar, locale }

    if (periodType === FIXED_PERIOD_TYPES.DAILY) {
        return getFixedPeriodByDateDaily(payload)
    }

    if (MONTLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFixedPeriodByDateMonthly(payload)
    }

    if (WEEKLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFixedPeriodByDateWeekly(payload)
    }

    if (YEARLY_FIXED_PERIOD_TYPES.includes(periodType)) {
        return getFixedPeriodByDateYearly(payload)
    }

    throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
    )
}

export default getFixedPeriodByDate
