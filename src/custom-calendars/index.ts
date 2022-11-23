import { Temporal } from "@js-temporal/polyfill";
import { SupportedCalendar } from "../types";
import calendarLocalisations from "./calendarLocalisations";
import { NepaliCalendar } from "./nepaliCalendar";

export type CustomCalendarTypes = "nepali";

export const customCalendars: Partial<{
  [key in SupportedCalendar]: {
    calendar: Temporal.CalendarProtocol;
    locales: Record<
      string,
      {
        monthNames: string[];
        monthNamesShort?: string[] | undefined;
        dayNamesShort: string[];
        dayNames?: string[] | undefined;
        dayNamesMin?: string[] | undefined;
        numbers?: string[] | undefined;
      }
    >;
  };
}> = {
  nepali: {
    calendar: new NepaliCalendar(),
    locales: calendarLocalisations.nepali,
  },
};

export const getCustomCalendarLocales = (calendar: Temporal.CalendarLike) => {
  return customCalendars[calendar as CustomCalendarTypes]?.locales;
};

export const getCustomCalendarLocale = (
  calendar: Temporal.CalendarLike,
  locale: string
) => {
  return customCalendars[calendar as CustomCalendarTypes]?.locales?.[locale];
};
