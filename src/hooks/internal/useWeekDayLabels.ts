import { Temporal } from "@js-temporal/polyfill";
import { useMemo } from "react";
import "../../date-override";
import {
  CustomCalendarTypes,
  getCustomCalendarLocale,
} from "../../custom-calendars";
import { isCustomCalendar } from "../../utils/helpers";

type LocaleOptions = {
  locale: string;
  calendar: Temporal.CalendarProtocol;
  timeZone: Temporal.TimeZoneLike;
  weekDayFormat: "narrow" | "short" | "long";
};

export const useWeekDayLabels = (localeOptions: LocaleOptions) =>
  useMemo(() => {
    const today = Temporal.Now.zonedDateTime(localeOptions.calendar)
      .withTimeZone(localeOptions.timeZone)
      .startOfDay();

    const startOfWeek = today.subtract({ days: today.dayOfWeek - 1 }); // dayOfWeek is 1-based, where 1 is Monday

    const labels = [];

    for (let i = 0; i < today.daysInWeek; i++) {
      const currentDate = startOfWeek.add({
        days: i,
      });

      const weekDayString = getWeekDayString(currentDate, localeOptions);
      labels.push(weekDayString);
    }
    return labels;
  }, [localeOptions]);

const getWeekDayString: (
  date: Temporal.ZonedDateTime,
  localeOptions: LocaleOptions
) => string = (date, { locale, weekDayFormat, timeZone, calendar }) => {
  const customCalendar = getCustomCalendarLocale(calendar, locale);
  const customDayString = customCalendar?.dayNamesShort[date.dayOfWeek - 1]; // dayOfWeek is 1-based

  return isCustomCalendar(calendar.id as CustomCalendarTypes) && customDayString
    ? customDayString
    : date.toInstant().toLocaleString(locale, {
        weekday: weekDayFormat,
        calendar: calendar,
        timeZone: timeZone as Temporal.TimeZoneProtocol,
      });
};
