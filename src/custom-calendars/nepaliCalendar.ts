import { Temporal } from "@js-temporal/polyfill";
type CalendarYMD = { year: number; month: number; day: number };
type AssignmentOptions = { overflow?: "constrain" | "reject" };

/**
 * https://tc39.es/proposal-temporal/docs/calendar.html
 */
class NepaliCalendar extends Temporal.Calendar {
  constructor() {
    super("iso8601");
  }

  toString() {
    return "nepali";
  }

  _nepaliToIso(fields: { day: number; year: number; month: number }) {
    let { year: nepaliYear } = fields;
    const { month: nepaliMonth, day: nepaliDay } = fields;

    let gregorianDayOfYear = 0;

    let monthCounter = nepaliMonth;
    const gregorianYear =
      nepaliYear -
      (nepaliMonth > 9 ||
      (monthCounter === 9 && nepaliDay >= NEPALI_CALENDAR_DATA[nepaliYear][0])
        ? 56
        : 57);

    // First we add the amount of days in the actual Nepali month as the day of year in the
    // Gregorian one because at least these days are gone since the 1st Jan.
    if (nepaliMonth !== 9) {
      gregorianDayOfYear = nepaliDay;
      monthCounter--;
    }

    // Now we loop through all Nepali months and add the amount of days to gregorianDayOfYear
    // we do this till we reach Paush (9th month). 1st January always falls in this month.
    while (monthCounter !== 9) {
      if (monthCounter <= 0) {
        monthCounter = 12;
        nepaliYear--;
      }
      gregorianDayOfYear += NEPALI_CALENDAR_DATA[nepaliYear][monthCounter];
      monthCounter--;
    }

    // If the date that has to be converted is in Paush (month no. 9) we have to do some other calculation
    if (nepaliMonth === 9) {
      // Add the days that are passed since the first day of Paush and substract the
      // amount of days that lie between 1st Jan and 1st Paush
      gregorianDayOfYear += nepaliDay - NEPALI_CALENDAR_DATA[nepaliYear][0];
      // For the first days of Paush we are now in negative values,
      // because in the end of the Gregorian year we substract
      // 365 / 366 days (P.S. remember math in school + - gives -)
      if (gregorianDayOfYear < 0) {
        gregorianDayOfYear += Temporal.PlainDate.from({
          year: gregorianYear,
          day: 1,
          month: 1,
        }).daysInYear;
      }
    } else {
      gregorianDayOfYear +=
        NEPALI_CALENDAR_DATA[nepaliYear][9] -
        NEPALI_CALENDAR_DATA[nepaliYear][0];
    }

    const result = Temporal.PlainDate.from({
      year: gregorianYear,
      month: 1,
      day: 1,
    }).add({ days: gregorianDayOfYear });

    return {
      year: result.year,
      month: result.month,
      monthCode: buildMonthCode(result.month),
      day: result.day,
    };
  }

  _isoToNepali = (
    isoDate:
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
      | string
  ) => {
    // make sure this is iso8601
    const gregorianDate =
      Temporal.PlainDate.from(isoDate).withCalendar("iso8601");

    const gregorianYear = gregorianDate.year;

    const gregorianDayOfYear = gregorianDate.dayOfYear;
    let nepaliYear = gregorianYear + 56; // this is not final, it could be also +57 but +56 is always true for 1st Jan.

    // FIXME: do something similar to what world-calendar does here
    // this.createMissingCalendarData(nepaliYear);

    let nepaliMonth = 9; // Jan 1 always fall in Nepali month Paush which is the 9th month of Nepali calendar.
    // Get the Nepali day in Paush (month 9) of 1st January
    const dayOfFirstJanInPaush = NEPALI_CALENDAR_DATA[nepaliYear][0];
    // Check how many days are left of Paush.
    // Days calculated from 1st Jan till the end of the actual Nepali month,
    // we use this value to check if the Gregorian date is in the actual Nepali month.
    let daysSinceJanFirstToEndOfNepaliMonth =
      NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] - dayOfFirstJanInPaush + 1;

