import { Temporal } from '@js-temporal/polyfill-patched'
import { useMemo } from 'react'
import { PickerOptionsWithResolvedCalendar } from '../../types'
import { getPlainDateFromIso } from '../../utils/helpers'
import localisationHelpers from '../../utils/localisationHelpers'
import { AnyPlainDate } from '../../utils/plainDate'

export const useWeekDayLabels = (
    localeOptions: PickerOptionsWithResolvedCalendar
) =>
    useMemo(() => {
        if (!localeOptions.calendar) {
            throw new Error('a calendar must be provided to useWeekDayLabels')
        }
        // Day-of-week ordering is calendar-independent (the same physical
        // day is the same weekday regardless of calendar tag), so any known
        // ISO Monday works as the reference point - 2024-01-01 is a Monday.
        const isoMonday = Temporal.PlainDate.from({
            year: 2024,
            month: 1,
            day: 1,
        })
        const startOfWeek = getPlainDateFromIso(
            {
                year: isoMonday.year,
                month: isoMonday.month,
                day: isoMonday.day,
            },
            localeOptions.calendar
        )

        const labels = []

        for (let i = 0; i < startOfWeek.daysInWeek; i++) {
            const currentDate = startOfWeek.add({
                days: i,
            })

            const weekDayString = getWeekDayString(currentDate, localeOptions)
            labels.push(weekDayString)
        }
        return labels
    }, [localeOptions])

const getWeekDayString: (
    date: AnyPlainDate,
    localeOptions: PickerOptionsWithResolvedCalendar
) => string = (date, localeOptions) => {
    return localisationHelpers.localiseWeekDayLabel(date, localeOptions)
}
