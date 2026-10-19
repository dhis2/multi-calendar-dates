# Nepali calendar data

Reference material for `NEPALI_CALENDAR_DATA` (`src/custom-calendars/nepaliCalendarData.ts`). Nothing in this folder is published to npm: the package only ships `build/`.

The source is `Nepali_Months_Updated_20250605.xlsx`: month lengths for BS 1970–2100, dated 2025-06-05.

## How the table is built

-   **Month lengths** (columns 1–12) are copied from the spreadsheet.
-   **Column 0**, the day of Paush on which 1 January falls, is derived from the month lengths, counting from Baisakh 1 2083 = 2026-04-14 (confirmed by the national panchang). It must agree with the month lengths, or dates in Paush convert to the wrong ISO date. The `getDaysInMonth` spec in `src/utils/calendar-date.spec.ts` checks this for every year.

## How reliable it is

Bikram Sambat month lengths are not produced by a formula. The Nepal Panchanga Nirnayak Samiti decides and publishes them one year at a time.

-   **1975–2083:** agrees with [sambat](https://github.com/rjach/sambat)'s table on every Baisakh 1 date. Only 2081–2083 have been checked against a printed panchang (2082–2083 against the national one). The split between months differs from sambat in 1977, 1989, 1993 and 2062, where open-source tables disagree. The spreadsheet's values were kept for those years.
-   **After 2083:** projections, which change once the committee publishes each year. 2096 adds up to 364 days, which is not possible, and Baisakh 1 drifts to 15–17 April in the 2090s.

When a new year is published, update the spreadsheet, copy the month lengths into the table, and recompute column 0.
