import {
    februaryFixedPeriodTypes,
    marchFixedPeriodTypes,
    aprilFixedPeriodTypes,
    mayFixedPeriodTypes,
    juneFixedPeriodTypes,
    julyFixedPeriodTypes,
    augustFixedPeriodTypes,
    septemberFixedPeriodTypes,
    octoberFixedPeriodTypes,
    novemberFixedPeriodTypes,
    decemberFixedPeriodTypes,
} from './period-type-groups'
import { PeriodType } from './types'

export const getStartingMonthByPeriodType = (periodType: PeriodType) => {
    if (februaryFixedPeriodTypes.includes(periodType)) {
        return 'FEB'
    }

    if (marchFixedPeriodTypes.includes(periodType)) {
        return 'MAR'
    }

    if (aprilFixedPeriodTypes.includes(periodType)) {
        return 'APR'
    }

    if (mayFixedPeriodTypes.includes(periodType)) {
        return 'MAY'
    }

    if (juneFixedPeriodTypes.includes(periodType)) {
        return 'JUN'
    }

    if (julyFixedPeriodTypes.includes(periodType)) {
        return 'JUL'
    }

    if (augustFixedPeriodTypes.includes(periodType)) {
        return 'AUG'
    }

    if (septemberFixedPeriodTypes.includes(periodType)) {
        return 'SEP'
    }

    if (octoberFixedPeriodTypes.includes(periodType)) {
        return 'OCT'
    }

    if (novemberFixedPeriodTypes.includes(periodType)) {
        return 'NOV'
    }

    if (decemberFixedPeriodTypes.includes(periodType)) {
        return 'DEC'
    }

    return 'JAN'
}
