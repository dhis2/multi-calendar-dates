import { Temporal } from "@js-temporal/polyfill";
import { SupportedCalendar } from "../types";
import { NepaliCalendar } from "./nepaliCalendar";

export const customCalendars: Partial<{
  [key in SupportedCalendar]: { calendar: Temporal.Calendar | undefined };
}> = {
  nepali: {
    calendar: new NepaliCalendar(),
  },
};
