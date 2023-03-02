import * as lib from './index'

describe('the interface of the library', () => {
    it('should have at least these members otherwise it is definitely a breaking change', () => {
        expect(Object.keys(lib)).toEqual(
            expect.arrayContaining([
                'constants',
                'createFixedPeriodFromPeriodId',
                'generateFixedPeriods',
                'getAdjacentFixedPeriods',
                'getFixedPeriodByDate',
                'getNowInCalendar',
                'periodTypes',
                'useDatePicker',
                'useResolvedDirection',
            ])
        )

        expect(Object.keys(lib.constants)).toEqual([
            'calendars',
            'numberingSystems',
        ])
    })
})
