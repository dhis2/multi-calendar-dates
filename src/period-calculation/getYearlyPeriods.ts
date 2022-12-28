import { Temporal } from "@js-temporal/polyfill";
import { SupportedCalendar } from "../types";
import { capitalize, isCustomCalendar } from "../utils/helpers";
import localisationHelpers from "../utils/localisationHelpers";
import {
  FixedPeriod,
  GeneratedPeriodsFunc,
  PeriodIdentifier,
} from "./fixed-periods";
import { monthNumbers } from "./getMonthlyPeriods";

export const getYearlyPeriods: GeneratedPeriodsFunc = ({
  year,
  calendar,
  periodType,
  yearsCount = 10,
  locale,
}) => {
  const currentYear = Temporal.PlainDate.from({
    year,
    month: getMonth(periodType),
    day: calendar.toString() === "nepali" ? 14 : 1,
    calendar,
  });

  const years: FixedPeriod[] = [];

  for (let i = 0; i < yearsCount; i++) {
    const previousYear = currentYear.subtract({ years: i });
    const value = buildValue(periodType, previousYear.year.toString());
    years.push({
      id: value,
      iso: value,
      name: buildLabel(periodType, previousYear, {
        locale: locale || "en",
        calendar,
      }),
    });
  }
  return years;
};

const getMonth = (periodType: string) => {
  const yearType = periodType?.replace("FY", "").toUpperCase();
  const monthInfo = monthNumbers[yearType as keyof typeof monthNumbers];

  return monthInfo?.value || 1;
};
const buildLabel = (
  periodType: PeriodIdentifier,
  year: Temporal.PlainDate,
  options: { locale: string; calendar: SupportedCalendar }
) => {
  if (periodType === "YEARLY") {
    return year.year.toString();
  }

  if (isCustomCalendar(options.calendar)) {
    return buildLabelForCustomCalendar(year, options);
  }
  const format = {
    month: "long" as const,
    year: "numeric" as const,
    calendar: options.calendar,
  };
  const previousYearString = localisationHelpers.localiseMonth(
    year,
    options,
    format
  );
  const currentYearString = localisationHelpers.localiseMonth(
    year.add({ years: 1 }),
    options,
    format
  );

  let result = `${previousYearString} - ${currentYearString}`;

  // needed for Ethiopic calendar
  result = result.replace(/ERA\d+\s*/g, "").trim();

  return result;
};

const buildLabelForCustomCalendar = (
  date: Temporal.PlainDate,
  options: { locale: string; calendar: SupportedCalendar }
) => {
  const localiseMonth = (dateToDisplay: Temporal.PlainDate) =>
    `${localisationHelpers.localiseMonth(dateToDisplay, options, {})} ${
      dateToDisplay.year
    }`;

  const nextYearDate = date.add({ years: 1 });
  const result = `${localiseMonth(date)} - ${localiseMonth(nextYearDate)}`;

  return result;
};

const buildValue = (periodType: PeriodIdentifier, year: string) => {
  if (periodType === "YEARLY") {
    return year;
  }
  // financial year
  if (periodType?.startsWith("FY")) {
    const yearType = capitalize(periodType?.replace("FY", ""));
    return `${year}${yearType}`;
  }
  throw new Error(
    `can not build value for unrecognised yearly type "${periodType}"`
  );
};
