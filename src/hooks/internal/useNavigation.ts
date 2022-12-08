import { Temporal } from "@js-temporal/polyfill";
import { Dispatch, SetStateAction, useMemo } from "react";
import { CustomCalendarTypes } from "../../custom-calendars";
import { isCustomCalendar } from "../../utils/helpers";
import "../../date-override";
import localisationHelpers from "../../utils/localisationHelpers";

export type UseNavigationReturnType = {
  prevYear: {
    label: string | number;
    navigateTo: () => void;
  };
  currYear: {
    label: string | number;
  };
  nextYear: {
    label: string | number;
    navigateTo: () => void;
  };
  prevMonth: {
    label: string | undefined;
    navigateTo: () => void;
  };
  currMonth: {
    label: string | undefined;
  };
  nextMonth: {
    label: string | undefined;
    navigateTo: () => void;
  };
};
type UseNavigationHook = (
  firstZdtOfVisibleMonth: Temporal.ZonedDateTime,
  setFirstZdtOfVisibleMonth: Dispatch<SetStateAction<Temporal.ZonedDateTime>>,
  localeOptions: {
    locale: string;
    calendar: Temporal.CalendarProtocol;
    timeZone: Temporal.TimeZoneProtocol;
    numberingSystem?: string;
  }
) => UseNavigationReturnType;
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
    const prevYear = firstZdtOfVisibleMonth.subtract({ years: 1 });
    const nextYear = firstZdtOfVisibleMonth.add({ years: 1 });
    const prevMonth = firstZdtOfVisibleMonth.subtract({ months: 1 });
    const nextMonth = firstZdtOfVisibleMonth.add({ months: 1 });

    const { locale, ...otherLocaleOptions } = localeOptions;

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
        label: localisationHelpers.localiseMonth(
          prevMonth,
          localeOptions,
          monthFormat
        ),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevMonth),
      },
      currMonth: {
        label: localisationHelpers.localiseMonth(
          firstZdtOfVisibleMonth,
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
        navigateTo: () => setFirstZdtOfVisibleMonth(nextMonth),
      },
    };
  }, [firstZdtOfVisibleMonth, localeOptions, setFirstZdtOfVisibleMonth]);
};
