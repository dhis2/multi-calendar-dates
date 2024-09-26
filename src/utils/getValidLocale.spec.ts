import getValidLocale from './getValidLocale'

describe('getValidLocale', () => {
    it('returns language only for a valid language', () => {
        const requestedLocale = 'pt'
        const outputLocale = 'pt'
        expect(getValidLocale(requestedLocale)).toEqual(outputLocale)
    })

    it('returns language-region from java format', () => {
        const requestedLocale = 'pt_BR'
        const outputLocale = 'pt-BR'
        expect(getValidLocale(requestedLocale)).toEqual(outputLocale)
    })

    it('returns language-region from valid ISO format', () => {
        const requestedLocale = 'pt-BR'
        const outputLocale = 'pt-BR'
        expect(getValidLocale(requestedLocale)).toEqual(outputLocale)
    })

    it('returns language-script-region from DHIS2 format', () => {
        const requestedLocale = 'uz_UZ_Cyrl'
        const outputLocale = 'uz-Cyrl-UZ'
        expect(getValidLocale(requestedLocale)).toEqual(outputLocale)
    })

    it('returns undefined for an invalid locale', () => {
        const requestedLocale = 'pb'
        const outputLocale = undefined
        expect(getValidLocale(requestedLocale)).toEqual(outputLocale)
    })
})
