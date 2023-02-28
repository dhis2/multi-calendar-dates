import { getStartingMonthByPeriodType } from '../get-starting-month-for-period-type'
import monthNumbers from '../month-numbers'
import {
    quarterlyFixedPeriodTypes,
    sixmonthlyFixedPeriodTypes,
} from '../period-type-groups'
import { PeriodType } from '../types'

type ComputeMonthlyPeriodIndex = (args: {
    periodType: PeriodType
    month: number
    monthsInYear: number
}) => number

const computeMonthlyPeriodIndex: ComputeMonthlyPeriodIndex = ({
    periodType,
    month,
    monthsInYear,
}) => {
    if (periodType === 'MONTHLY') {
        return month
    }

    if (periodType === 'BIMONTHLY') {
        if (month % 2 === 0) {
            throw new Error(
                `Even numbers can't be a month for BIMONTHLY period type, received "${month}"`
            )
        }

        return Math.ceil(month / 2)
    }

    if (quarterlyFixedPeriodTypes.includes(periodType)) {
        return computeQuarterlyIndex(periodType, month, monthsInYear)
    }

    if (sixmonthlyFixedPeriodTypes.includes(periodType)) {
        return computeSixmonthlyIndex(periodType, month, monthsInYear)
    }

    throw new Error(`Unrecognized period type "${periodType}"`)
}

export default computeMonthlyPeriodIndex

const createPeriodTypeIndexes = (
    periodMonthIndex: number,
    monthsInYear: number
) => {
    const indexesFromStartingMonthToEndOfYear = Array(
        monthsInYear - periodMonthIndex + 1
    )
        .fill(null)
        .map((_, i) => i + periodMonthIndex)

    return [
        ...indexesFromStartingMonthToEndOfYear,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
    ].slice(0, 12)
}

const getMonthSlices = (monthIndexes: number[], monthsPerSlice: number) => {
    const slices = []

    for (let index = 0; index < 12; index += monthsPerSlice) {
        slices.push(monthIndexes.slice(index, index + monthsPerSlice))
    }

    return slices
}

const computeSixmonthlyIndex = (
    periodType: PeriodType,
    month: number,
    monthsInYear: number
) => {
    const monthName = getStartingMonthByPeriodType(periodType)
    const periodMonthIndex = monthNumbers[monthName].value
    const monthIndexes = createPeriodTypeIndexes(periodMonthIndex, monthsInYear)
    const halves = getMonthSlices(monthIndexes, 6)
    return halves[1].includes(month) ? 2 : 1
}

const computeQuarterlyIndex = (
    periodType: PeriodType,
    month: number,
    monthsInYear: number
) => {
    const monthName = getStartingMonthByPeriodType(periodType)
    const periodMonthIndex = monthNumbers[monthName].value
    const monthIndexes = createPeriodTypeIndexes(periodMonthIndex, monthsInYear)
    const quarters = getMonthSlices(monthIndexes, 3)

    if (quarters[1].includes(month)) {
        return 2
    }

    if (quarters[2].includes(month)) {
        return 3
    }

    if (quarters[3].includes(month)) {
        return 4
    }

    return 1
}
