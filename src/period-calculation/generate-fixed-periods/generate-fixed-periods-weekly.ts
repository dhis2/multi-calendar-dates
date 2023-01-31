import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { formatYyyyMmDD, padWithZeroes } from '../../utils/helpers'
import { FIXED_PERIOD_TYPES } from '../period-types'
import { FixedPeriod, GeneratedPeriodsFunc, PeriodIdentifier } from '../types'
import isExcludedPeriod from './is-excluded-period'

const Days = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
}

const getStartingDay = (
    periodType: PeriodIdentifier,
    startingDay: number | undefined
) => {
    switch (periodType) {
        case FIXED_PERIOD_TYPES.WEEKLY:
        case FIXED_PERIOD_TYPES.BIWEEKLY:
            return startingDay || Days.Monday
        case FIXED_PERIOD_TYPES.WEEKLYSAT:
            return Days.Saturday
        case FIXED_PERIOD_TYPES.WEEKLYSUN:
            return Days.Sunday
        case FIXED_PERIOD_TYPES.WEEKLYTHU:
            return Days.Thursday
        case FIXED_PERIOD_TYPES.WEEKLYWED:
            return Days.Wednesday
        default:
            throw new Error(`unrecoginsed weekly period type: ${periodType}`)
    }
}

const generateFixedPeriodsWeekly: GeneratedPeriodsFunc = ({
    year,
    calendar,
    periodType,
    startingDay,
    excludeDay: _excludeDay,
}) => {
    const excludeDay = _excludeDay ? Temporal.PlainDate.from(_excludeDay) : null
    const startingDayToUse = getStartingDay(periodType, startingDay)
    let date = getStartingDate({
        year,
        calendar,
        periodType,
        startingDay: startingDayToUse,
    })

    const days: FixedPeriod[] = []
    let i = 1

    const daysToAdd = periodType === FIXED_PERIOD_TYPES.BIWEEKLY ? 13 : 6

    do {
        const endofWeek = date.add({ days: daysToAdd })

        if (
            excludeDay &&
            isExcludedPeriod({
                period: {
                    startDate: date.toString(),
                    endDate: endofWeek.toString(),
                },
                excludeDay,
            })
        ) {
            break
        }

        const value = buildValue({
            periodType,
            startingDay: startingDayToUse,
            year,
            weekIndex: i,
        })

        if (!(endofWeek.year === year + 1 && endofWeek.day >= 4)) {
            const name = buildLabel({
                periodType,
                date,
                nextWeek: endofWeek,
                weekIndex: i,
            })
            days.push({
                periodType,
                id: value,
                iso: value,
                name,
                displayName: name,
                startDate: formatYyyyMmDD(date),
                endDate: formatYyyyMmDD(endofWeek),
            })
        }
        date = Temporal.PlainDate.from(endofWeek).add({ days: 1 })
        i++
    } while (date.year === year) // important to have the condition after since the very first day can be in the previous year
    return days
}

const getStartingDate = (options: {
    year: number
    startingDay: number
    calendar: SupportedCalendar
    periodType: PeriodIdentifier
}) => {
    const { year, calendar, startingDay } = options

    // first week in every year has the 4th in the first month
    const fourthOfFirstMonth = Temporal.PlainDate.from({
        year,
        month: 1,
        day: 4,
        calendar,
    })

    const dayDiff = fourthOfFirstMonth.dayOfWeek - startingDay

    if (dayDiff > 0) {
        return fourthOfFirstMonth.subtract({ days: dayDiff })
    } else if (dayDiff < 0) {
        return fourthOfFirstMonth.subtract({ days: dayDiff + 7 })
    }

    return fourthOfFirstMonth
}

const DaysKeys: Record<number, string> = {
    1: '', // Monday is the default and has no key
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun',
}

const buildValue = ({
    startingDay,
    periodType,
    year,
    weekIndex,
}: {
    periodType: PeriodIdentifier
    startingDay: number
    year: number
    weekIndex: number
}) => {
    const periodKey = periodType === FIXED_PERIOD_TYPES.BIWEEKLY ? 'BiW' : 'W'
    return `${year}${DaysKeys[startingDay]}${periodKey}${weekIndex}`
}

type BuildLabelFunc = (options: {
    periodType: PeriodIdentifier
    date: Temporal.PlainDate
    nextWeek: Temporal.PlainDate
    weekIndex: number
}) => string

const buildLabel: BuildLabelFunc = ({
    periodType,
    date,
    nextWeek,
    weekIndex,
}) => {
    const { year, month, day } = date
    const { year: nextYear, month: nextMonth, day: nextDay } = nextWeek
    const prefix =
        periodType === FIXED_PERIOD_TYPES.BIWEEKLY ? 'Bi-Week' : 'Week'
    const label = `${prefix} ${weekIndex} - ${year}-${padWithZeroes(
        month
    )}-${padWithZeroes(day)} - ${nextYear}-${padWithZeroes(
        nextMonth
    )}-${padWithZeroes(nextDay)}`
    return label
}

export default generateFixedPeriodsWeekly
