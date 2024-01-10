/**
 * Will match any daily period id,
 * e.g. 2023W1
 */
export const regexDailyPeriodId = new RegExp('^[0-9]{8}$')

/**
 * Will match any standard weekly period id,
 * e.g. 2023W1
 */
export const regexWeeklyStandardPeriodId = new RegExp('^([0-9]{4})W([0-9]+)$')

/**
 * Will match any bi-weekly period id,
 * e.g. 2023BiW1
 */
export const regexBiWeeklyPeriodId = new RegExp('^([0-9]{4})BiW([0-9]+)$')

/**
 * Will match any weekly period that does not start on Monday,
 * e.g. 2023TueW1
 */
export const regexWeeklyOffsetPeriodId = new RegExp(
    '^([0-9]{4})([A-Z][a-z]{2})W([0-9]+)$'
)

/**
 * Will match any standard monthly period id,
 * e.g. 202301
 */
export const regexMonthlyStandardPeriodId = new RegExp('^([0-9]{4})([0-9]{2})$')

/**
 * Will match any bi-monthly period id,
 * e.g. 202301B
 */
export const regexBiMonthlyPeriodId = new RegExp('^([0-9]{4})([0-9]{2})B$')

/**
 * Will match any standard quarterly period id,
 * e.g. 2023Q1
 */
export const regexQuarterlyStandardPeriodId = new RegExp('^([0-9]{4})Q([0-9])$')

/**
 * Will match any offset quarterly period id,
 * e.g. 2023NovemberQ1
 */
export const regexQuarterlyOffsetPeriodId = new RegExp(
    '^([0-9]{4})([A-Z][a-z]+)Q([0-9])$'
)

/**
 * Will match any standard sixmonthly period id,
 * e.g. 2023S1
 */
export const regexSixmonthlyStandardPeriodId = new RegExp(
    '^([0-9]{4})S([0-9])$'
)

/**
 * Will match any offset sixmonthly period id,
 * e.g. 2023NovemberS1
 */
export const regexSixmonthlyOffsetPeriodId = new RegExp(
    '^([0-9]{4})([A-Z][a-z]+)S([0-9])$'
)

/**
 * Will match any standard yearly period id,
 * e.g. 2023
 */
export const regexYearlyStandardPeriodId = new RegExp('^([0-9]{4})$')

/**
 * Will match any financial yearly period id,
 * e.g. 2023Nov
 */
export const regexYearlyFinancialPeriodId = new RegExp(
    '^([0-9]{4})([A-Z][a-z]{2,})$'
)
