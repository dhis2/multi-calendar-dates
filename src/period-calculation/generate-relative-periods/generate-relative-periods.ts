import { formatDate, getNowInCalendar } from "../../utils"
import { PeriodType, RelativePeriod } from "../types"
import i18n from '@dhis2/d2-i18n'
import { Temporal } from '@js-temporal/polyfill'

type GenerateFixedPeriods = (options: {
    // year: number
    periodType: PeriodType
    startingDate?: string
    // calendar: SupportedCalendar
    // locale?: string
    // startingDay?: number /** 1 is Monday */
    // yearsCount?: number | null
    // endsBefore?: string
}) => Array<RelativePeriod>


const getMonthsPeriodType = () => [
    { id: 'THIS_MONTH', name: i18n.t('This month'), offset: 0, duration: 1 },
    { id: 'LAST_MONTH', name: i18n.t('Last month'), offset: -1, duration: 1 },
    {
        id: 'LAST_3_MONTHS',
        name: i18n.t('Last 3 months'),
        offset: -1,
        duration: 3,
    },
    {
        id: 'LAST_6_MONTHS',
        name: i18n.t('Last 6 months'),
        offset: -1,
        duration: 6,
    },
    {
        id: 'LAST_12_MONTHS',
        name: i18n.t('Last 12 months'),
        offset: -1,
        duration: 12,
    },
    {
        id: 'MONTHS_THIS_YEAR',
        name: i18n.t('Months this year'),
        offset: 11,
        duration: 12,
    },
]

const generateRelativePeriods: GenerateFixedPeriods = ({
    periodType,
    startingDate // string or Temporal?
}) => {
    
    const date = startingDate ? Temporal.PlainDate.from(startingDate) : getNowInCalendar()

    if(periodType === "MONTHLY") {
        const result = getMonthsPeriodType().map(periodTypeConfig => {
            const endDate = date.add({months: periodTypeConfig.offset})
            const startDate = date.add({months: periodTypeConfig.offset - periodTypeConfig.duration})
            return {
                ...periodTypeConfig,
                periodType: "MONTHLY" as const,
                displayName: periodTypeConfig.name,
                startDate: formatDate(startDate),
                endDate: formatDate(endDate)
            }
        })
        return result
    }

    // do same for other period types

    throw "not implemented"
}

export default generateRelativePeriods