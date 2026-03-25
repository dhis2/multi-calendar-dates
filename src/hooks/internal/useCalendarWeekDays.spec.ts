import { Temporal } from '@js-temporal/polyfill'
import { renderHook } from '@testing-library/react-hooks'
import { useCalendarWeekDays } from './useCalendarWeekDays'

const renderUseDatePickerHook = (date: Temporal.PlainDate) => {
    const { result } = renderHook(() => useCalendarWeekDays(date))
    return result.current as Temporal.PlainDate[][]
}

describe('useDatePicker hook', () => {
    it('should return the days to display in a calendar', () => {
        const date = Temporal.PlainDate.from('2022-12-01')
        const result = renderUseDatePickerHook(date)
        expect(result.length).toEqual(5)
        expect(result.map((d) => d.map((w) => w.toString()))).toEqual([
            [
                '2022-11-28',
                '2022-11-29',
                '2022-11-30',
                '2022-12-01',
                '2022-12-02',
                '2022-12-03',
                '2022-12-04',
            ],
            [
                '2022-12-05',
                '2022-12-06',
                '2022-12-07',
                '2022-12-08',
                '2022-12-09',
                '2022-12-10',
                '2022-12-11',
            ],
            [
                '2022-12-12',
                '2022-12-13',
                '2022-12-14',
                '2022-12-15',
                '2022-12-16',
                '2022-12-17',
                '2022-12-18',
            ],
            [
                '2022-12-19',
                '2022-12-20',
                '2022-12-21',
                '2022-12-22',
                '2022-12-23',
                '2022-12-24',
                '2022-12-25',
            ],
            [
                '2022-12-26',
                '2022-12-27',
                '2022-12-28',
                '2022-12-29',
                '2022-12-30',
                '2022-12-31',
                '2023-01-01',
            ],
        ])
    })
    it.only('should return the days to display in a calendar (in the Ethiopic calendar)', () => {
        const date = Temporal.PlainDate.from({
            eraYear: 2022,
            era: 'ethiopic',
            month: 13,
            day: 5,
            calendar: 'ethiopic',
        })
        const result = renderUseDatePickerHook(date)
        expect(result.length).toEqual(2)
        expect(
            result.map((d) => d.map((w) => `${w.day}-${w.month}-${w.eraYear}`))
        ).toEqual([
            [
                '27-12-2022',
                '28-12-2022',
                '29-12-2022',
                '30-12-2022',
                '1-13-2022',
                '2-13-2022',
                '3-13-2022',
            ],
            [
                '4-13-2022',
                '5-13-2022',
                '1-1-2023',
                '2-1-2023',
                '3-1-2023',
                '4-1-2023',
                '5-1-2023',
            ],
        ])
    })
})
