import { Temporal } from '@js-temporal/polyfill'
import { padWithZeroes } from '../../utils/helpers'
import {
    QUARTERLY_PERIOD_TYPES,
    SIXMONTHLY_PERIOD_TYPES,
} from '../period-types'
import { PeriodIdentifier } from '../types'
import getMonthInfo from './get-month-info'

const buildId: (options: {
    periodType: PeriodIdentifier
    currentMonth: Temporal.PlainDate
    year: number
    index: number
}) => string = ({ periodType, currentMonth, year, index }) => {
    if (periodType === 'BIMONTHLY') {
        return `${year}${padWithZeroes(index)}B`
    }
    if (periodType === 'QUARTERLY') {
        return `${year}Q${index}`
    }
    if (periodType === 'SIXMONTHLY') {
        return `${year}S${index}`
    }

    if (QUARTERLY_PERIOD_TYPES.includes(periodType)) {
        const month = getMonthInfo(periodType)?.name
        return `${year}${month}Q${index}`
    }

    if (SIXMONTHLY_PERIOD_TYPES.includes(periodType)) {
        const month = getMonthInfo(periodType)?.name
        return `${year}${month}S${index}`
    }

    return `${year}${padWithZeroes(currentMonth.month)}`
}

export default buildId
