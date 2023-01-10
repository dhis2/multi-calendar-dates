import { renderHook } from '@testing-library/react-hooks'
import { SupportedCalendar } from '../types'
import { useDatePicker, UseDatePickerReturn } from './useDatePicker'

const renderCalendar = (
    weekDayFormat: 'long' | 'narrow' | 'short',
    locale: string,
    calendar: SupportedCalendar = 'gregory'
) => {
    const onDateSelect = jest.fn()
    const date = '2018-01-22'
    const options = {
        locale,
        calendar,
        timeZone: 'Africa/Khartoum',
        weekDayFormat,
    }
    const { result } = renderHook(() =>
        useDatePicker({ onDateSelect, date, options })
    )
    return result.current as UseDatePickerReturn
}

describe('useDatePicker hook', () => {
    describe('calendar info generation', () => {
        it('should render a Gregorian calendar', () => {
            const onDateSelect = jest.fn()
            const date = '2018-01-22'
            const options = {
                locale: 'en-GB',
                timeZone: 'Africa/Khartoum',
                // no calendar means it should default to gregory
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )
            const result = renderedHook.result?.current as UseDatePickerReturn

            expect(
                result.calendarWeekDays.map((week) => week.map((d) => d.label))
            ).toEqual([
                ['1', '2', '3', '4', '5', '6', '7'],
                ['8', '9', '10', '11', '12', '13', '14'],
                ['15', '16', '17', '18', '19', '20', '21'],
                ['22', '23', '24', '25', '26', '27', '28'],
                ['29', '30', '31', '1', '2', '3', '4'],
            ])
            expect(result.currMonth.label).toEqual('January')
            expect(result.nextMonth.label).toEqual('February')
            expect(result.prevMonth.label).toEqual('December')
            expect(result.currYear.label).toEqual('2018')
            expect(result.nextYear.label).toEqual('2019')
            expect(result.prevYear.label).toEqual('2017')
            expect(result.weekDayLabels).toEqual([
                'M',
                'T',
                'W',
                'T',
                'F',
                'S',
                'S',
            ])
        })

        it('should render an Islamic calendar in Arabic', () => {
            const onDateSelect = jest.fn()
            const date = '2018-01-22'
            const options = {
                locale: 'ar-EG',
                calendar: 'islamic-civil' as const,
                timeZone: 'Africa/Khartoum',
                weekDayFormat: 'long' as const,
            }
            const renderdHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )

            const result = renderdHook.result?.current as UseDatePickerReturn

            expect(result.currMonth.label).toEqual('جمادى الأولى')
            expect(result.nextMonth.label).toEqual('جمادى الآخرة')
            expect(result.prevMonth.label).toEqual('ربيع الآخر')
            expect(result.currYear.label).toEqual('١٤٣٩ هـ')
            expect(result.nextYear.label).toEqual('١٤٤٠ هـ')
            expect(result.prevYear.label).toEqual('١٤٣٨ هـ')
            expect(result.weekDayLabels).toEqual([
                'الاثنين',
                'الثلاثاء',
                'الأربعاء',
                'الخميس',
                'الجمعة',
                'السبت',
                'الأحد',
            ])
            expect(
                result.calendarWeekDays.map((week) => week.map((d) => d.label))
            ).toEqual([
                ['٢٧', '٢٨', '٢٩', '١', '٢', '٣', '٤'],
                ['٥', '٦', '٧', '٨', '٩', '١٠', '١١'],
                ['١٢', '١٣', '١٤', '١٥', '١٦', '١٧', '١٨'],
                ['١٩', '٢٠', '٢١', '٢٢', '٢٣', '٢٤', '٢٥'],
                ['٢٦', '٢٧', '٢٨', '٢٩', '٣٠', '١', '٢'],
            ])
        })
        it('should render an Ethiopic calendar in Amharic', () => {
            const onDateSelect = jest.fn()
            const date = '2022-11-22'
            const options = {
                locale: 'am-ET',
                calendar: 'ethiopic' as const,
                timeZone: 'Africa/Khartoum',
                weekDayFormat: 'long' as const,
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )

            const result = renderedHook?.result?.current as UseDatePickerReturn

            expect(result.currMonth.label).toEqual('ኅዳር')
            expect(result.nextMonth.label).toEqual('ታኅሣሥ')
            expect(result.prevMonth.label).toEqual('ጥቅምት')
            expect(result.currYear.label).toEqual('2015')
            expect(result.nextYear.label).toEqual('2016')
            expect(result.prevYear.label).toEqual('2014')
            expect(result.weekDayLabels).toEqual([
                'ሰኞ',
                'ማክሰኞ',
                'ረቡዕ',
                'ሐሙስ',
                'ዓርብ',
                'ቅዳሜ',
                'እሑድ',
            ])
            expect(
                result.calendarWeekDays.map((week) => week.map((d) => d.label))
            ).toEqual([
                ['28', '29', '30', '1', '2', '3', '4'],
                ['5', '6', '7', '8', '9', '10', '11'],
                ['12', '13', '14', '15', '16', '17', '18'],
                ['19', '20', '21', '22', '23', '24', '25'],
                ['26', '27', '28', '29', '30', '1', '2'],
            ])
        })
    })
    describe('week format display', () => {
        describe('rendering Arabic day names', () => {
            it('should render long Arabic names', () => {
                const { weekDayLabels } = renderCalendar('long', 'ar-EG')
                expect(weekDayLabels).toEqual([
                    'الاثنين',
                    'الثلاثاء',
                    'الأربعاء',
                    'الخميس',
                    'الجمعة',
                    'السبت',
                    'الأحد',
                ])
            })

            it('should render short Arabic names', () => {
                const { weekDayLabels } = renderCalendar('short', 'ar-EG')
                expect(weekDayLabels).toEqual([
                    'الاثنين',
                    'الثلاثاء',
                    'الأربعاء',
                    'الخميس',
                    'الجمعة',
                    'السبت',
                    'الأحد',
                ])
            })

            it('should render narrow Arabic names', () => {
                const { weekDayLabels } = renderCalendar('narrow', 'ar-EG')
                expect(weekDayLabels).toEqual([
                    'ن',
                    'ث',
                    'ر',
                    'خ',
                    'ج',
                    'س',
                    'ح',
                ])
            })
        })

        describe('rendering English day names', () => {
            it('should render long English names', () => {
                const { weekDayLabels } = renderCalendar('long', 'en')
                expect(weekDayLabels).toEqual([
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                ])
            })

            it('should render short English names', () => {
                const { weekDayLabels } = renderCalendar('short', 'en')
                expect(weekDayLabels).toEqual([
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Fri',
                    'Sat',
                    'Sun',
                ])
            })

            it('should render narrow English names', () => {
                const { weekDayLabels } = renderCalendar('narrow', 'en')
                expect(weekDayLabels).toEqual([
                    'M',
                    'T',
                    'W',
                    'T',
                    'F',
                    'S',
                    'S',
                ])
            })
        })
    })
    describe('overriding numbering system', () => {
        it('should use passed numbering system regardless of locale', () => {
            const onDateSelect = jest.fn()
            const date = '2018-01-22'
            const options = {
                locale: 'en-GB',
                calendar: 'gregory' as const,
                numberingSystem: 'arab',
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )

            const result = renderedHook?.result?.current as UseDatePickerReturn
            expect(
                result.calendarWeekDays
                    .map((week) => week.map((d) => d.label))
                    .flat()
            ).toContain('٢٨')
            expect(result.currYear.label).toEqual('٢٠١٨')
            expect(result.nextYear.label).toEqual('٢٠١٩')
            expect(result.prevYear.label).toEqual('٢٠١٧')
        })
    })
})

