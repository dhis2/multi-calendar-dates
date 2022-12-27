import { SupportedCalendar } from "../types";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar
export const calendars = [
  // Built in
  "iso8601",
  "hebrew",
  "islamic",
  "islamic-umalqura",
  "islamic-tbla",
  "islamic-civil",
  "islamic-rgsa",
  // "islamicc", this is deprecated - should use islamic-civil instead
  "persian",
  "ethiopic",
  "ethioaa",
  "coptic",
  "chinese",
  "dangi",
  "roc",
  "indian",
  "buddhist",
  "japanese",
  "gregory",
  "nepali",
] as const;

/**
 * a map of the IDs used in DHIS2 to the standard identifiers used by Temporal
 */
export const dhis2CalendarsMap: Record<string, SupportedCalendar> = {
  ethiopian: "ethiopic",
  coptic: "coptic",
  gregorian: "gregory",
  islamic: "islamic",
  iso8601: "iso8601",
  // 'Julian': 'julian', // this is not supported by Temporal
  nepali: "nepali",
  thai: "buddhist",
  persian: "persian",
};
