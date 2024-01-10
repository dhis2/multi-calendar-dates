import { periodTypes } from './period-types'
import { PeriodType } from './types'

export const weeklyFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/WEEKLY/)
)

export const monthlyFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/MONTHLY|QUARTERLY|SIXMONTHLY/)
)

export const quarterlyFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/QUARTERLY/)
)

export const sixmonthlyFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/SIXMONTHLY/)
)

export const monthlyStandardFixedPeriodTypes: Array<PeriodType> = [
    'MONTHLY',
    'BIMONTHLY',
    'QUARTERLY',
    'QUARTERLYJAN',
    'SIXMONTHLY',
    'SIXMONTHLYJAN',
]

export const monthlyOffsetFixedPeriodTypes: Array<PeriodType> =
    periodTypes.filter((periodType) =>
        periodType.match(/(QUARTERLY|SIXMONTHLY)[A-Z]/)
    )

export const multiMonthFixedPeriodTypes: Array<PeriodType> =
    monthlyFixedPeriodTypes.filter((periodType) => periodType !== 'MONTHLY')

export const yearlyFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/^(YEARLY|FY[A-Z]{3})/)
)

export const financialYearFixedPeriodTypes: Array<PeriodType> =
    periodTypes.filter((periodType) => periodType.match(/^FY[A-Z]{3}$/))

export const januaryFixedPeriodTypes: Array<PeriodType> = [
    ...monthlyStandardFixedPeriodTypes,
    ...periodTypes.filter((periodType) => periodType.match(/JAN$/)),
]

export const februaryFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/FEB$/)
)

export const marchFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/MAR$/)
)

export const aprilFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/APR$/)
)

export const mayFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/MAY$/)
)

export const juneFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/JUN$/)
)

export const julyFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/JUL$/)
)

export const augustFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/AUG$/)
)

export const septemberFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/SEP$/)
)

export const octoberFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/OCT$/)
)

export const novemberFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/NOV$/)
)

export const decemberFixedPeriodTypes: Array<PeriodType> = periodTypes.filter(
    (periodType) => periodType.match(/DEC/)
)
