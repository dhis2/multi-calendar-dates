import { Temporal } from "@js-temporal/polyfill";
import { Dispatch, SetStateAction, useMemo } from "react";
import {
  CustomCalendarTypes,
  getCustomCalendarLocale,
} from "../../custom-calendars";
import { isCustomCalendar } from "../../utils/helpers";
import "../../date-override";

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
      numberingSystem: localeOptions.numberingSystem,
    };

    const monthFormat = {
      ...otherLocaleOptions,
      month: "long" as const,
    };

    const isCustom = isCustomCalendar(
      localeOptions.calendar.id as CustomCalendarTypes
    );

    return {
      prevYear: {
        label: isCustom
          ? prevYear.year
          : prevYear.toInstant().toLocaleString(locale, yearNumericFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevYear),
      },
      currYear: {
        label: isCustom
          ? firstZdtOfVisibleMonth.year
          : firstZdtOfVisibleMonth
              .toInstant()
              .toLocaleString(locale, yearNumericFormat),
      },
      nextYear: {
        label: isCustom
          ? nextYear.year
          : nextYear.toInstant().toLocaleString(locale, yearNumericFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(nextYear),
      },
      prevMonth: {
        label: isCustom
          ? customLocale?.monthNames[prevMonth.month - 1]
          : prevMonth.toInstant().toLocaleString(locale, monthFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevMonth),
      },
      currMonth: {
        label: isCustom
          ? customLocale?.monthNames[firstZdtOfVisibleMonth.month - 1]
          : firstZdtOfVisibleMonth
              .toInstant()
              .toLocaleString(locale, monthFormat),
      },
      nextMonth: {
        label: isCustom
          ? customLocale?.monthNames[nextMonth.month - 1]
          : nextMonth.toInstant().toLocaleString(locale, monthFormat),
        navigateTo: () => setFirstZdtOfVisibleMonth(nextMonth),
      },
    };
  }, [firstZdtOfVisibleMonth, localeOptions, setFirstZdtOfVisibleMonth]);
};
