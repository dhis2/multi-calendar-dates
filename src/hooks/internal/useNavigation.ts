import { Temporal } from "@js-temporal/polyfill"; // eslint-disable-line
import { Dispatch, SetStateAction, useMemo } from "react";
import { FormatterResult } from "../useFormatters";

import "../../date-override";

type navigationOptions = {
  firstZdtOfVisibleMonth: Temporal.ZonedDateTime;
  formatters: FormatterResult;
  setFirstZdtOfVisibleMonth: Dispatch<SetStateAction<Temporal.ZonedDateTime>>;
};

/**
 * internal hook used by useDatePicker to build the navigation of the calendar
 *
 * @param options
 * @returns
 */
export const useNavigation = (options: navigationOptions) => {
  const { firstZdtOfVisibleMonth, formatters, setFirstZdtOfVisibleMonth } =
    options;
  return useMemo(() => {
    const prevYear = firstZdtOfVisibleMonth.subtract({ years: 1 });
    const nextYear = firstZdtOfVisibleMonth.add({ years: 1 });
    const prevMonth = firstZdtOfVisibleMonth.subtract({ months: 1 });
    const nextMonth = firstZdtOfVisibleMonth.add({ months: 1 });

    return {
      prevYear: {
        label: formatters.yearNumeric.format(prevYear.toInstant()),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevYear),
      },
      currYear: {
        label: formatters.yearNumeric.format(
          firstZdtOfVisibleMonth.toInstant()
        ),
      },
      nextYear: {
        label: formatters.yearNumeric.format(nextYear.toInstant()),
        navigateTo: () => setFirstZdtOfVisibleMonth(nextYear),
      },
      prevMonth: {
        label: formatters.monthLong.format(prevMonth.toInstant()),
        navigateTo: () => setFirstZdtOfVisibleMonth(prevMonth),
      },
      currMonth: {
        label: formatters.monthLong.format(firstZdtOfVisibleMonth.toInstant()),
      },
      nextMonth: {
        label: formatters.monthLong.format(nextMonth.toInstant()),
        navigateTo: () => setFirstZdtOfVisibleMonth(nextMonth),
      },
    };
  }, [firstZdtOfVisibleMonth, formatters, setFirstZdtOfVisibleMonth]);
};
