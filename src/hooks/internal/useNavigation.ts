import { Temporal } from "@js-temporal/polyfill";
import { Dispatch, SetStateAction, useMemo } from "react";
import "../../date-override";
import localisationHelpers from "../../utils/localisationHelpers";
import { LocaleOptions } from "../useDatePicker";

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
  localeOptions: LocaleOptions
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

    const options = {
      locale: localeOptions.locale,
      calendar: localeOptions.calendar,
      numberingSystem: localeOptions.numberingSystem,
    };

    const yearNumericFormat: Intl.DateTimeFormatOptions = {
      ...options,
      year: "numeric" as const,
    };

    const monthFormat: Intl.DateTimeFormatOptions = {
      ...options,
      month: "long" as const,
    };

    return {
      prevYear: {
        label: localisationHelpers.localiseYear(
          prevYear,
          localeOptions,
          yearNumericFormat
        ),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevYear),
      },
      currYear: {
        label: localisationHelpers.localiseYear(
          firstZdtOfVisibleMonth,
          localeOptions,
          yearNumericFormat
        ),
      },
      nextYear: {
        label: localisationHelpers.localiseYear(
          nextYear,
          localeOptions,
          yearNumericFormat
        ),
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