    // If the Gregorian day-of-year is smaller than or equal to the sum of days between the 1st January and
    // the end of the actual Nepali month we have found the correct Nepali month.
    // Example:
    // The 4th February 2011 is the gregorianDayOfYear 35 (31 days of January + 4)
    // 1st January 2011 is in the Nepali year 2067, where 1st January is the 17th day of Paush (9th month).
    // In 2067 Paush has 30 days, which means (30-17+1=14) there are 14 days between 1st January and end of Paush
    // (including 17th January).
    // The gregorianDayOfYear (35) is bigger than 14, so we check the next month.
    // The next Nepali month (Mangh) has 29 days
    // 29+14=43, this is bigger than gregorianDayOfYear (35) so, we have found the correct Nepali month.
    while (gregorianDayOfYear > daysSinceJanFirstToEndOfNepaliMonth) {
      nepaliMonth++;
      if (nepaliMonth > 12) {
        nepaliMonth = 1;
        nepaliYear++;
        if (nepaliYear === 0) {
          nepaliYear++;
        }
      }
      daysSinceJanFirstToEndOfNepaliMonth +=
        NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth];
    }
    // The last step is to calculate the Nepali day-of-month.
    // To continue our example from before:
    // we calculated there are 43 days from 1st January (17 Paush) till end of Mangh (29 days).
    // When we subtract from this 43 days the day-of-year of the the Gregorian date (35),
    // we know how far the searched day is away from the end of the Nepali month.
    // So we simply subtract this number from the amount of days in this month (30).
    const nepaliDayOfMonth =
      NEPALI_CALENDAR_DATA[nepaliYear][nepaliMonth] -
      (daysSinceJanFirstToEndOfNepaliMonth - gregorianDayOfYear);
    if (nepaliYear <= 0) {
      nepaliYear--;
    }

    return {
      year: nepaliYear,
      month: nepaliMonth,
      day: nepaliDayOfMonth,
    };
  };

  year(
    date:
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainYearMonth
      | Temporal.PlainDateLike
      | string
  ) {
    return this._isoToNepali(date)?.year;
  }
  nepaliMonth() {
    throw "not implemented";
  }
  daysInMonth(
    date:
      | string
      | Temporal.PlainDate
      | Temporal.PlainDateTime
      | Temporal.PlainDateLike
      | Temporal.PlainYearMonth
  ): number {
    const { year, month } = this._isoToNepali(date);
    return NEPALI_CALENDAR_DATA[year][month];
  }
  month(date: Temporal.PlainDate | Temporal.PlainDateLike) {
    return this._isoToNepali(date)?.month;
  }
  monthCode(date: Temporal.PlainDate | Temporal.PlainDateLike) {
    const { month } = this._isoToNepali(date);
    return buildMonthCode(month);
  }
  day(date: Temporal.PlainDate | Temporal.PlainDateLike) {
    const { day } = this._isoToNepali(date);
    return day;
  }
  /**
   *  A custom implementation of these methods (dateFromFields, yearMonthFromFields, monthDayFromFields)
   *  would convert the calendar-space arguments to the ISO calendar, and return an object created using new Temporal.PlainDate(...isoArgs), with PlainYearMonth and PlainMonthDay substituted for PlainDate as appropriate.
   *
   * from nepali -> ISO
   */
  dateFromFields(fields: CalendarYMD, options?: AssignmentOptions) {
    const result = this._nepaliToIso(fields);
    return super.dateFromFields({ ...fields, ...result }, options);
  }
  yearMonthFromFields(fields: CalendarYMD, options?: AssignmentOptions) {
    const result = this._nepaliToIso(fields);
    return super.yearMonthFromFields({ ...fields, ...result }, options);
  }
  monthDayFromFields(fields: CalendarYMD, options?: AssignmentOptions) {
    const result = this._nepaliToIso(fields);
    return super.monthDayFromFields({ ...fields, ...result }, options);
  }
}

function buildMonthCode(month: number | string, leap = false) {
  return `M${month.toString().padStart(2, "0")}${leap ? "L" : ""}`;
}

export { NepaliCalendar };

type NepaliData = {
  [index: number]: number[];
};

const NEPALI_CALENDAR_DATA: NepaliData = {
  // These data are from http://www.ashesh.com.np
  1970: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1971: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  1972: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  1973: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  1974: [19, 31, 31, 32, 30, 31, 31, 30, 29, 30, 29, 30, 30],
  1975: [18, 31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30],
  1976: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  1977: [18, 31, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  1978: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1979: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  1980: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  1981: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  1982: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1983: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  1984: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  1985: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  1986: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1987: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  1988: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  1989: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  1990: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1991: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  // These data are from http://nepalicalendar.rat32.com/index.php
  1992: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  1993: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  1994: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1995: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  1996: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  1997: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1998: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  1999: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2000: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2001: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2002: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2003: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2004: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2005: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2006: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2007: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2008: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2009: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2010: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2011: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2012: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2013: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2014: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2015: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2016: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2017: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2018: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2019: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2020: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2021: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2022: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2023: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2024: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2025: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2026: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2027: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2028: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2029: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2030: [17, 31, 32, 31, 32, 31, 30, 30, 30, 30, 30, 30, 31],
  2031: [17, 31, 32, 31, 32, 31, 31, 31, 31, 31, 31, 31, 31],
  2032: [17, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
  2033: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2034: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2035: [17, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2036: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2037: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2038: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2039: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2040: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2041: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2042: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2043: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2044: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2045: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2046: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2047: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2048: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2049: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2050: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2051: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2052: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2053: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2054: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2055: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 29, 30],
  2056: [17, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
  2057: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2058: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2059: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2060: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2061: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2062: [17, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
  2063: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2064: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2065: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2066: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
  2067: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2068: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2069: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2070: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
  2071: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2072: [17, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2073: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
  2074: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2075: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2076: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2077: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  // These data are from http://www.ashesh.com.np/nepali-calendar/
  2081: [17, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2082: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2083: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2084: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2085: [17, 31, 32, 31, 32, 31, 31, 30, 30, 29, 30, 30, 30],
  2086: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2087: [16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  2088: [16, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  2089: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2090: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2091: [16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
  2092: [16, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2093: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2094: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2095: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
  2096: [17, 30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2097: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2098: [17, 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31],
  2099: [17, 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],
  2100: [17, 31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30],
};
