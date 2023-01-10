import * as lib from "./main";
describe("the interface of the library", () => {
  it("should have at least these members otherwise it is definitely a breaking change", () => {
    expect(Object.keys(lib)).toEqual(
      expect.objectContaining([
        "constants",
        "getNowInCalendar",
        "useDatePicker",
        "useResolvedDirection",
        "generateFixedPeriods",
      ])
    );

    expect(Object.keys(lib.constants)).toEqual([
      "calendars",
      "numberingSystems",
    ]);
  });
});
