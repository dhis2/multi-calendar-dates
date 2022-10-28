const calendarLocalisations: Record<
  string,
  {
    monthNames: string[];
    monthNamesShort?: string[];
    dayNamesShort: string[];
    dayNames?: string[];
    dayNamesMin?: string[];
    numbers?: string[];
  }
> = {
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
    dayNamesShort: ["आइत", "सोम", "मंगल", "बुध", "बिही", "शुक्र", "शनि"],
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
  "ne-EN": {
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
      "Aaita",
      "Som",
      "Mangl",
      "Budha",
      "Bihi",
      "Shukra",
      "Shani",
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
};

export default calendarLocalisations;
