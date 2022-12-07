import { SupportedCalendar } from "../types";
import { getDailyPeriods } from "./getDailyPeriods";
import { getMonthlyPeriods } from "./getMonthlyPeriods";
import { getWeeklyPeriods } from "./getWeeklyPeriods";

const periodIdentifiers = [
  "DAILY",
  "WEEKLY",
  "WEEKLYWED",
  "WEEKLYTHU",
  "WEEKLYSAT",
  "WEEKLYSUN",
  "BIWEEKLY",
  "MONTHLY",
  "BIMONTHLY",
  "QUARTERLY",
  "SIXMONTHLY",
  "SIXMONTHLYAPR",
  "YEARLY",
  "FYNOV",
  "FYOCT",
  "FYJUL",
  "FYAPR",
] as const;

export type PeriodIdentifier = typeof periodIdentifiers[number];
export type FixedPeriod = {
  label: string;
  value: string;
};
type GeneratedPeriodParams = {
  year: number;
  periodType: PeriodIdentifier;
  calendar: SupportedCalendar;
  locale: string;
  startingDay?: number /** 1 is Monday */;
};
export type GeneratedPeriodsFunc = (
  options: GeneratedPeriodParams
) => Array<FixedPeriod>;

const generateFixedPeriods: GeneratedPeriodsFunc = ({
  year,
  periodType,
  calendar,
  locale = "en-GB",
  startingDay = 1,
}) => {
  if (periodType?.match("WEEKLY")) {
    return getWeeklyPeriods({
      year,
      periodType,
      locale,
      calendar,
      startingDay,
    });
  }
  switch (periodType) {
    case "MONTHLY":
    case "BIMONTHLY":
    case "QUARTERLY":
    case "SIXMONTHLY":
      return getMonthlyPeriods({ year, periodType, locale, calendar });
    case "DAILY":
      return getDailyPeriods({ year, periodType, locale, calendar });
    default:
      throw "not implemented";
  }
};

export default generateFixedPeriods;
