Feature: Gregorian Calendar fixed periods

    Scenario: Fixed Periods for Gregorian Calendar
        Given the calendar type is gregory
        When a year is provided along a period
            | year | periodType | periodCount |
            | 2022 | MONTHLY    | 12          |
            | 2022 | DAILY      | 365         |
            | 2020 | DAILY      | 366         |
            | 2023 | WEEKLY     | 52          |
            | 2022 | WEEKLY     | 52          |
            | 2020 | WEEKLY     | 53          |
            | 2015 | WEEKLY     | 53          |
        # | 2022 | BIWEEKLY      | 26          |
        # | 2022 | BIMONTHLY     | 6           |
        # | 2022 | QUARTERLY     | 4           |
        # | 2022 | SIXMONTHLY    | 2           |
        # | 2022 | SIXMONTHLYAPR | 2           |
        # | 2022 | YEARLY        | 10          |
        # | 2022 | FYNOV         | 10          |
        Then the correct number of periods should be generated

    Scenario: Generate Fixed Periods for Gregorian Calendar
        Given the calendar type is gregory
        When the periods in a year are requested
            | year | periodType | periodIndex | periodLabel                       | periodValue |
            | 2022 | MONTHLY    | 1           | January 2022                      | 202201      |
            | 2022 | MONTHLY    | 2           | February 2022                     | 202202      |
            | 2022 | MONTHLY    | 11          | November 2022                     | 202211      |
            | 2022 | MONTHLY    | 12          | December 2022                     | 202212      |
            | 2022 | DAILY      | 1           | 2022-01-01                        | 20220101    |
            | 2022 | DAILY      | 2           | 2022-01-02                        | 20220102    |
            | 2022 | DAILY      | 3           | 2022-01-03                        | 20220103    |
            | 2022 | DAILY      | 364         | 2022-12-30                        | 20221230    |
            | 2022 | DAILY      | 365         | 2022-12-31                        | 20221231    |
            | 2020 | DAILY      | 366         | 2020-12-31                        | 20201231    |
            # Weekly (no start day - means starting Monday)
            | 2022 | WEEKLY     | 1           | Week 1 - 2022-01-03 - 2022-01-09  | 2022W1      |
            | 2022 | WEEKLY     | 2           | Week 2 - 2022-01-10 - 2022-01-16  | 2022W2      |
            | 2022 | WEEKLY     | 3           | Week 3 - 2022-01-17 - 2022-01-23  | 2022W3      |
            | 2022 | WEEKLY     | 51          | Week 51 - 2022-12-19 - 2022-12-25 | 2022W51     |
            | 2022 | WEEKLY     | 52          | Week 52 - 2022-12-26 - 2023-01-01 | 2022W52     |
            # Weekly starting Wednesday
            | 2022 | WEEKLYWED  | 1           | Week 1 - 2021-12-29 - 2022-01-04  | 2022WedW1   |
            | 2022 | WEEKLYWED  | 2           | Week 2 - 2022-01-05 - 2022-01-11  | 2022WedW2   |
            | 2022 | WEEKLYWED  | 3           | Week 3 - 2022-01-12 - 2022-01-18  | 2022WedW3   |
            | 2022 | WEEKLYWED  | 51          | Week 51 - 2022-12-14 - 2022-12-20 | 2022WedW51  |
            | 2022 | WEEKLYWED  | 52          | Week 52 - 2022-12-21 - 2022-12-27 | 2022WedW52  |
            | 2022 | WEEKLYWED  | 53          | Week 53 - 2022-12-28 - 2023-01-03 | 2022WedW53  |
            # Weekly starting Thursday
            | 2022 | WEEKLYTHU  | 1           | Week 1 - 2021-12-30 - 2022-01-05  | 2022ThuW1   |
            | 2022 | WEEKLYTHU  | 2           | Week 2 - 2022-01-06 - 2022-01-12  | 2022ThuW2   |
            | 2022 | WEEKLYTHU  | 3           | Week 3 - 2022-01-13 - 2022-01-19  | 2022ThuW3   |
            | 2022 | WEEKLYTHU  | 50          | Week 50 - 2022-12-08 - 2022-12-14 | 2022ThuW50  |
            | 2022 | WEEKLYTHU  | 51          | Week 51 - 2022-12-15 - 2022-12-21 | 2022ThuW51  |
            | 2022 | WEEKLYTHU  | 52          | Week 52 - 2022-12-22 - 2022-12-28 | 2022ThuW52  |
            # Weekly starting Saturday
            | 2022 | WEEKLYSAT  | 1           | Week 1 - 2022-01-01 - 2022-01-07  | 2022SatW1   |
            | 2022 | WEEKLYSAT  | 2           | Week 2 - 2022-01-08 - 2022-01-14  | 2022SatW2   |
            | 2022 | WEEKLYSAT  | 3           | Week 3 - 2022-01-15 - 2022-01-21  | 2022SatW3   |
            | 2022 | WEEKLYSAT  | 50          | Week 50 - 2022-12-10 - 2022-12-16 | 2022SatW50  |
            | 2022 | WEEKLYSAT  | 51          | Week 51 - 2022-12-17 - 2022-12-23 | 2022SatW51  |
            | 2022 | WEEKLYSAT  | 52          | Week 52 - 2022-12-24 - 2022-12-30 | 2022SatW52  |
            # Weekly starting Sunday
            | 2022 | WEEKLYSUN  | 1           | Week 1 - 2022-01-02 - 2022-01-08  | 2022SunW1   |
            | 2022 | WEEKLYSUN  | 2           | Week 2 - 2022-01-09 - 2022-01-15  | 2022SunW2   |
            | 2022 | WEEKLYSUN  | 3           | Week 3 - 2022-01-16 - 2022-01-22  | 2022SunW3   |
            | 2022 | WEEKLYSUN  | 50          | Week 50 - 2022-12-11 - 2022-12-17 | 2022SunW50  |
            | 2022 | WEEKLYSUN  | 51          | Week 51 - 2022-12-18 - 2022-12-24 | 2022SunW51  |
            | 2022 | WEEKLYSUN  | 52          | Week 52 - 2022-12-25 - 2022-12-31 | 2022SunW52  |

            | 2022 | BIWEEKLY | 1  | Bi-Week 1 - 2022-01-03 - 2022-01-16  | 2022BiW1  |
            | 2022 | BIWEEKLY | 2  | Bi-Week 2 - 2022-01-17 - 2022-01-30  | 2022BiW2  |
            | 2022 | BIWEEKLY | 3  | Bi-Week 3 - 2022-01-31 - 2022-02-13  | 2022BiW3  |
            | 2022 | BIWEEKLY | 24 | Bi-Week 24 - 2022-11-21 - 2022-12-04 | 2022BiW24 |
            | 2022 | BIWEEKLY | 25 | Bi-Week 25 - 2022-12-05 - 2022-12-18 | 2022BiW25 |
            | 2022 | BIWEEKLY | 26 | Bi-Week 26 - 2022-12-19 - 2023-01-01 | 2022BiW26 |

            | 2022 | BIMONTHLY | 1 | January - February 2022  | 202201B |
            | 2022 | BIMONTHLY | 2 | March - April 2022       | 202202B |
            | 2022 | BIMONTHLY | 3 | May - June 2022          | 202203B |
            | 2022 | BIMONTHLY | 4 | July - August 2022       | 202204B |
            | 2022 | BIMONTHLY | 5 | September - October 2022 | 202205B |
            | 2022 | BIMONTHLY | 6 | November - December 2022 | 202206B |

            | 2022 | QUARTERLY | 1 | January - March 2022    | 2022Q1 |
            | 2022 | QUARTERLY | 2 | April - June 2022       | 2022Q2 |
            | 2022 | QUARTERLY | 3 | July - September 2022   | 2022Q3 |
            | 2022 | QUARTERLY | 4 | October - December 2022 | 2022Q4 |

            | 2022 | SIXMONTHLY | January - June 2022  | 2022S1 |
            | 2022 | SIXMONTHLY | July - December 2022 | 2022S2 |

        # | 2022 | sixmonthlyApril (SIXMONTHLYAPR) | April - September 2022    | 2022AprilS1 |
        # | 2022 | sixmonthlyApril (SIXMONTHLYAPR) | October 2022 - March 2023 | 2022AprilS2 |

        # | 2022 | yearly (YEARLY) | 2022 | 2022 |
        # | 2022 | yearly (YEARLY) | 2021 | 2021 |
        # | 2022 | yearly (YEARLY) | 2020 | 2020 |
        # | 2022 | yearly (YEARLY) | 2015 | 2015 |
        # | 2022 | yearly (YEARLY) | 2014 | 2014 |
        # | 2022 | yearly (YEARLY) | 2013 | 2013 |

        # | 2022 | financialYearStartingNovember (FYNOV) | 2022 | 2022Nov |
        # | 2022 | financialYearStartingNovember (FYNOV) | 2021 | 2021Nov |
        # | 2022 | financialYearStartingNovember (FYNOV) | 2020 | 2020Nov |
        # | 2022 | financialYearStartingNovember (FYNOV) | 2015 | 2015Nov |
        # | 2022 | financialYearStartingNovember (FYNOV) | 2014 | 2014Nov |
        # | 2022 | financialYearStartingNovember (FYNOV) | 2013 | 2013Nov |
        Then the dates for the period type should be generated
