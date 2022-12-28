import generateFixedPeriods from "./fixed-periods";

describe("fixed period calculation", () => {
  describe("weekly periods", () => {
    it("should respect starting day", () => {
      const resultStartingMonday = generateFixedPeriods({
        periodType: "WEEKLY",
        year: 2015,
        calendar: "ethiopic",
        locale: "en",
        startingDay: 1,
      });
      const resultStartingTuesday = generateFixedPeriods({
        periodType: "WEEKLY",
        year: 2015,
        calendar: "ethiopic",
        locale: "en",
        startingDay: 2,
      });

      expect(resultStartingMonday[0]).not.toEqual(resultStartingTuesday[0]);
    });
  });
});
