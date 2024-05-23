import { convertFromIso8601, convertToIso8601 } from '../'

describe('date conversion from gregorian', () => {
    describe('to ethiopic', () => {
        it('should convert a date', () => {
            const result = convertFromIso8601('2024-05-23', 'ethiopic')
            expect(result).toMatchObject({
                year: 7516,
                eraYear: 2016,
                month: 9,
                day: 15,
            })
        })
        it('should convert a date object', () => {
            const result = convertFromIso8601(
                {
                    year: 2024,
                    month: 5,
                    day: 23,
                },
                'ethiopic'
            )
            expect(result).toMatchObject({
                year: 7516,
                eraYear: 2016,
                month: 9,
                day: 15,
            })
        })
        it('should convert a date if "ethiopian" is passed instad of "ethiopic"', () => {
            const result = convertFromIso8601('2024-05-23', 'ethiopian' as any)
            expect(result).toMatchObject({
                year: 7516,
                eraYear: 2016,
                month: 9,
                day: 15,
            })
        })
    })
    describe('to nepali', () => {
        it('should convert a date', () => {
            const result = convertFromIso8601('2024-05-23', 'nepali')
            expect(result).toMatchObject({
                eraYear: 2081,
                year: 2081,
                month: 2,
                day: 10,
            })
        })

        it('should convert a date object', () => {
            const result = convertFromIso8601(
                {
                    year: 2024,
                    month: 5,
                    day: 23,
                },
                'nepali'
            )
            expect(result).toMatchObject({
                eraYear: 2081,
                year: 2081,
                month: 2,
                day: 10,
            })
        })
    })
    it('should convert to islamic date', () => {
        const result = convertFromIso8601('2024-05-23', 'islamic')
        expect(result).toMatchObject({
            eraYear: 1445,
            year: 1445,
            month: 11,
            day: 15,
        })
    })
})

describe('date conversion to gregorian', () => {
    describe('ethiopic to gregorian', () => {
        it('should convert a date taking care of setting the correct era for ethiopic calendar', () => {
            const result = convertToIso8601('2016-09-15', 'ethiopic')
            expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
        })
        it('should convert a date if "ethiopian" is passed instad of "ethiopic"', () => {
            const result = convertToIso8601('2016-09-15', 'ethiopian' as any)
            expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
        })
        it('should convert a date object', () => {
            const result = convertToIso8601(
                {
                    year: 2016,
                    month: 9,
                    day: 15,
                },
                'ethiopic'
            )
            expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
        })
    })
    describe('nepali to gregorian', () => {
        it('should convert a date', () => {
            const result = convertToIso8601('2081-02-10', 'nepali')
            expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
        })
        it('should convert a date object', () => {
            const result = convertToIso8601(
                {
                    year: 2081,
                    month: 2,
                    day: 10,
                },
                'nepali'
            )
            expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
        })
    })
    it('islamic to gregorian', () => {
        const result = convertToIso8601('1445-11-15', 'islamic')
        expect(result).toMatchObject({ year: 2024, month: 5, day: 23 })
    })
})
