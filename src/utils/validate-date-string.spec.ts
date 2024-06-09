import { validateDateString } from './validate-date-string'

describe('validateDateString', () => {
    it('should return an error for an empty date string', () => {
        const date = ''
        const validation = validateDateString(date)
        expect(validation.errorMessage).toBe('Date is not given')
        expect(validation.isValid).toBe(false)
    })

    it('should return an error for incorrect date format with missing parts', () => {
        const date = '2015-'
        const validation = validateDateString(date)
        expect(validation.errorMessage).toBe(
            'Date string is invalid, received "2015-"'
        )
        expect(validation.isValid).toBe(false)
    })

    it('should return an error for incorrect date format', () => {
        const date = '2015-11-2015'
        const validation = validateDateString(date)
        expect(validation.errorMessage).toBe(
            'Date string is invalid, received "2015-11-2015"'
        )
        expect(validation.isValid).toBe(false)
    })

    it('should validate dd-mm-yyyy is a correct date format', () => {
        const date = '07-07-2020'
        const validation = validateDateString(date)
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should validate yyyy-mm-dd is a correct date format', () => {
        const date = '2020-07-07'
        const validation = validateDateString(date)
        expect(validation.errorMessage).toBe('')
        expect(validation.isValid).toBe(true)
    })

    it('should validate min date for yyyy-mm-dd format', () => {
        const date = '2015-06-27'
        const minDate = '2015-06-28'
        const options = { minDateString: minDate }

        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe(
            'Date 2015-06-27 is less than the minimum allowed date 2015-06-28.'
        )
        expect(validation.isValid).toBe(false)
    })

    it('should validate max date for yyyy-mm-dd format', () => {
        const date = '2018-06-29'
        const maxDate = '2018-06-28'
        const options = { maxDateString: maxDate }
        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe(
            'Date 2018-06-29 is greater than the maximum allowed date 2018-06-28.'
        )
        expect(validation.isValid).toBe(false)
    })

    it('should validate min date for dd-mm-yyyy format', () => {
        const date = '27-06-2015'
        const minDate = '28-06-2015'
        const options = { minDateString: minDate }

        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe(
            'Date 27-06-2015 is less than the minimum allowed date 28-06-2015.'
        )
        expect(validation.isValid).toBe(false)
    })

    it('should validate max date for dd-mm-yyyy format', () => {
        const date = '29-06-2018'
        const maxDate = '28-06-2018'
        const options = { maxDateString: maxDate }
        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe(
            'Date 29-06-2018 is greater than the maximum allowed date 28-06-2018.'
        )
        expect(validation.isValid).toBe(false)
    })

    it('should validate min date for mixed formats', () => {
        const date = '28-06-2018'
        const minDate = '2018-06-29'

        const options = { minDateString: minDate }
        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe(
            'Date 28-06-2018 is less than the minimum allowed date 2018-06-29.'
        )
        expect(validation.isValid).toBe(false)
    })

    it('should validate max date for mixed formats', () => {
        const date = '29-06-2018'
        const maxDate = '2018-06-28'

        const options = { maxDateString: maxDate }
        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe(
            'Date 29-06-2018 is greater than the maximum allowed date 2018-06-28.'
        )
        expect(validation.isValid).toBe(false)
    })

    it('Should give a warning when date is less than the min date and validation is set to "warning"', () => {
        const date = '27-06-2015'
        const minDate = '28-06-2015'
        const options = { minDateString: minDate, validation: 'warning' }

        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe('')
        expect(validation.warningMessage).toBe(
            'Date 27-06-2015 is less than the minimum allowed date 28-06-2015.'
        )
        expect(validation.isValid).toBe(true)
    })

    it('Should give a warning when date is greater than the max date and validation is set to "warning"', () => {
        const date = '27-06-2015'
        const maxDate = '26-06-2015'
        const options = { maxDateString: maxDate, validation: 'warning' }

        const validation = validateDateString(date, options)
        expect(validation.errorMessage).toBe('')
        expect(validation.warningMessage).toBe(
            'Date 27-06-2015 is greater than the maximum allowed date 26-06-2015.'
        )
        expect(validation.isValid).toBe(true)
    })
})

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

    it('should return an error for non-leap year February 29', () => {
        const date = '2019-02-29'
        const validation = validateDateString(date)
        expect(validation.errorMessage).toBe(
            'value out of range: 1 <= 29 <= 28'
        )
        expect(validation.isValid).toBe(false)
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
