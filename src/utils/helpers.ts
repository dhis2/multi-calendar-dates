import { customCalendars, CustomCalendarTypes } from "../custom-calendars";
import { SupportedCalendar } from "../types";

export const isCustomCalendar = (calendar: SupportedCalendar) =>
  !!customCalendars[calendar as CustomCalendarTypes];
