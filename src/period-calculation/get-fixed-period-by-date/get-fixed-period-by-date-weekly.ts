import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { fromAnyDate, getCustomCalendarIfExists } from '../../utils/index'
import { generateFixedPeriodsWeekly } from '../generate-fixed-periods/index'
import { PeriodIdentifier, FixedPeriod } from '../types'

type GetFixedPeriodByDateWeekly = (args: {
    periodType: PeriodIdentifier
    date: Temporal.PlainDate
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getFixedPeriodByDateWeekly: GetFixedPeriodByDateWeekly = ({
    periodType,
    date,
    locale,
    calendar: requestedCalendar,
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar
    const weeklyPeriods = generateFixedPeriodsWeekly({
        year: date.year,
        calendar,
        periodType,
        locale,
        startingDay: 1,
    })

    // if start date of first period of year is after current date get last
    // period of last year
    const startDateFirstPeriodInYear = fromAnyDate({
        calendar,
        date: weeklyPeriods[0].startDate,
    })
    if (Temporal.PlainDate.compare(startDateFirstPeriodInYear, date) === 1) {
        return generateFixedPeriodsWeekly({
            year: date.year - 1,
            calendar,
            periodType,
            locale,
            startingDay: 1,
        }).slice(-1)[0]
    }

    const fixedPeriod = weeklyPeriods.find((currentPeriod) => {
        const curStartDate = fromAnyDate({
            calendar,
            date: currentPeriod.startDate,
        })
        const curEndDate = fromAnyDate({
            calendar,
            date: currentPeriod.endDate,
        })

        return (
            // On or after start date of current period
            Temporal.PlainDate.compare(date, curStartDate) > -1 &&
            // On or before end date of current period
            Temporal.PlainDate.compare(date, curEndDate) < 1
        )
    })

    if (fixedPeriod) {
        return fixedPeriod
    }

    throw new Error(
        `Something went wrong retrieving the fixed period of type "${periodType}" for date "${date}"`
    )
}

export default getFixedPeriodByDateWeekly
