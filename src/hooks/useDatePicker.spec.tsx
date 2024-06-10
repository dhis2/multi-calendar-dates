import { Intl } from '@js-temporal/polyfill'
import { render } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { SupportedCalendar } from '../types'
import localisationHelpers from '../utils/localisationHelpers'
import { useDatePicker, UseDatePickerReturn } from './useDatePicker'

beforeEach(() => {
    // 13 October 2021 UTC
    jest.spyOn(Date, 'now').mockReturnValue(1634089600000)
})

afterEach(jest.clearAllMocks)

jest.mock('@js-temporal/polyfill', () => ({
    ...jest.requireActual('@js-temporal/polyfill'),
    Intl: {
        ...jest.requireActual('@js-temporal/polyfill').Intl,
    }, // this is needed, otherwise jest spying fails with " Cannot assign to read only property 'DateTimeFormat'"
}))

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
                // no calendar should default to iso8601
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
            const date = '1439-01-22'
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

            expect(result.currMonth.label).toEqual('محرم')
            expect(result.nextMonth.label).toEqual('صفر')
            expect(result.prevMonth.label).toEqual('ذو الحجة')
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
                ['٢٦', '٢٧', '٢٨', '٢٩', '١', '٢', '٣'],
                ['٤', '٥', '٦', '٧', '٨', '٩', '١٠'],
                ['١١', '١٢', '١٣', '١٤', '١٥', '١٦', '١٧'],
                ['١٨', '١٩', '٢٠', '٢١', '٢٢', '٢٣', '٢٤'],
                ['٢٥', '٢٦', '٢٧', '٢٨', '٢٩', '٣٠', '١'],
            ])
        })
        it('should render an Ethiopic calendar in Amharic', () => {
            const onDateSelect = jest.fn()
            const date = '2015-01-22'
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

            expect(result.currMonth.label).toEqual('መስከረም')
            expect(result.nextMonth.label).toEqual('ጥቅምት')
            expect(result.prevMonth.label).toEqual('ጳጉሜን')
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
                ['30', '1', '2', '3', '4', '5', '1'],
                ['2', '3', '4', '5', '6', '7', '8'],
                ['9', '10', '11', '12', '13', '14', '15'],
                ['16', '17', '18', '19', '20', '21', '22'],
                ['23', '24', '25', '26', '27', '28', '29'],
                ['30', '1', '2', '3', '4', '5', '6'],
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
    describe('highlighting today', () => {
        const getDayByDate: (
            calendarWeekDays: { calendarDate: string; isToday: boolean }[][],
            dayToFind: string
        ) => { calendarDate: string; isToday: boolean }[] = (
            calendarWeekDays,
            dayToFind
        ) => {
            const days = calendarWeekDays.flatMap((week) => week)

            return days.filter((day) => day.calendarDate === dayToFind)
        }

        it('should highlight today date in a an ethiopic calendar', () => {
            const date = `2014-02-03` // today mock date in ethiopic
            const options = {
                calendar: 'ethiopic' as const,
            }
            const { result } = renderHook(() =>
                useDatePicker({ onDateSelect: jest.fn(), date, options })
            )
            const matches = getDayByDate(result.current.calendarWeekDays, date)
            expect(matches[0]?.isToday).toEqual(true)
            expect(matches.length).toEqual(1)
        })

        it('should highlight today date in a a nepali calendar', () => {
            const date = `2078-06-27` // today mock date in nepali
            const options = {
                calendar: 'nepali' as const,
                timeZone: 'UTC',
            }
            const { result } = renderHook(() =>
                useDatePicker({ onDateSelect: jest.fn(), date, options })
            )
            const matches = getDayByDate(result.current.calendarWeekDays, date)
            expect(matches[0]?.isToday).toEqual(true)
            expect(matches.length).toEqual(1)
        })
    })
})

