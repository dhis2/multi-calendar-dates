import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import generateFixedPeriods from "../../src/period-calculation/fixed-periods";
import { SupportedCalendar } from "../../src/types";
import { DataTable, MyWorld } from "./features.types";

Given(
  "the calendar type is {word}",
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
      assert.equal(result.generatedPeriods.length, result.periodCount);
      assert.equal(result.generatedPeriods.length, result.periodCount);
    });
  }
);
