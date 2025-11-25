import { periodTypes } from './period-types'

export type PeriodType = typeof periodTypes[number]

export type FixedPeriod = {
    periodType: PeriodType
    id: string
    iso?: string
    name: string
    displayName: string
    startDate: string
    endDate: string
}

export type RelativePeriod = FixedPeriod