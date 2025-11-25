import generateRelativePeriods from './generate-relative-periods'

// Start with Gregorian
// Write tests for one period type at a time
// Implement with most naive implementation then refactor
// something very similar to: https://github.com/dhis2/analytics/blob/master/src/components/PeriodDimension/utils/relativePeriods.js#L328

beforeEach(() => {
    // 25 November 2025
    jest.spyOn(Date, 'now').mockReturnValue(1764069336553)
})

describe('MONTHLY relative periods', () => {
    it('should generate relative MONTHLY periods', () => {
        const periods = generateRelativePeriods({
            periodType: 'MONTHLY',
        })
        expect(periods[0]).toEqual({
            "displayName": "This month",
            "duration": 1,
            "endDate": "2025-11-25",
            "id": "THIS_MONTH",
            "name": "This month",
            "offset": 0,
            "periodType": "MONTHLY",
            "startDate": "2025-10-25",
        })
    })
})
