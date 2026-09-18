import { useMemo } from 'react'
import { AnyPlainDate, toIsoPlainDate } from '../../utils/plainDate'

const groupByWeek = (acc: AnyPlainDate[][], day: AnyPlainDate) => {
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
 * @param day any date within the month to display
 * @returns an array of array of days (each top-level array is a week)
 */
export const useCalendarWeekDays = (day: AnyPlainDate) => {
    return useMemo(() => {
        // get first day of the month
        const firstDayOfMonth = day.with({ day: 1 })
        // get first day of first week to display
        const firstDayToDisplay = firstDayOfMonth.subtract({
            days: firstDayOfMonth.dayOfWeek - 1,
        })

        // get last day of month
        const lastDayOfMonth = day.with({ day: day.daysInMonth })

        // get last day of last week of month
        const lastDayToDisplay = lastDayOfMonth.add({
            days: 7 - lastDayOfMonth.dayOfWeek,
        })

        const numberOfDaysInCalendar = toIsoPlainDate(lastDayToDisplay).since(
            toIsoPlainDate(firstDayToDisplay)
        ).days

        let date: AnyPlainDate = firstDayToDisplay

        const allDates: AnyPlainDate[] = []

        for (let i = 0; i <= numberOfDaysInCalendar; i++) {
            allDates.push(date)
            date = date.add({ days: 1 })
        }
        return allDates.reduce(groupByWeek, [])
    }, [day])
}
