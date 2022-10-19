import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";
import "../../date-override";
import { LocaleOptions } from "../useDatePicker";

export const useWeekDayLabels = (
  todayZdt: Temporal.ZonedDateTime,
  localeOptions: LocaleOptions
) =>
  useMemo(() => {
    const daysInWeek = todayZdt.daysInWeek;
    const labels = [];
    const daysToWeekStart = todayZdt.dayOfWeek - 1;
    let weekDay = 1;
    let currentZonedDateTime = todayZdt.subtract({
      days: daysToWeekStart,
    });

    while (weekDay <= daysInWeek) {
      labels.push(
        currentZonedDateTime.toInstant().toLocaleString(localeOptions.locale, {
          weekday: "short",
          calendar: localeOptions.calendar,
          timeZone: localeOptions.timeZone,
        })
      );
      weekDay++;
      currentZonedDateTime = currentZonedDateTime.add({ days: 1 });
    }

    return labels;
  }, [
    todayZdt,
    localeOptions.locale,
    localeOptions.calendar,
    localeOptions.timeZone,
  ]);
