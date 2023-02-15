import assert from 'assert'
import { Given, When, Then } from '@cucumber/cucumber'
import { generateFixedPeriods } from '../../src/index'
import { FixedPeriod, PeriodType } from '../../src/period-calculation/types'
import { SupportedCalendar } from '../../src/types'

type DataTable = {
    year: string
    periodType: PeriodType
    periodCount: number
}

type MyWorld = {
    calendar: SupportedCalendar
    year: number
    locale: string
    results: Array<DataTable & { generatedPeriods: FixedPeriod[] }>
    periodType: PeriodType
}

Given(
    'the calendar type is {string}',
    function (this: MyWorld, calendar: SupportedCalendar) {
        this.calendar = calendar
    }
)

Given(
    'the locale is set to {string}',
    function (this: MyWorld, locale: string) {
        this.locale = locale
    }
)

When('a year is provided along a period', function (this: MyWorld, dataTable) {
    this.results = (dataTable.hashes() as Array<DataTable>).map((row) => {
        const yearNo = Number.parseInt(row.year)
        return {
            ...row,
            generatedPeriods: generateFixedPeriods({
                year: yearNo,
                periodType: row.periodType,
                calendar: this.calendar,
                locale: this.locale ?? 'en',
            }),
        }
    })
})

Then(
    'the correct number of periods should be generated',
    function (this: MyWorld) {
        this.results.forEach((result) => {
            assert.equal(
                result.generatedPeriods.length,
                result.periodCount,
                `${result.periodType} ${result.year} has wrong number of periods (expected: ${result.periodCount} / actual: ${result.generatedPeriods.length})`
            )
        })
    }
)
