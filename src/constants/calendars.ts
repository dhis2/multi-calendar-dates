// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/calendar
export const calendars = [
  // Built in
  "iso8601",
  "hebrew",
  "islamic",
  "islamic-umalqura",
  "islamic-tbla",
  "islamic-civil",
  "islamic-rgsa",
  // "islamicc", this is deprecated - should use islamic-civil instead
  "persian",
  "ethiopic",
  "ethioaa",
  "coptic",
  "chinese",
  "dangi",
  "roc",
  "indian",
  "buddhist",
  "japanese",
  "gregory",
  "nepali",
] as const;
