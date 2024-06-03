import { validateDateString } from './validate-date-string'

describe('validateDateString (gregory)', () => {
    it('should return valid for a date with dashes as delimiter', () => {
        const validation = validateDateString('2024-02-02')
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should return valid for a date with dashes as slashes', () => {
        const validation = validateDateString('2024/02/02')
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should return valid for a date with dashes as dots', () => {
        const validation = validateDateString('2024.02.02')
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should return an error message for a date with mixed delimiters', () => {
        expect(validateDateString('2024/02.02').errorMessage).toBe(
            'Date string is invalid, received "2024/02.02"'
        )
    })

    it('should return an error message for a date missing year digits', () => {
        expect(validateDateString('200.02.02').errorMessage).toBe(
            'Date string is invalid, received "200.02.02"'
        )
    })

    it('should return an error message for a date missing month digits', () => {
        expect(validateDateString('2000.2.02').errorMessage).toBe(
            'Date string is invalid, received "2000.2.02"'
        )
    })

    it('should return an error message for a date missing day digits', () => {
        expect(validateDateString('2000.02.2').errorMessage).toBe(
            'Date string is invalid, received "2000.02.2"'
        )
    })

    it('should return an error message when the value is out of range', () => {
        expect(validateDateString('2025-12-32').errorMessage).toBe(
            'value out of range: 1 <= 32 <= 31'
        )
    })
})

describe('validateDateString (ethiopic)', () => {
    it('should return valid for a date with dashes as delimiter', () => {
        const validation = validateDateString('2015-13-06', {
            calendar: 'ethiopic',
        })
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should return valid for a date with dashes as slashes', () => {
        const validation = validateDateString('2015-13-06', {
            calendar: 'ethiopic',
        })
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should return valid for a date with dashes as dots', () => {
        const validation = validateDateString('2015-13-06', {
            calendar: 'ethiopic',
        })
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should return an error message for a date with mixed delimiters', () => {
        expect(
            validateDateString('2015.13/06', { calendar: 'ethiopic' })
                .errorMessage
        ).toBe('Date string is invalid, received "2015.13/06"')
    })

    it('should return an error message for a date missing year digits', () => {
        expect(
            validateDateString('201.13/06', { calendar: 'ethiopic' })
                .errorMessage
        ).toBe('Date string is invalid, received "201.13/06"')
    })

    it('should return an error message for a date missing month digits', () => {
        expect(
            validateDateString('201.1/06', { calendar: 'ethiopic' })
                .errorMessage
        ).toBe('Date string is invalid, received "201.1/06"')
    })

    it('should return an error message for a date missing day digits', () => {
        expect(
            validateDateString('2015.13/6', { calendar: 'ethiopic' })
                .errorMessage
        ).toBe('Date string is invalid, received "2015.13/6"')
    })

    it('should return an error message when the value is out of range', () => {
        expect(
            validateDateString('2015-14-01', { calendar: 'ethiopic' })
                .errorMessage
        ).toBe('value out of range: 1 <= 14 <= 13')
    })
})

describe('validateDateString (nepali)', () => {
    it('should return valid for a date with dashes as delimiter', () => {
        expect(
            validateDateString('2080-10-29', { calendar: 'nepali' }).isValid
        ).toBe(true)
    })

    it('should return valid for a date with dashes as slashes', () => {
        expect(
            validateDateString('2080/10/29', { calendar: 'nepali' }).isValid
        ).toBe(true)
    })

    it('should return valid for a date with dashes as dots', () => {
        expect(
            validateDateString('2080.10.29', { calendar: 'nepali' }).isValid
        ).toBe(true)
    })

    it('should return an error message for a date with mixed delimiters', () => {
        expect(
            validateDateString('2080.10/29', { calendar: 'nepali' })
                .errorMessage
        ).toBe('Date string is invalid, received "2080.10/29"')
    })

    it('should return an error message for a date missing year digits', () => {
        expect(
            validateDateString('280.10.29', { calendar: 'nepali' }).errorMessage
        ).toBe('Date string is invalid, received "280.10.29"')
    })

    it('should return an error message for a date missing month digits', () => {
        expect(
            validateDateString('2080.1.29', { calendar: 'nepali' }).errorMessage
        ).toBe('Date string is invalid, received "2080.1.29"')
    })

    it('should return an error message for a date missing day digits', () => {
        expect(
            validateDateString('2080.10.9', { calendar: 'nepali' }).errorMessage
        ).toBe('Date string is invalid, received "2080.10.9"')
    })

    it('should return an error message when day is out of range', () => {
        expect(
            validateDateString('2080.04.33', { calendar: 'nepali' })
                .errorMessage
        ).toBe('Day 33 is out of range: 1 <= 33 <= 32.')
    })

    it('should return an error message when month is out of range', () => {
        expect(
            validateDateString('2080.13.33', { calendar: 'nepali' })
                .errorMessage
        ).toBe('Month 13 is out of range: 1 <= 13 <= 12.')
    })

    it('should return an error message when year is out of supported range', () => {
        expect(
            validateDateString('2101.04.33', { calendar: 'nepali' })
                .errorMessage
        ).toBe('Year 2101 is out of range.')
    })
})

// @todo: add tests for warning scenarios
