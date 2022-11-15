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

type DatePickerOptions = {
  initialDate: string;
  options: LocaleOptions;
  onDateSelect: ({
    calendarDate,
    isoDate,
  }: {
    calendarDate: Temporal.ZonedDateTime;
    isoDate: Temporal.ZonedDateTime;
  }) => void;
};

type LocaleOptions = {
  locale: string;
  calendar: Temporal.CalendarProtocol | Temporal.CalendarLike;
  timeZone: Temporal.TimeZoneLike | Temporal.TimeZoneProtocol;
  numberingSystem?: string;
};

export const useDatePicker = ({
  onDateSelect,
  initialDate,
  options,
}: DatePickerOptions) => {
  if (!options.calendar || !options.timeZone) {
    throw new Error("options should include calendar and timeZone");
  }
  const prevDateStringRef = useRef(initialDate);
  const temporalCalendar = useMemo(
    () => Temporal.Calendar.from(options.calendar),
    [options]
  );
  const temporalTimeZone = useMemo(
    () => Temporal.TimeZone.from(options.timeZone),
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
      initialDate
        ? Temporal.PlainDate.from(initialDate).toZonedDateTime({
            timeZone: temporalTimeZone,
          })
        : null,
    [initialDate, temporalTimeZone]
  );

  const [firstZdtOfVisibleMonth, setFirstZdtOfVisibleMonth] = useState(() => {
    const zdt = selectedDateZdt || todayZdt;
    return zdt.with({ day: 1 });
  });

  const { locale } = options;

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
      onDateSelect({
        calendarDate: zdt,
        isoDate: zdt.withCalendar("iso8601"),
      });
    },
    [onDateSelect]
  );
  const calendarWeekDaysZdts = useCalendarWeekDays(firstZdtOfVisibleMonth);

  useEffect(() => {
    if (initialDate === prevDateStringRef.current) {
      return;
    }

    prevDateStringRef.current = initialDate;

    if (!initialDate) {
      return;
    }

    const zdt = Temporal.ZonedDateTime.from(initialDate)
      .withCalendar(temporalCalendar)
      .withTimeZone(temporalTimeZone);

    if (
      (firstZdtOfVisibleMonth.year !== zdt.year ||
        firstZdtOfVisibleMonth.month !== zdt.month) &&
      !calendarWeekDaysZdts.some((week) => week.some((day) => day.equals(zdt)))
    ) {
      setFirstZdtOfVisibleMonth(zdt.subtract({ days: zdt.day - 1 }));
    }
  }, [
    initialDate,
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
        timeZone: localeOptions.timeZone.id,
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
        isSelected: selectedDateZdt
          ?.withCalendar("iso8601")
          .equals(zdt.withCalendar("iso8601")),
        isToday: todayZdt && zdt.equals(todayZdt),
        isInCurrentMonth:
          firstZdtOfVisibleMonth && zdt.month === firstZdtOfVisibleMonth.month,
      }))
    ),
    ...navigation,
    weekDayLabels,
  };
};
