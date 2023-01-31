import { FIXED_PERIOD_TYPES } from '../period-types'
import { PeriodIdentifier } from '../types'
import novemberQuarters from './quarters'

type ComputeMonthFromMonthlyIndex = (args: {
    periodType: PeriodIdentifier
    index: number
}) => number

const computeMonthFromMonthlyIndex: ComputeMonthFromMonthlyIndex = ({
    periodType,
    index,
}) => {
    if (periodType === FIXED_PERIOD_TYPES.MONTHLY) {
        return index
    }

    if (periodType === FIXED_PERIOD_TYPES.BIMONTHLY) {
        return index * 2 - 1
    }

    if (periodType === FIXED_PERIOD_TYPES.QUARTERLY) {
        return index * 3 - 2
    }

    if (periodType === FIXED_PERIOD_TYPES.QUARTERLYNOV) {
        return computeMonthFromQuarterlyNovemberIndex(index)
    }

    if (periodType === FIXED_PERIOD_TYPES.SIXMONTHLY) {
        return index === 1 ? 1 : 7
    }

    if (periodType === FIXED_PERIOD_TYPES.SIXMONTHLYAPR) {
        return index === 1 ? 4 : 10
    }

    if (periodType === FIXED_PERIOD_TYPES.SIXMONTHLYNOV) {
        return index === 1 ? 11 : 5
    }

    throw new Error(
        `Could not compute a month for index "${index}" and periodType "${periodType}"`
    )
}

export default computeMonthFromMonthlyIndex

const computeMonthFromQuarterlyNovemberIndex = (index: number) => {
    if (index === 1) {
        return novemberQuarters[0][0]
    }

    if (index === 2) {
        return novemberQuarters[1][0]
    }

    if (index === 3) {
        return novemberQuarters[2][0]
    }

    if (index === 4) {
        return novemberQuarters[3][0]
    }

    throw new Error(
        `Received a November-quarter index that we cannot find an index for, received: "${index}"`
    )
}
