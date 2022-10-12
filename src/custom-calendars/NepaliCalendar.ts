import { Temporal } from "@js-temporal/polyfill";

type CalendarYMD = { year: number; month: number; day: number };
type CalendarYM = { year: number; month: number };
type CalendarYearOnly = { year: number };

class NepaliCalendar implements Temporal.Calendar {
  inLeapYear(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
  ): boolean {
    if (typeof date === "string") throw "not implemented";
    const { year } = date;
    return (7 * year! + 1) % 19 < 7;
  }
  [Symbol.toStringTag]: any = "Temporal.Calendar";
  id = "nepali" as const;
  calendarType = "lunisolar" as const;
  monthsInYear() {
    return 12;
  }
  year(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
  ): number {
    throw new Error("Method not implemented.");
  }
  month(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
      | Temporal.PlainMonthDay
  ): number {
    throw new Error("Method not implemented.");
  }
  monthCode(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
      | Temporal.PlainMonthDay
  ): string {
    throw new Error("Method not implemented.");
  }
  day(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
      | Temporal.PlainMonthDay
  ): number {
    throw new Error("Method not implemented.");
  }
  era(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
  ): string | undefined {
    throw new Error("Method not implemented.");
  }
  eraYear(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
  ): number | undefined {
    throw new Error("Method not implemented.");
  }
  dayOfWeek(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
  ): number {
    throw new Error("Method not implemented.");
  }
  dayOfYear(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
  ): number {
    throw new Error("Method not implemented.");
  }
  weekOfYear(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
  ): number {
    throw new Error("Method not implemented.");
  }
  daysInWeek(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
  ): number {
    throw new Error("Method not implemented.");
  }
  daysInMonth(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
  ): number {
    throw new Error("Method not implemented.");
  }
  daysInYear(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
  ): number {
    throw new Error("Method not implemented.");
  }
  dateFromFields(
    fields: Temporal.YearOrEraAndEraYear &
      Temporal.MonthOrMonthCode & { day: number },
    options?: Temporal.AssignmentOptions | undefined
  ): Temporal.PlainDate {
    throw new Error("Method not implemented.");
  }
  yearMonthFromFields(
    fields: Temporal.YearOrEraAndEraYear & Temporal.MonthOrMonthCode,
    options?: Temporal.AssignmentOptions | undefined
  ): Temporal.PlainYearMonth {
    throw new Error("Method not implemented.");
  }
  monthDayFromFields(
    fields: Temporal.MonthCodeOrMonthAndYear & { day: number },
    options?: Temporal.AssignmentOptions | undefined
  ): Temporal.PlainMonthDay {
    throw new Error("Method not implemented.");
  }
  dateAdd(
    date: string | Temporal.PlainDate | Temporal.PlainDateLike,
    duration: string | Temporal.Duration | Temporal.DurationLike,
    options?: Temporal.ArithmeticOptions | undefined
  ): Temporal.PlainDate {
    throw new Error("Method not implemented.");
  }
  dateUntil(
    one: string | Temporal.PlainDate | Temporal.PlainDateLike,
    two: string | Temporal.PlainDate | Temporal.PlainDateLike,
    options?:
      | Temporal.DifferenceOptions<"year" | "month" | "day" | "week">
      | undefined
  ): Temporal.Duration {
    throw new Error("Method not implemented.");
  }
  fields(fields: Iterable<string>): string[] {
    throw new Error("Method not implemented.");
  }
  mergeFields(
    fields: Record<string, unknown>,
    additionalFields: Record<string, unknown>
  ): Record<string, unknown> {
    throw new Error("Method not implemented.");
  }
  toString(): string {
    throw new Error("Method not implemented.");
  }
  toJSON(): string {
    throw new Error("Method not implemented.");
  }

