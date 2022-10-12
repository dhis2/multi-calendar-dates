import { calendars } from "./constants/calendars";
import { numberingSystems } from "./constants/numberingSystems";
import { timeZones } from "./constants/timeZones";

export type SupportedCalendar = typeof calendars[number];
export type SupportedNumberingSystem = typeof numberingSystems[number];
export type SupportedTimeZone = typeof timeZones[number];
