import { SupportedCalendar } from "../types";
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
  describe("financial year", () => {
    describe("with gregorian calendar", () => {
      const gregorianDate = {
        year: 2015,
        calendar: "gregory" as SupportedCalendar,
        locale: "en",
      };
      it("should build the label for Finanicial Year November properly", () => {
        const result = generateFixedPeriods({
          ...gregorianDate,
          periodType: "FYNOV",
        });

        expect(result[0]).toEqual({
          id: "2015Nov",
          name: "November 2015 - October 2016",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2006Nov",
          name: "November 2006 - October 2007",
        });
      });

      it("should build the label for Finanicial Year April properly", () => {
        const result = generateFixedPeriods({
          periodType: "FYAPR",
          ...gregorianDate,
        });

        expect(result[0]).toEqual({
          id: "2015Apr",
          name: "April 2015 - March 2016",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2006Apr",
          name: "April 2006 - March 2007",
        });
      });

      it("should build the label for Finanicial Year properly", () => {
        const result = generateFixedPeriods({
          periodType: "YEARLY",
          ...gregorianDate,
        });

        expect(result[0]).toEqual({
          id: "2015",
          iso: "2015",
          name: "2015",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2006",
          iso: "2006",
          name: "2006",
        });
      });
    });
    describe("with ethiopic calendar", () => {
      const date = {
        year: 2015,
        calendar: "ethiopic" as SupportedCalendar,
        locale: "en",
      };
      it("should build the label for Finanicial Year November properly", () => {
        const result = generateFixedPeriods({
          periodType: "FYNOV",
          ...date,
        });

        expect(result[0]).toEqual({
          id: "2015Nov",
          name: "Hamle 2015 - Sene 2016",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2006Nov",
          name: "Hamle 2006 - Sene 2007",
        });
      });

      it("should build the label for Finanicial Year April properly", () => {
        const result = generateFixedPeriods({
          periodType: "FYAPR",
          ...date,
        });

        expect(result[0]).toEqual({
          id: "2015Apr",
          name: "Tahsas 2015 - Hedar 2016",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2006Apr",
          name: "Tahsas 2006 - Hedar 2007",
        });
      });

      it("should build the label for Finanicial Year properly", () => {
        const result = generateFixedPeriods({
          periodType: "YEARLY",
          ...date,
        });

        expect(result[0]).toEqual({
          id: "2015",
          iso: "2015",
          name: "2015",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2006",
          iso: "2006",
          name: "2006",
        });
      });
    });

    describe("with custom (Nepali) calendar", () => {
      const date = {
        year: 2078,
        calendar: "nepali" as SupportedCalendar,
        locale: "en",
      };
      it("should build the label for Finanicial Year November properly", () => {
        const result = generateFixedPeriods({
          periodType: "FYNOV",
          ...date,
        });

        expect(result[0]).toEqual({
          id: "2078Nov",
          name: "Falgun 2078 - Mangh 2079",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2069Nov",
          name: "Falgun 2069 - Mangh 2070",
        });
      });

      it("should build the label for Finanicial Year April properly", () => {
        const result = generateFixedPeriods({
          periodType: "FYAPR",
          ...date,
        });

        expect(result[0]).toEqual({
          id: "2078Apr",
          name: "Shrawan 2078 - Ashadh 2079",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2069Apr",
          name: "Shrawan 2069 - Ashadh 2070",
        });
      });

      it("should build the label for Finanicial Year properly", () => {
        const result = generateFixedPeriods({
          periodType: "YEARLY",
          ...date,
        });

        expect(result[0]).toEqual({
          id: "2078",
          iso: "2078",
          name: "2078",
        });

        expect(result[result.length - 1]).toEqual({
          id: "2069",
          iso: "2069",
          name: "2069",
        });
      });
    });
  });
});
