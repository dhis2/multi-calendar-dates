import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { isoDateStringToZdt, zdtToIsoDateStr } from "../utils/conversions";
import { useCalendarWeekDays } from "./internal/useCalendarWeekDays";
import { useFormatters } from "./useFormatters";
import { useNavigation } from "./internal/useNavigation";
import { useWeekDayLabels } from "./internal/useWeekDayLabels";
import { SupportedNumberingSystem } from "../types";

import "../date-override";

type DatePickerOptions = {
  onDateSelect: ({
    dateString,
    zdt,
  }: {
    dateString: string;
    zdt: Temporal.ZonedDateTime;
  }) => void;
  dateString: string;
  locale: string;
  options: {
    calendar: Temporal.CalendarLike;
    timeZone: Temporal.TimeZoneLike;
    numberingSystem: SupportedNumberingSystem;
  };
};

export const useDatePicker = ({
  onDateSelect,
  dateString,
  locale,
  options,
}: DatePickerOptions) => {
  if (!options.calendar || !options.timeZone) {
    throw new Error("options should include calendar or timeZone");
  }
  const prevDateStringRef = useRef(dateString);
  const temporalCalendar = useMemo(
    () => Temporal.Calendar.from(options.calendar!),
    [options]
  );
  const temporalTimeZone = useMemo(
    () => Temporal.TimeZone.from(options.timeZone!),
    [options]
  );
  const formatters = useFormatters({
    locale,
    options,
    temporalCalendar,
    temporalTimeZone,
  });
  const todayZdt = useMemo(
    () =>
      Temporal.Now.zonedDateTime(temporalCalendar)
        .withTimeZone(temporalTimeZone)
        .startOfDay(),
    [temporalCalendar, temporalTimeZone]
  );
  const selectedDateZdt = useMemo(
    () =>
      dateString
        ? isoDateStringToZdt({
            dateString,
            calendar: temporalCalendar,
            timeZone: temporalTimeZone,
          })
        : null,
    [dateString, temporalCalendar, temporalTimeZone]
  );
  const [firstZdtOfVisibleMonth, setFirstZdtOfVisibleMonth] = useState(() => {
    const zdt = selectedDateZdt || todayZdt;
    const daysToMonthStart = zdt.day - 1;
    return zdt.subtract({ days: daysToMonthStart });
  });
  const weekDayLabels = useWeekDayLabels({ todayZdt, formatters });
  const navigation = useNavigation({
    firstZdtOfVisibleMonth,
    formatters,
    setFirstZdtOfVisibleMonth,
  });
  const selectDate = useCallback(
    (zdt: Temporal.ZonedDateTime) => {
      const dateString = zdtToIsoDateStr(zdt);
      onDateSelect({ dateString, zdt });
    },
    [onDateSelect]
  );
  const calendarWeekDaysZdts = useCalendarWeekDays(firstZdtOfVisibleMonth);

  useEffect(() => {
    if (dateString === prevDateStringRef.current) {
      return;
    }

    prevDateStringRef.current = dateString;

    if (!dateString) {
      return;
    }

    const zdt = isoDateStringToZdt({
      dateString,
      calendar: temporalCalendar,
      timeZone: temporalTimeZone,
    });
    if (
      (firstZdtOfVisibleMonth.year !== zdt.year ||
        firstZdtOfVisibleMonth.month !== zdt.month) &&
      !calendarWeekDaysZdts.some((week) => week.some((day) => day.equals(zdt)))
    ) {
      setFirstZdtOfVisibleMonth(zdt.subtract({ days: zdt.day - 1 }));
    }
  }, [
    dateString,
    firstZdtOfVisibleMonth,
    calendarWeekDaysZdts,
    temporalCalendar,
    temporalTimeZone,
  ]);

  return {
    selectedDate: {
      zdt: selectedDateZdt,
      label:
        selectedDateZdt &&
        formatters.longFullDate.format(selectedDateZdt.toInstant()),
    },
    today: {
      label: formatters.daysAgoNonNumeric.format(0, "day"),
      navigateTo: () =>
        setFirstZdtOfVisibleMonth(
          todayZdt.subtract({ days: todayZdt.day - 1 })
        ),
    },
    calendarWeekDays: calendarWeekDaysZdts.map((week) =>
      week.map((zdt) => ({
        zdt,
        label: formatters.dayNumber.format(zdt.toInstant()),
        onClick: () => selectDate(zdt),
        isSelected: selectedDateZdt && zdt.equals(selectedDateZdt),
        isToday: todayZdt && zdt.equals(todayZdt),
        isInCurrentMonth:
          firstZdtOfVisibleMonth && zdt.month === firstZdtOfVisibleMonth.month,
      }))
    ),
    ...navigation,
    weekDayLabels,
  };
};
