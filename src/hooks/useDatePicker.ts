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
    warningMessage: string
    errorMessage: string
}

type UseDatePickerHookType = (options: DatePickerOptions) => UseDatePickerReturn

type CustomDate = Temporal.ZonedDateTime & {
    format?: string
    isValid: boolean
}

const extractAndValidateDateString = (
    date: string,
    options: PickerOptions & {
        minDateString?: string
        maxDateString?: string
        validation?: string
    }
) => {
    let result: Temporal.PlainDateLike & {
        isValid: boolean
        warningMessage?: string
        errorMessage?: string
    }
    if (!date) {
        const { year, month, day } = getNowInCalendar(
            options.calendar,
            options.timeZone
        )

        result = { year, month, day, isValid: true }
        return result
    }
    const { isValid, warningMessage, errorMessage } = validateDateString(
        date,
        options
    )
    if (isValid) {
        const { year, month, day, format } =
            extractDatePartsFromDateString(date)
        result = {
            year,
            month,
            day,
            format,
            isValid,
            warningMessage,
            errorMessage,
        } as Temporal.PlainDateLike & {
            isValid: boolean
            warningMessage: string
            errorMessage: string
        }
    } else {
        const { year, month, day } = getNowInCalendar(
            options.calendar,
            options.timeZone
        )

        result = { year, month, day, isValid: false, errorMessage }
    }

    // for ethiopic, we need to make sure it's the correct era
    // there is a discussion in the Temporal proposal whether this
    // should be made the default era, for now this is a workaround
    if (options.calendar === 'ethiopic') {
        result.era = 'era1'
        result.eraYear = result.year
        delete result.year
    }

    return result
}
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

    const selectedDateZdt = date.isValid
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
                calendarDateString: formatYyyyMmDD(zdt, undefined, date.format),
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

        /*     if (!date.isValid) {
            return
        } */

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
                calendarDate: formatYyyyMmDD(
                    weekDayZdt,
                    undefined,
                    date.format
                ),
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
