import { useMemo } from "react";
import { Temporal } from "@js-temporal/polyfill";
import "../../date-override";
import calendarLocalisations from "../../utils/calendarLocalisations";

export const useWeekDayLabels = (
  todayZdt: Temporal.ZonedDateTime,
  localeOptions: {
    locale: string;
    calendar: Temporal.CalendarProtocol;
    timeZone: Temporal.TimeZoneLike;
    numberingSystem?: string;
    weekDayFormat: "narrow" | "short" | "long";
  }
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
      const weekDayString = localeOptions.locale?.startsWith("ne")
        ? calendarLocalisations[localeOptions.locale].dayNamesShort[
            currentZonedDateTime.dayOfWeek - 1
          ]
        : currentZonedDateTime
            .toInstant()
            .toLocaleString(localeOptions.locale, {
              weekday: localeOptions.weekDayFormat,
              calendar: localeOptions.calendar,
              timeZone: localeOptions.timeZone as Temporal.TimeZoneProtocol,
            });
      labels.push(weekDayString);
      weekDay++;
      currentZonedDateTime = currentZonedDateTime.add({ days: 1 });
    }

    return labels;
  }, [todayZdt, localeOptions]);
