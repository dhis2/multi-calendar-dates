import { Temporal } from "@js-temporal/polyfill";
import { useMemo } from "react";
import "../../date-override";

const getPriorZdts = (currentZdt: Temporal.ZonedDateTime) => {
  const priorZdts = [];
  let previousZdt = currentZdt;
  let firstWeekDayReached = false;
  let firstDayOfTheMonthReached = false;
  let startReached;

  while (!startReached) {
    firstWeekDayReached = previousZdt.dayOfWeek === 1;
    firstDayOfTheMonthReached =
      firstDayOfTheMonthReached || previousZdt.day === 1;
    startReached = firstWeekDayReached && firstDayOfTheMonthReached;

    if (previousZdt !== currentZdt) {
      priorZdts.unshift(previousZdt);
    }

    previousZdt = previousZdt.subtract({ days: 1 });
  }

  return priorZdts;
};

const getSubsequentZdts = (currentZdt: Temporal.ZonedDateTime) => {
  const subsequentZdts = [];
  let nextZdt = currentZdt;
  let lastWeekdayReached = false;
  let lastDayOfMonthReached = false;
  let endReached;

  while (!endReached) {
    lastWeekdayReached = nextZdt.dayOfWeek === currentZdt.daysInWeek;
    lastDayOfMonthReached =
      lastDayOfMonthReached || nextZdt.day === currentZdt.daysInMonth;
    endReached = lastWeekdayReached && lastDayOfMonthReached;

    if (nextZdt !== currentZdt) {
      subsequentZdts.push(nextZdt);
    }

    nextZdt = nextZdt.add({ days: 1 });
  }

  return subsequentZdts;
};

const groupByWeek = (
  acc: Temporal.ZonedDateTime[][],
  day: Temporal.ZonedDateTime
) => {
  if (day.dayOfWeek === 1) {
    acc.push([]);
  }
  const currentWeekArray = acc[acc.length - 1];
  currentWeekArray.push(day);
  return acc;
};

/**
 * internal hook used by useDatePicker hook to return the week days numbers in a calendar
 * @param dayZdt
 * @returns
 */
export const useCalendarWeekDays = (dayZdt: Temporal.ZonedDateTime) =>
  useMemo(() => {
    const dates = [
      ...getPriorZdts(dayZdt),
      dayZdt,
      ...getSubsequentZdts(dayZdt),
    ].reduce(groupByWeek, []);

    return dates;
  }, [dayZdt]);
