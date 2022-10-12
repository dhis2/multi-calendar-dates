import { Intl, Temporal } from "@js-temporal/polyfill"; // eslint-disable-line
import { useMemo } from "react";
import { SupportedNumberingSystem } from "../types";

import "../date-override";

export type FormatterResult = {
  longFullDate: Intl.DateTimeFormat;
  yearNumeric: Intl.DateTimeFormat;
  monthLong: Intl.DateTimeFormat;
  daysAgoNonNumeric: globalThis.Intl.RelativeTimeFormat;
  dayNumber: Intl.DateTimeFormat;
  weekDayNameShort: Intl.DateTimeFormat;
};

type FormatterOptions = {
  locale: string;
  options: {
    numberingSystem: SupportedNumberingSystem;
  };
  temporalCalendar: Temporal.Calendar | Temporal.CalendarProtocol;
  temporalTimeZone: Temporal.TimeZone | Temporal.TimeZoneProtocol;
};

export const useFormatters: (options: FormatterOptions) => FormatterResult = ({
  locale,
  options,
  temporalCalendar,
  temporalTimeZone,
}) =>
  useMemo(() => {
    const { numberingSystem } = options;
    return {
      longFullDate: new Intl.DateTimeFormat(locale, {
        dateStyle: "full",
        numberingSystem,
        calendar: temporalCalendar,
        timeZone: temporalTimeZone,
      }),
      yearNumeric: new Intl.DateTimeFormat(locale, {
        year: "numeric",
        calendar: temporalCalendar,
        timeZone: temporalTimeZone,
        numberingSystem,
      }),
      monthLong: new Intl.DateTimeFormat(locale, {
        month: "long",
        calendar: temporalCalendar,
        timeZone: temporalTimeZone,
      }),
      // daysAgo.format(0, 'day') => 'today'
      daysAgoNonNumeric: new window.Intl.RelativeTimeFormat(locale, {
        numeric: "auto",
      }),
      dayNumber: new Intl.DateTimeFormat(locale, {
        day: "numeric",
        calendar: temporalCalendar,
        timeZone: temporalTimeZone,
        numberingSystem,
      }),
      weekDayNameShort: new Intl.DateTimeFormat(locale, {
        weekday: "short",
        calendar: temporalCalendar,
        timeZone: temporalTimeZone,
      }),
    };
  }, [locale, options, temporalCalendar, temporalTimeZone]);
