import { convertDate } from './convert-date'

describe('date conversion from gregorian', () => {
    describe('to ethiopic', () => {
        it('should convert a date', () => {
            const result = convertDate('2024-05-23', 'ethiopic')
            expect(result.eraYear).toEqual(2016)
            expect(result.year).toEqual(7516)
            expect(result.month).toEqual(9)
            expect(result.day).toEqual(15)
        })
        it('should convert a date if "ethiopian" is passed instad of "ethiopic"', () => {
            const result = convertDate('2024-05-23', 'ethiopian' as any)
            expect(result.eraYear).toEqual(2016)
            expect(result.year).toEqual(7516)
            expect(result.month).toEqual(9)
            expect(result.day).toEqual(15)
        })
    })
    describe('to nepali', () => {
        it('should convert a date', () => {
            const result = convertDate('2024-05-23', 'nepali')
            expect(result.eraYear).toEqual(2081)
            expect(result.year).toEqual(2081)
            expect(result.month).toEqual(2)
            expect(result.day).toEqual(10)
        })
    })
})

// gregorian, ethiopic and nepali

describe('date conversion from', () => {
    describe('ethiopic to gregorian', () => {
        it('should convert a date', () => {})
        it('should convert a date if "ethiopian" is passed instad of "ethiopic"', () => {})
    })
    describe('nepali to gregorian', () => {
        it('should convert a date', () => {})
    })
})
