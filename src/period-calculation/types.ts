import { SupportedCalendar } from '../types'

const periodIdentifiers = [
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
] as const

export type PeriodIdentifier = typeof periodIdentifiers[number]
export type FixedPeriod = {
    id: string
    iso?: string
    name: string
    startDate: string
    endDate: string
}
type GeneratedPeriodParams = {
    year: number
    periodType: PeriodIdentifier
    calendar: SupportedCalendar
    locale?: string
    startingDay?: number /** 1 is Monday */
    yearsCount?: number
}
export type GeneratedPeriodsFunc = (
    options: GeneratedPeriodParams
) => Array<FixedPeriod>
