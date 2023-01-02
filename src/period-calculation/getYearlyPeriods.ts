import { Temporal } from "@js-temporal/polyfill";
import { SupportedCalendar } from "../types";
import { formatYyyyMmDD, isCustomCalendar } from "../utils/helpers";
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
  const month = getMonth(periodType);
  const currentYear = Temporal.PlainDate.from({
    year,
    month,
    day: calendar.toString() === "nepali" ? 14 : 1,
    calendar,
  });

  const years: FixedPeriod[] = [];

  for (let i = 0; i < yearsCount; i++) {
    const dateToAdd = currentYear.subtract({ years: i });
    const value = buildValue({
      periodType,
      year: dateToAdd.year,
      month,
    });
    const year: FixedPeriod = {
      id: value,
      iso: value,
      name: buildLabel(periodType, dateToAdd, {
        locale: locale || "en",
        calendar,
      }),
      ...buildStartAndEndDates(dateToAdd),
    };
    if (isFinancialYear(periodType)) {
      delete year.iso;
    }
    years.push(year);
  }
  return years;
};

const buildStartAndEndDates = (date: Temporal.PlainDate) => {
  const endDate = Temporal.PlainDate.from({
    year: date.year + 1,
    month: date.month,
    day: 1,
    calendar: date.calendar,
  }).subtract({ days: 1 });
  return {
    startDate: formatYyyyMmDD(date, "startOfMonth"),
    endDate: formatYyyyMmDD(endDate, "endOfMonth"),
  };
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

const monthValueKeys: Record<number, string> = {
  1: "",
  2: "Feb",
  3: "March", // some keys are full month-names, some are short ... for some reason
  4: "April",
  5: "May",
  6: "Jun",
  7: "July",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};
const buildValue = ({
  periodType,
  year,
  month,
}: {
  periodType: PeriodIdentifier;
  year: number;
  month: number;
}): string => {
  if (periodType === "YEARLY") {
    return year.toString();
  }
  // financial year
  if (isFinancialYear(periodType)) {
    const yearType = monthValueKeys[month]; // capitalize(periodType?.replace("FY", ""));
    return `${year}${yearType}`;
  }
  throw new Error(
    `can not build value for unrecognised yearly type "${periodType}"`
  );
};

const isFinancialYear = (periodType: PeriodIdentifier) => {
  return periodType?.startsWith("FY");
};
