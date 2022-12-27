import { Temporal } from "@js-temporal/polyfill";
import { GeneratedPeriodsFunc } from "./fixed-periods";

export const getDailyPeriods: GeneratedPeriodsFunc = ({
  year,
  calendar,
  locale = "en-GB",
}) => {
  const day = Temporal.PlainDate.from({
    year,
    month: 1,
    day: 1,
    calendar,
  });

  const days = [];
  for (let i = 0; i < day.daysInYear; i++) {
    const nextDay = day.add({ days: i });
    const value = `${day.year}${String(nextDay.month).padStart(2, "0")}${String(
      nextDay.day
    ).padStart(2, "0")}`;

    days.push({
      id: value,
      iso: value,
      name: `${day.year}-${String(nextDay.month).padStart(2, "0")}-${String(
        nextDay.day
      ).padStart(2, "0")}`,
    });
  }
  return days;
};
