import { Temporal } from '@js-temporal/polyfill-patched'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { getNowInCalendar } from '../index'
import { PickerOptions, SupportedCalendar } from '../types'
import {
    formatDate,
    getCustomCalendarIfExists,
    extractAndValidateDateString,
} from '../utils/helpers'
import localisationHelpers from '../utils/localisationHelpers'
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
type ValidatedDate = Temporal.YearOrEraAndEraYear &
    Temporal.MonthOrMonthCode & {
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
        const calendar = getCustomCalendarIfExists(
            dhis2CalendarsMap[options.calendar ?? 'gregorian'] ??
                options.calendar
        ) as SupportedCalendar
        return {
            ...options,
            calendar,
        }
    }, [options])

    const resolvedOptions = useResolvedLocaleOptions(
        optionsWithCustomerCalendar
    )

    const prevDateStringRef = useRef(dateString)

    const todayZdt = useMemo(
        () =>
            getNowInCalendar(
                resolvedOptions.calendar,
                resolvedOptions.timeZone
            ).startOfDay(),
        [resolvedOptions]
    )

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

    const temporalCalendar = useMemo(
        () => Temporal.Calendar.from(resolvedOptions.calendar),
        [resolvedOptions.calendar]
    )
    const temporalTimeZone = useMemo(
        () => Temporal.TimeZone.from(resolvedOptions.timeZone),
        [resolvedOptions.timeZone]
    )

    const selectedDateZdt = useMemo(
        () =>
            dateString
                ? Temporal.Calendar.from(temporalCalendar)
                      .dateFromFields(date)
                      .toZonedDateTime({
                          timeZone: temporalTimeZone,
                      })
                : null,
        [dateString, date, temporalCalendar, temporalTimeZone]
    )

    const [firstZdtOfVisibleMonth, setFirstZdtOfVisibleMonth] = useState(() => {
        const zdt = selectedDateZdt || todayZdt
        return zdt.with({ day: 1 })
    })

    const localeOptions = useMemo(
        () => ({
            locale: resolvedOptions.locale,
            calendar: temporalCalendar,
            timeZone: temporalTimeZone,
            weekDayFormat: resolvedOptions.weekDayFormat,
            numberingSystem: resolvedOptions.numberingSystem,
        }),
        [resolvedOptions, temporalCalendar, temporalTimeZone]
    )

    const weekDayLabels = useWeekDayLabels(localeOptions)

    // Both arguments below must stay referentially stable across renders
    // when their actual contents haven't changed: `withCalendar` returns a
    // new Temporal instance on every call, and the options object was
    // previously a fresh object literal on every call. Either one changing
    // identity on every render defeats useNavigation's internal useMemo,
    // which then rebuilds the year (up to 126 entries) and month dropdown
    // lists - each entry formatted through Intl - on every single render,
    // including every keystroke while typing in CalendarInput.
    const navigationDateZdt = useMemo(
        () => firstZdtOfVisibleMonth.withCalendar(localeOptions.calendar),
        [firstZdtOfVisibleMonth, localeOptions.calendar]
    )
    const navigationOptions = useMemo(
        () => ({ ...localeOptions, pastOnly: options?.pastOnly }),
        [localeOptions, options?.pastOnly]
    )
    const navigation = useNavigation(
        navigationDateZdt,
        setFirstZdtOfVisibleMonth,
        navigationOptions
    )
    const selectDate = useCallback(
        (zdt: Temporal.ZonedDateTime) => {
            onDateSelect({
                calendarDateString: formatDate(zdt, undefined, date.format),
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

    const calendarWeekDaysZdts = useCalendarWeekDays(firstZdtOfVisibleMonth)

    useEffect(() => {
        if (dateString === prevDateStringRef.current) {
            return
        }

        prevDateStringRef.current = dateString

        const zdt = Temporal.Calendar.from(temporalCalendar)
            .dateFromFields(date)
            .toZonedDateTime({
                timeZone: temporalTimeZone,
            })

        if (
            (firstZdtOfVisibleMonth.year !== zdt.year ||
                firstZdtOfVisibleMonth.month !== zdt.month) &&
            !calendarWeekDaysZdts.some((week) =>
                week.some((day) => day.equals(zdt))
            )
        ) {
            setFirstZdtOfVisibleMonth(zdt.subtract({ days: zdt.day - 1 }))
        }
    }, [
        date,
        dateString,
        firstZdtOfVisibleMonth,
        calendarWeekDaysZdts,
        temporalCalendar,
        temporalTimeZone,
    ])
    // Rebuilding this list means re-running localiseWeekLabel (Intl-backed,
    // for non-custom calendars) for every visible day cell (~35-42 cells).
    // Without memoization this ran on every render, including every
    // keystroke while typing in CalendarInput.
    const calendarWeekDays = useMemo(
        () =>
            calendarWeekDaysZdts.map((week) =>
                week.map((weekDayZdt) => ({
                    dateValue: formatDate(weekDayZdt, undefined, format),
                    label: localisationHelpers.localiseWeekLabel(
                        weekDayZdt.withCalendar(localeOptions.calendar),
                        {
                            ...localeOptions,
                            calendar: resolvedOptions.calendar,
                        }
                    ),
                    onClick: () => selectDateRef.current(weekDayZdt),
                    isSelected: selectedDateZdt
                        ? selectedDateZdt
                              ?.withCalendar('iso8601')
                              .equals(weekDayZdt.withCalendar('iso8601'))
                        : false,
                    isToday: todayZdt && weekDayZdt.equals(todayZdt),
                    isInCurrentMonth:
                        firstZdtOfVisibleMonth &&
                        weekDayZdt.month === firstZdtOfVisibleMonth.month,
                }))
            ),
        [
            calendarWeekDaysZdts,
            localeOptions,
            resolvedOptions.calendar,
            selectedDateZdt,
            todayZdt,
            firstZdtOfVisibleMonth,
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
