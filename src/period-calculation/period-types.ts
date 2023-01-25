import { PeriodIdentifier } from './types'

const allPeriods: PeriodIdentifier[] = [
    'DAILY',
    'WEEKLY',
    'WEEKLYWED',
    'WEEKLYTHU',
    'WEEKLYSAT',
    'WEEKLYSUN',
    'BIWEEKLY',
    'MONTHLY',
    'BIMONTHLY',
    'QUARTERLY',
    'QUARTERLYNOV', // used in Ethiopia
    'SIXMONTHLY',
    'SIXMONTHLYAPR',
    'SIXMONTHLYNOV', // used in Ethiopia
    'YEARLY',
    'FYNOV',
    'FYOCT',
    'FYJUL',
    'FYAPR',
]

export const WEEKLY_PERIOD_TYPES: PeriodIdentifier[] = allPeriods.filter(
    (period) => period.match(/^WEEKLY/)
)

export const MONTLY_PERIOD_TYPES: PeriodIdentifier[] = [
    'MONTHLY',
    'BIMONTHLY',
    'QUARTERLY',
    'QUARTERLYNOV',
    'SIXMONTHLY',
    'SIXMONTHLYAPR',
    'SIXMONTHLYNOV',
]

export const QUARTERLY_PERIOD_TYPES: PeriodIdentifier[] = allPeriods.filter(
    (period) => period.match(/^QUARTERLY/)
)

export const SIXMONTHLY_PERIOD_TYPES: PeriodIdentifier[] = allPeriods.filter(
    (period) => period.match(/^SIXMONTHLY/)
)

export const MONTHLY_OFFSET_PERIOD_TYPES: PeriodIdentifier[] = [
    // All but first periodType, which starts in January
    ...QUARTERLY_PERIOD_TYPES.slice(1),
    ...SIXMONTHLY_PERIOD_TYPES.slice(1),
]

export const MULTI_MONTH_PERIOD_TYPES: PeriodIdentifier[] = [
    'BIMONTHLY',
    ...QUARTERLY_PERIOD_TYPES,
    ...SIXMONTHLY_PERIOD_TYPES,
]

export const FINANCIAL_YEAR_PERIOD_TYPES: PeriodIdentifier[] =
    allPeriods.filter((period) => period.match(/^FY/))

export const YEARLY_PERIOD_TYPES: PeriodIdentifier[] = [
    'YEARLY',
    ...FINANCIAL_YEAR_PERIOD_TYPES,
]
