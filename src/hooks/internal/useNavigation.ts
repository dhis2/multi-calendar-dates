import { Temporal } from '@js-temporal/polyfill'
import { Dispatch, SetStateAction, useMemo } from 'react'
import {
    PickerOptionsWithResolvedCalendar,
    SupportedCalendar,
} from '../../types'
import { isCustomCalendar, getMonthsForCalendar } from '../../utils/helpers'
import localisationHelpers from '../../utils/localisationHelpers'

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
    firstZdtOfVisibleMonth: Temporal.ZonedDateTime,
    setFirstZdtOfVisibleMonth: Dispatch<SetStateAction<Temporal.ZonedDateTime>>,
    localeOptions: PickerOptionsWithResolvedCalendar
) => UseNavigationReturnType
/**
 * internal hook used by useDatePicker to build the navigation of the calendar
 *
 * @param options
 * @returns
 */
export const useNavigation: UseNavigationHook = (
    firstZdtOfVisibleMonth,
    setFirstZdtOfVisibleMonth,
    localeOptions
) => {
    return useMemo(() => {
        const prevYear = firstZdtOfVisibleMonth.subtract({ years: 1 })
        const nextYear = firstZdtOfVisibleMonth.add({ years: 1 })

        // Setting the day to the 14th is guaranteed to get the next month correctly
        // according to our defintion, which considers adding one month to be the equivalent
        // of adding 1 to the current month, while Temporal does the arithmetic in iso8601
        // then converts to the custom calendar, which could end up in the same month.
        // (for example in Nepali where current date + 30 can end up in the same month for a month that has 32 days)
        // todo: clarify the expected behaviour with the Temporal team
        const prevMonth = firstZdtOfVisibleMonth
            .with({ day: 14 })
            .subtract({ months: 1 })
        const nextMonth = firstZdtOfVisibleMonth
            .with({ day: 14 })
            .add({ months: 1 })

        const options = {
            locale: localeOptions.locale,
            calendar: localeOptions.calendar.id as SupportedCalendar,
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

            if (options.calendar === 'nepali') {
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
                const yearDate = firstZdtOfVisibleMonth.with({
                    year,
                    month: 1,
                    day: 1,
                })

                years.push({
                    label: localisationHelpers
                        .localiseYear(
                            yearDate,
                            { ...localeOptions, calendar: options.calendar },
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
            options.calendar === 'ethiopic'
                ? firstZdtOfVisibleMonth.eraYear ??
                  String(
                      localisationHelpers.localiseYear(
                          firstZdtOfVisibleMonth,
                          {
                              ...localeOptions,
                              calendar: options.calendar,
                          },
                          yearNumericFormat
                      )
                  ).split(' ')[0]
                : firstZdtOfVisibleMonth.year

        const years = getYearOptions(currentYearValue, localeOptions.pastOnly)

        const monthFormat: Intl.DateTimeFormatOptions = {
            ...options,
            month: 'long' as const,
        }

        const isCustom = isCustomCalendar(options.calendar)
        const months =
            !isCustom && options.locale?.toLowerCase().startsWith('en')
                ? getMonthsForCalendar(options.calendar)
                : getMonthsForCalendar(
                      isCustom ? 'gregory' : options.calendar
                  ).map((month) => {
                      const calendar = new Temporal.Calendar(
                          isCustom ? 'gregory' : options.calendar
                      )
                      const referenceDate = calendar.dateFromFields({
                          year: 2000,
                          month: 1,
                          day: 1,
                      })

                      const date = calendar.dateFromFields({
                          year: referenceDate.year,
                          month: month.value,
                          day: 1,
                      })

                      return {
                          value: month.value,
                          label:
                              localisationHelpers.localiseMonth(
                                  date,
                                  {
                                      ...localeOptions,
                                      calendar: options.calendar,
                                  },
                                  monthFormat
                              ) || month.label,
                      }
                  })
        const navigateToMonth = (monthNum: number) => {
            try {
                setFirstZdtOfVisibleMonth(
                    firstZdtOfVisibleMonth.with({ month: monthNum, day: 1 })
                )
            } catch (e) {
                console.error('Invalid month navigation:', e)
            }
        }

        const navigateToYear = (year: number) => {
            try {
                setFirstZdtOfVisibleMonth(firstZdtOfVisibleMonth.with({ year }))
            } catch (e) {
                console.error('Invalid year navigation:', e)
            }
        }

        return {
            prevYear: {
                label: localisationHelpers.localiseYear(
                    prevYear,
                    { ...localeOptions, calendar: options.calendar },
                    yearNumericFormat
                ),
                navigateTo: () => setFirstZdtOfVisibleMonth(prevYear),
            },
            currYear: {
                label: localisationHelpers.localiseYear(
                    firstZdtOfVisibleMonth,
                    { ...localeOptions, calendar: options.calendar },
                    yearNumericFormat
                ),
                value: currentYearValue,
            },
            nextYear: {
                label: localisationHelpers.localiseYear(
                    nextYear,
                    { ...localeOptions, calendar: options.calendar },
                    yearNumericFormat
                ),
                navigateTo: () => setFirstZdtOfVisibleMonth(nextYear),
            },
            prevMonth: {
                label: localisationHelpers.localiseMonth(
                    prevMonth,
                    { ...localeOptions, calendar: options.calendar },
                    monthFormat
                ),
                navigateTo: () => setFirstZdtOfVisibleMonth(prevMonth),
            },
            currMonth: {
                label: localisationHelpers.localiseMonth(
                    firstZdtOfVisibleMonth,
                    { ...localeOptions, calendar: options.calendar },
                    monthFormat
                ),
            },
            nextMonth: {
                label: localisationHelpers.localiseMonth(
                    nextMonth,
                    { ...localeOptions, calendar: options.calendar },
                    monthFormat
                ),
                navigateTo: () => setFirstZdtOfVisibleMonth(nextMonth),
            },
            months,
            years,
            navigateToMonth,
            navigateToYear,
        }
    }, [firstZdtOfVisibleMonth, localeOptions, setFirstZdtOfVisibleMonth])
}
