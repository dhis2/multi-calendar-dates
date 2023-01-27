import { Temporal } from '@js-temporal/polyfill'
import monthNumbers from '../month-numbers'
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
    yearsCount = 10,
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

    for (let i = 0; i < yearsCount; i++) {
        const curYear = currentYear.year - i
        const period = buildYearlyFixedPeriod({
            periodType,
            year: curYear,
            locale,
            calendar,
        })

        if (excludeDay && isExcludedPeriod({ period, excludeDay })) {
            break
        }

        years.push(period)
    }

    return years
}

export default generateFixedPeriodsYearly
