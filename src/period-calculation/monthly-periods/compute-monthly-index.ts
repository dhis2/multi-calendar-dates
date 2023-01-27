import { PeriodIdentifier } from '../types'
import novemberQuarters from './quarters'

type ComputeMonthlyIndex = (args: {
    periodType: PeriodIdentifier
    month: number
}) => number
const computeMonthlyIndex: ComputeMonthlyIndex = ({ periodType, month }) => {
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

    if (periodType === 'QUARTERLY') {
        if ((month - 1) % 3 !== 0) {
            throw new Error(
                `Received an invalid number for period type QUARTERLY, received "${month}"`
            )
        }

        // E.g:
        //   January = 1; (1 - 1) / 3 + 1 === 1 => First quarter
        //   April = 4; (4 - 1) / 3 + 1 === 2 => Second quarter
        return (month - 1) / 3 + 1
    }

    if (periodType === 'QUARTERLYNOV') {
        return computeQuarterlyNovemberIndex(month)
    }

    if (periodType === 'SIXMONTHLY') {
        if (![1, 7].includes(month)) {
            throw new Error(
                `Received an invalid number for period type SIXMONTHLY, received "${month}"`
            )
        }

        return month === 1 ? 1 : 2
    }

    if (periodType === 'SIXMONTHLYAPR') {
        if (![4, 10].includes(month)) {
            throw new Error(
                `Received an invalid number for period type SIXMONTHLY, received "${month}"`
            )
        }

        return month === 4 ? 1 : 2
    }

    if (periodType === 'SIXMONTHLYNOV') {
        if (![11, 5].includes(month)) {
            throw new Error(
                `Received an invalid number for period type SIXMONTHLY, received "${month}"`
            )
        }

        return month === 11 ? 1 : 2
    }

    throw new Error(`Unrecognized period type "${periodType}"`)
}

export default computeMonthlyIndex

// This can be absracted as soon as there are more quarterly periods
// Currently there's only QUARTERLYNOV that doesn't start on January
const computeQuarterlyNovemberIndex = (month: number) => {
    if (novemberQuarters[0].includes(month)) {
        return 1
    }

    if (novemberQuarters[1].includes(month)) {
        return 2
    }

    if (novemberQuarters[2].includes(month)) {
        return 3
    }

    if (novemberQuarters[3].includes(month)) {
        return 4
    }

    throw new Error(
        `Received a month that we cannot find a quarter for, received: "${month}"`
    )
}
