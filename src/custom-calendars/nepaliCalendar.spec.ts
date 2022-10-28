import { Temporal } from "@js-temporal/polyfill";
import { NepaliCalendar } from "./nepaliCalendar";

it("should covnert from nepali calendar to gregorian", () => {
  const calendar = new NepaliCalendar();

  const nepaliDate = {
    year: 2079,
    month: 7,
    day: 1,
  };

  const result = Temporal.Calendar.from(calendar).dateFromFields(nepaliDate);
  expect(result.toString()).toEqual("2022-10-18[u-ca=nepali]");
  expect(result.calendar.id).toEqual("nepali");
});

it("should covnert from gregorian calendar to nepali", () => {
  const nepaliCalendar = new NepaliCalendar();
  const nepaliDate =
    Temporal.PlainDate.from("2022-10-18").withCalendar(nepaliCalendar);

  expect(nepaliDate.year).toEqual(2079);
  expect(nepaliDate.day).toEqual(1);
  expect(nepaliDate.month).toEqual(7);
});

it("should support hebrew calendar", () => {
  const calendar = Temporal.PlainDate.from("2022-10-19").withCalendar("hebrew");

  expect(calendar.toString()).toEqual("2022-10-19[u-ca=hebrew]");
  expect(calendar.toLocaleString("en-US", { calendar: "hebrew" })).toEqual(
    "24 Tishri 5783"
  );
});
