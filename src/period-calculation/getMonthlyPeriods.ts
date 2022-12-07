import { Temporal } from "@js-temporal/polyfill";
import { padWithZeroes } from "../utils/helpers";
import { GeneratedPeriodsFunc, PeriodIdentifier } from "./fixed-periods";

export const getMonthlyPeriods: GeneratedPeriodsFunc = ({
  year,
  calendar,
  periodType,
  locale = "en-GB",
}) => {
  let currentMonth = Temporal.PlainYearMonth.from({
    year,
    month: 1,
    calendar,
  });

  const months = [];

  const monthToAdd = getMonthsToAdd(periodType);
  let index = 1;
  while (currentMonth.year === year) {
    const nextMonth = currentMonth.add({ months: monthToAdd });
    months.push({
      label: buildLabel({
        periodType,
        month: currentMonth,
        locale,
        nextMonth: nextMonth.subtract({ months: 1 }), // when we display, we want to show the range using previous month
        index,
      }),
      value: buildValue(periodType, currentMonth, index),
    });
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
}) => string;

const buildValue = (
  periodType: PeriodIdentifier,
  currentMonth: Temporal.PlainYearMonth,
  index: number
) => {
  if (periodType === "BIMONTHLY") {
    return `${currentMonth.year}${padWithZeroes(index)}B`;
  }
  if (periodType === "QUARTERLY") {
    return `${currentMonth.year}Q${index}`;
  }
  if (periodType === "SIXMONTHLY") {
    return `${currentMonth.year}S${index}`;
  }
  return `${currentMonth.year}${padWithZeroes(currentMonth.month)}`;
};

const buildLabel: BuildLabelFunc = ({
  periodType,
  month,
  nextMonth,
  locale,
}) => {
  const withYearFormat = {
    month: "long" as const,
    year: "numeric" as const,
  };
  const monthOnlyFormat = {
    month: "long" as const,
  };

  if (periodType === "MONTHLY") {
    return `${month.toLocaleString(locale, withYearFormat)}`;
  }

  if (["BIMONTHLY", "QUARTERLY", "SIXMONTHLY"].includes(periodType)) {
    return `${month.toLocaleString(
      locale,
      monthOnlyFormat
    )} - ${nextMonth.toLocaleString(locale, withYearFormat)}`;
  }

  throw `building month label - not recognised period type ${periodType}`;
};

const getMonthsToAdd = (periodType: PeriodIdentifier) => {
  switch (periodType) {
    case "MONTHLY":
      return 1;
    case "BIMONTHLY":
      return 2;
    case "QUARTERLY":
      return 3;
    case "SIXMONTHLY":
      return 6;
    default:
      throw `unrecognized periodType: ${periodType}`;
  }
};
