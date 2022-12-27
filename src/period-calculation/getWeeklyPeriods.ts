import { Temporal } from "@js-temporal/polyfill";
import { capitalize, padWithZeroes } from "../utils/helpers";
import { GeneratedPeriodsFunc, PeriodIdentifier } from "./fixed-periods";

const Days = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};
const getStartingDay = (periodType: PeriodIdentifier) => {
  switch (periodType) {
    case "WEEKLY":
    case "BIWEEKLY":
      return Days.Monday;
    case "WEEKLYSAT":
      return Days.Saturday;
    case "WEEKLYSUN":
      return Days.Sunday;
    case "WEEKLYTHU":
      return Days.Thursday;
    case "WEEKLYWED":
      return Days.Wednesday;
    default:
      throw new Error(`unrecoginsed weekly period type: ${periodType}`);
  }
};
export const getWeeklyPeriods: GeneratedPeriodsFunc = ({
  year,
  calendar,
  periodType,
  locale = "en-GB",
}) => {
  let date = Temporal.PlainDate.from({
    year,
    month: 1,
    day: 1,
    calendar,
  });

  const startingDay = getStartingDay(periodType);

  if (date.dayOfWeek !== startingDay) {
    let diff = 7 - date.dayOfWeek + startingDay;
    if (diff > 3) {
      diff = (startingDay - date.dayOfWeek) % 7;
    }
    date = date.add({ days: diff });
  }

  const days = [];
  let i = 1;

  const daysToAdd = periodType === "BIWEEKLY" ? 13 : 6;

  do {
    const nextWeek = date.add({ days: daysToAdd });
    const value = buildValue(periodType, year, i);
    days.push({
      id: value,
      iso: value,
      name: buildLabel({ periodType, date, nextWeek, weekIndex: i }),
    });
    date = Temporal.PlainDate.from(nextWeek).add({ days: 1 });
    i++;
  } while (date.year === year); // important to have the condition after since the very first day can be in the previous year
  return days;
};

const buildValue = (
  periodType: PeriodIdentifier,
  year: number,
  weekIndex: number
) => {
  const dayPrefix =
    periodType === "WEEKLY" ? "" : capitalize(periodType.replace("WEEKLY", ""));

  return `${year}${dayPrefix}W${weekIndex}`;
};

type BuildLabelFunc = (options: {
  periodType: PeriodIdentifier;
  date: Temporal.PlainDate;
  nextWeek: Temporal.PlainDate;
  weekIndex: number;
}) => string;

const buildLabel: BuildLabelFunc = ({
  periodType,
  date,
  nextWeek,
  weekIndex,
}) => {
  const { year, month, day } = date;
  const { year: nextYear, month: nextMonth, day: nextDay } = nextWeek;
  const prefix = periodType == "BIWEEKLY" ? "Bi-Week" : "Week";
  const label = `${prefix} ${weekIndex} - ${year}-${padWithZeroes(
    month
  )}-${padWithZeroes(day)} - ${nextYear}-${padWithZeroes(
    nextMonth
  )}-${padWithZeroes(nextDay)}`;
  return label;
};
