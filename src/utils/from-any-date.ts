import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill'
import { SupportedCalendar } from '../types'
import fromDateString from './from-date-string'
import { getCustomPlainDate } from './helpers'

type FromAnyDate = (args: {
    date: string | Date | Temporal.PlainDate
    calendar: SupportedCalendar
}) => Temporal.PlainDate

const fromAnyDate: FromAnyDate = ({ date, calendar }) => {
    if (typeof date === 'string') {
        return fromDateString({ date, calendar })
    }

    const PlainDateObject = getCustomPlainDate(calendar)

    if (date instanceof Date) {
        return PlainDateObject.from({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            calendar,
        })
    }

    if (date instanceof Temporal.PlainDate || calendar == 'nepali') {
        return PlainDateObject.from({
            year: date.year,
            month: date.month,
            day: date.day,
            calendar,
        })
    }

    throw new Error(i18n.t(`Unrecognized date, received "{{date}}"`, { date }))
}

export default fromAnyDate
