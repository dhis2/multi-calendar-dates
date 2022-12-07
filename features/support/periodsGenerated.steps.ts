import assert from "assert";
import { When, Then } from "@cucumber/cucumber";
import generateFixedPeriods, {
  PeriodIdentifier,
} from "../../src/period-calculation/fixed-periods";
import { MyWorld } from "./features.types";

type DataTable = {
  periodIndex: number;
  periodLabel: string;
  periodValue: string;
}[];

When(
  "the user requests {string} periods for {string}",
  function (this: MyWorld, periodType: string, year: string) {
    this.periodType = periodType?.toUpperCase() as PeriodIdentifier;
    this.year = Number(year);
  }
);

Then(
  "the dates for the period type should be generated",
  function (this: MyWorld, dataTable) {
    const result = generateFixedPeriods({
      year: this.year,
      periodType: this.periodType,
      calendar: this.calendar,
      locale: "en",
    });

    (dataTable.hashes() as DataTable).forEach((row) => {
      assert.equal(result[row.periodIndex - 1].label, row.periodLabel);
      assert.equal(result[row.periodIndex - 1].value, row.periodValue);
    });
  }
);
