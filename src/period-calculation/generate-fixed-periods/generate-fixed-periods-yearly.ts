import { Temporal } from '@js-temporal/polyfill'
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
    const excludeDay = _excludeDay ? Temporal.PlainDate.from(_excludeDay) : null
    const month = getYearlyStartMonthByPeriodType(periodType)
    const currentYear = Temporal.PlainDate.from({
        year,
        month,
        day: calendar.toString() === 'nepali' ? 14 : 1,
        calendar,
    })

    const years: FixedPeriod[] = []
    // plus 1 -> so we include 1970
    const count = yearsCount ?? year - 1970 + 1

    for (let i = 0; i < count; i++) {
        const curYear = currentYear.year - i
        const period = buildYearlyFixedPeriod({
            periodType,
            year: curYear,
            locale,
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
