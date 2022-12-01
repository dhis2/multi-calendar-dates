import { Temporal } from "@js-temporal/polyfill";
import { renderHook } from "@testing-library/react-hooks";
import { useCalendarWeekDays } from "./useCalendarWeekDays";

const renderUseDatePickerHook = (date: Temporal.ZonedDateTime) => {
  const { result } = renderHook(() => useCalendarWeekDays(date));
  return result.current as Temporal.ZonedDateTime[][];
};

describe("useDatePicker hook", () => {
  it("should return the days to display in a calendar", () => {
    const date = Temporal.ZonedDateTime.from("2022-12-01[UTC]");
    const result = renderUseDatePickerHook(date);
    expect(result.length).toEqual(5);
    expect(result.map((d) => d.map((w) => w.toString()))).toEqual([
      [
        "2022-11-28T00:00:00+00:00[UTC]",
        "2022-11-29T00:00:00+00:00[UTC]",
        "2022-11-30T00:00:00+00:00[UTC]",
        "2022-12-01T00:00:00+00:00[UTC]",
        "2022-12-02T00:00:00+00:00[UTC]",
        "2022-12-03T00:00:00+00:00[UTC]",
        "2022-12-04T00:00:00+00:00[UTC]",
      ],
      [
        "2022-12-05T00:00:00+00:00[UTC]",
        "2022-12-06T00:00:00+00:00[UTC]",
        "2022-12-07T00:00:00+00:00[UTC]",
        "2022-12-08T00:00:00+00:00[UTC]",
        "2022-12-09T00:00:00+00:00[UTC]",
        "2022-12-10T00:00:00+00:00[UTC]",
        "2022-12-11T00:00:00+00:00[UTC]",
      ],
      [
        "2022-12-12T00:00:00+00:00[UTC]",
        "2022-12-13T00:00:00+00:00[UTC]",
        "2022-12-14T00:00:00+00:00[UTC]",
        "2022-12-15T00:00:00+00:00[UTC]",
        "2022-12-16T00:00:00+00:00[UTC]",
        "2022-12-17T00:00:00+00:00[UTC]",
        "2022-12-18T00:00:00+00:00[UTC]",
      ],
      [
        "2022-12-19T00:00:00+00:00[UTC]",
        "2022-12-20T00:00:00+00:00[UTC]",
        "2022-12-21T00:00:00+00:00[UTC]",
        "2022-12-22T00:00:00+00:00[UTC]",
        "2022-12-23T00:00:00+00:00[UTC]",
        "2022-12-24T00:00:00+00:00[UTC]",
        "2022-12-25T00:00:00+00:00[UTC]",
      ],
      [
        "2022-12-26T00:00:00+00:00[UTC]",
        "2022-12-27T00:00:00+00:00[UTC]",
        "2022-12-28T00:00:00+00:00[UTC]",
        "2022-12-29T00:00:00+00:00[UTC]",
        "2022-12-30T00:00:00+00:00[UTC]",
        "2022-12-31T00:00:00+00:00[UTC]",
        "2023-01-01T00:00:00+00:00[UTC]",
      ],
    ]);
  });
});
