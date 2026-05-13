import { CalendarPlainDate, comparePlainDates } from '../../custom-calendars'
import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils'

type DoesPeriodEndBefore = (args: {
    period: { startDate: string; endDate: string }
    date: CalendarPlainDate
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
        comparePlainDates(date, periodStartDay) < 1
    const endsBeforeAfterPeriodStart =
        comparePlainDates(periodStartDay, date) === -1
    const periodEndsOnOrBeforeDate = comparePlainDates(date, periodEndDay) < 1

    return (
        periodStartsOnOrAfterDate ||
        (endsBeforeAfterPeriodStart && periodEndsOnOrBeforeDate)
    )
}

export default doesPeriodEndBefore
