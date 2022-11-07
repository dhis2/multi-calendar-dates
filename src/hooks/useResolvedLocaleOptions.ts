import { Intl, Temporal } from "@js-temporal/polyfill"; // eslint-disable-line
import { useMemo } from "react";
import {
  SupportedCalendar,
  SupportedNumberingSystem,
  SupportedTimeZone,
} from "../types";

import "../date-override";
import { customCalendars } from "../custom-calendars";

type HookOptions = {
  calendar: SupportedCalendar;
  numberingSystem: SupportedNumberingSystem;
  timeZone: SupportedTimeZone;
  locale: string;
};

type ResolveLocaleResult = {
  resolvedLocale: string;
  resolvedOptions: {
    calendar: Temporal.CalendarProtocol;
    numberingSystem: string;
    timeZone: Temporal.TimeZoneLike;
  };
  error?: unknown;
};

type ResolvedDateTimeFormatOptions = {
  locale: string;
  calendar: string;
  numberingSystem: string;
  timeZone: string;
  hour12?: boolean;
  weekday?: string;
  era?: string;
  year?: string;
  month?: string;
  day?: string;
  hour?: string;
  minute?: string;
  second?: string;
  timeZoneName?: string;
};

const constructResolvedOptions = (
  locale: string,
  calendar: SupportedCalendar,
  options: Omit<ResolvedDateTimeFormatOptions, "locale">,
  error?: unknown
) => {
  return {
    resolvedLocale: locale,
    resolvedOptions: {
      ...options,
      timeZone: options.timeZone as Temporal.TimeZoneLike,
      calendar: (customCalendars[calendar]?.calendar ||
        options.calendar) as Temporal.CalendarProtocol,
    },
    error,
  };
};
/**
 * A hook that returns the locale and locale options to be used by the calendar.
 *
 * If no options are provided this will use the values of the user browser
 * If a locale identifier is provided it will use that to populate options
 * If a locale identifier is invalid, then it will use the browser's values
 * If any valid options are provided these will override the options for the
 * specified locale identifier or browser settings
 * @param options
 * @returns
 */
export const useResolvedLocaleOptions: (
  options: HookOptions
) => ResolveLocaleResult = (options) => {
  const { calendar, locale, timeZone, numberingSystem } = options;

  return useMemo(() => {
    try {
      /**
       * If no options are provided this will use the values of the user browser
       * If a locale identifier is provided it will use that to populate options
       * If any options are provided these will override the options for the
       * specified locale identifier or browser settings
       */
      const { locale: resolvedLocale, ...resolvedOptions } =
        new Intl.DateTimeFormat(locale, {
          calendar: calendar,
          timeZone: timeZone,
          numberingSystem,
        }).resolvedOptions();

      return constructResolvedOptions(locale, calendar, resolvedOptions);
    } catch (error) {
      console.error(`locale ${locale} not found - defaulting to en`, error);
      const { locale: resolvedLocale, ...resolvedOptions } =
        new Intl.DateTimeFormat("default", {
          calendar: calendar,
          timeZone: timeZone,
          numberingSystem,
        }).resolvedOptions();

      return constructResolvedOptions(locale, calendar, resolvedOptions, error);
    }
  }, [calendar, locale, numberingSystem, timeZone]);
};
