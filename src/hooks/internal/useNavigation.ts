import { Temporal } from '@js-temporal/polyfill-patched'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { PickerOptionsWithResolvedCalendar } from '../../types'
import { isCustomCalendar, getMonthsForCalendar } from '../../utils/helpers'
import localisationHelpers from '../../utils/localisationHelpers'
import { AnyPlainDate } from '../../utils/plainDate'

export type UseNavigationReturnType = {
    prevYear: {
        label: string | number
        navigateTo: () => void
    }
    currYear: {
        label: string | number
        value: string | number
    }
    nextYear: {
        label: string | number
        navigateTo: () => void
    }
    prevMonth: {
        label: string | undefined
        navigateTo: () => void
    }
    currMonth: {
        label: string | undefined
    }
    nextMonth: {
        label: string | undefined
        navigateTo: () => void
    }
    months: Array<{
        label: string
        value: number
    }>
    years: Array<{
        label: string
        value: number
    }>
    navigateToMonth: (month: number) => void
    navigateToYear: (year: number) => void
}

type UseNavigationHook = (
    firstOfVisibleMonth: AnyPlainDate,
    setFirstOfVisibleMonth: Dispatch<SetStateAction<AnyPlainDate>>,
    localeOptions: PickerOptionsWithResolvedCalendar
) => UseNavigationReturnType
/**
 * internal hook used by useDatePicker to build the navigation of the calendar
 *
 * @param options
 * @returns
 */
export const useNavigation: UseNavigationHook = (
    firstOfVisibleMonth,
    setFirstOfVisibleMonth,
    localeOptions
) => {
    return useMemo(() => {
        const prevYear = firstOfVisibleMonth.subtract({ years: 1 })
        const nextYear = firstOfVisibleMonth.add({ years: 1 })

        // Setting the day to the 14th is guaranteed to get the next month correctly
        // according to our defintion, which considers adding one month to be the equivalent
        // of adding 1 to the current month, while Temporal does the arithmetic in iso8601
        // then converts to the custom calendar, which could end up in the same month.
        // (for example in Nepali where current date + 30 can end up in the same month for a month that has 32 days)
        // todo: clarify the expected behaviour with the Temporal team
        const prevMonth = firstOfVisibleMonth
            .with({ day: 14 })
            .subtract({ months: 1 })
        const nextMonth = firstOfVisibleMonth
            .with({ day: 14 })
            .add({ months: 1 })

        const calendar = localeOptions.calendar
        const options = {
            locale: localeOptions.locale,
            calendar,
            numberingSystem: localeOptions.numberingSystem,
        }

        const yearNumericFormat: Intl.DateTimeFormatOptions = {
            ...options,
            year: 'numeric' as const,
        }

        const getYearOptions = (
            currentYear: number | string,
            pastOnly = false
        ) => {
            if (!currentYear) {
                return []
            }

            const currentYearValue = parseInt(String(currentYear))
            if (isNaN(currentYearValue)) {
                return []
            }

            const years = []
            let startYear, endYear

            if (calendar === 'nepali') {
                startYear = Math.max(
                    1971,
                    currentYearValue - (pastOnly ? 125 : 100)
                )
                endYear = Math.min(
                    2100,
                    pastOnly ? currentYearValue : currentYearValue + 25
                )
            } else {
                startYear = currentYearValue - (pastOnly ? 125 : 100)
                endYear = pastOnly ? currentYearValue : currentYearValue + 25
            }

            for (let year = startYear; year <= endYear; year++) {
                const yearDate = firstOfVisibleMonth.with({
                    year,
                    month: 1,
                    day: 1,
                })

                years.push({
                    label: localisationHelpers
                        .localiseYear(
                            yearDate,
                            localeOptions,
                            yearNumericFormat
                        )
                        .toString(),
                    value: year,
                })
            }
            return years
        }

        const currentYearValue =
            // Ethiopic years - when localised to English - add the era (i.e. 2015 ERA1)
            calendar === 'ethiopic'
                ? firstOfVisibleMonth.eraYear ??
                  String(
                      localisationHelpers.localiseYear(
                          firstOfVisibleMonth,
                          localeOptions,
                          yearNumericFormat
                      )
                  ).split(' ')[0]
                : firstOfVisibleMonth.year

        const years = getYearOptions(currentYearValue, localeOptions.pastOnly)

        const monthFormat: Intl.DateTimeFormatOptions = {
            ...options,
            month: 'long' as const,
        }

        const isCustom = isCustomCalendar(calendar)
        const months =
            !isCustom && localeOptions.locale?.toLowerCase().startsWith('en')
                ? getMonthsForCalendar(calendar)
                : getMonthsForCalendar(isCustom ? 'gregory' : calendar).map(
                      (month) => {
                          // isCustom (Nepali) has no real Temporal representation to
                          // construct - localiseMonth's custom-calendar branch only
                          // ever reads `.month` off this value, so a plain object
                          // carrying just the month number is enough.
                          const date = isCustom
                              ? { month: month.value }
                              : Temporal.PlainDate.from({
                                    year: 2000,
                                    month: month.value,
                                    day: 1,
                                    calendar,
                                })

                          return {
                              value: month.value,
                              label:
                                  localisationHelpers.localiseMonth(
                                      date,
                                      localeOptions,
                                      monthFormat
                                  ) || month.label,
                          }
                      }
                  )
        const navigateToMonth = (monthNum: number) => {
            try {
                setFirstOfVisibleMonth(
                    firstOfVisibleMonth.with({ month: monthNum, day: 1 })
                )
            } catch (e) {
                console.error('Invalid month navigation:', e)
            }
        }

        const navigateToYear = (year: number) => {
            try {
                setFirstOfVisibleMonth(firstOfVisibleMonth.with({ year }))
            } catch (e) {
                console.error('Invalid year navigation:', e)
            }
        }

        return {
            prevYear: {
                label: localisationHelpers.localiseYear(
                    prevYear,
                    localeOptions,
                    yearNumericFormat
                ),
                navigateTo: () => setFirstOfVisibleMonth(prevYear),
            },
            currYear: {
                label: localisationHelpers.localiseYear(
                    firstOfVisibleMonth,
                    localeOptions,
                    yearNumericFormat
                ),
                value: currentYearValue,
            },
            nextYear: {
                label: localisationHelpers.localiseYear(
                    nextYear,
                    localeOptions,
                    yearNumericFormat
                ),
                navigateTo: () => setFirstOfVisibleMonth(nextYear),
            },
            prevMonth: {
                label: localisationHelpers.localiseMonth(
                    prevMonth,
                    localeOptions,
                    monthFormat
                ),
                navigateTo: () => setFirstOfVisibleMonth(prevMonth),
            },
            currMonth: {
                label: localisationHelpers.localiseMonth(
                    firstOfVisibleMonth,
                    localeOptions,
                    monthFormat
                ),
            },
            nextMonth: {
                label: localisationHelpers.localiseMonth(
                    nextMonth,
                    localeOptions,
                    monthFormat
                ),
                navigateTo: () => setFirstOfVisibleMonth(nextMonth),
            },
            months,
            years,
            navigateToMonth,
            navigateToYear,
        }
    }, [firstOfVisibleMonth, localeOptions, setFirstOfVisibleMonth])
}
