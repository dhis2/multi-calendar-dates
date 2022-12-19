import { Temporal } from "@js-temporal/polyfill";
import { SupportedCalendar } from "../types";
import { padWithZeroes } from "../utils/helpers";
import { GeneratedPeriodsFunc, PeriodIdentifier } from "./fixed-periods";

export const getMonthlyPeriods: GeneratedPeriodsFunc = ({
  year,
  calendar,
  periodType,
  locale = "en",
}) => {
  let currentMonth = Temporal.PlainYearMonth.from({
    year,
    month: getStartingMonth(periodType),
    calendar,
  });

  const months = [];

  const monthToAdd = getMonthsToAdd(periodType);

  let index = 1;

  while (
    currentMonth.year === year ||
    needsExtraMonth(periodType, months.length)
  ) {
    const nextMonth = currentMonth.add({ months: monthToAdd });
    if (!ignoreMonth(calendar, currentMonth)) {
      months.push({
        label: buildLabel({
          periodType,
          month: currentMonth,
          locale,
          calendar,
          nextMonth: nextMonth.subtract({ months: 1 }), // when we display, we want to show the range using previous month
          index,
        }),
        value: buildValue({ periodType, currentMonth, year, index }),
      });
    }

    currentMonth = Temporal.PlainYearMonth.from(nextMonth);
    index++;
  }

  return months;
};

type BuildLabelFunc = (options: {
  periodType: PeriodIdentifier;
  month: Temporal.PlainYearMonth;
  nextMonth: Temporal.PlainYearMonth;
  index: number;
  locale: string;
  calendar: SupportedCalendar;
}) => string;

/**
 * special cases where we ignore a month
 */
const ignoreMonth = (
  calendar: SupportedCalendar,
  date: Temporal.PlainYearMonth
) => {
  // in Ethiopic calendar, for periods more than bi-weekly, we ignore the 13th month
  if (calendar === "ethiopic" && date.month === 13) {
    return true;
  }
  return false;
};

const buildValue: (options: {
  periodType: PeriodIdentifier;
  currentMonth: Temporal.PlainYearMonth;
  year: number;
  index: number;
}) => string = ({ periodType, currentMonth, year, index }) => {
  if (periodType === "BIMONTHLY") {
    return `${year}${padWithZeroes(index)}B`;
  }
  if (periodType === "QUARTERLY") {
    return `${year}Q${index}`;
  }
  if (periodType === "SIXMONTHLY") {
    return `${year}S${index}`;
  }

  if (periodType.match(/QUARTERLY/)) {
    const month = getMonthInfo(periodType)?.name;
    return `${year}${month}Q${index}`;
  }

  if (periodType.match(/SIXMONTHLY/)) {
    const month = getMonthInfo(periodType)?.name;
    return `${year}${month}S${index}`;
  }
  return `${year}${padWithZeroes(currentMonth.month)}`;
};

const buildLabel: BuildLabelFunc = ({
  periodType,
  month,
  nextMonth,
  calendar,
  locale,
}) => {
  const withYearFormat = {
    month: "long" as const,
    year: "numeric" as const,
    calendar,
  };
  const monthOnlyFormat = {
    month: "long" as const,
    calendar,
  };

  let result = "";

  if (
    ["BIMONTHLY", "QUARTERLY", "SIXMONTHLY"].includes(periodType) ||
    periodType.match(/SIXMONTHLY|QUARTERLY/)
  ) {
    const format =
      month.year === nextMonth.year ? monthOnlyFormat : withYearFormat;
    result = `${month.toLocaleString(
      locale,
      format
    )} - ${nextMonth.toLocaleString(locale, withYearFormat)}`;
  } else {
    result = `${month.toLocaleString(locale, withYearFormat)}`;
  }

  // needed for ethiopic calendar - the default formatter adds the era, which is what we want at DHIS
  result = result.replace(/ERA\d+\s*/g, "").trim();
  return result;
};

const getMonthsToAdd = (periodType: PeriodIdentifier) => {
  if (periodType?.match(/SIXMONTHLY/)) {
    return 6;
  }
  if (periodType?.match(/QUARTERLY/)) {
    return 3;
  }
  if (periodType === "MONTHLY") {
    return 1;
  }
  if (periodType === "BIMONTHLY") {
    return 2;
  }

  throw new Error(`unrecognised monthly period type ${periodType}`);
};

const monthNumbers = {
  JAN: { value: 1, name: "January" },
  FEB: { value: 2, name: "February" },
  MAR: { value: 3, name: "March" },
  APR: { value: 4, name: "April" },
  MAY: { value: 5, name: "May" },
  JUN: { value: 6, name: "June" },
  JUL: { value: 7, name: "July" },
  AUG: { value: 8, name: "August" },
  SEP: { value: 9, name: "September" },
  OCT: { value: 10, name: "October" },
  NOV: { value: 11, name: "November" },
  DEC: { value: 12, name: "December" },
};

const getMonthInfo = (periodType: PeriodIdentifier) => {
  const monthString = periodType
    .replace("SIXMONTHLY", "")
    .replace("QUARTERLY", "");

  return monthNumbers[monthString as keyof typeof monthNumbers];
};
const getStartingMonth = (periodType: PeriodIdentifier): number => {
  if (periodType.match(/SIXMONTHLY|QUARTERLY/)) {
    if (periodType === "SIXMONTHLY" || periodType === "QUARTERLY") {
      return 1;
    } else {
      return getMonthInfo(periodType)?.value ?? 1;
    }
  } else {
    return 1;
  }
};
function needsExtraMonth(periodType: PeriodIdentifier, length: number) {
  if (periodType.match(/SIXMONTHLY/)) {
    return length < 2;
  }
  if (periodType.match(/QUARTERLY/)) {
    return length < 4;
  }
  return false;
}