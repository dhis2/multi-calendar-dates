import { Temporal } from '@js-temporal/polyfill'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { dhis2CalendarsMap } from '../constants/dhis2CalendarsMap'
import { getNowInCalendar } from '../index'
import { SupportedCalendar } from '../types'
import { formatYyyyMmDD, getCustomCalendarIfExists } from '../utils/helpers'
import localisationHelpers from '../utils/localisationHelpers'
import { useCalendarWeekDays } from './internal/useCalendarWeekDays'
import {
    useNavigation,
    UseNavigationReturnType,
} from './internal/useNavigation'
import { useWeekDayLabels } from './internal/useWeekDayLabels'

type DatePickerOptions = {
    date: string
    options: LocaleOptions
    onDateSelect: ({
        calendarDate,
        calendarDateString,
    }: {
        calendarDate: Temporal.ZonedDateTime
        calendarDateString: string
    }) => void
}

export type LocaleOptions = {
    locale: string
    calendar?: SupportedCalendar
    timeZone?: Temporal.TimeZoneLike
    numberingSystem?: string
    weekDayFormat?: 'narrow' | 'short' | 'long'
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
}

type UseDatePickerHookType = (options: DatePickerOptions) => UseDatePickerReturn

const fromDateParts = (date: string, options: LocaleOptions) => {
    let result: Temporal.PlainDateLike

    try {
        const dateParts = date?.split('-')
        if (dateParts.length !== 3) {
            throw new Error(
                `Invalid date ${date} - date should be in the format YYYY-MM-DD`
            )
        }
        const [year, month, day] = dateParts
        result = { year: Number(year), month: Number(month), day: Number(day) }
    } catch (err) {
        console.warn(err)

        const { year, month, day } = getNowInCalendar(
            options.calendar,
            options.timeZone
        )

        result = { year, month, day }
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
    date: dateParts,
    options,
}) => {
    const prevDateStringRef = useRef(dateParts)

    const todayZdt = useMemo(
        () => getNowInCalendar(options.calendar, options.timeZone).startOfDay(),
        [options]
    )

    const date = dateParts
        ? (fromDateParts(dateParts, options) as Temporal.YearOrEraAndEraYear &
              Temporal.MonthOrMonthCode & { day: number })
        : todayZdt

    const { calendar: calendarFromOptions = 'gregory', locale = 'en' } = options

    const calendar: Temporal.CalendarLike = getCustomCalendarIfExists(
        dhis2CalendarsMap[calendarFromOptions] ?? calendarFromOptions
    )

    const temporalCalendar = useMemo(
        () => Temporal.Calendar.from(calendar),
        [calendar]
    )
    const temporalTimeZone = useMemo(
        () =>
            Temporal.TimeZone.from(
                options.timeZone ||
                    Intl?.DateTimeFormat?.().resolvedOptions?.()?.timeZone ||
                    'UTC'
            ),
        [options]
    )

    const selectedDateZdt = useMemo(
        () =>
            date
                ? Temporal.Calendar.from(temporalCalendar)
                      .dateFromFields(date)
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
            locale,
            calendar: temporalCalendar as unknown as SupportedCalendar,
            timeZone: temporalTimeZone,
            weekDayFormat: options.weekDayFormat || 'narrow',
            numberingSystem: options.numberingSystem,
        }),
        [
            locale,
            temporalCalendar,
            temporalTimeZone,
            options.weekDayFormat,
            options.numberingSystem,
        ]
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
                calendarDateString: formatYyyyMmDD(zdt),
            })
        },
        [onDateSelect]
    )
    const calendarWeekDaysZdts = useCalendarWeekDays(firstZdtOfVisibleMonth)

    useEffect(() => {
        if (dateParts === prevDateStringRef.current) {
            return
        }

        prevDateStringRef.current = dateParts

        if (!dateParts) {
            return
        }

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
        dateParts,
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
    }
}
