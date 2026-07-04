import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { getNowInCalendar } from '../index'
import { PickerOptions, SupportedCalendar } from '../types'
import {
    formatDate,
    getPlainDateFromCalendarFields,
    getPlainDateFromIso,
    extractAndValidateDateString,
} from '../utils/helpers'
import localisationHelpers from '../utils/localisationHelpers'
import { AnyPlainDate, isSameDate, toIsoPlainDate } from '../utils/plainDate'
import { useCalendarWeekDays } from './internal/useCalendarWeekDays'
import {
    useNavigation,
    UseNavigationReturnType,
} from './internal/useNavigation'
import { useResolvedLocaleOptions } from './internal/useResolvedLocaleOptions'
import { useWeekDayLabels } from './internal/useWeekDayLabels'

export type OnDateSelectPayload = {
    calendarDateString: string
} | null

export type DatePickerOptions = {
    date: string
    options: PickerOptions
    onDateSelect: (payload: OnDateSelectPayload) => void
    minDate?: string
    maxDate?: string
    format?: 'YYYY-MM-DD' | 'DD-MM-YYYY'
    strictValidation?: boolean
}

export type UseDatePickerReturn = UseNavigationReturnType & {
    weekDayLabels: string[]
    calendarWeekDays: {
        dateValue: string
        label: string | number
        onClick: () => void
        isSelected: boolean | undefined
        isToday: boolean
        isInCurrentMonth: boolean
    }[][]
}
type UseDatePickerHookType = (options: DatePickerOptions) => UseDatePickerReturn
type ValidatedDate = {
    era?: string
    eraYear?: number
    year?: number
    monthCode?: string
    month?: number
    day: number
    format?: string
}

