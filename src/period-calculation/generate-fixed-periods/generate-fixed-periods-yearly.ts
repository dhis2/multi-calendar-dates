import { Temporal } from '@js-temporal/polyfill'
import { fromAnyDate } from '../../utils/index'
import { FixedPeriod, GeneratedPeriodsFunc } from '../types'
import {
    buildYearlyFixedPeriod,
    getYearlyStartMonthByPeriodType,
} from '../yearly-periods/index'
import isExcludedPeriod from './is-excluded-period'

const generateFixedPeriodsYearly: GeneratedPeriodsFunc = ({
    year,
    calendar,
    periodType,
    excludeDay: _excludeDay,
    yearsCount,
    locale,
}) => {
    const excludeDay = _excludeDay
        ? fromAnyDate({ calendar, date: _excludeDay })
        : null
    const month = getYearlyStartMonthByPeriodType(periodType)
    const currentYear = Temporal.PlainDate.from({
        year,
        month,
        day: calendar.toString() === 'nepali' ? 14 : 1,
        calendar,
    })

    // We can't use 1970 as calendars with different year numbers have a
    // different year at timestamp 0
    const startYearDate = Temporal.PlainDate.from({
        day: 1,
        month: 1,
        year: 1970,
        calendar: 'gregory',
    }).withCalendar(calendar)
    const startYear = startYearDate.eraYear || startYearDate.year

    const years: FixedPeriod[] = []
    // plus 1 -> so we include 1970
    const count = yearsCount ?? year - startYear + 1

    for (let i = 0; i < count; i++) {
        const curYear = currentYear.year - i
        const period = buildYearlyFixedPeriod({
            periodType,
            year: curYear,

            // GeneratedPeriodsFunc is used for both the exposed api function
            // as well as for the internal functions
            //
            // @TODO: As the exposed function and internal functions differ
            // slightly (`locale` is optional on the exposed one but required
            // by all internal functions), the functions signatures should be
            // different
            locale: locale as string,
            calendar,
        })

        if (excludeDay && isExcludedPeriod({ period, excludeDay })) {
            continue
        }

        years.push(period)
    }

    return years
}

export default generateFixedPeriodsYearly
