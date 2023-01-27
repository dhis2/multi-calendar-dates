import { Temporal } from '@js-temporal/polyfill'
import { dhis2CalendarsMap } from '../../constants/dhis2CalendarsMap'
import { SupportedCalendar } from '../../types'
import { getCustomCalendarIfExists } from '../../utils/helpers'
import { generateFixedPeriodsWeekly } from '../generate-fixed-periods/index'
import { PeriodIdentifier, FixedPeriod } from '../types'

type GetFixedPeriodByDateWeekly = (args: {
    periodType: PeriodIdentifier
    date: string
    locale?: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getFixedPeriodByDateWeekly: GetFixedPeriodByDateWeekly = ({
    periodType,
    date,
    locale = 'en',
    calendar: requestedCalendar,
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[requestedCalendar] ?? requestedCalendar
    ) as SupportedCalendar
    const currentDate = Temporal.PlainDate.from(date)
    const weeklyPeriods = generateFixedPeriodsWeekly({
        year: currentDate.year,
        calendar,
        periodType,
        locale,
        startingDay: 1,
    })

    // if start date of first period of year is after current date get last
    // period of last year
    const startDateFirstPeriodInYear = Temporal.PlainDate.from(
        weeklyPeriods[0].startDate
    )
    if (
        Temporal.PlainDate.compare(startDateFirstPeriodInYear, currentDate) ===
        1
    ) {
        return generateFixedPeriodsWeekly({
            year: currentDate.year - 1,
            calendar,
            periodType,
            locale,
            startingDay: 1,
        }).slice(-1)[0]
    }

    const fixedPeriod = weeklyPeriods.find((currentPeriod) => {
        const curStartDate = Temporal.PlainDate.from(currentPeriod.startDate)
        const curEndDate = Temporal.PlainDate.from(currentPeriod.endDate)

        return (
            // On or after start date of current period
            Temporal.PlainDate.compare(currentDate, curStartDate) > -1 &&
            // On or before end date of current period
            Temporal.PlainDate.compare(currentDate, curEndDate) < 1
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
