import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import generateFixedPeriods, {
  FixedPeriod,
  PeriodIdentifier,
} from "../../src/period-calculation/fixed-periods";
import { SupportedCalendar } from "../../src/types";

type DataTable = {
  year: string;
  periodType: PeriodIdentifier;
  periodCount: number;
};

type MyWorld = {
  calendar: SupportedCalendar;
  year: number;
  results: Array<DataTable & { generatedPeriods: FixedPeriod[] }>;
  periodType: PeriodIdentifier;
};

Given(
  "the calendar type is {string}",
  function (this: MyWorld, calendar: SupportedCalendar) {
    this.calendar = calendar;
  }
);

When("a year is provided along a period", function (this: MyWorld, dataTable) {
  this.results = (dataTable.hashes() as Array<DataTable>).map((row) => {
    const yearNo = Number.parseInt(row.year);
    return {
      ...row,
      generatedPeriods: generateFixedPeriods({
        year: yearNo,
        periodType: row.periodType,
        calendar: this.calendar,
        locale: "en-GB",
      }),
    };
  });
});

Then(
  "the correct number of periods should be generated",
  function (this: MyWorld) {
    this.results.forEach((result) => {
      assert.equal(
        result.generatedPeriods.length,
        result.periodCount,
        `${result.periodType} has wrong number of periods`
      );
    });
  }
);
