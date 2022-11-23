import { CustomCalendarTypes } from ".";

const calendarLocalisations: {
  [key in CustomCalendarTypes]: Record<
    string,
    {
      monthNames: string[];
      monthNamesShort?: string[];
      dayNamesShort: string[]; // start the array of days from Monday
      dayNames?: string[];
      dayNamesMin?: string[];
      numbers?: string[];
    }
  >;
} = {
  nepali: {
    // these locales should follow lang-Country (lang from https://icu4c-demos.unicode.org/icu-bin/locexp and countryCode from https://www.iso.org/obp/ui/#search)
    "ne-NP": {
      monthNames: [
        "बैशाख",
        "जेठ",
        "असार",
        "साउन",
        "भदौ",
        "असोज",
        "कार्तिक",
        "मंसिर",
        "पौष",
        "माघ",
        "फागुन",
        "चैत",
      ],
      // starting from Monday
      dayNamesShort: ["सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि", "आइत"],
      numbers: [
        "०",
        "१",
        "२",
        "३",
        "४",
        "५",
        "६",
        "७",
        "८",
        "९",
        "१०",
        "११",
        "१२",
        "१३",
        "१४",
        "१५",
        "१६",
        "१७",
        "१८",
        "१९",
        "२०",
        "२१",
        "२२",
        "२३",
        "२४",
        "२५",
        "२६",
        "२७",
        "२८",
        "२९",
        "३०",
        "३१",
      ],
    },
    "en-NP": {
      monthNames: [
        "Baisakh",
        "Jestha",
        "Ashadh",
        "Shrawan",
        "Bhadra",
        "Ashwin",
        "Kartik",
        "Mangsir",
        "Paush",
        "Mangh",
        "Falgun",
        "Chaitra",
      ],
      dayNamesShort: [
        "Som",
        "Mangl",
        "Budha",
        "Bihi",
        "Shukra",
        "Shani",
        "Aaita",
      ],

      monthNamesShort: [
        "Bai",
        "Je",
        "As",
        "Shra",
        "Bha",
        "Ash",
        "Kar",
        "Mang",
        "Pau",
        "Ma",
        "Fal",
        "Chai",
      ],

      dayNames: [
        "Aaitabaar",
        "Sombaar",
        "Manglbaar",
        "Budhabaar",
        "Bihibaar",
        "Shukrabaar",
        "Shanibaar",
      ],
      dayNamesMin: ["Aai", "So", "Man", "Bu", "Bi", "Shu", "Sha"],
    },
  },
};

export default calendarLocalisations;
