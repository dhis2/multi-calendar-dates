import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils'

type DoesPeriodEndBefore = (args: {
    period: { startDate: string; endDate: string }
    date: Temporal.PlainDate
    calendar: SupportedCalendar
}) => boolean

const doesPeriodEndBefore: DoesPeriodEndBefore = ({
    period,
    date,
    calendar,
}) => {
    const periodStartDay = fromAnyDate({ calendar, date: period.startDate })
    const periodEndDay = fromAnyDate({ calendar, date: period.endDate })

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
