import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { formatYyyyMmDD } from '../../utils/helpers'
import { PeriodIdentifier } from '../types'
import buildId from './build-id'
import buildLabel from './build-label'
import getMonthsToAdd from './get-months-to-add'

type buildMonthlyPeriodArgs = {
    periodType: PeriodIdentifier
    month: Temporal.PlainDate
    year: number
    index: number
    calendar: SupportedCalendar
    locale?: string
}

const buildMonthlyPeriod = ({
    periodType,
    month,
    year,
    index,
    calendar,
    locale = 'en',
}: buildMonthlyPeriodArgs) => {
    const monthToAdd = getMonthsToAdd(periodType)
    const nextMonth = month.add({ months: monthToAdd })
    const id = buildId({ periodType, currentMonth: month, year, index })

    return {
        id,
        iso: id,
        name: buildLabel({
            periodType,
            month,
            locale,
            calendar,
            nextMonth: nextMonth.subtract({ months: 1 }), // when we display, we want to show the range using previous month
            index,
        }),
        ...buildStartAndEndDate(month, nextMonth),
    }
}

const buildStartAndEndDate = (
    currentMonth: Temporal.PlainDate,
    nextMonth: Temporal.PlainDate
) => {
    if (currentMonth.calendar === ('ethiopic' as Temporal.CalendarLike)) {
        console.warn(
            'todo: confirm the special cases for the 13th month with Abyot, then update the start/end dates for Ethiopic calendar'
        )
    }
    const endDate = Temporal.PlainDate.from({
        year: nextMonth.year,
        month: nextMonth.month,
        day: 1,
        calendar: nextMonth.calendar,
    }).subtract({ days: 1 })
    return {
        startDate: formatYyyyMmDD(currentMonth, 'startOfMonth'),
        endDate: formatYyyyMmDD(endDate, 'endOfMonth'),
    }
}

export default buildMonthlyPeriod
