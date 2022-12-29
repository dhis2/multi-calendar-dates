Feature: Nepali Calendar fixed periods
    Background: Set Calendar
        Given the calendar type is "nepali"
        And the locale is set to "en-NP"

    Scenario:  Number of generated periods
        Given the calendar type is "nepali"
        When a year is provided along a period
            | year | periodType    | periodCount |
            | 2078 | MONTHLY       | 12          |
            | 2078 | DAILY         | 365         |
            | 2077 | DAILY         | 366         |
            | 2080 | WEEKLY        | 52          |
            | 2078 | WEEKLY        | 53          |
            | 2077 | WEEKLY        | 53          |
            | 2080 | BIWEEKLY      | 26          |
            | 2078 | BIWEEKLY      | 27          |
            | 2078 | BIMONTHLY     | 6           |
            | 2078 | QUARTERLY     | 4           |
            | 2078 | SIXMONTHLY    | 2           |
            | 2078 | SIXMONTHLYAPR | 2           |
            | 2078 | YEARLY        | 10          |
            | 2078 | FYNOV         | 10          |
        Then the correct number of periods should be generated

    Scenario: Generate monthly Periods
        When the user requests "monthly" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel  | periodValue |
            | 1           | Baisakh 2078 | 207801      |
            | 2           | Jestha 2078  | 207802      |
            | 3           | Ashadh 2078  | 207803      |
            | 4           | Shrawan 2078 | 207804      |
            | 5           | Bhadra 2078  | 207805      |
            | 6           | Ashwin 2078  | 207806      |
            | 7           | Kartik 2078  | 207807      |
            | 8           | Mangsir 2078 | 207808      |
            | 9           | Paush 2078   | 207809      |
            | 10          | Mangh 2078   | 207810      |
            | 11          | Falgun 2078  | 207811      |
            | 12          | Chaitra 2078 | 207812      |


        When the user requests "monthly" periods for "2077"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel  | periodValue |
            | 1           | Baisakh 2077 | 207701      |
            | 2           | Jestha 2077  | 207702      |
            | 3           | Ashadh 2077  | 207703      |
            | 4           | Shrawan 2077 | 207704      |
            | 5           | Bhadra 2077  | 207705      |
            | 6           | Ashwin 2077  | 207706      |
            | 7           | Kartik 2077  | 207707      |
            | 8           | Mangsir 2077 | 207708      |
            | 9           | Paush 2077   | 207709      |
            | 10          | Mangh 2077   | 207710      |
            | 11          | Falgun 2077  | 207711      |
            | 12          | Chaitra 2077 | 207712      |

    Scenario: Generate daily Periods
        When the user requests "daily" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 1           | 2078-01-01  | 20780101    |
            | 2           | 2078-01-02  | 20780102    |
            | 3           | 2078-01-03  | 20780103    |
            | 93          | 2078-03-31  | 20780331    |
            | 94          | 2078-04-01  | 20780401    |
            | 125         | 2078-04-32  | 20780432    |
            | 365         | 2078-12-30  | 20781230    |

        # leap year
        When the user requests "daily" periods for "2077"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 366         | 2077-12-31  | 20771231    |

    Scenario: Generate Weekly Periods (no start day provided - means starting Monday)
        # Weekly (no start day - means starting Monday)
        When the user requests "weekly" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2077-12-30 - 2078-01-05  | 2078W1      |
            | 2           | Week 2 - 2078-01-06 - 2078-01-12  | 2078W2      |
            | 3           | Week 3 - 2078-01-13 - 2078-01-19  | 2078W3      |
            | 51          | Week 51 - 2078-12-14 - 2078-12-20 | 2078W51     |
            | 52          | Week 52 - 2078-12-21 - 2078-12-27 | 2078W52     |
            | 53          | Week 53 - 2078-12-28 - 2079-01-04 | 2078W53     |


    Scenario: Generate Weekly Periods (Starting Wednesday)
        When the user requests "WEEKLYWED" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2078-01-01 - 2078-01-07  | 2078WedW1   |
            | 2           | Week 2 - 2078-01-08 - 2078-01-14  | 2078WedW2   |
            | 3           | Week 3 - 2078-01-15 - 2078-01-21  | 2078WedW3   |
            | 51          | Week 51 - 2078-12-16 - 2078-12-22 | 2078WedW51  |
            | 52          | Week 52 - 2078-12-23 - 2078-12-29 | 2078WedW52  |
            | 53          | Week 53 - 2078-12-30 - 2079-01-06 | 2078WedW53  |
    Scenario: Generate Weekly Periods (Starting Thursday)
        When the user requests "WEEKLYTHU" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2078-01-02 - 2078-01-08  | 2078ThuW1   |
            | 2           | Week 2 - 2078-01-09 - 2078-01-15  | 2078ThuW2   |
            | 3           | Week 3 - 2078-01-16 - 2078-01-22  | 2078ThuW3   |
            | 50          | Week 50 - 2078-12-10 - 2078-12-16 | 2078ThuW50  |
            | 51          | Week 51 - 2078-12-17 - 2078-12-23 | 2078ThuW51  |
            | 52          | Week 52 - 2078-12-24 - 2078-12-30 | 2078ThuW52  |

    Scenario: Generate Weekly Periods (Starting Saturday)
        When the user requests "WEEKLYSAT" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2078-01-04 - 2078-01-10  | 2078SatW1   |
            | 2           | Week 2 - 2078-01-11 - 2078-01-17  | 2078SatW2   |
            | 3           | Week 3 - 2078-01-18 - 2078-01-24  | 2078SatW3   |
            | 50          | Week 50 - 2078-12-12 - 2078-12-18 | 2078SatW50  |
            | 51          | Week 51 - 2078-12-19 - 2078-12-25 | 2078SatW51  |
            | 52          | Week 52 - 2078-12-26 - 2079-01-02 | 2078SatW52  |

    Scenario: Generate Weekly Periods (Starting Sunday)
        When the user requests "WEEKLYSUN" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2078-01-05 - 2078-01-11  | 2078SunW1   |
            | 2           | Week 2 - 2078-01-12 - 2078-01-18  | 2078SunW2   |
            | 3           | Week 3 - 2078-01-19 - 2078-01-25  | 2078SunW3   |
            | 50          | Week 50 - 2078-12-13 - 2078-12-19 | 2078SunW50  |
            | 51          | Week 51 - 2078-12-20 - 2078-12-26 | 2078SunW51  |
            | 52          | Week 52 - 2078-12-27 - 2079-01-03 | 2078SunW52  |

    Scenario: Generate Bi-Weekly Periods
        When the user requests "BIWEEKLY" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                          | periodValue |
            | 1           | Bi-Week 1 - 2077-12-30 - 2078-01-12  | 2078BiW1    |
            | 2           | Bi-Week 2 - 2078-01-13 - 2078-01-26  | 2078BiW2    |
            | 3           | Bi-Week 3 - 2078-01-27 - 2078-02-09  | 2078BiW3    |
            | 24          | Bi-Week 24 - 2078-11-16 - 2078-11-29 | 2078BiW24   |
            | 25          | Bi-Week 25 - 2078-11-30 - 2078-12-13 | 2078BiW25   |
            | 26          | Bi-Week 26 - 2078-12-14 - 2078-12-27 | 2078BiW26   |

    Scenario: Generate Bi-Monthly Periods
        When the user requests "BIMONTHLY" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel           | periodValue |
            | 1           | Baisakh - Jestha 2078 | 207801B     |
            | 2           | Ashadh - Shrawan 2078 | 207802B     |
            | 3           | Bhadra - Ashwin 2078  | 207803B     |
            | 4           | Kartik - Mangsir 2078 | 207804B     |
            | 5           | Paush - Mangh 2078    | 207805B     |
            | 6           | Falgun - Chaitra 2078 | 207806B     |

    Scenario: Generate Quarterly Periods
        When the user requests "QUARTERLY" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel           | periodValue |
            | 1           | Baisakh - Ashadh 2078 | 2078Q1      |
            | 2           | Shrawan - Ashwin 2078 | 2078Q2      |
            | 3           | Kartik - Paush 2078   | 2078Q3      |
            | 4           | Mangh - Chaitra 2078  | 2078Q4      |

    Scenario: Generate Quarterly Periods starting November
        When the user requests "QUARTERLYNOV" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                | periodValue    |
            | 1           | Falgun 2078 - Baisakh 2079 | 2078NovemberQ1 |
            | 2           | Jestha - Shrawan 2079      | 2078NovemberQ2 |
            | 3           | Bhadra - Kartik 2079       | 2078NovemberQ3 |
            | 4           | Mangsir - Mangh 2079       | 2078NovemberQ4 |

    Scenario: Generate Six-Monthly Periods
        When the user requests "SIXMONTHLY" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel           | periodValue |
            | 1           | Baisakh - Ashwin 2078 | 2078S1      |
            | 2           | Kartik - Chaitra 2078 | 2078S2      |

    Scenario: Generate Six-Monthly Periods (starting November)
        When the user requests "SIXMONTHLYNOV" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                | periodValue    |
            | 1           | Falgun 2078 - Shrawan 2079 | 2078NovemberS1 |
            | 2           | Bhadra - Mangh 2079        | 2078NovemberS2 |

    Scenario: Generate Six-Monthly Periods (starting April)
        When the user requests "SIXMONTHLYAPR" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel              | periodValue |
            | 1           | Shrawan - Paush 2078     | 2078AprilS1 |
            | 2           | Mangh 2078 - Ashadh 2079 | 2078AprilS2 |

    Scenario: Generate Yearly Periods
        When the user requests "YEARLY" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 1           | 2078        | 2078        |
            | 2           | 2077        | 2077        |
            | 3           | 2076        | 2076        |
            | 4           | 2075        | 2075        |
            | 5           | 2074        | 2074        |
            | 6           | 2073        | 2073        |
            | 7           | 2072        | 2072        |
            | 8           | 2071        | 2071        |
            | 9           | 2070        | 2070        |
            | 10          | 2069        | 2069        |

    Scenario: Generate periods for Financial Year starting November
        When the user requests "FYNOV" periods for "2078"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel              | periodValue |
            | 1           | Falgun 2078 - Mangh 2079 | 2078Nov     |
            | 2           | Falgun 2077 - Mangh 2078 | 2077Nov     |
            | 3           | Falgun 2076 - Mangh 2077 | 2076Nov     |
            | 4           | Falgun 2075 - Mangh 2076 | 2075Nov     |
            | 5           | Falgun 2074 - Mangh 2075 | 2074Nov     |
            | 6           | Falgun 2073 - Mangh 2074 | 2073Nov     |
            | 7           | Falgun 2072 - Mangh 2073 | 2072Nov     |
            | 8           | Falgun 2071 - Mangh 2072 | 2071Nov     |
            | 9           | Falgun 2070 - Mangh 2071 | 2070Nov     |
            | 10          | Falgun 2069 - Mangh 2070 | 2069Nov     |
