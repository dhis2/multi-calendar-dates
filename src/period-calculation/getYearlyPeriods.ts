import { Temporal } from "@js-temporal/polyfill";
import { capitalize } from "../utils/helpers";
import { GeneratedPeriodsFunc, PeriodIdentifier } from "./fixed-periods";

export const getYearlyPeriods: GeneratedPeriodsFunc = ({
  year,
  calendar,
  periodType,
  yearsCount = 10,
}) => {
  const currentYear = Temporal.PlainDate.from({
    year,
    month: 1,
    day: 1,
    calendar,
  });

  const years = [];

  for (let i = 0; i < yearsCount; i++) {
    const { year } = currentYear.subtract({ years: i });
    const value = buildValue(periodType, year.toString());
    years.push({
      id: value,
      iso: value,
      name: year.toString(),
    });
  }
  return years;
};

function buildValue(periodType: PeriodIdentifier, year: string) {
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
}
