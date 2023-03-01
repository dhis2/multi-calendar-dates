import { Temporal } from '@js-temporal/polyfill'

type DoesPeriodEndBefore = (args: {
    period: { startDate: string; endDate: string }
    date: Temporal.PlainDate
}) => boolean

const doesPeriodEndBefore: DoesPeriodEndBefore = ({ period, date }) => {
    const periodStartDay = Temporal.PlainDate.from(period.startDate)
    const periodEndDay = Temporal.PlainDate.from(period.endDate)

    const periodStartsOnOrAfterDate =
        Temporal.PlainDate.compare(date, periodStartDay) < 1
    const endsBeforeAfterPeriodStart =
        Temporal.PlainDate.compare(periodStartDay, date) === -1
    const periodEndsOnOrBeforeDate =
        Temporal.PlainDate.compare(date, periodEndDay) < 1

    return (
        periodStartsOnOrAfterDate ||
        (endsBeforeAfterPeriodStart && periodEndsOnOrBeforeDate)
    )
}

export default doesPeriodEndBefore
