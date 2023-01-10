import { SupportedCalendar } from "../types";

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
