import { SupportedCalendar } from '../../types'
import { fromAnyDate } from '../../utils/index'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GetDailyFixedPeriodByDate = (args: {
    date: string
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getDailyFixedPeriodByDate: GetDailyFixedPeriodByDate = ({
    date: dateInput,
    calendar,
    locale,
}) => {
    const date = fromAnyDate({ date: dateInput, calendar })
    return buildDailyFixedPeriod({ date, calendar, locale })
}

export default getDailyFixedPeriodByDate