describe('custom calendars', () => {
    describe('nepali calendar', () => {
        it('should return the Nepali calendar info in nepali', () => {
            const onDateSelect = jest.fn()
            const date = '2079-01-12'
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
                ['२८', '२९', '३०', '१', '२', '३', '४'],
                ['५', '६', '७', '८', '९', '१०', '११'],
                ['१२', '१३', '१४', '१५', '१६', '१७', '१८'],
                ['१९', '२०', '२१', '२२', '२३', '२४', '२५'],
                ['२६', '२७', '२८', '२९', '३०', '३१', '१'],
            ])
            expect(result.currMonth.label).toEqual('बैशाख')
            expect(result.nextMonth.label).toEqual('जेठ')
            expect(result.prevMonth.label).toEqual('चैत')

            expect(result.currYear.label).toEqual(2079)
            expect(result.nextYear.label).toEqual(2080)
            expect(result.prevYear.label).toEqual(2078)

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
            const date = '2079-11-23'
            const options = {
                locale: 'en-NP',
                calendar: 'nepali' as const,
                timeZone: 'Africa/Khartoum',
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )
            const result = renderedHook?.result.current as UseDatePickerReturn

            expect(result.prevMonth.label).toEqual('Mangh')
            expect(result.currMonth.label).toEqual('Falgun')
            expect(result.nextMonth.label).toEqual('Chaitra')
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
                [1, 2, 3, 4, 5, 6, 7],
                [8, 9, 10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19, 20, 21],
                [22, 23, 24, 25, 26, 27, 28],
                [29, 30, 1, 2, 3, 4, 5],
            ])
            expect(result.currYear.label).toEqual(2079)
            expect(result.nextYear.label).toEqual(2080)
            expect(result.prevYear.label).toEqual(2078)
        })
        it('should allow a non-supported locale and default to english', () => {
            const onDateSelect = jest.fn()
            const date = '2079-03-32'
            const options = {
                locale: 'de-DE', // non-supported locale
                calendar: 'nepali' as const,
                timeZone: 'Africa/Khartoum',
            }
            const renderedHook = renderHook(() =>
                useDatePicker({ onDateSelect, date, options })
            )
            const result = renderedHook?.result.current as UseDatePickerReturn

            expect(result.currMonth.label).toEqual('Ashadh')
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

describe('clicking a day', () => {
    const renderForClick = ({
        calendar,
        date,
    }: {
        calendar: SupportedCalendar
        date: string
    }) => {
        const onDateSelect = jest.fn()

        const options = {
            locale: 'en-GB',
            timeZone: 'Africa/Khartoum',
            calendar,
            // no calendar means it should default to gregory
        }
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options })
        )
        const result = renderedHook.result?.current as UseDatePickerReturn

        const days = result.calendarWeekDays.flat()

        // find and click the day passed to the calendar
        for (let i = 0; i < days.length; i++) {
            if (days[i].calendarDate === date) {
                days[i].onClick()
                break
            }
        }

        const mockCallArgs = onDateSelect.mock.calls[0][0]
        return mockCallArgs
    }
    it('should call the callback with correct info for Gregorian calendar', () => {
        const date = '2018-01-22'
        const { calendarDate, calendarDateString } = renderForClick({
            calendar: 'gregory',
            date,
        })
        expect(calendarDate.toString()).toEqual(
            '2018-01-22T00:00:00+02:00[Africa/Khartoum][u-ca=gregory]'
        )
        expect(calendarDateString).toEqual('2018-01-22')
    })
    it('should call the callback with correct info for Ethiopic calendar', () => {
        const date = '2015-13-02'
        const { calendarDate, calendarDateString } = renderForClick({
            calendar: 'ethiopic',
            date,
        })
        expect(calendarDateString).toEqual('2015-13-02')
        expect(
            calendarDate.withCalendar('iso8601').toLocaleString('en-GB')
        ).toMatch('07/09/2023')

        expect(
            calendarDate.toLocaleString('en-GB', {
                month: 'long',
                year: 'numeric',
                day: 'numeric',
                calendar: 'ethiopic',
            })
        ).toEqual('2 Pagumen 2015 ERA1')
    })
    it('should call the callback with correct info for a custom (Nepali) calendar', () => {
        const date = '2077-12-30'
        const { calendarDate, calendarDateString } = renderForClick({
            calendar: 'nepali',
            date,
        })
        expect(calendarDateString).toEqual('2077-12-30')
        expect(
            localisationHelpers.localiseMonth(
                calendarDate,
                {
                    locale: 'en-NP',
                    calendar: 'nepali',
                },
                {}
            )
        ).toEqual('Chaitra')
    })
})

describe('changing the calendar on the fly', () => {
    // re-creating bug from storybook when changing a calendar on the fly
    // causes the hook to fail with: cannot format PlainYearMonth with calendar "oldCalendar" in locale with calendar "newCalendar"
    it('should allow changing the calendar on same component', () => {
        const Component = ({ calendar }: { calendar: SupportedCalendar }) => {
            const onDateSelect = jest.fn()
            const date = '2018-01-22'
            const options = {
                locale: 'en-GB',
                calendar,
            }
            const result = useDatePicker({ onDateSelect, date, options })

            return <div>{result.currMonth.label}</div>
        }

        const { getByText, rerender } = render(<Component calendar="gregory" />)
        expect(getByText('January')).toBeDefined()
        rerender(<Component calendar="ethiopic" />)
        expect(getByText('Tahsas')).toBeDefined()
        rerender(<Component calendar="nepali" />)
        expect(getByText('Paush')).toBeDefined()
    })
})

