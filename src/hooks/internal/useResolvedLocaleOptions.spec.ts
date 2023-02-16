import { Intl } from '@js-temporal/polyfill'
import { renderHook } from '@testing-library/react-hooks'
import { PickerOptions } from '../../types'
import getValidLocale from '../../utils/getValidLocale'
import { useResolvedLocaleOptions } from './useResolvedLocaleOptions'

jest.mock('@js-temporal/polyfill')
jest.mock('../../utils/getValidLocale')

const renderResolvedLocaleHook = ({
    locale,
    calendar,
    timeZone,
    numberingSystem,
    weekDayFormat,
}: PickerOptions) => {
    const options = {
        locale,
        calendar,
        numberingSystem,
        timeZone,
        weekDayFormat: weekDayFormat,
    }
    const { result } = renderHook(() => useResolvedLocaleOptions(options))
    return result.current
}

describe('useResolvedLocaleOptions', () => {
    const mockResolvedOptions = ({
        locale: mockLocale,
        calendar,
        numberingSystem,
        timeZone,
    }: Omit<PickerOptions, 'calendar'> & {
        calendar?: string
    }) => {
        jest.spyOn(Intl, 'DateTimeFormat').mockImplementation(
            (locale, options) =>
                ({
                    resolvedOptions: () => {
                        // when calling without options, i.e. Intl?.DateTimeFormat?.().resolvedOptions?.()
                        // we return system info
                        if (!locale) {
                            return {
                                locale: mockLocale,
                                calendar,
                                numberingSystem: numberingSystem,
                                timeZone: timeZone,
                            }
                        } else {
                            // otherwise it should return what was passed to it (provided it is valid)
                            return {
                                locale,
                                ...options,
                            }
                        }
                    },
                } as Intl.DateTimeFormat)
        )
    }

    beforeEach(() => {
        const mock = getValidLocale as jest.Mock
        mock.mockImplementation((value) => value)
    })
    afterEach(jest.clearAllMocks)

    describe('resolving locale', () => {
        it('should return the passed locale if provided', () => {
            mockResolvedOptions({ locale: 'fr-FR' })
            const overriddenLocale = 'es'
            const result = renderResolvedLocaleHook({
                locale: overriddenLocale,
                calendar: 'gregory',
                numberingSystem: 'arab',
            })
            expect(result.locale).toEqual(overriddenLocale)
        })

        it('should fall back to system locale otherwise', () => {
            mockResolvedOptions({ locale: 'fr-FR' })
            const result = renderResolvedLocaleHook({
                calendar: 'gregory',
                numberingSystem: 'arab',
            })
            expect(result.locale).toEqual('fr-FR')
        })

        it('should fall back to hardcoded value when all fails', () => {
            mockResolvedOptions({ locale: undefined })

            const result = renderResolvedLocaleHook({
                calendar: 'gregory',
                numberingSystem: 'arab',
            })
            expect(result.locale).toEqual('en')
        })

        describe('when bad locale passed', () => {
            beforeEach(() => {
                const mock = getValidLocale as jest.Mock
                mock.mockReturnValue(undefined)
            })
            it('should return user locale', () => {
                mockResolvedOptions({ locale: 'fr' })
                const result = renderResolvedLocaleHook({
                    locale: 'xx-invalidlocale',
                    calendar: 'gregory',
                    numberingSystem: 'arab',
                })
                expect(result.locale).toEqual('fr')
            })
            it('should return hardcoded values if user locale not found (which should not really happen but being super-defensive!)', () => {
                mockResolvedOptions({ locale: undefined })
                const result = renderResolvedLocaleHook({
                    locale: 'xx-invalidlocale',
                    calendar: 'gregory',
                    numberingSystem: 'arab',
                })
                expect(result.locale).toEqual('en')
            })
        })
    })

    describe('resolving numbering system', () => {
        it('should return the passed locale if provided', () => {
            mockResolvedOptions({ numberingSystem: 'hebr' })
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
                numberingSystem: 'arab',
            })
            expect(result.numberingSystem).toEqual('arab')
        })

        it('should fall back to system numbering system otherwise', () => {
            mockResolvedOptions({ numberingSystem: 'hebr' })
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
            })
            expect(result.numberingSystem).toEqual('hebr')
        })

        it('should fall back to hardcoded value when all fails', () => {
            mockResolvedOptions({ numberingSystem: undefined })
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
            })
            expect(result.numberingSystem).toEqual('latn')
        })
    })

    describe('resolving timeZone', () => {
        it('should return the passed timeZone if provided', () => {
            mockResolvedOptions({ timeZone: 'america/somewhere' })
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
                numberingSystem: 'arab',
                timeZone: 'africa',
            })
            expect(result.timeZone).toEqual('africa')
        })

        it('should fall back to system timeZone if no value passed', () => {
            mockResolvedOptions({ timeZone: 'america/somewhere' })
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
                numberingSystem: 'arab',
                // no timeZone
            })
            expect(result.timeZone).toEqual('america/somewhere')
        })

        it('should fall back to UTC if all fails (we should not reach this state in reality because there is always a system timezone)', () => {
            mockResolvedOptions({ timeZone: undefined })
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
                numberingSystem: 'arab',
                // no timeZone
            })
            expect(result.timeZone).toEqual('UTC')
        })
    })

    describe('resolving weekDayFormat', () => {
        it('should return the passed weekDayFormat if provided', () => {
            mockResolvedOptions({})
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
                numberingSystem: 'arab',
                weekDayFormat: 'short',
            })
            expect(result.weekDayFormat).toEqual('short')
        })

        it('should fall back to hardcoded value if nothing passed', () => {
            mockResolvedOptions({})
            const result = renderResolvedLocaleHook({
                locale: 'en',
                calendar: 'gregory',
                numberingSystem: 'arab',
            })
            expect(result.weekDayFormat).toEqual('narrow')
        })
    })
})
