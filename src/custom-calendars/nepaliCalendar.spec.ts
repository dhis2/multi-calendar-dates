import { Temporal } from "@js-temporal/polyfill";
import { NepaliCalendar } from "./nepaliCalendar";

it("should covnert from nepali calendar to gregorian", () => {
  const cal = new NepaliCalendar();

  const nepaliDate = {
    year: 2079,
    month: 7,
    day: 1,
  };
  const result = cal.dateFromFields(nepaliDate);

  expect(result.toString()).toEqual("2022-10-18[u-ca=nepali]");
});

// it("should covnert from gregorian calendar to nepali", () => {
//   const gregorianDate = {
//     year: 2022,
//     month: 10,
//     day: 19,
//   };
//   const calendar = new NepaliCalendar();
//   //   calendar
//   const result = NepaliCalendar.from(Temporal.PlainDate.from(gregorianDate));

//   // .toPlainDateTime({
//   //     calendar,
//   // });

//   //   cal.dateFromFields(nepaliDate);

//   expect(result.toString()).toEqual("2022-10-19[u-ca=nepali]");
// });

it("should support hebrew calendar", () => {
  const cal = Temporal.PlainDate.from({
    year: 5783,
    monthCode: "M01",
    day: 23,
    calendar: "hebrew",
  });

  expect(cal.getISOFields()).toEqual(
    expect.objectContaining({
      isoDay: 18,
      isoMonth: 10,
      isoYear: 2022,
    })
  );
});
