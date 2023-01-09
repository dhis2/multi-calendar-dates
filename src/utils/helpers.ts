import { Temporal } from "@js-temporal/polyfill";
import { customCalendars, CustomCalendarTypes } from "../custom-calendars";

export const isCustomCalendar = (calendar: Temporal.CalendarLike) =>
  !!customCalendars[calendar as CustomCalendarTypes];

export const padWithZeroes = (number: number, count = 2) =>
  String(number).padStart(count, "0");

type DayType = "endOfMonth" | "startOfMonth";

export const formatYyyyMmDD = (
  date: Temporal.PlainDate | Temporal.ZonedDateTime,
  dayType?: DayType
) => {
  const year = date.eraYear ?? date.year;
  const month = padWithZeroes(date.month);
  let day = date.day;

  if (dayType === "endOfMonth") {
    day = date.daysInMonth;
  } else if (dayType === "startOfMonth") {
    day = 1;
  }

  const dayString = padWithZeroes(day);

  return `${year}-${month}-${dayString}`;
};

export const capitalize = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

export const getCustomCalendarIfExists = (
  calendar: Temporal.CalendarLike
): Temporal.CalendarProtocol | Temporal.CalendarLike => {
  const isCustom = isCustomCalendar(calendar);
  if (!isCustom) {
    return calendar;
  }

  const customCalendar = customCalendars[
    calendar as keyof typeof customCalendars
  ]?.calendar as Temporal.CalendarProtocol;

  if (!customCalendar) {
    throw new Error(`No implemenation found for custom calendar ${calendar}`);
  }

  return customCalendar;
};
