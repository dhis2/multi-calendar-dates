import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate, formatYyyyMmDD, padWithZeroes } from '../../utils/index'
import { FixedPeriod, PeriodType } from '../types'
import doesPeriodEndBefore from './does-period-end-before'

const Days = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
}

type GenerateFixedPeriodsWeekly = (options: {
    year: number
    periodType: PeriodType
    calendar: SupportedCalendar
    startingDay: number /** 1 is Monday */
    endsBefore?: Temporal.PlainDate
}) => Array<FixedPeriod>

// Does not need a `locale` as we're displaying the month as number in the
// displayName/name
const generateFixedPeriodsWeekly: GenerateFixedPeriodsWeekly = ({
    year,
    calendar,
    periodType,
    startingDay,
    endsBefore,
}) => {
    const startingDayToUse = getStartingDay(periodType, startingDay)
    let date = getStartingDate({
        year,
        calendar,
        periodType,
        startingDay: startingDayToUse,
    })

    const days: FixedPeriod[] = []
    let i = 1

    const daysToAdd = periodType === 'BIWEEKLY' ? 13 : 6

    do {
        const endofWeek = date.add({ days: daysToAdd })

        if (
            endsBefore &&
            doesPeriodEndBefore({
                period: {
                    startDate: date.toString(),
                    endDate: endofWeek.toString(),
                },
                date: endsBefore,
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
        date = fromAnyDate({ date: endofWeek, calendar }).add({ days: 1 })
        i++
    } while (date.year === year) // important to have the condition after since the very first day can be in the previous year
    return days
}

const getStartingDay = (
    periodType: PeriodType,
    startingDay: number | undefined
) => {
    switch (periodType) {
        case 'WEEKLYMON':
            return Days.Monday
        case 'WEEKLYTUE':
            return Days.Tuesday
        case 'WEEKLYWED':
            return Days.Wednesday
        case 'WEEKLYTHU':
            return Days.Thursday
        case 'WEEKLYFRI':
            return Days.Friday
        case 'WEEKLYSAT':
            return Days.Saturday
        case 'WEEKLYSUN':
            return Days.Sunday
        case 'WEEKLY':
        case 'BIWEEKLY':
        default:
            return startingDay || Days.Monday
    }
}

const getStartingDate = (options: {
    year: number
    startingDay: number
    calendar: SupportedCalendar
    periodType: PeriodType
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
    periodType: PeriodType
    startingDay: number
    year: number
    weekIndex: number
}) => {
    const periodKey = periodType === 'BIWEEKLY' ? 'BiW' : 'W'
    return `${year}${DaysKeys[startingDay]}${periodKey}${weekIndex}`
}

type BuildLabelFunc = (options: {
    periodType: PeriodType
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
    const prefix = periodType === 'BIWEEKLY' ? 'Bi-Week' : 'Week'
    const label = `${prefix} ${weekIndex} - ${year}-${padWithZeroes(
        month
    )}-${padWithZeroes(day)} - ${nextYear}-${padWithZeroes(
        nextMonth
    )}-${padWithZeroes(nextDay)}`
    return label
}

export default generateFixedPeriodsWeekly
