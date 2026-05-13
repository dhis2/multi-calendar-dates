import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill'
import {
    CalendarPlainDate,
    isNepaliPlainDate,
    plainDateFrom,
} from '../custom-calendars'
import { SupportedCalendar } from '../types'
import fromDateString from './from-date-string'

type FromAnyDate = (args: {
    date: string | Date | CalendarPlainDate
    calendar: SupportedCalendar
}) => CalendarPlainDate

const fromAnyDate: FromAnyDate = ({ date, calendar }) => {
    if (typeof date === 'string') {
        return fromDateString({ date, calendar })
    }

    if (date instanceof Date) {
        return plainDateFrom(
            {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
            },
            calendar
        )
    }

    if (isNepaliPlainDate(date) || date instanceof Temporal.PlainDate) {
        return plainDateFrom(
            { year: date.year, month: date.month, day: date.day },
            calendar
        )
    }

    throw new Error(i18n.t(`Unrecognized date, received "{{date}}"`, { date }))
}

export default fromAnyDate
