import { Temporal } from '@js-temporal/polyfill'
import { useMemo } from 'react'

const groupByWeek = (
    acc: Temporal.ZonedDateTime[][],
    day: Temporal.ZonedDateTime
) => {
    if (day.dayOfWeek === 1) {
        acc.push([])
    }
    const currentWeekArray = acc[acc.length - 1]
    currentWeekArray.push(day)
    return acc
}

/**
 * internal hook used by useDatePicker hook to return the week days numbers in a calendar
 *
 * @param dayZdt
 * @returns an array of array of days (each top-level array is a week)
 */
export const useCalendarWeekDays = (dayZdt: Temporal.ZonedDateTime) => {
    return useMemo(() => {
        const dateInfo: Temporal.ZonedDateTimeLike = {
            year: dayZdt.year,
            month: dayZdt.month,
            day: dayZdt.day,
            hour: 0,
            minute: 0,
            second: 0,
            calendar: dayZdt.calendar,
            timeZone: dayZdt.timeZone,
        }

        // get first day of the month
        const firstDayOfMonth = Temporal.ZonedDateTime.from({
            ...dateInfo,
            day: 1,
        })
        // get first day of first week to display
        const firstDayToDisplay = firstDayOfMonth.subtract({
            days: firstDayOfMonth.dayOfWeek - 1,
        })

        // get last day of month
        const lastDayOfMonth = Temporal.ZonedDateTime.from({
            ...dateInfo,
            day: dayZdt.daysInMonth,
        })

        // get last day of last week of month
        const lastDayToDisplay = lastDayOfMonth.add({
            days: 7 - lastDayOfMonth.dayOfWeek,
        })

        const numberOfDaysInCalendar = lastDayToDisplay
            .toPlainDate()
            .since(firstDayToDisplay.toPlainDate()).days

        let date: Temporal.ZonedDateTime =
            Temporal.ZonedDateTime.from(firstDayToDisplay)

        const allDates: Temporal.ZonedDateTime[] = []

        for (let i = 0; i <= numberOfDaysInCalendar; i++) {
            allDates.push(date)
            date = date.add({ days: 1 })
        }
        return allDates.reduce(groupByWeek, [])
    }, [dayZdt])
}
