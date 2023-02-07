import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../../types'
import { buildDailyFixedPeriod } from '../daily-periods/index'
import { FixedPeriod } from '../types'

type GetFixedPeriodByDateDaily = (args: {
    date: Temporal.PlainDate
    locale: string
    calendar: SupportedCalendar
}) => FixedPeriod

const getFixedPeriodByDateDaily: GetFixedPeriodByDateDaily = ({
    date,
    calendar,
    locale,
}) => {
    return buildDailyFixedPeriod({ date, calendar, locale })
}

export default getFixedPeriodByDateDaily
