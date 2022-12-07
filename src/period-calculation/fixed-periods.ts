import { SupportedCalendar } from "../types";
import { getDailyPeriods } from "./getDailyPeriods";
import { getMonthlyPeriods } from "./getMonthlyPeriods";
import { getWeeklyPeriods } from "./getWeeklyPeriods";
import { getYearlyPeriods } from "./getYearlyPeriods";

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
  yearsCount?: number;
};
export type GeneratedPeriodsFunc = (
  options: GeneratedPeriodParams
) => Array<FixedPeriod>;

const generateFixedPeriods: GeneratedPeriodsFunc = ({
  year,
  periodType,
  calendar,
  locale = "en",
  startingDay = 1,
}) => {
  if (typeof year !== "number") {
    throw new Error("year must be a number");
  }

  if (periodType?.match("WEEKLY")) {
    return getWeeklyPeriods({
      year,
      periodType,
      locale,
      calendar,
      startingDay,
    });
  }
  if (periodType?.startsWith("FY") || periodType === "YEARLY") {
    // financial year
    return getYearlyPeriods({ year, periodType, locale, calendar });
  }
  if (periodType.match(/SIXMONTHLY/)) {
    return getMonthlyPeriods({ year, periodType, locale, calendar });
  }
  switch (periodType) {
    case "MONTHLY":
    case "BIMONTHLY":
    case "QUARTERLY":
    case "SIXMONTHLY":
    case "SIXMONTHLYAPR":
      return getMonthlyPeriods({ year, periodType, locale, calendar });
    case "DAILY":
      return getDailyPeriods({ year, periodType, locale, calendar });
    default:
      throw new Error(
        `can not generate period for unrecognised period type "${periodType}"`
      );
  }
};

export default generateFixedPeriods;
