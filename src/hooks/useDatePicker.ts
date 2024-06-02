import { Temporal } from '@js-temporal/polyfill'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { getNowInCalendar } from '../index'
import { PickerOptions, SupportedCalendar } from '../types'
import { extractDatePartsFromDateString, validateDateString } from '../utils'
import { formatYyyyMmDD, getCustomCalendarIfExists } from '../utils/helpers'
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
    warningMessage?: string
    errorMessage?: string
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
        dhis2CalendarsMap[options.calendar!] ?? options.calendar
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
    console.log(todayZdt.toString(), 't')
    const { isValid, warningMessage, errorMessage } = validateDateString(
        dateString,
        { minDateString: minDate, maxDateString: maxDate, validation }
    )

    let date: Temporal.PlainDateLike
    if (isValid) {
        const { year, month, day } = extractDatePartsFromDateString(dateString)
        date = { year, month, day, format }
    } else {
        const { year, month, day } = getNowInCalendar(
            options.calendar,
            options.timeZone
        )
        date = { year, month, day }
    }
    if (options.calendar === 'ethiopic') {
        date.era = 'era1'
        date.eraYear = date.year
        delete date.year
    }
    /*     const date = result as Temporal.YearOrEraAndEraYear &
        Temporal.MonthOrMonthCode & {
            day: number
            isValid: boolean
            warningMessage: string
            errorMessage: string
            format: string
        } */
    console.log(date)
    const temporalCalendar = useMemo(
        () => Temporal.Calendar.from(resolvedOptions.calendar),
        [resolvedOptions.calendar]
    )
    const temporalTimeZone = useMemo(
        () => Temporal.TimeZone.from(resolvedOptions.timeZone),
        [resolvedOptions]
    )

    /*     const selectedDateZdt = date.isValid
        ? Temporal.Calendar.from(temporalCalendar)
              .dateFromFields(date)
              .toZonedDateTime({
                  timeZone: temporalTimeZone,
              })
        : null */

    const selectedDateZdt = useMemo(
        () =>
            date
                ? Temporal.Calendar.from(temporalCalendar)
                      .dateFromFields(
                          date as Temporal.YearOrEraAndEraYear &
                              Temporal.MonthOrMonthCode & { day: number }
                      )
                      .toZonedDateTime({
                          timeZone: temporalTimeZone,
                      })
                : null,
        [date, temporalTimeZone, temporalCalendar]
    )

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
                calendarDateString: formatYyyyMmDD(zdt, date.format),
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

        if (!dateString) {
            return
        }

        const zdt = Temporal.Calendar.from(temporalCalendar)
            .dateFromFields(
                date as Temporal.YearOrEraAndEraYear &
                    Temporal.MonthOrMonthCode & { day: number }
            )
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
                calendarDate: formatYyyyMmDD(weekDayZdt),
                label: localisationHelpers.localiseWeekLabel(
                    weekDayZdt.withCalendar(localeOptions.calendar),
                    localeOptions
                ),
                onClick: () => selectDate(weekDayZdt),
                isSelected: selectedDateZdt
                    ?.withCalendar('iso8601')
                    .equals(weekDayZdt.withCalendar('iso8601')),
                isToday: todayZdt && weekDayZdt.equals(todayZdt),
                isInCurrentMonth:
                    firstZdtOfVisibleMonth &&
                    weekDayZdt.month === firstZdtOfVisibleMonth.month,
            }))
        ),
        ...navigation,
        weekDayLabels,
        isValid: isValid,
        warningMessage: warningMessage,
        errorMessage: errorMessage,
    }
}
