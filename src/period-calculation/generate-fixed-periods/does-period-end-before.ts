import { Temporal } from '@js-temporal/polyfill-patched'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils'
import { AnyPlainDate, toIsoPlainDate } from '../../utils/plainDate'

type DoesPeriodEndBefore = (args: {
    period: { startDate: string; endDate: string }
    date: AnyPlainDate
    calendar: SupportedCalendar
}) => boolean

const doesPeriodEndBefore: DoesPeriodEndBefore = ({
    period,
    date,
    calendar,
}) => {
    const isoDate = toIsoPlainDate(date)
    const periodStartDay = toIsoPlainDate(
        fromAnyDate({ calendar, date: period.startDate })
    )
    const periodEndDay = toIsoPlainDate(
        fromAnyDate({ calendar, date: period.endDate })
    )

    const periodStartsOnOrAfterDate =
        Temporal.PlainDate.compare(isoDate, periodStartDay) < 1
    const endsBeforeAfterPeriodStart =
        Temporal.PlainDate.compare(periodStartDay, isoDate) === -1
    const periodEndsOnOrBeforeDate =
        Temporal.PlainDate.compare(isoDate, periodEndDay) < 1

    return (
        periodStartsOnOrAfterDate ||
        (endsBeforeAfterPeriodStart && periodEndsOnOrBeforeDate)
    )
}

export default doesPeriodEndBefore
