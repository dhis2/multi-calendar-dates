Feature: Gregorian Calendar fixed periods
    Background: Set Calendar
        Given the calendar type is "gregory"

    Scenario:  Number of generated periods
        Given the calendar type is "gregory"
        When a year is provided along a period
            | year | periodType    | periodCount |
            | 2022 | MONTHLY       | 12          |
            | 2022 | DAILY         | 365         |
            | 2020 | DAILY         | 366         |
            | 2023 | WEEKLY        | 52          |
            | 2022 | WEEKLY        | 52          |
            | 2020 | WEEKLY        | 53          |
            | 2015 | WEEKLY        | 53          |
            | 2022 | BIWEEKLY      | 26          |
            | 2022 | BIMONTHLY     | 6           |
            | 2022 | QUARTERLY     | 4           |
            | 2022 | SIXMONTHLY    | 2           |
            | 2022 | SIXMONTHLYAPR | 2           |
            | 2022 | YEARLY        | 10          |
            | 2022 | FYNOV         | 10          |
        Then the correct number of periods should be generated

    Scenario: Generate monthly Periods
        When the user requests "monthly" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel   | periodValue |
            | 1           | January 2022  | 202201      |
            | 2           | February 2022 | 202202      |
            | 11          | November 2022 | 202211      |
            | 12          | December 2022 | 202212      |

    Scenario: Generate daily Periods
        When the user requests "daily" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 1           | 2022-01-01  | 20220101    |
            | 2           | 2022-01-02  | 20220102    |
            | 3           | 2022-01-03  | 20220103    |
            | 364         | 2022-12-30  | 20221230    |
            | 365         | 2022-12-31  | 20221231    |

        # leap year
        When the user requests "daily" periods for "2020"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 366         | 2020-12-31  | 20201231    |

    Scenario: Generate Weekly Periods (no start day provided - means starting Monday)
        # Weekly (no start day - means starting Monday)
        When the user requests "weekly" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2022-01-03 - 2022-01-09  | 2022W1      |
            | 2           | Week 2 - 2022-01-10 - 2022-01-16  | 2022W2      |
            | 3           | Week 3 - 2022-01-17 - 2022-01-23  | 2022W3      |
            | 51          | Week 51 - 2022-12-19 - 2022-12-25 | 2022W51     |
            | 52          | Week 52 - 2022-12-26 - 2023-01-01 | 2022W52     |

    Scenario: Generate Weekly Periods (Starting Wednesday)
        # Weekly starting Wednesday
        When the user requests "WEEKLYWED" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2021-12-29 - 2022-01-04  | 2022WedW1   |
            | 2           | Week 2 - 2022-01-05 - 2022-01-11  | 2022WedW2   |
            | 3           | Week 3 - 2022-01-12 - 2022-01-18  | 2022WedW3   |
            | 51          | Week 51 - 2022-12-14 - 2022-12-20 | 2022WedW51  |
            | 52          | Week 52 - 2022-12-21 - 2022-12-27 | 2022WedW52  |
            | 53          | Week 53 - 2022-12-28 - 2023-01-03 | 2022WedW53  |

    Scenario: Generate Weekly Periods (Starting Thursday)
        When the user requests "WEEKLYTHU" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2021-12-30 - 2022-01-05  | 2022ThuW1   |
            | 2           | Week 2 - 2022-01-06 - 2022-01-12  | 2022ThuW2   |
            | 3           | Week 3 - 2022-01-13 - 2022-01-19  | 2022ThuW3   |
            | 50          | Week 50 - 2022-12-08 - 2022-12-14 | 2022ThuW50  |
            | 51          | Week 51 - 2022-12-15 - 2022-12-21 | 2022ThuW51  |
            | 52          | Week 52 - 2022-12-22 - 2022-12-28 | 2022ThuW52  |

    Scenario: Generate Weekly Periods (Starting Saturday)
        When the user requests "WEEKLYSAT" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2022-01-01 - 2022-01-07  | 2022SatW1   |
            | 2           | Week 2 - 2022-01-08 - 2022-01-14  | 2022SatW2   |
            | 3           | Week 3 - 2022-01-15 - 2022-01-21  | 2022SatW3   |
            | 50          | Week 50 - 2022-12-10 - 2022-12-16 | 2022SatW50  |
            | 51          | Week 51 - 2022-12-17 - 2022-12-23 | 2022SatW51  |
            | 52          | Week 52 - 2022-12-24 - 2022-12-30 | 2022SatW52  |
    Scenario: Generate Weekly Periods (Starting Sunday)
        When the user requests "WEEKLYSUN" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2022-01-02 - 2022-01-08  | 2022SunW1   |
            | 2           | Week 2 - 2022-01-09 - 2022-01-15  | 2022SunW2   |
            | 3           | Week 3 - 2022-01-16 - 2022-01-22  | 2022SunW3   |
            | 50          | Week 50 - 2022-12-11 - 2022-12-17 | 2022SunW50  |
            | 51          | Week 51 - 2022-12-18 - 2022-12-24 | 2022SunW51  |
            | 52          | Week 52 - 2022-12-25 - 2022-12-31 | 2022SunW52  |

    Scenario: Generate Bi-Weekly Periods
        When the user requests "BIWEEKLY" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                          | periodValue |
            | 1           | Bi-Week 1 - 2022-01-03 - 2022-01-16  | 2022BiW1    |
            | 2           | Bi-Week 2 - 2022-01-17 - 2022-01-30  | 2022BiW2    |
            | 3           | Bi-Week 3 - 2022-01-31 - 2022-02-13  | 2022BiW3    |
            | 24          | Bi-Week 24 - 2022-11-21 - 2022-12-04 | 2022BiW24   |
            | 25          | Bi-Week 25 - 2022-12-05 - 2022-12-18 | 2022BiW25   |
            | 26          | Bi-Week 26 - 2022-12-19 - 2023-01-01 | 2022BiW26   |

    Scenario: Generate Bi-Monthly Periods
        When the user requests "BIMONTHLY" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel              | periodValue |
            | 1           | January - February 2022  | 202201B     |
            | 2           | March - April 2022       | 202202B     |
            | 3           | May - June 2022          | 202203B     |
            | 4           | July - August 2022       | 202204B     |
            | 5           | September - October 2022 | 202205B     |
            | 6           | November - December 2022 | 202206B     |

    Scenario: Generate Quarterly Periods
        When the user requests "QUARTERLY" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel             | periodValue |
            | 1           | January - March 2022    | 2022Q1      |
            | 2           | April - June 2022       | 2022Q2      |
            | 3           | July - September 2022   | 2022Q3      |
            | 4           | October - December 2022 | 2022Q4      |

    Scenario: Generate Quarterly Periods starting November
        When the user requests "QUARTERLYNOV" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                  | periodValue    |
            | 1           | November 2022 - January 2023 | 2022NovemberQ1 |
            | 2           | February - April 2023        | 2022NovemberQ2 |
            | 3           | May - July 2023              | 2022NovemberQ3 |
            | 4           | August - October 2023        | 2022NovemberQ4 |

    Scenario: Generate Six-Monthly Periods
        When the user requests "SIXMONTHLY" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel          | periodValue |
            | 1           | January - June 2022  | 2022S1      |
            | 2           | July - December 2022 | 2022S2      |

    Scenario: Generate Six-Monthly Periods (starting November)
        When the user requests "SIXMONTHLYNOV" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                | periodValue    |
            | 1           | November 2022 - April 2023 | 2022NovemberS1 |
            | 2           | May - October 2023         | 2022NovemberS2 |

    Scenario: Generate Six-Monthly Periods (starting April)
        When the user requests "SIXMONTHLYAPR" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel               | periodValue |
            | 1           | April - September 2022    | 2022AprilS1 |
            | 2           | October 2022 - March 2023 | 2022AprilS2 |

    Scenario: Generate Yearly Periods
        When the user requests "YEARLY" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 1           | 2022        | 2022        |
            | 2           | 2021        | 2021        |
            | 3           | 2020        | 2020        |
            | 4           | 2019        | 2019        |
            | 5           | 2018        | 2018        |
            | 6           | 2017        | 2017        |
            | 7           | 2016        | 2016        |
            | 8           | 2015        | 2015        |
            | 9           | 2014        | 2014        |
            | 10          | 2013        | 2013        |

    Scenario: Generate periods for Financial Year starting November
        When the user requests "FYNOV" periods for "2022"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                  | periodValue |
            | 1           | November 2022 - October 2023 | 2022Nov     |
            | 2           | November 2021 - October 2022 | 2021Nov     |
            | 3           | November 2020 - October 2021 | 2020Nov     |
            | 4           | November 2019 - October 2020 | 2019Nov     |
            | 5           | November 2018 - October 2019 | 2018Nov     |
            | 6           | November 2017 - October 2018 | 2017Nov     |
            | 7           | November 2016 - October 2017 | 2016Nov     |
            | 8           | November 2015 - October 2016 | 2015Nov     |
            | 9           | November 2014 - October 2015 | 2014Nov     |
            | 10          | November 2013 - October 2014 | 2013Nov     |
