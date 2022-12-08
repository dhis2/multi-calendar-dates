import { Temporal } from "@js-temporal/polyfill";
import { numberingSystems } from "../constants";
import { customCalendars, CustomCalendarTypes } from "../custom-calendars";
import { LocaleOptions } from "../hooks/useDatePicker";
import { isCustomCalendar } from "./helpers";

const getCustomCalendarLocale = (
  calendar: Temporal.CalendarLike,
  locale: string
) => {
  return customCalendars[calendar as CustomCalendarTypes]?.locales?.[locale];
};

const localiseDateLabel = (
  selectedDateZdt: Temporal.ZonedDateTime,
  localeOptions: LocaleOptions
) => {
  if (!localeOptions.calendar) {
    throw new Error("no calendar provided to localise function");
  }

  const isCustom = isCustomCalendar(localeOptions.calendar);

  return isCustom
    ? `${selectedDateZdt?.day}-${selectedDateZdt?.month}-${selectedDateZdt?.year}`
    : selectedDateZdt
        ?.toLocaleString(localeOptions.locale, {
          ...localeOptions,
          timeZone: localeOptions.timeZone.id,
          dateStyle: "full",
        })
        .toString();
};

const localiseWeekLabel = (
  zdt: Temporal.ZonedDateTime,
  localeOptions: LocaleOptions
) => {
  if (!localeOptions.calendar) {
    throw new Error("no calendar provided to localise function");
  }
  const isCustom = isCustomCalendar(localeOptions.calendar);
  const customLocale = getCustomCalendarLocale(
    localeOptions.calendar,
    localeOptions.locale
  );

  return isCustom
    ? customLocale?.numbers?.[zdt.day] || zdt.day
    : zdt.toInstant().toLocaleString(localeOptions.locale, {
        ...localeOptions,
        numberingSystem: numberingSystems.includes(
          localeOptions.numberingSystem as typeof numberingSystems[number]
        )
          ? localeOptions.numberingSystem
          : undefined,
        day: "numeric",
      });
};

const localiseMonth = (
  zdt: Temporal.ZonedDateTime,
  localeOptions: LocaleOptions,
  format: Intl.DateTimeFormatOptions
) => {
  if (!localeOptions.calendar) {
    throw new Error("no calendar provided to localise function");
  }
  const isCustom = isCustomCalendar(localeOptions.calendar);
  const customLocale = getCustomCalendarLocale(
    localeOptions.calendar,
    localeOptions.locale
  );

  return isCustom
    ? customLocale?.monthNames[zdt.month - 1]
    : zdt.toInstant().toLocaleString(localeOptions.locale, format);
};

export const localiseWeekDayLabel = (
  zdt: Temporal.ZonedDateTime,
  localeOptions: LocaleOptions
) => {
  if (!localeOptions.calendar) {
    throw new Error("no calendar provided to localise function");
  }
  const isCustom = isCustomCalendar(localeOptions.calendar);

  const customCalendar = getCustomCalendarLocale(
    localeOptions.calendar,
    localeOptions.locale
  );
  const customDayString = customCalendar?.dayNamesShort[zdt.dayOfWeek - 1]; // dayOfWeek is 1-based

  return isCustom && customDayString
    ? customDayString
    : zdt.toInstant().toLocaleString(localeOptions.locale, {
        weekday: localeOptions.weekDayFormat,
        calendar: localeOptions.calendar,
        timeZone: localeOptions.timeZone,
      });
};
const localisationHelpers = {
  localiseDateLabel,
  localiseWeekLabel,
  localiseMonth,
  localiseWeekDayLabel,
};

export default localisationHelpers;