describe('default options for hook', () => {
    const originalDateTimeFormat = Intl.DateTimeFormat
    afterEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-extra-semi, @typescript-eslint/no-explicit-any
        ;(Intl.DateTimeFormat as any) = originalDateTimeFormat
    })

    it('should infer default options from system if none passed', () => {
        jest.spyOn(Intl, 'DateTimeFormat').mockReturnValue({
            resolvedOptions: () => {
                return {
                    locale: 'ar-SD',
                    numberingSystem: 'arab',
                }
            },
        } as Intl.DateTimeFormat)
        const onDateSelect = jest.fn()
        const date = '2018-01-22'
        const options = {
            calendar: 'gregory' as const,
            weekDayFormat: 'long' as const,
        }
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options })
        )

        const result = renderedHook?.result?.current as UseDatePickerReturn
        expect(result.weekDayLabels).toContain('الاثنين')
        expect(result.weekDayLabels).not.toContain('Monday')
        expect(
            result.calendarWeekDays.flatMap((week) =>
                week.map((day) => day.label)
            )
        ).toContain('١٥')
    })
    it('should infer from system if part of the options are passed', () => {
        const onDateSelect = jest.fn()
        const date = '2018-01-22'
        const options = {
            calendar: 'gregory' as const,
            weekDayFormat: 'long' as const,
            locale: 'es-ES',
        }
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options })
        )

        const result = renderedHook?.result?.current as UseDatePickerReturn
        expect(result.weekDayLabels).toContain('lunes')
    })
})

it('should generate the correct calendar weeks when passed "Ethiopian" rather than "ethiopic" (bug)', () => {
    const onDateSelect = jest.fn()
    const date = '2015-06-29'
    const options = {
        calendar: 'ethiopian' as SupportedCalendar,
    }
    const renderedHook = renderHook(() =>
        useDatePicker({ onDateSelect, date, options })
    )
    const result = renderedHook.result?.current as UseDatePickerReturn

    expect(
        result.calendarWeekDays.map((week) => week.map((d) => d.label))
    ).toEqual([
        ['29', '30', '1', '2', '3', '4', '5'],
        ['6', '7', '8', '9', '10', '11', '12'],
        ['13', '14', '15', '16', '17', '18', '19'],
        ['20', '21', '22', '23', '24', '25', '26'],
        ['27', '28', '29', '30', '1', '2', '3'],
    ])
})

describe('validation rules', () => {
    it('should validate correct format', () => {
        const onDateSelect = jest.fn()
        const date = '2015-'
        const options = {}
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options })
        )
        const result = renderedHook.result?.current as UseDatePickerReturn

        expect(result.isValid).toEqual(false)
    })
    it('should validate min date for yyyy-mm-dd format', () => {
        const onDateSelect = jest.fn()
        const date = '2015-06-27'
        const options = {}
        const minDate = '2015-06-28'

        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options, minDate })
        )
        const result = renderedHook.result?.current as UseDatePickerReturn

        expect(result.isValid).toEqual(false)
    })

    it('should validate max date for yyyy-mm-dd format', () => {
        const onDateSelect = jest.fn()
        const date = '2018-06-29'
        const options = {}
        //const minDate = '2015-06-28'
        const maxDate = '2018-06-28'
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options, maxDate })
        )
        const result = renderedHook.result?.current as UseDatePickerReturn

        expect(result.isValid).toEqual(false)
    })

    it('should validate min date for dd-mm-yyyy format', () => {
        const onDateSelect = jest.fn()
        const date = '27-06-2015'
        const options = {}
        const minDate = '28-06-2015'
        //const maxDate = '2018-06-28'
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options, minDate })
        )
        const result = renderedHook.result?.current as UseDatePickerReturn

        expect(result.isValid).toEqual(false)
    })

    it('should validate max date for dd-mm-yyyy format', () => {
        const onDateSelect = jest.fn()
        const date = '29-06-2018'
        const options = {
            locale: 'ar-EG',
            calendar: 'islamic-civil' as const,
            timeZone: 'Africa/Khartoum',
            weekDayFormat: 'long' as const,
        }
        //const minDate = '2015-06-28'
        const maxDate = '28-06-2018'
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options, maxDate })
        )
        const result = renderedHook.result?.current as UseDatePickerReturn

        expect(result.isValid).toEqual(false)
    })

    it('should validate min date for an Ethiopic calendar in Amharic', () => {
        const onDateSelect = jest.fn()
        const date = '2015-01-22'
        const options = {
            locale: 'am-ET',
            calendar: 'ethiopic' as const,
            timeZone: 'Africa/Khartoum',
            weekDayFormat: 'long' as const,
        }
        const minDate = '2015-01-23'
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options, minDate })
        )

        const result = renderedHook?.result?.current as UseDatePickerReturn

        expect(result.isValid).toEqual(false)
    })

    it('should validate max date for an Ethiopic calendar in Amharic', () => {
        const onDateSelect = jest.fn()
        const date = '2015-01-37'
        const options = {
            locale: 'am-ET',
            calendar: 'ethiopic' as const,
            timeZone: 'Africa/Khartoum',
            weekDayFormat: 'long' as const,
        }
        const maxDate = '20-01-2015'
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options, maxDate })
        )

        const result = renderedHook?.result?.current as UseDatePickerReturn
        expect(result.isValid).toEqual(false)
    })

    it('should validate max & min date for different formats', () => {
        const onDateSelect = jest.fn()
        const date = '29-06-2018'
        const options = {}
        const minDate = '2018-06-28'
        const maxDate = '30-06-2018'
        const renderedHook = renderHook(() =>
            useDatePicker({ onDateSelect, date, options, minDate, maxDate })
        )
        const result = renderedHook.result?.current as UseDatePickerReturn

        expect(result.isValid).toEqual(true)
    })
})
