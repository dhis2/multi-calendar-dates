import { Temporal } from "@js-temporal/polyfill"; // eslint-disable-line

export const zdtToIsoDateStr = (zdt: Temporal.ZonedDateTime) =>
  zdt.toPlainDate().toString({ calendarName: "never" });

export const zdtToLocalDateStr = (zdt: Temporal.ZonedDateTime) =>
  [
    zdt.year,
    String(zdt.month).padStart(2, "0"),
    String(zdt.day).padStart(2, "0"),
  ].join("-");

type DateInfo = {
  dateString: string;
  calendar: Temporal.CalendarLike;
  timeZone: Temporal.TimeZoneLike;
};

export const isoDateStringToZdt = ({
  dateString,
  calendar,
  timeZone,
}: DateInfo) =>
  new Date(dateString)
    .toTemporalInstant()
    .toZonedDateTime({ calendar, timeZone })
    .startOfDay();

export const localDateStringToZd = ({
  dateString,
  calendar,
  timeZone,
}: DateInfo) => {
  const [year, month, day] = dateString.split("-").map(Number);

  return Temporal.ZonedDateTime.from({
    year,
    month,
    day,
    timeZone,
    calendar,
  }).startOfDay();
};
