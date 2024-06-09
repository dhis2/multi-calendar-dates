import { Temporal } from '@js-temporal/polyfill'
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

type DatePickerOptions = {
    date: string
    options: PickerOptions
    onDateSelect: ({
        calendarDate,
        calendarDateString,
    }: {
        calendarDate: Temporal.ZonedDateTime
        calendarDateString: string
    }) => void
    minDate?: string
    maxDate?: string
    format?: string
    validation?: string
}

export type UseDatePickerReturn = UseNavigationReturnType & {
    weekDayLabels: string[]
    calendarWeekDays: {
        zdt: Temporal.ZonedDateTime
        label: string | number
        calendarDate: string
        onClick: () => void
        isSelected: boolean | undefined
        isToday: boolean
        isInCurrentMonth: boolean
    }[][]
    isValid: boolean
    warningMessage: string
    errorMessage: string
}

type UseDatePickerHookType = (options: DatePickerOptions) => UseDatePickerReturn

export const useDatePicker: UseDatePickerHookType = ({
    onDateSelect,
    date: dateString,
    minDate,
    maxDate,
    format,
    validation,
    options,
}) => {
    const calendar = getCustomCalendarIfExists(
        dhis2CalendarsMap[options.calendar ?? 'gregorian'] ?? options.calendar
    ) as SupportedCalendar

    const resolvedOptions = useResolvedLocaleOptions({
        ...options,
        calendar,
    })
    const prevDateStringRef = useRef(dateString)

    const todayZdt = useMemo(
        () =>
            getNowInCalendar(
                resolvedOptions.calendar,
                resolvedOptions.timeZone
            ).startOfDay(),
        [resolvedOptions]
    )

    const result = extractAndValidateDateString(dateString, {
        ...resolvedOptions,
        minDateString: minDate,
        maxDateString: maxDate,
        validation: validation,
    })

    const date = result as Temporal.YearOrEraAndEraYear &
        Temporal.MonthOrMonthCode & {
            day: number
            isValid: boolean
            warningMessage: string
            errorMessage: string
            format?: string
        }

    date.format = !date.format ? format : date.format

    const temporalCalendar = useMemo(
        () => Temporal.Calendar.from(resolvedOptions.calendar),
        [resolvedOptions.calendar]
    )
    const temporalTimeZone = useMemo(
        () => Temporal.TimeZone.from(resolvedOptions.timeZone),
        [resolvedOptions]
    )

    const selectedDateZdt = dateString
        ? Temporal.Calendar.from(temporalCalendar)
              .dateFromFields(date)
              .toZonedDateTime({
                  timeZone: temporalTimeZone,
              })
        : null

    const [firstZdtOfVisibleMonth, setFirstZdtOfVisibleMonth] = useState(() => {
        const zdt = selectedDateZdt || todayZdt
        return zdt.with({ day: 1 })
    })

    const localeOptions = useMemo(
        () => ({
            locale: resolvedOptions.locale,
            calendar: temporalCalendar as unknown as SupportedCalendar,
            timeZone: temporalTimeZone,
            weekDayFormat: resolvedOptions.weekDayFormat,
            numberingSystem: resolvedOptions.numberingSystem,
        }),
        [resolvedOptions, temporalCalendar, temporalTimeZone]
    )

    const weekDayLabels = useWeekDayLabels(localeOptions)

    const navigation = useNavigation(
        firstZdtOfVisibleMonth.withCalendar(localeOptions.calendar),
        setFirstZdtOfVisibleMonth,
        localeOptions
    )
    const selectDate = useCallback(
        (zdt: Temporal.ZonedDateTime) => {
            onDateSelect({
                calendarDate: zdt,
                calendarDateString: formatDate(zdt, undefined, date.format),
            })
        },
        [onDateSelect, date.format]
    )
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
    return {
        calendarWeekDays: calendarWeekDaysZdts.map((week) =>
            week.map((weekDayZdt) => ({
                zdt: weekDayZdt,
                calendarDate: formatDate(weekDayZdt, undefined, date.format),
                label: localisationHelpers.localiseWeekLabel(
                    weekDayZdt.withCalendar(localeOptions.calendar),
                    localeOptions
                ),
                onClick: () => selectDate(weekDayZdt),
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
        ...navigation,
        weekDayLabels,
        isValid: date.isValid,
        warningMessage: date.warningMessage,
        errorMessage: date.errorMessage,
    }
}
