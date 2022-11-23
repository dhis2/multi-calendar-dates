import { Temporal } from "@js-temporal/polyfill"; // eslint-disable-line
import { Dispatch, SetStateAction, useMemo } from "react";

import "../../date-override";
import { isCustomCalendar } from "../../utils/helpers";
import { getCustomCalendarLocale } from "../../custom-calendars";

/**
 * internal hook used by useDatePicker to build the navigation of the calendar
 *
 * @param options
 * @returns
 */
export const useNavigation = (
  firstZdtOfVisibleMonth: Temporal.ZonedDateTime,
  setFirstZdtOfVisibleMonth: Dispatch<SetStateAction<Temporal.ZonedDateTime>>,
  localeOptions: {
    locale: string;
    calendar: Temporal.CalendarProtocol;
    timeZone: Temporal.TimeZoneProtocol;
    numberingSystem?: string;
  }
) => {
  return useMemo(() => {
    const prevYear = firstZdtOfVisibleMonth.subtract({ years: 1 });
    const nextYear = firstZdtOfVisibleMonth.add({ years: 1 });
    const prevMonth = firstZdtOfVisibleMonth.subtract({ months: 1 });
    const nextMonth = firstZdtOfVisibleMonth.add({ months: 1 });

    const { locale, ...otherLocaleOptions } = localeOptions;

    const customLocale = getCustomCalendarLocale(
      localeOptions.calendar,
      localeOptions.locale
    );

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
          ? customLocale?.monthNames[prevMonth.month]
          : prevMonth.toInstant().toLocaleString(locale, monthFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevMonth),
      },
      currMonth: {
        label: isCustomCalendar(locale)
          ? customLocale?.monthNames[firstZdtOfVisibleMonth.month]
          : firstZdtOfVisibleMonth
              .toInstant()
              .toLocaleString(locale, monthFormat),
      },
      nextMonth: {
        label: isCustomCalendar(locale)
          ? customLocale?.monthNames[nextMonth.month]
          : nextMonth.toInstant().toLocaleString(locale, monthFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(nextMonth),
      },
    };
  }, [firstZdtOfVisibleMonth, localeOptions, setFirstZdtOfVisibleMonth]);
};
