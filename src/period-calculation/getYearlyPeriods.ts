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
    const year: FixedPeriod = {
      id: value,
      iso: value,
      name: buildLabel(periodType, previousYear, {
        locale: locale || "en",
        calendar,
      }),
    };
    if (isFinancialYear(periodType)) {
      delete year.iso;
    }
    years.push(year);
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
  currentYearDate: Temporal.PlainDate,
  options: { locale: string; calendar: SupportedCalendar }
) => {
  if (periodType === "YEARLY") {
    return currentYearDate.year.toString();
  }

  if (isCustomCalendar(options.calendar)) {
    return buildLabelForCustomCalendar(currentYearDate, options);
  }
  const format = {
    month: "long" as const,
    year: "numeric" as const,
    calendar: options.calendar,
  };
  const fromYear = localisationHelpers.localiseMonth(
    currentYearDate,
    options,
    format
  );

  const toYear = localisationHelpers.localiseMonth(
    currentYearDate.add({ months: currentYearDate.monthsInYear - 1 }),
    options,
    format
  );

  let result = `${fromYear} - ${toYear}`;

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

  const nextYearDate = Temporal.PlainDate.from({
    year: date.year + 1,
    month: (date.month - 1) % date.monthsInYear,
    day: 1,
    calendar: options.calendar,
  });
  const result = `${localiseMonth(date)} - ${localiseMonth(nextYearDate)}`;

  return result;
};

const buildValue = (periodType: PeriodIdentifier, year: string) => {
  if (periodType === "YEARLY") {
    return year;
  }
  // financial year
  if (isFinancialYear(periodType)) {
    const yearType = capitalize(periodType?.replace("FY", ""));
    return `${year}${yearType}`;
  }
  throw new Error(
    `can not build value for unrecognised yearly type "${periodType}"`
  );
};

const isFinancialYear = (periodType: PeriodIdentifier) => {
  return periodType?.startsWith("FY");
};
