import * as lib from './index'

describe('the interface of the library', () => {
    it('should have at least these members otherwise it is definitely a breaking change', () => {
        expect(Object.keys(lib)).toEqual(
            expect.arrayContaining([
                'addToCalendarDate',
                'constants',
                'convertFromIso8601',
                'convertToIso8601',
                'createFixedPeriodFromPeriodId',
                'formatCalendarDate',
                'generateFixedPeriods',
                'getAdjacentFixedPeriods',
                'getDaysInMonth',
                'getFixedPeriodByDate',
                'getNowInCalendar',
                'periodTypes',
                'useDatePicker',
                'useResolvedDirection',
                'validateDateString',
            ])
        )

        expect(Object.keys(lib.constants)).toEqual([
            'calendars',
            'numberingSystems',
        ])
    })
})
