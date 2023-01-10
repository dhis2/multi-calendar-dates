import assert from 'assert'
import { When, Then } from '@cucumber/cucumber'
import generateFixedPeriods, {
    PeriodIdentifier,
} from '../../src/period-calculation/fixed-periods'
import { SupportedCalendar } from '../../src/types'

interface MyWorld {
    calendar: SupportedCalendar
    year: number
    periods: PeriodIdentifier[]
    periodType?: PeriodIdentifier
}
type DataTable = Array<{
    year: number
    periodCount: number
    periodType: PeriodIdentifier
}>

When(
    'the user requests a period longer than bi-weekly',
    function (this: MyWorld) {
        // nothing to do here
    }
)

Then(
    'the 13th month of the calendar should be ignored',
    function (this: MyWorld, dataTable) {
        const dataTables = dataTable.hashes() as DataTable

        dataTables.forEach((row) => {
            const result = generateFixedPeriods({
                year: row.year,
                periodType: row.periodType,
                calendar: this.calendar,
                locale: 'en',
            })
            assert.equal(
                result.length,
                row.periodCount,
                `${row.periodType} has wrong number of periods`
            )
        })
    }
)

When('the user requests a monthly period', function (this: MyWorld) {
    this.periodType = 'MONTHLY'
})

Then('the 13th month \\(Pagumen) should not be returned', function () {
    for (let year = 2016; year > 2000; year--) {
        const result = generateFixedPeriods({
            year,
            periodType: this.periodType,
            calendar: this.calendar,
            locale: 'en',
        })

        assert.equal(
            result.length,
            12,
            'monthly periods in ethiopic calendar have more than 12 items'
        )
        assert.equal(
            result.filter((a) => a.id === `${year}13`)?.length,
            0,
            'monthly periods in ethiopic calendar have a 13th month'
        )
    }
})

When('the user requests a daily period', function (this: MyWorld) {
    this.periodType = 'DAILY'
})
Then('the 13th month \\(Pagumen) should be returned', function () {
    const leapYear = 2015
    const nonLeapYear = 2014
    const periodOptions = {
        periodType: this.periodType,
        calendar: this.calendar,
    }
    let result = generateFixedPeriods({
        year: leapYear,
        ...periodOptions,
    })

    assert.equal(result[result.length - 1]?.name, '2015-13-06')

    result = generateFixedPeriods({
        year: nonLeapYear,
        ...periodOptions,
    })

    assert.equal(result[result.length - 1]?.name, '2014-13-05')
})
