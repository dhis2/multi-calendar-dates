import { Temporal } from "@js-temporal/polyfill";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { dhis2CalendarsMap } from "../constants/dhis2CalendarsMap";
import { SupportedCalendar } from "../types";
import { formatYyyyMmDD, getCustomCalendarIfExists } from "../utils/helpers";
import localisationHelpers from "../utils/localisationHelpers";
import { useCalendarWeekDays } from "./internal/useCalendarWeekDays";
import {
  useNavigation,
  UseNavigationReturnType,
} from "./internal/useNavigation";
import { useWeekDayLabels } from "./internal/useWeekDayLabels";

type DatePickerOptions = {
  date: string;
  options: LocaleOptions;
  onDateSelect: ({
    calendarDate,
    calendarDateString,
  }: {
    calendarDate: Temporal.ZonedDateTime;
    calendarDateString: string;
  }) => void;
};

export type LocaleOptions = {
  locale: string;
  calendar?: SupportedCalendar;
  timeZone?: Temporal.TimeZoneLike;
  numberingSystem?: string;
  weekDayFormat?: "narrow" | "short" | "long";
};

export type UseDatePickerReturn = UseNavigationReturnType & {
  weekDayLabels: string[];
  calendarWeekDays: {
    zdt: Temporal.ZonedDateTime;
    label: string | number;
    onClick: () => void;
    isSelected: boolean | undefined;
    isToday: boolean;
    isInCurrentMonth: boolean;
  }[][];
};

type UseDatePickerHookType = (
  options: DatePickerOptions
) => UseDatePickerReturn;

const fromDateParts = (date: string) => {
  const dateParts = date.split("-");
  if (dateParts.length !== 3) {
    throw new Error(
      `Invalid date ${date} - date should be in the format YYYY-MM-DD`
    );
  }
  const [year, month, day] = dateParts;
  return { year: Number(year), month: Number(month), day: Number(day) };
};
export const useDatePicker: UseDatePickerHookType = ({
  onDateSelect,
  date: dateParts,
  options,
}) => {
  const date = fromDateParts(dateParts);

  const prevDateStringRef = useRef(date);

  const { calendar: calendarFromOptions = "gregory", locale = "en" } = options;

  const calendar: Temporal.CalendarLike = getCustomCalendarIfExists(
    dhis2CalendarsMap[calendarFromOptions] ?? calendarFromOptions
  );

  const temporalCalendar = useMemo(
    () => Temporal.Calendar.from(calendar),
    [calendar]
  );
  const temporalTimeZone = useMemo(
    () =>
      Temporal.TimeZone.from(
        options.timeZone ||
          Intl?.DateTimeFormat?.().resolvedOptions?.()?.timeZone ||
          "UTC"
      ),
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
      date
        ? Temporal.Calendar.from(temporalCalendar)
            .dateFromFields(date)
            .toZonedDateTime({
              timeZone: temporalTimeZone,
            })
        : null,
    [date, temporalCalendar, temporalTimeZone]
  );

  const [firstZdtOfVisibleMonth, setFirstZdtOfVisibleMonth] = useState(() => {
    const zdt = selectedDateZdt || todayZdt;
    return zdt.with({ day: 1 });
  });

  const localeOptions = useMemo(
    () => ({
      locale,
      calendar: temporalCalendar as unknown as SupportedCalendar,
      timeZone: temporalTimeZone,
      weekDayFormat: options.weekDayFormat || "narrow",
      numberingSystem: options.numberingSystem,
    }),
    [
      locale,
      temporalCalendar,
      temporalTimeZone,
      options.weekDayFormat,
      options.numberingSystem,
    ]
  );

  const weekDayLabels = useWeekDayLabels(localeOptions);

  const navigation = useNavigation(
    firstZdtOfVisibleMonth,
    setFirstZdtOfVisibleMonth,
    localeOptions
  );
  const selectDate = useCallback(
    (zdt: Temporal.ZonedDateTime) => {
      onDateSelect({
        calendarDate: zdt,
        calendarDateString: formatYyyyMmDD(zdt),
      });
    },
    [onDateSelect]
  );
  const calendarWeekDaysZdts = useCalendarWeekDays(firstZdtOfVisibleMonth);

  useEffect(() => {
    if (date === prevDateStringRef.current) {
      return;
    }

    prevDateStringRef.current = date;

    if (!date) {
      return;
    }

    const zdt = Temporal.ZonedDateTime.from(date)
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
    date,
    firstZdtOfVisibleMonth,
    calendarWeekDaysZdts,
    temporalCalendar,
    temporalTimeZone,
  ]);

  return {
    calendarWeekDays: calendarWeekDaysZdts.map((week) =>
      week.map((weekDayZdt) => ({
        zdt: weekDayZdt,
        label: localisationHelpers.localiseWeekLabel(weekDayZdt, localeOptions),
        onClick: () => selectDate(weekDayZdt),
        isSelected: selectedDateZdt
          ?.withCalendar("iso8601")
          .equals(weekDayZdt.withCalendar("iso8601")),
        isToday: todayZdt && weekDayZdt.equals(todayZdt),
        isInCurrentMonth:
          firstZdtOfVisibleMonth &&
          weekDayZdt.month === firstZdtOfVisibleMonth.month,
      }))
    ),
    ...navigation,
    weekDayLabels,
  };
};