export const useDatePicker: UseDatePickerHookType = ({
    onDateSelect,
    date: dateString,
    minDate,
    maxDate,
    format,
    strictValidation,
    options,
}) => {
    const optionsWithCustomerCalendar = useMemo(() => {
        const calendar = (dhis2CalendarsMap[options.calendar ?? 'gregorian'] ??
            options.calendar) as SupportedCalendar
        return {
            ...options,
            calendar,
        }
    }, [options])

    const resolvedOptions = useResolvedLocaleOptions(
        optionsWithCustomerCalendar
    )

    const prevDateStringRef = useRef(dateString)

    // getNowInCalendar returns plain calendar-agnostic data (year/month/day) -
    // reconstruct it into an AnyPlainDate here since this hook needs
    // arithmetic (.with()) and comparisons (isSameDate) on "today".
    const today = useMemo(() => {
        const todayFields = getNowInCalendar(
            resolvedOptions.calendar,
            resolvedOptions.timeZone as string
        )
        return getPlainDateFromCalendarFields(
            todayFields,
            resolvedOptions.calendar
        )
    }, [resolvedOptions])

    const date = useMemo(
        () =>
            extractAndValidateDateString(dateString, {
                ...resolvedOptions,
                minDateString: minDate,
                maxDateString: maxDate,
                strictValidation,
                format,
            }) as ValidatedDate,
        [
            minDate,
            maxDate,
            strictValidation,
            format,
            resolvedOptions,
            dateString,
        ]
    )

    date.format = !date.format ? format : date.format

    const selectedDate = useMemo(
        () =>
            dateString
                ? getPlainDateFromCalendarFields(date, resolvedOptions.calendar)
                : null,
        [dateString, date, resolvedOptions.calendar]
    )

    const [firstOfVisibleMonth, setFirstOfVisibleMonth] =
        useState<AnyPlainDate>(() => {
            const base = selectedDate || today
            return base.with({ day: 1 })
        })

    const localeOptions = useMemo(
        () => ({
            locale: resolvedOptions.locale,
            calendar: resolvedOptions.calendar,
            timeZone: resolvedOptions.timeZone,
            weekDayFormat: resolvedOptions.weekDayFormat,
            numberingSystem: resolvedOptions.numberingSystem,
        }),
        [resolvedOptions]
    )

    const weekDayLabels = useWeekDayLabels(localeOptions)

    // firstOfVisibleMonth can still be tagged with a previous calendar for
    // one render after the calendar option changes (it's only re-derived
    // when `dateString` changes, in the effect below) - re-derive it from
    // its ISO position in the CURRENT calendar before handing it to
    // useNavigation, same as calendarWeekDays' per-cell label below.
    // Memoized (rather than recomputed inline) so it - and therefore
    // navigationOptions/useNavigation's own memo - stay referentially
    // stable across renders when neither dependency actually changed; see
    // useNavigation's internal useMemo, which rebuilds the year (up to 126
    // entries) and month dropdown lists - each entry formatted through
    // Intl - whenever its arguments change identity, including every
    // keystroke while typing in CalendarInput.
    const navigationDate = useMemo(() => {
        const isoDate = toIsoPlainDate(firstOfVisibleMonth)
        return getPlainDateFromIso(
            { year: isoDate.year, month: isoDate.month, day: isoDate.day },
            resolvedOptions.calendar
        )
    }, [firstOfVisibleMonth, resolvedOptions.calendar])
    const navigationOptions = useMemo(
        () => ({ ...localeOptions, pastOnly: options?.pastOnly }),
        [localeOptions, options?.pastOnly]
    )
    const navigation = useNavigation(
        navigationDate,
        setFirstOfVisibleMonth,
        navigationOptions
    )
    const selectDate = useCallback(
        (day: AnyPlainDate) => {
            onDateSelect({
                calendarDateString: formatDate(day, undefined, date.format),
            })
        },
        [onDateSelect, date.format]
    )
    // selectDate is recreated on every render (its callers rarely memoize
    // the onDateSelect they pass in), so it can't be a dependency of the
    // calendarWeekDays memo below without defeating it. Read the latest
    // version through a ref instead, at click time, from inside the memo.
    const selectDateRef = useRef(selectDate)
    selectDateRef.current = selectDate

    const calendarWeekDaysDates = useCalendarWeekDays(firstOfVisibleMonth)

    useEffect(() => {
        if (dateString === prevDateStringRef.current) {
            return
        }

        prevDateStringRef.current = dateString

        const newDate = getPlainDateFromCalendarFields(
            date,
            resolvedOptions.calendar
        )

        if (
            (firstOfVisibleMonth.year !== newDate.year ||
                firstOfVisibleMonth.month !== newDate.month) &&
            !calendarWeekDaysDates.some((week) =>
                week.some((day) =>
                    toIsoPlainDate(day).equals(toIsoPlainDate(newDate))
                )
            )
        ) {
            setFirstOfVisibleMonth(newDate.with({ day: 1 }))
        }
    }, [
        date,
        dateString,
        firstOfVisibleMonth,
        calendarWeekDaysDates,
        resolvedOptions.calendar,
    ])
    // Rebuilding this list means re-running localiseWeekLabel (Intl-backed,
    // for non-custom calendars) for every visible day cell (~35-42 cells).
    // Without memoization this ran on every render, including every
    // keystroke while typing in CalendarInput.
    const calendarWeekDays = useMemo(
        () =>
            calendarWeekDaysDates.map((week) =>
                week.map((weekDay) => {
                    // firstOfVisibleMonth (and therefore weekDay) can still be
                    // tagged with a previous calendar for one render after the
                    // calendar option changes (it's only re-derived when
                    // `dateString` changes, in the effect above) - re-derive
                    // the label from weekDay's ISO position in the CURRENT
                    // calendar rather than trusting its own calendar tag.
                    const isoWeekDay = toIsoPlainDate(weekDay)
                    const weekDayInCurrentCalendar = getPlainDateFromIso(
                        {
                            year: isoWeekDay.year,
                            month: isoWeekDay.month,
                            day: isoWeekDay.day,
                        },
                        resolvedOptions.calendar
                    )
                    return {
                        dateValue: formatDate(weekDay, undefined, format),
                        label: localisationHelpers.localiseWeekLabel(
                            weekDayInCurrentCalendar,
                            localeOptions
                        ),
                        onClick: () => selectDateRef.current(weekDay),
                        isSelected: selectedDate
                            ? toIsoPlainDate(selectedDate).equals(isoWeekDay)
                            : false,
                        isToday: !!today && isSameDate(weekDay, today),
                        isInCurrentMonth:
                            !!firstOfVisibleMonth &&
                            weekDay.month === firstOfVisibleMonth.month,
                    }
                })
            ),
        [
            calendarWeekDaysDates,
            localeOptions,
            resolvedOptions.calendar,
            selectedDate,
            today,
            firstOfVisibleMonth,
            format,
        ]
    )

    const result: UseDatePickerReturn = {
        calendarWeekDays,
        ...navigation,
        weekDayLabels,
    }

    return result
}
