import { SupportedCalendar } from '../types'

const periodIdentifiers = [
    'Daily',
    'Weekly',
    'WeeklyWednesday',
    'WeeklyThursday',
    'WeeklySaturday',
    'WeeklySunday',
    'BiWeekly',
    'Monthly',
    'BiMonthly',
    'Quarterly',
    'QuarterlyNov', // used in Ethiopia
    'SixMonthly',
    'SixMonthlyApril',
    'SixMonthlyNov', // used in Ethiopia
    'Yearly',
    'FinancialApril',
    'FinancialJuly',
    'FinancialOct',
    'FinancialNov',
] as const

export type PeriodIdentifier = typeof periodIdentifiers[number]
export type FixedPeriod = {
    periodType: PeriodIdentifier
    id: string
    iso?: string
    name: string
    displayName: string
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
    excludeDay?: string
}
export type GeneratedPeriodsFunc = (
    options: GeneratedPeriodParams
) => Array<FixedPeriod>
