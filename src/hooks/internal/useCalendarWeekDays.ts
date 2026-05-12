import { Temporal } from '@js-temporal/polyfill'
import { useMemo } from 'react'
import {
    CalendarZonedDateTime,
    isNepaliZonedDateTime,
    NepaliZonedDateTime,
} from '../../custom-calendars'

const groupByWeek = (
    acc: CalendarZonedDateTime[][],
    day: CalendarZonedDateTime
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
export const useCalendarWeekDays = (dayZdt: CalendarZonedDateTime) => {
    return useMemo(() => {
        const firstDayOfMonth = dayZdt.with({ day: 1 })

        // get first day of first week to display
        const firstDayToDisplay = firstDayOfMonth.subtract({
            days: firstDayOfMonth.dayOfWeek - 1,
        })

        const lastDayOfMonth = dayZdt.with({ day: dayZdt.daysInMonth })

        // get last day of last week of month
        const lastDayToDisplay = lastDayOfMonth.add({
            days: 7 - lastDayOfMonth.dayOfWeek,
        })

        const numberOfDaysInCalendar = isNepaliZonedDateTime(lastDayToDisplay)
            ? lastDayToDisplay
                  .toPlainDate()
                  .since(
                      (firstDayToDisplay as NepaliZonedDateTime).toPlainDate()
                  ).days
            : (lastDayToDisplay as Temporal.ZonedDateTime)
                  .toPlainDate()
                  .since(
                      (
                          firstDayToDisplay as Temporal.ZonedDateTime
                      ).toPlainDate()
                  ).days

        let date: CalendarZonedDateTime = firstDayToDisplay

        const allDates: CalendarZonedDateTime[] = []

        for (let i = 0; i <= numberOfDaysInCalendar; i++) {
            allDates.push(date)
            date = date.add({ days: 1 })
        }
        return allDates.reduce(groupByWeek, [])
    }, [dayZdt])
}
