import {
    QUARTERLY_PERIOD_TYPES,
    SIXMONTHLY_PERIOD_TYPES,
} from '../period-types'
import { PeriodIdentifier } from '../types'

const getMonthsToAdd = (periodType: PeriodIdentifier) => {
    if (SIXMONTHLY_PERIOD_TYPES.includes(periodType)) {
        return 6
    }
    if (QUARTERLY_PERIOD_TYPES.includes(periodType)) {
        return 3
    }
    if (periodType === 'MONTHLY') {
        return 1
    }
    if (periodType === 'BIMONTHLY') {
        return 2
    }

    throw new Error(`unrecognised monthly period type ${periodType}`)
}

export default getMonthsToAdd
