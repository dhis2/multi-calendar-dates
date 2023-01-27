import { Temporal } from '@js-temporal/polyfill'

type IsExcludedPeriod = (args: {
    period: {
        startDate: string
        endDate: string
    }
    excludeDay: Temporal.PlainDate
}) => boolean

const isExcludedPeriod: IsExcludedPeriod = ({ period, excludeDay }) => {
    const periodStartDay = Temporal.PlainDate.from(period.startDate)
    const periodEndDay = Temporal.PlainDate.from(period.endDate)

    const periodStartsOnOrAfterExcludeDay =
        Temporal.PlainDate.compare(excludeDay, periodStartDay) < 1
    const excludeDayAfterPeriodStart =
        Temporal.PlainDate.compare(periodStartDay, excludeDay) === -1
    const periodEndsOnOrBeforeExcludeDay =
        Temporal.PlainDate.compare(excludeDay, periodEndDay) < 1

    return (
        periodStartsOnOrAfterExcludeDay ||
        (excludeDayAfterPeriodStart && periodEndsOnOrBeforeExcludeDay)
    )
}

export default isExcludedPeriod