describe('custom calendars', () => {
    describe('nepali calendar', () => {
        it('should return the Nepali calendar info in nepali', () => {
            const onDateSelect = jest.fn()
            const date = '2022-01-12'
            const options = {
                locale: 'ne-NP',
                calendar: 'nepali' as const,
                timeZone: 'Africa/Khartoum',
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )

            const result = renderedHook?.result?.current as UseDatePickerReturn

            expect(
                result.calendarWeekDays.map((week) => week.map((d) => d.label))
            ).toEqual([
                ['२७', '२८', '२९', '१', '२', '३', '४'],
                ['५', '६', '७', '८', '९', '१०', '११'],
                ['१२', '१३', '१४', '१५', '१६', '१७', '१८'],
                ['१९', '२०', '२१', '२२', '२३', '२४', '२५'],
                ['२६', '२७', '२८', '२९', '३०', '१', '२'],
            ])
            expect(result.currMonth.label).toEqual('पौष')
            expect(result.nextMonth.label).toEqual('माघ')
            expect(result.prevMonth.label).toEqual('कार्तिक')

            expect(result.currYear.label).toEqual(2078)
            expect(result.nextYear.label).toEqual(2079)
            expect(result.prevYear.label).toEqual(2077)

            expect(result.weekDayLabels).toEqual([
                'सोम',
                'मंगल',
                'बुध',
                'बिही',
                'शुक्र',
                'शनि',
                'आइत',
            ])
        })
        it('should return the Nepali calendar info in latin letters', () => {
            const onDateSelect = jest.fn()
            const date = '2022-11-23'
            const options = {
                locale: 'en-NP',
                calendar: 'nepali' as const,
                timeZone: 'Africa/Khartoum',
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )
            const result = renderedHook?.result.current as UseDatePickerReturn

            expect(result.prevMonth.label).toEqual('Ashwin')
            expect(result.currMonth.label).toEqual('Mangsir')
            expect(result.nextMonth.label).toEqual('Paush')
            expect(result.weekDayLabels).toEqual([
                'Som',
                'Mangl',
                'Budha',
                'Bihi',
                'Shukra',
                'Shani',
                'Aaita',
            ])
            expect(
                result.calendarWeekDays.map((week) => week.map((d) => d.label))
            ).toEqual([
                [28, 29, 30, 1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10, 11],
                [12, 13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24, 25],
                [26, 27, 28, 29, 1, 2, 3],
            ])
            expect(result.currYear.label).toEqual(2079)
            expect(result.nextYear.label).toEqual(2080)
            expect(result.prevYear.label).toEqual(2078)
        })
        it('should allow a non-supported locale and default to english', () => {
            const onDateSelect = jest.fn()
            const date = '2022-11-23'
            const options = {
                locale: 'de-DE', // non-supported locale
                calendar: 'nepali' as const,
                timeZone: 'Africa/Khartoum',
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )
            const result = renderedHook?.result.current as UseDatePickerReturn

            expect(result.prevMonth.label).toEqual('Ashwin')
        })
    })
    describe('rendering Nepali (custom) day names', () => {
        it('should render Nepali with ne-NP passed', () => {
            const { weekDayLabels } = renderCalendar('long', 'ne-NP', 'nepali')
            expect(weekDayLabels).toEqual([
                'सोम',
                'मंगल',
                'बुध',
                'बिही',
                'शुक्र',
                'शनि',
                'आइत',
            ])
        })

        it('should render Nepali transliterated in English when en-NP passed', () => {
            const { weekDayLabels } = renderCalendar('short', 'en-NP', 'nepali')
            expect(weekDayLabels).toEqual([
                'Som',
                'Mangl',
                'Budha',
                'Bihi',
                'Shukra',
                'Shani',
                'Aaita',
            ])
        })
    })
})
