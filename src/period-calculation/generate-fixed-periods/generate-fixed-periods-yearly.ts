import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { FixedPeriod, PeriodType } from '../types'
import {
    buildYearlyFixedPeriod,
    getYearlyStartMonthByPeriodType,
} from '../yearly-periods/index'
import doesPeriodEndBefore from './does-period-end-before'

type GenerateFixedPeriodsYearly = (options: {
    year: number
    periodType: PeriodType
    calendar: SupportedCalendar
    endsBefore?: Temporal.PlainDate
    yearsCount: number | null
    locale: string
}) => Array<FixedPeriod>

const generateFixedPeriodsYearly: GenerateFixedPeriodsYearly = ({
    year,
    calendar,
    periodType,
    endsBefore,
    yearsCount,
    locale,
}) => {
    const month = getYearlyStartMonthByPeriodType(periodType)
    const currentYear = Temporal.PlainDate.from({
        year,
        month,
        // this should really just be 1 but have to set it to 14th because of a
        // quirk in custom calendars
        // @TODO: discuss this with the Temporal team
        day: calendar.toString() === 'nepali' ? 14 : 1,
        calendar,
    })

    // Timestamp "0" is gregorian 1970-01-01, so creating that date in the
    // gregorian calendar and then use the provided, correct calendar to
    // determine the year we need to go back to
    const startYearDate = Temporal.PlainDate.from({
        day: 1,
        month: 1,
        year: 1970,
        calendar: 'gregory',
    }).withCalendar(calendar)

    // we need to use eraYear because ethiopic calendar having the "correct"
    // year (as in what users expect to see) as eraYear, while iso8601 (which
    // is the default in DHIS2) does not have an eraYear and only year -
    // Temporal team has a todo to decide about this behaviour in the polyfill
    // but we should just have the fallback to be safe
    const startYear = startYearDate.eraYear || startYearDate.year

    const years: FixedPeriod[] = []
    // plus 1 -> so we include 1970
    const count = yearsCount ?? year - startYear + 1

    for (let i = 0; i < count; i++) {
        const curYear = currentYear.year - i
        const period = buildYearlyFixedPeriod({
            periodType,
            year: curYear,
            locale: locale as string,
            calendar,
        })

        if (
            endsBefore &&
            doesPeriodEndBefore({ period, date: endsBefore, calendar })
        ) {
            continue
        }

        years.push(period)
    }

    return years
}

export default generateFixedPeriodsYearly
