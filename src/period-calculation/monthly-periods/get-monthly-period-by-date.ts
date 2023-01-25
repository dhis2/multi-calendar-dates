import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { getCustomCalendarIfExists } from '../../utils/helpers'
import { PeriodIdentifier } from '../types'
import { getMonthlyPeriods } from './get-monthly-periods'

type args = {
    periodType: PeriodIdentifier
    date: string
    locale?: string
    calendar: SupportedCalendar
}

const getMonthlyPeriodByDate = ({
    periodType,
    date,
    locale = 'en',
    calendar: requestedCalendar,
}: args) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar
    const currentDate = Temporal.PlainDate.from(date)
    const monthlyPeriods = getMonthlyPeriods({
        year: currentDate.year,
        calendar,
        periodType,
        locale,
    })

    // if start date of first period of year is after current date get last
    // period of last year
    const startDateFirstPeriodInYear = Temporal.PlainDate.from(
        monthlyPeriods[0].startDate
    )
    if (
        Temporal.PlainDate.compare(startDateFirstPeriodInYear, currentDate) ===
        1
    ) {
        return getMonthlyPeriods({
            year: currentDate.year - 1,
            calendar,
            periodType,
            locale,
        }).slice(-1)[0]
    }

    return monthlyPeriods.find((currentPeriod) => {
        const curStartDate = Temporal.PlainDate.from(currentPeriod.startDate)
        const curEndDate = Temporal.PlainDate.from(currentPeriod.endDate)

        return (
            // On or after start date of current period
            Temporal.PlainDate.compare(currentDate, curStartDate) > -1 &&
            // On or before end date of current period
            Temporal.PlainDate.compare(currentDate, curEndDate) < 1
        )
    })
}

export default getMonthlyPeriodByDate
