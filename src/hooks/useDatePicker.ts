import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Temporal } from "@js-temporal/polyfill";
import { isoDateStringToZdt, zdtToIsoDateStr } from "../utils/conversions";
import { useCalendarWeekDays } from "./internal/useCalendarWeekDays";
import { useNavigation } from "./internal/useNavigation";
import { useWeekDayLabels } from "./internal/useWeekDayLabels";
import { SupportedNumberingSystem } from "../types";

import "../date-override";
import { isCustomCalendar } from "../utils/helpers";
import calendarLocalisations from "../utils/calendarLocalisations";

export type LocaleOptions = {
  locale: string;
  calendar: Temporal.CalendarProtocol;
  timeZone: Temporal.TimeZoneProtocol;
  numberingSystem?: SupportedNumberingSystem;
};

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
  options: LocaleOptions;
};

export const useDatePicker = ({
  onDateSelect,
  dateString,
  locale,
  options,
}: DatePickerOptions) => {
  if (!options.calendar || !options.timeZone) {
    throw new Error("options should include calendar and timeZone");
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
    return zdt.with({ day: 1 });
  });
  const localeOptions = {
    locale,
    calendar: temporalCalendar,
    timeZone: temporalTimeZone,
  };
  const weekDayLabels = useWeekDayLabels(todayZdt, localeOptions);
  const navigation = useNavigation(
    firstZdtOfVisibleMonth,
    setFirstZdtOfVisibleMonth,
    localeOptions
  );
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
      label: selectedDateZdt?.toLocaleString(locale, {
        ...localeOptions,
        dateStyle: "full",
      }),
    },
    today: {
      label: new window.Intl.RelativeTimeFormat(locale, {
        numeric: "auto",
      }).format(0, "day"),
      navigateTo: () =>
        setFirstZdtOfVisibleMonth(
          todayZdt.subtract({ days: todayZdt.day - 1 })
        ),
    },
    calendarWeekDays: calendarWeekDaysZdts.map((week) =>
      week.map((zdt) => ({
        zdt,
        label: isCustomCalendar(locale)
          ? calendarLocalisations[locale].numbers
            ? calendarLocalisations[locale].numbers?.[zdt.day]
            : zdt.day
          : zdt
              .toInstant()
              .toLocaleString(locale, { ...localeOptions, day: "numeric" }),
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
