import {
    CalendarPlainDate,
    comparePlainDates,
    plainDateFrom,
} from '../../custom-calendars'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GenerateFixedPeriodsDaily = (options: {
    year: number
    calendar: SupportedCalendar
    endsBefore?: CalendarPlainDate
    locale: string
}) => Array<FixedPeriod>

const generateFixedPeriodsDaily: GenerateFixedPeriodsDaily = ({
    year,
    calendar,
    endsBefore: _endsBefore,
    locale,
}) => {
    const endsBefore = _endsBefore
        ? fromAnyDate({ calendar, date: _endsBefore })
        : null
    const day = plainDateFrom({ year, month: 1, day: 1 }, calendar)

    const days: FixedPeriod[] = []

    for (let i = 0; i < day.daysInYear; i++) {
        const nextDay = day.add({ days: i })

        if (endsBefore && comparePlainDates(nextDay, endsBefore) > -1) {
            break
        }

        const period = buildDailyFixedPeriod({
            date: nextDay,
            calendar,
            locale: locale as string,
        })
        days.push(period)
    }

    return days
}

export default generateFixedPeriodsDaily
