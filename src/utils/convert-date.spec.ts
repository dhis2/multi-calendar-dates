import { convertFromIso8601 } from './convert-date'

describe('date conversion from gregorian', () => {
    describe('to ethiopic', () => {
        it('should convert a date', () => {
            const result = convertFromIso8601('2024-05-23', 'ethiopic')
            expect(result.eraYear).toEqual(2016)
            expect(result.year).toEqual(7516)
            expect(result.month).toEqual(9)
            expect(result.day).toEqual(15)
        })
        it('should convert a date if "ethiopian" is passed instad of "ethiopic"', () => {
            const result = convertFromIso8601('2024-05-23', 'ethiopian' as any)
            expect(result.eraYear).toEqual(2016)
            expect(result.year).toEqual(7516)
            expect(result.month).toEqual(9)
            expect(result.day).toEqual(15)
        })
    })
    describe('to nepali', () => {
        it('should convert a date', () => {
            const result = convertFromIso8601('2024-05-23', 'nepali')
            expect(result.eraYear).toEqual(2081)
            expect(result.year).toEqual(2081)
            expect(result.month).toEqual(2)
            expect(result.day).toEqual(10)
        })
    })
    it('should convert to islamic date', () => {
        const result = convertFromIso8601('2024-05-23', 'islamic')
        expect(result.eraYear).toEqual(1445)
        expect(result.year).toEqual(1445)
        expect(result.month).toEqual(11)
        expect(result.day).toEqual(15)
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
