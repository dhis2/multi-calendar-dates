import { Temporal } from '@js-temporal/polyfill'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import {
    CalendarZonedDateTime,
    isNepaliZonedDateTime,
    zonedDateTimeFrom,
    zonedDateTimeWithCalendar,
} from '../custom-calendars'
import { getNowInCalendar } from '../index'
import { PickerOptions, SupportedCalendar } from '../types'
import { formatDate, extractAndValidateDateString } from '../utils/helpers'
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
// 0.5.x dropped the public `YearOrEraAndEraYear` / `MonthOrMonthCode` helper
// types; re-state the shape inline.
type ValidatedDate = {
    year?: number
    era?: string
    eraYear?: number
    month?: number
    monthCode?: string
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
        const requested = options.calendar ?? 'gregorian'
        const calendar = (dhis2CalendarsMap[requested] ??
            requested) as SupportedCalendar
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

    const selectedDateZdt: CalendarZonedDateTime | null = useMemo(() => {
        if (!dateString) {
            return null
        }
        const era = (date as { era?: string }).era
        const eraYear = date.eraYear as number | undefined
        const yearOnly = date.year as number | undefined
        const month =
            (date.month as number | undefined) ??
            (date.monthCode
                ? Number(String(date.monthCode).replace(/^M/, ''))
                : undefined)
        if (month === undefined) {
            return null
        }
        // For calendars with eras (e.g. ethiopic) the validated date is
        // expressed as `era` + `eraYear`; passing a `year` alongside makes
        // the polyfill consistency-check raise. Pick one form.
        const fields =
            era !== undefined && eraYear !== undefined
                ? {
                      eraYear,
                      era,
                      month,
                      day: date.day,
                      year: undefined as number | undefined,
                  }
                : {
                      year: yearOnly ?? eraYear,
                      month,
                      day: date.day,
                  }
        if (
            (fields as { year?: number; eraYear?: number }).year ===
                undefined &&
            (fields as { eraYear?: number }).eraYear === undefined
        ) {
            return null
        }
        return zonedDateTimeFrom(
            fields as Parameters<typeof zonedDateTimeFrom>[0],
            resolvedOptions.calendar,
            resolvedOptions.timeZone
        )
    }, [dateString, date, resolvedOptions.calendar, resolvedOptions.timeZone])

    const [firstZdtOfVisibleMonth, setFirstZdtOfVisibleMonth] = useState(() => {
        const zdt = selectedDateZdt || todayZdt
        return zdt.with({ day: 1 })
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

    // Re-project the held ZDT to the active calendar so navigation reads
    // year/month in the right calendar even after the consumer swaps
    // `options.calendar` on the same component instance.
    const reprojectedFirstOfVisibleMonth = useMemo(
        () =>
            zonedDateTimeWithCalendar(
                firstZdtOfVisibleMonth,
                resolvedOptions.calendar
            ),
        [firstZdtOfVisibleMonth, resolvedOptions.calendar]
    )

    const navigation = useNavigation(
        reprojectedFirstOfVisibleMonth,
        setFirstZdtOfVisibleMonth,
        { ...localeOptions, pastOnly: options?.pastOnly }
    )
    const selectDate = useCallback(
        (zdt: CalendarZonedDateTime) => {
            onDateSelect({
                calendarDateString: formatDate(zdt, undefined, date.format),
            })
        },
        [onDateSelect, date.format]
    )
    const calendarWeekDaysZdts = useCalendarWeekDays(
        reprojectedFirstOfVisibleMonth
    )

    useEffect(() => {
        if (dateString === prevDateStringRef.current) {
            return
        }

        prevDateStringRef.current = dateString

        if (!selectedDateZdt) {
            return
        }

        const zdt = selectedDateZdt

        if (
            (firstZdtOfVisibleMonth.year !== zdt.year ||
                firstZdtOfVisibleMonth.month !== zdt.month) &&
            !calendarWeekDaysZdts.some((week) =>
                week.some((day) => zdtEquals(day, zdt))
            )
        ) {
            setFirstZdtOfVisibleMonth(zdt.subtract({ days: zdt.day - 1 }))
        }
    }, [
        date,
        dateString,
        firstZdtOfVisibleMonth,
        calendarWeekDaysZdts,
        selectedDateZdt,
    ])
    const result: UseDatePickerReturn = {
        calendarWeekDays: calendarWeekDaysZdts.map((week) =>
            week.map((weekDayZdt) => ({
                dateValue: formatDate(weekDayZdt, undefined, format),
                label: localisationHelpers.localiseWeekLabel(weekDayZdt, {
                    ...localeOptions,
                    calendar: resolvedOptions.calendar,
                }),
                onClick: () => selectDate(weekDayZdt),
                isSelected: selectedDateZdt
                    ? zdtSameIsoInstant(selectedDateZdt, weekDayZdt)
                    : false,
                isToday: todayZdt && zdtEquals(weekDayZdt, todayZdt),
                isInCurrentMonth:
                    firstZdtOfVisibleMonth &&
                    weekDayZdt.month === firstZdtOfVisibleMonth.month,
            }))
        ),
        ...navigation,
        weekDayLabels,
    }

    return result
}

const zdtEquals = (a: CalendarZonedDateTime, b: CalendarZonedDateTime) => {
    if (isNepaliZonedDateTime(a) || isNepaliZonedDateTime(b)) {
        return a.year === b.year && a.month === b.month && a.day === b.day
    }
    return (a as Temporal.ZonedDateTime).equals(b as Temporal.ZonedDateTime)
}

const zdtSameIsoInstant = (
    a: CalendarZonedDateTime,
    b: CalendarZonedDateTime
) => {
    const aIso = zonedDateTimeWithCalendar(
        a,
        'iso8601'
    ) as Temporal.ZonedDateTime
    const bIso = zonedDateTimeWithCalendar(
        b,
        'iso8601'
    ) as Temporal.ZonedDateTime
    return aIso.equals(bIso)
}
