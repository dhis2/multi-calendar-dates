import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill-patched'
import { SupportedCalendar } from '../types'
import fromDateString from './from-date-string'
import { getPlainDateFromCalendarFields } from './helpers'
import { AnyPlainDate } from './plainDate'

type FromAnyDate = (args: {
    date: string | Date | Temporal.PlainDate
    calendar: SupportedCalendar
}) => AnyPlainDate

const fromAnyDate: FromAnyDate = ({ date, calendar }) => {
    if (typeof date === 'string') {
        return fromDateString({ date, calendar })
    }

    if (date instanceof Date) {
        return getPlainDateFromCalendarFields(
            {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
            },
            calendar
        )
    }

    if (date instanceof Temporal.PlainDate) {
        return getPlainDateFromCalendarFields(
            {
                year: date.year,
                month: date.month,
                day: date.day,
            },
            calendar
        )
    }

    throw new Error(i18n.t(`Unrecognized date, received "{{date}}"`, { date }))
}

export default fromAnyDate
