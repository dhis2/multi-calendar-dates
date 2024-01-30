import { Temporal } from '@js-temporal/polyfill'
import { validateDateString } from './validate-date-string'

describe('validateDateString (gregory)', () => {
    it('should return undefined for a date with dashes as delimiter', () => {
        expect(validateDateString('2024-02-02')).toBe(undefined)
    })

    it('should return undefined for a date with dashes as slashes', () => {
        expect(validateDateString('2024/02/02')).toBe(undefined)
    })

    it('should return undefined for a date with dashes as dots', () => {
        expect(validateDateString('2024.02.02')).toBe(undefined)
    })

    it('should return an error message for a date with mixed delimiters', () => {
        expect(validateDateString('2024/02.02')).toBe(
            'Date string is invalid, received "2024/02.02"'
        )
    })

    it('should return an error message for a date missing year digits', () => {
        expect(validateDateString('200.02.02')).toBe(
            'Date string is invalid, received "200.02.02"'
        )
    })

    it('should return an error message for a date missing month digits', () => {
        expect(validateDateString('2000.2.02')).toBe(
            'Date string is invalid, received "2000.2.02"'
        )
    })

    it('should return an error message for a date missing day digits', () => {
        expect(validateDateString('2000.02.2')).toBe(
            'Date string is invalid, received "2000.02.2"'
        )
    })

    it('should return an error message when the value is out of range', () => {
        expect(validateDateString('2025-12-32')).toBe(
            'value out of range: 1 <= 32 <= 31'
        )
    })
})

describe('validateDateString (ethiopic)', () => {
    it('should return undefined for a date with dashes as delimiter', () => {
        expect(validateDateString('2015-13-06', { calendar: 'ethiopic' })).toBe(
            undefined
        )
    })

    it('should return undefined for a date with dashes as slashes', () => {
        expect(validateDateString('2015/13/06', { calendar: 'ethiopic' })).toBe(
            undefined
        )
    })

    it('should return undefined for a date with dashes as dots', () => {
        expect(validateDateString('2015.13.06', { calendar: 'ethiopic' })).toBe(
            undefined
        )
    })

    it('should return an error message for a date with mixed delimiters', () => {
        expect(validateDateString('2015.13/06', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "2015.13/06"'
        )
    })

    it('should return an error message for a date missing year digits', () => {
        expect(validateDateString('201.13/06', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "201.13/06"'
        )
    })

    it('should return an error message for a date missing month digits', () => {
        expect(validateDateString('201.1/06', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "201.1/06"'
        )
    })

    it('should return an error message for a date missing day digits', () => {
        expect(validateDateString('2015.13/6', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "2015.13/6"'
        )
    })

    it('should return an error message when the value is out of range', () => {
        expect(validateDateString('2015-14-01', { calendar: 'ethiopic' })).toBe(
            'value out of range: 1 <= 14 <= 13'
        )
    })
})

describe('validateDateString (nepali)', () => {
    it('should return undefined for a date with dashes as delimiter', () => {
        expect(validateDateString('2080-10-29', { calendar: 'ethiopic' })).toBe(
            undefined
        )
    })

    it('should return undefined for a date with dashes as slashes', () => {
        expect(validateDateString('2080/10/29', { calendar: 'ethiopic' })).toBe(
            undefined
        )
    })

    it('should return undefined for a date with dashes as dots', () => {
        expect(validateDateString('2080.10.29', { calendar: 'ethiopic' })).toBe(
            undefined
        )
    })

    it('should return an error message for a date with mixed delimiters', () => {
        expect(validateDateString('2080.10/29', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "2080.10/29"'
        )
    })

    it('should return an error message for a date missing year digits', () => {
        expect(validateDateString('280.10.29', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "280.10.29"'
        )
    })

    it('should return an error message for a date missing month digits', () => {
        expect(validateDateString('2080.1.29', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "2080.1.29"'
        )
    })

    it('should return an error message for a date missing day digits', () => {
        expect(validateDateString('2080.10.9', { calendar: 'ethiopic' })).toBe(
            'Date string is invalid, received "2080.10.9"'
        )
    })

    it('should return an error message when the value is out of range', () => {
        expect(validateDateString('2080.14.30', { calendar: 'ethiopic' })).toBe(
            'value out of range: 1 <= 14 <= 13'
        )
    })
})
