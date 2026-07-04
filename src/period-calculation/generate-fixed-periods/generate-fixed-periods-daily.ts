import { Temporal } from '@js-temporal/polyfill-patched'
import { SupportedCalendar } from '../../types'
import { getPlainDateFromCalendarFields } from '../../utils/index'
import { AnyPlainDate, toIsoPlainDate } from '../../utils/plainDate'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GenerateFixedPeriodsDaily = (options: {
    year: number
    calendar: SupportedCalendar
    endsBefore?: AnyPlainDate
    locale: string
}) => Array<FixedPeriod>

const generateFixedPeriodsDaily: GenerateFixedPeriodsDaily = ({
    year,
    calendar,
    endsBefore,
    locale,
}) => {
    const day = getPlainDateFromCalendarFields(
        {
            year,
            month: 1,
            day: 1,
        },
        calendar
    )

    const days: FixedPeriod[] = []

    for (let i = 0; i < day.daysInYear; i++) {
        const nextDay = day.add({ days: i })

        if (
            endsBefore &&
            Temporal.PlainDate.compare(
                toIsoPlainDate(nextDay),
                toIsoPlainDate(endsBefore)
            ) > -1
        ) {
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
