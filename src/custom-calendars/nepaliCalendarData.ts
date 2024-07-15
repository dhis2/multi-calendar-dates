type NepaliData = {
    [nepaliYear: number]: number[]
}

/**
 * Data for the nepali calendar.
 *
 * - The key (1970...) is the Nepali year.
 * - The first colummn is what day does the year starts on Paush.
 *    - The year always starts in Paush (the 9th month) but it is somewhere between 17 to 19th of Paush.
 * - The other 12 columns show how many days are in each month.
 *
 * The data starts from 1970 (1913 in gregorian calendar) to 2100 (2044 in gregorian calendar)
 */
export const NEPALI_CALENDAR_DATA: NepaliData = {
    // This data are from http://www.ashesh.com.np
    1970: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1971: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    1972: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    1973: [19, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    1974: [19, 31, 31, 32, 30, 31, 31, 30, 29, 30, 29, 30, 30],
    1975: [18, 31, 31, 32, 32, 30, 31, 30, 29, 30, 29, 30, 30],
    1976: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1977: [18, 31, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    1978: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1979: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    1980: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1981: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    1982: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1983: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    1984: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1985: [18, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    1986: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1987: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    1988: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    1989: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    1990: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1991: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    // These data are from http://nepalicalendar.rat32.com/index.php
    1992: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    1993: [18, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    1994: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1995: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    1996: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    1997: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1998: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    1999: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2000: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2001: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2002: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2003: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2004: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2005: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2006: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2007: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2008: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2009: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2010: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2011: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2012: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2013: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2014: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2015: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2016: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2017: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2018: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2019: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2020: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2021: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2022: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2023: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2024: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2025: [18, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2026: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2027: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2028: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2029: [18, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2030: [17, 31, 32, 31, 32, 31, 30, 30, 30, 30, 30, 30, 31],
    2031: [17, 31, 32, 31, 32, 31, 31, 31, 31, 31, 31, 31, 31],
    2032: [17, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
    2033: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2034: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2035: [17, 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2036: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2037: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2038: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2039: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2040: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2041: [18, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2042: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2043: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2044: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2045: [18, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2046: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2047: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2048: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2049: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2050: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2051: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2052: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2053: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2054: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2055: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 29, 30],
    2056: [17, 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30],
    2057: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2058: [17, 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2059: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2060: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2061: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2062: [17, 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31],
    2063: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2064: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2065: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2066: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31],
    2067: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2068: [17, 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2069: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2070: [17, 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30],
    2071: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2072: [17, 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2073: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
    2074: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2075: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2076: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    2077: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2078: [17, 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
    2079: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
    2080: [16, 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
    // These data are from http://www.ashesh.com.np/nepali-calendar/
    2081: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
    2082: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2083: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2084: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2085: [17, 31, 32, 31, 32, 31, 31, 30, 30, 29, 30, 30, 30],
    2086: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2087: [16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
    2088: [16, 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30],
    2089: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2090: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2091: [16, 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30],
    2092: [16, 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2093: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2094: [17, 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
    2095: [17, 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30],
    2096: [17, 30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30],
    2097: [17, 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
    2098: [17, 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31],
    2099: [17, 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30],
    2100: [17, 31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30],
}
