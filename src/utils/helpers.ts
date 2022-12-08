import { Temporal } from "@js-temporal/polyfill";
import { customCalendars, CustomCalendarTypes } from "../custom-calendars";
import { SupportedCalendar } from "../types";

export const isCustomCalendar = (calendar: SupportedCalendar) =>
  !!customCalendars[calendar as CustomCalendarTypes];

export const getCustomCalendarIfExists = (
  calendar: SupportedCalendar,
  locale: string
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

  const customLocalisations =
    customCalendars[calendar as CustomCalendarTypes]?.locales || {};
  const allowedLocales = Object.keys(customLocalisations);
  if (!allowedLocales.includes(locale)) {
    throw new Error(
      `For the custom calendar "${calendar}", only specific locales are allowed: ${allowedLocales.join(
        ", "
      )}`
    );
  }
  return customCalendar;
};
