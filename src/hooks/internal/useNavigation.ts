import { Temporal } from "@js-temporal/polyfill"; // eslint-disable-line
import { Dispatch, SetStateAction, useMemo } from "react";

import "../../date-override";
import calendarLocalisations from "../../utils/calendarLocalisations";
import { isCustomCalendar } from "../../utils/helpers";
import { LocaleOptions } from "../useDatePicker";

/**
 * internal hook used by useDatePicker to build the navigation of the calendar
 *
 * @param options
 * @returns
 */
export const useNavigation = (
  firstZdtOfVisibleMonth: Temporal.ZonedDateTime,
  setFirstZdtOfVisibleMonth: Dispatch<SetStateAction<Temporal.ZonedDateTime>>,
  localeOptions: LocaleOptions
) => {
  return useMemo(() => {
    const prevYear = firstZdtOfVisibleMonth.subtract({ years: 1 });
    const nextYear = firstZdtOfVisibleMonth.add({ years: 1 });
    const prevMonth = firstZdtOfVisibleMonth.subtract({ months: 1 });
    const nextMonth = firstZdtOfVisibleMonth.add({ months: 1 });

    const { locale, ...otherLocaleOptions } = localeOptions;

    const yearNumericFormat = {
      ...otherLocaleOptions,
      year: "numeric" as const,
    };

    const monthFormat = {
      ...otherLocaleOptions,
      month: "long" as const,
    };

    return {
      prevYear: {
        label: isCustomCalendar(locale)
          ? prevYear.year
          : prevYear.toInstant().toLocaleString(locale, yearNumericFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevYear),
      },
      currYear: {
        label: isCustomCalendar(locale)
          ? firstZdtOfVisibleMonth.year
          : firstZdtOfVisibleMonth
              .toInstant()
              .toLocaleString(locale, yearNumericFormat),
      },
      nextYear: {
        label: isCustomCalendar(locale)
          ? nextYear.year
          : nextYear.toInstant().toLocaleString(locale, yearNumericFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(nextYear),
      },
      prevMonth: {
        label: isCustomCalendar(locale)
          ? calendarLocalisations[locale].monthNames[prevMonth.month]
          : prevMonth.toInstant().toLocaleString(locale, monthFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevMonth),
      },
      currMonth: {
        label: isCustomCalendar(locale)
          ? calendarLocalisations[locale].monthNames[
              firstZdtOfVisibleMonth.month
            ]
          : firstZdtOfVisibleMonth
              .toInstant()
              .toLocaleString(locale, monthFormat),
      },
      nextMonth: {
        label: isCustomCalendar(locale)
          ? calendarLocalisations[locale].monthNames[nextMonth.month]
          : nextMonth.toInstant().toLocaleString(locale, monthFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(nextMonth),
      },
    };
  }, [firstZdtOfVisibleMonth, localeOptions, setFirstZdtOfVisibleMonth]);
};
