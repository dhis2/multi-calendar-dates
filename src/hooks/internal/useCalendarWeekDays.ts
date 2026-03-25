import { Temporal } from '@js-temporal/polyfill'
import { useMemo } from 'react'
import { getCustomPlainDate } from '../../utils'

const groupByWeek = (acc: Temporal.PlainDate[][], day: Temporal.PlainDate) => {
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
 * @param firstDayOfVisibleMonth
 * @returns an array of array of days (each top-level array is a week)
 */
export const useCalendarWeekDays = (
    firstDayOfVisibleMonth: Temporal.PlainDate
) => {
    return useMemo(() => {
        // const dateInfo: Temporal.PlainDate = {
        //     year: firstDayOfVisibleMonth.year,
        //     month: firstDayOfVisibleMonth.month,
        //     day: firstDayOfVisibleMonth.day,
        //     calendarId: firstDayOfVisibleMonth.calendarId,
        // }

        // get first day of the month
        const firstDayOfMonth = firstDayOfVisibleMonth.with({ day: 1 })
        // .withCalendar(firstDayOfVisibleMonth.calendarId)
        // get first day of first week to display
        const firstDayToDisplay = firstDayOfMonth.subtract({
            days: firstDayOfMonth.dayOfWeek - 1,
        })
        // .withCalendar(firstDayOfVisibleMonth.calendarId)

        // get last day of month
        const lastDayOfMonth = firstDayOfVisibleMonth.with({
            // ...dateInfo,
            day: firstDayOfVisibleMonth.daysInMonth,
        })
        // .withCalendar(firstDayOfVisibleMonth.calendarId)

        // get last day of last week of month
        const lastDayToDisplay = lastDayOfMonth.add({
            days: 7 - lastDayOfMonth.dayOfWeek,
        })
        // .withCalendar(firstDayOfVisibleMonth.calendarId)

        const numberOfDaysInCalendar =
            lastDayToDisplay.since(firstDayToDisplay).days

        const PlainDateObject = getCustomPlainDate(
            firstDayOfVisibleMonth.calendarId
        )

        let date: Temporal.PlainDate = PlainDateObject.from(firstDayToDisplay)
        // .withCalendar(firstDayOfVisibleMonth.calendarId)

        const allDates: Temporal.PlainDate[] = []

        for (let i = 0; i <= numberOfDaysInCalendar; i++) {
            allDates.push(date)
            date = date.add({ days: 1 })
        }
        return allDates.reduce(groupByWeek, [])
    }, [firstDayOfVisibleMonth])
}
