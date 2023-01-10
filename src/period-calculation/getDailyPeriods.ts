import { Temporal } from "@js-temporal/polyfill";
import { formatYyyyMmDD } from "../utils/helpers";
import { FixedPeriod, GeneratedPeriodsFunc } from "./fixed-periods";

export const getDailyPeriods: GeneratedPeriodsFunc = ({ year, calendar }) => {
  const day = Temporal.PlainDate.from({
    year,
    month: 1,
    day: 1,
    calendar,
  });

  const days: FixedPeriod[] = [];
  for (let i = 0; i < day.daysInYear; i++) {
    const nextDay = day.add({ days: i });
    const value = `${day.year}${String(nextDay.month).padStart(2, "0")}${String(
      nextDay.day
    ).padStart(2, "0")}`;

    days.push({
      id: value,
      iso: value,
      name: formatYyyyMmDD(nextDay),
      startDate: formatYyyyMmDD(nextDay),
      endDate: formatYyyyMmDD(nextDay),
    });
  }
  return days;
};
