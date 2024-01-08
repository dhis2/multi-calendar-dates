/**
 * This method ensures that a locale is valid and supported by browser, and returns it if it is.
 *
 * It used Intl.DateTimeFormat.supportedLocalesOf to decide whether the locale is valid or not.
 * Intl.DateTimeFormat.supportedLocalesOf takes a locale (or a list of locales) and returns:
 * - an array with the locale if it's valid
 * - an empty array if it's valid but not supported
 * - throws an error if it's not valid
 * @param locale locale to validate and return
 * @returns the locale if it's valid, otherwise undefined
 */
const getValidLocale = (requestedLocale = '') => {
    // this "replace" is to cater for DHIS2 locales using underscore as Java allows both hyphens and underscores
    // while JavaScript expects a hyphen (which is the correct way according to RFC-5646 that both rely on)
    const locale = requestedLocale.replace('_', '-')
    try {
        const result = Intl.DateTimeFormat.supportedLocalesOf(locale)
        if (result && result.length === 1) {
            return locale
        } else {
            return undefined
        }
    } catch (err) {
        return undefined
    }
}

export default getValidLocale