  //   minimumMonthLength(calendarDate: CalendarYM) {
  //     return this.minMaxMonthLength(calendarDate, "min");
  //   }
  //   maximumMonthLength(calendarDate: CalendarYM) {
  //     return this.minMaxMonthLength(calendarDate, "max");
  //   }
  //   minMaxMonthLength(calendarDate: CalendarYM, minOrMax: "min" | "max") {
  //     const { month, year } = calendarDate;
  //     const monthCode = this.getMonthCode(year, month);
  //     const monthInfo = Object.entries(this.months).find(
  //       (m) => m[1].monthCode === monthCode
  //     );
  //     if (monthInfo === undefined)
  //       throw new RangeError(`unmatched Nepali month: ${month}`);
  //     const daysInMonth = monthInfo[1].days;
  //     return typeof daysInMonth === "number"
  //       ? daysInMonth
  //       : daysInMonth[minOrMax];
  //   }
  //   /** Take a guess at what ISO date a particular calendar date corresponds to */
  //   estimateIsoDate(calendarDate: CalendarYMD) {
  //     const { year } = calendarDate;
  //     return { year: year - 57, month: 1, day: 1 };
  //   }
  //   // ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin',
  //   //   'Kartik', 'Mangsir', 'Paush', 'Mangh', 'Falgun', 'Chaitra']
  //   months: NepaliMonthInfo = {
  //     Baisakh: { leap: 1, regular: 1, monthCode: "Bai", days: 30 },
  //     Jestha: {
  //       leap: 2,
  //       regular: 2,
  //       monthCode: "Je",
  //       days: { min: 29, max: 30 },
  //     },
  //     Ashadh: {
  //       leap: 3,
  //       regular: 3,
  //       monthCode: "As",
  //       days: { min: 29, max: 30 },
  //     },
  //     Shrawan: { leap: 4, regular: 4, monthCode: "Shra", days: 29 },
  //     Bhadra: { leap: 5, regular: 5, monthCode: "Bha", days: 30 },
  //     Ashwin: { leap: 6, regular: 6, monthCode: "Ash", days: 29 },
  //     Kartik: { leap: 7, regular: 7, monthCode: "Kar", days: 30 },
  //     Mangsir: { leap: 8, regular: 8, monthCode: "Mang", days: 29 },
  //     Paush: { leap: 9, regular: 9, monthCode: "Pau", days: 30 },
  //     Mangh: { leap: 10, regular: 10, monthCode: "Ma", days: 29 },
  //     Falgun: { leap: 11, regular: 11, monthCode: "Fal", days: 30 },
  //     Chaitra: { leap: 12, regular: 12, monthCode: "Chai", days: 29 },
  //   };
  //   getMonthCode(year: number, month: number) {
  //     if (this.inLeapYear({ year })) {
  //       return month === 6
  //         ? buildMonthCode(5, true)
  //         : buildMonthCode(month < 6 ? month : month - 1);
  //     } else {
  //       return buildMonthCode(month);
  //     }
  //   }
  //   override adjustCalendarDate(
  //     calendarDate: Partial<FullCalendarDate>,
  //     cache?: OneObjectCache,
  //     overflow: Overflow = "constrain",
  //     fromLegacyDate = false
  //   ): FullCalendarDate {
  //     // The incoming type is actually CalendarDate (same as args to
  //     // Calendar.dateFromParams) but TS isn't smart enough to follow all the
  //     // reassignments below, so as an alternative to 10+ type casts, we'll lie
  //     // here and claim that the type has `day` and `year` filled in already.
  //     let { year, eraYear, month, monthCode, day, monthExtra } =
  //       calendarDate as Omit<typeof calendarDate, "year" | "day"> & {
  //         year: number;
  //         day: number;
  //       };
  //     if (year === undefined && eraYear !== undefined) year = eraYear;
  //     if (eraYear === undefined && year !== undefined) eraYear = year;
  //     if (fromLegacyDate) {
  //       // In Pre Node-14 V8, DateTimeFormat.formatToParts `month: 'numeric'`
  //       // output returns the numeric equivalent of `month` as a string, meaning
  //       // that `'6'` in a leap year is Adar I, while `'6'` in a non-leap year
  //       // means Adar. In this case, `month` will already be correct and no action
  //       // is needed. However, in Node 14 and later formatToParts returns the name
  //       // of the Hebrew month (e.g. "Tevet"), so we'll need to look up the
  //       // correct `month` using the string name as a key.
  //       if (monthExtra) {
  //         const monthInfo = this.months[monthExtra];
  //         if (!monthInfo)
  //           throw new RangeError(
  //             `Unrecognized month from formatToParts: ${monthExtra}`
  //           );
  //         month = this.inLeapYear({ year }) ? monthInfo.leap : monthInfo.regular;
  //       }
  //       // Because we're getting data from legacy Date, then `month` will always be present
  //       monthCode = this.getMonthCode(year, month as number);
  //       const result = {
  //         year,
  //         month: month as number,
  //         day,
  //         era: undefined as string | undefined,
  //         eraYear,
  //         monthCode,
  //       };
  //       return result;
  //     } else {
  //       // When called without input coming from legacy Date output, simply ensure
  //       // that all fields are present.
  //       this.validateCalendarDate(calendarDate);
  //       if (month === undefined) {
  //         if ((monthCode as string).endsWith("L")) {
  //           if (monthCode !== "M05L") {
  //             throw new RangeError(
  //               `Hebrew leap month must have monthCode M05L, not ${monthCode}`
  //             );
  //           }
  //           month = 6;
  //           if (!this.inLeapYear({ year })) {
  //             if (overflow === "reject") {
  //               throw new RangeError(
  //                 `Hebrew monthCode M05L is invalid in year ${year} which is not a leap year`
  //               );
  //             } else {
  //               // constrain to last day of previous month (Av)
  //               month = 5;
  //               day = 30;
  //               monthCode = "M05";
  //             }
  //           }
  //         } else {
  //           month = monthCodeNumberPart(monthCode as string);
  //           // if leap month is before this one, the month index is one more than the month code
  //           if (this.inLeapYear({ year }) && month >= 6) month++;
  //           const largestMonth = this.monthsInYear({ year });
  //           if (month < 1 || month > largestMonth)
  //             throw new RangeError(`Invalid monthCode: ${monthCode}`);
  //         }
  //       } else {
  //         if (overflow === "reject") {
  //           ES.RejectToRange(month, 1, this.monthsInYear({ year }));
  //           ES.RejectToRange(day, 1, this.maximumMonthLength({ year, month }));
  //         } else {
  //           month = ES.ConstrainToRange(month, 1, this.monthsInYear({ year }));
  //           day = ES.ConstrainToRange(
  //             day,
  //             1,
  //             this.maximumMonthLength({ year, month })
  //           );
  //         }
  //         if (monthCode === undefined) {
  //           monthCode = this.getMonthCode(year, month);
  //         } else {
  //           const calculatedMonthCode = this.getMonthCode(year, month);
  //           if (calculatedMonthCode !== monthCode) {
  //             throw new RangeError(
  //               `monthCode ${monthCode} doesn't correspond to month ${month} in Hebrew year ${year}`
  //             );
  //           }
  //         }
  //       }
  //       return {
  //         ...calendarDate,
  //         day,
  //         month,
  //         monthCode: monthCode as string,
  //         year,
  //         eraYear,
  //       };
  //     }
  //   }
  // All built-in calendars except Chinese/Dangi and Hebrew use an era
  //   hasEra = false;
}

export { NepaliCalendar };
