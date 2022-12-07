import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import generateFixedPeriods, {
  FixedPeriod,
  PeriodIdentifier,
} from "../../src/period-calculation/fixed-periods";
import { SupportedCalendar } from "../../src/types";

interface MyWorld {
  calendar: SupportedCalendar;
  periods: Array<FixedPeriod>;
  results: DataTableResult;
  labels: string[][];
  values: string[][];
}
type DataTable = {
  year: string;
  periodType: PeriodIdentifier;
  periodCount: string;
  periodIndex: number;
  periodLabel: string;
  periodValue: string;
};

type DataTableResult = Array<
  DataTable & { generatedPeriods: Array<FixedPeriod> }
>;

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

When(
  "the periods in a year are requested",
  function (this: MyWorld, dataTable) {
    this.results = [];
    (dataTable.hashes() as Array<DataTable>).forEach((row) => {
      const yearNo = Number.parseInt(row.year);
      this.results.push({
        ...row,
        generatedPeriods: generateFixedPeriods({
          year: yearNo,
          periodType: row.periodType,
          calendar: this.calendar,
          locale: "en-GB",
        }),
      });
    });

    this.labels = [];
    this.values = [];
    this.results.forEach((r) => {
      this.labels.push(r.generatedPeriods.map((p) => p.label));
    });

    this.results.forEach((r) => {
      this.values.push(r.generatedPeriods.map((p) => p.value));
    });
  }
);

Then(
  "the dates for the period type should be generated",
  function (this: MyWorld) {
    this.results.forEach((result, index) => {
      assert.equal(
        this.labels[index]?.[result.periodIndex - 1],
        result.periodLabel,
        `${result.periodLabel} (${result.periodType}) | label is wrong`
      );
      assert.equal(
        this.values[index]?.[result.periodIndex - 1],
        result.periodValue,
        `${result.periodLabel} (${result.periodType}) | value is wrong`
      );
    });
  }
);
