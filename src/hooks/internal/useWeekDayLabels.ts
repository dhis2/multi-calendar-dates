import { Temporal } from '@js-temporal/polyfill'
import { useMemo } from 'react'
import {
    CalendarZonedDateTime,
    isNepaliCalendar,
    NepaliZonedDateTime,
} from '../../custom-calendars'
import { PickerOptionsWithResolvedCalendar } from '../../types'
import localisationHelpers from '../../utils/localisationHelpers'

export const useWeekDayLabels = (
    localeOptions: PickerOptionsWithResolvedCalendar
) =>
    useMemo(() => {
        if (!localeOptions.calendar) {
            throw new Error('a calendar must be provided to useWeekDayLabels')
        }
        const isoNow = Temporal.Now.zonedDateTimeISO()
        const today: CalendarZonedDateTime = isNepaliCalendar(
            localeOptions.calendar
        )
            ? NepaliZonedDateTime.fromIso(isoNow).startOfDay()
            : isoNow
                  .withCalendar(localeOptions.calendar as Temporal.CalendarLike)
                  .startOfDay()

        const startOfWeek = today.subtract({ days: today.dayOfWeek - 1 }) // dayOfWeek is 1-based, where 1 is Monday

        const labels = []

        for (let i = 0; i < today.daysInWeek; i++) {
            const currentDate = startOfWeek.add({
                days: i,
            })

            const weekDayString = getWeekDayString(currentDate, localeOptions)
            labels.push(weekDayString)
        }
        return labels
    }, [localeOptions])

const getWeekDayString: (
    date: CalendarZonedDateTime,
    localeOptions: PickerOptionsWithResolvedCalendar
) => string = (date, localeOptions) => {
    return localisationHelpers.localiseWeekDayLabel(date, localeOptions)
}
