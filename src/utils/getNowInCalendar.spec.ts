import getNowInCalendar from "./getNowInCalendar";

describe("getting Now", () => {
  beforeEach(() => {
    // 13 October 2021 UTC
    jest.spyOn(Date, "now").mockReturnValue(1634089600000);
  });
  it("should get today date in Gregorian", () => {
    const { day, month, year } = getNowInCalendar("gregory");
    expect({ day, month, year }).toEqual({ day: 13, month: 10, year: 2021 });
  });
  it("should get today date in Ethiopic", () => {
    const { day, month, eraYear: year } = getNowInCalendar("ethiopic");
    expect({ day, month, year }).toEqual({
      day: 3,
      month: 2,
      year: 2014,
    });
  });
  it("should get today date in Ethiopic if the identifier passed is the DHIS2 identifier", () => {
    const { day, month, eraYear: year } = getNowInCalendar("ethiopian");
    expect({ day, month, year }).toEqual({
      day: 3,
      month: 2,
      year: 2014,
    });
  });
  it("should get today date in Nepali", () => {
    const { day, month, year } = getNowInCalendar("nepali");
    expect({ day, month, year }).toEqual({
      day: 27,
      month: 6,
      year: 2078,
    });
  });
  it("should get today date in Persian", () => {
    const { day, month, year } = getNowInCalendar("persian");
    expect({ day, month, year }).toEqual({
      day: 21,
      month: 7,
      year: 1400,
    });
  });
});
