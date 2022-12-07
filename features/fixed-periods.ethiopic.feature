Feature: Ethiopic Calendar fixed periods

    Scenario: Fixed Periods for Ethopic Calendar
        Given the calendar type is ethiopic
        When a year is provided along a period
            | year | periodType | periodCount |
            | 2015 | MONTHLY    | 13          |
            # 2015 is leap ethiopic year
            | 2015 | DAILY      | 366         |
            # 2014 is not a leap ethiopic year
            | 2014 | DAILY      | 365         |
            | 2014 | WEEKLY     | 52          |
            | 2015 | WEEKLY     | 52          |
            | 2011 | WEEKLY     | 53          |
            | 2015 | BIWEEKLY   | 26          |
            # | 2015 | BIMONTHLY     | 7           |
            # | 2015 | QUARTERLY     | 4           |
            # | 2015 | SIXMONTHLY    | 2           |
            # | 2015 | SIXMONTHLYAPR | 2           |
            | 2015 | YEARLY     | 10          |
            | 2015 | FYNOV      | 10          |
        Then the correct number of periods should be generated

    Scenario: Generate monthly fixed Periods
        Given the calendar type is ethiopic
        When the user requests "monthly" periods for "2015"
        Then the dates for the period type should be generated
            # Monthly
            | year | periodType | periodIndex | periodLabel   | periodValue |
            | 2015 | MONTHLY    | 1           | Meskerem 2015 | 201501      |
            | 2015 | MONTHLY    | 2           | Tekemt 2015   | 201502      |
            | 2015 | MONTHLY    | 11          | Hamle 2015    | 201511      |
            | 2015 | MONTHLY    | 12          | Nehasse 2015  | 201512      |
            ## ToDo: check if we want the 13 month displayed in monthly view
            | 2015 | MONTHLY    | 13          | Pagumen 2015  | 201513      |

# Given the calendar type is ethiopic
# When the user requests "daily" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel | periodValue |
#     | 1           | 2015-01-01  | 20150101    |
#     | 2           | 2015-01-02  | 20150102    |
#     | 3           | 2015-01-03  | 20150103    |
#     | 364         | 2015-12-30  | 20151230    |
#     | 365         | 2015-12-31  | 20151231    |

# # leap year
# Given the calendar type is ethiopic
# When the user requests "daily" periods for "2020"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel | periodValue |
#     | 366         | 2020-12-31  | 20201231    |

# # Weekly (no start day - means starting Monday)
# Given the calendar type is ethiopic
# When the user requests "weekly" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel                       | periodValue |
#     | 1           | Week 1 - 2015-01-03 - 2015-01-09  | 2015W1      |
#     | 2           | Week 2 - 2015-01-10 - 2015-01-16  | 2015W2      |
#     | 3           | Week 3 - 2015-01-17 - 2015-01-23  | 2015W3      |
#     | 51          | Week 51 - 2015-12-19 - 2015-12-25 | 2015W51     |
#     | 52          | Week 52 - 2015-12-26 - 2023-01-01 | 2015W52     |

# # Weekly starting Wednesday
# Given the calendar type is ethiopic
# When the user requests "WEEKLYWED" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel                       | periodValue |
#     | 1           | Week 1 - 2021-12-29 - 2015-01-04  | 2015WedW1   |
#     | 2           | Week 2 - 2015-01-05 - 2015-01-11  | 2015WedW2   |
#     | 3           | Week 3 - 2015-01-12 - 2015-01-18  | 2015WedW3   |
#     | 51          | Week 51 - 2015-12-14 - 2015-12-20 | 2015WedW51  |
#     | 52          | Week 52 - 2015-12-21 - 2015-12-27 | 2015WedW52  |
#     | 53          | Week 53 - 2015-12-28 - 2023-01-03 | 2015WedW53  |

# # Weekly starting Thursday
# Given the calendar type is ethiopic
# When the user requests "WEEKLYTHU" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel                       | periodValue |
#     | 1           | Week 1 - 2021-12-30 - 2015-01-05  | 2015ThuW1   |
#     | 2           | Week 2 - 2015-01-06 - 2015-01-12  | 2015ThuW2   |
#     | 3           | Week 3 - 2015-01-13 - 2015-01-19  | 2015ThuW3   |
#     | 50          | Week 50 - 2015-12-08 - 2015-12-14 | 2015ThuW50  |
#     | 51          | Week 51 - 2015-12-15 - 2015-12-21 | 2015ThuW51  |
#     | 52          | Week 52 - 2015-12-22 - 2015-12-28 | 2015ThuW52  |
# # Weekly starting Saturday
# Given the calendar type is ethiopic
# When the user requests "WEEKLYSAT" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel                       | periodValue |
#     | 1           | Week 1 - 2015-01-01 - 2015-01-07  | 2015SatW1   |
#     | 2           | Week 2 - 2015-01-08 - 2015-01-14  | 2015SatW2   |
#     | 3           | Week 3 - 2015-01-15 - 2015-01-21  | 2015SatW3   |
#     | 50          | Week 50 - 2015-12-10 - 2015-12-16 | 2015SatW50  |
#     | 51          | Week 51 - 2015-12-17 - 2015-12-23 | 2015SatW51  |
#     | 52          | Week 52 - 2015-12-24 - 2015-12-30 | 2015SatW52  |
# # Weekly starting Sunday
# Given the calendar type is ethiopic
# When the user requests "WEEKLYSUN" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel                       | periodValue |
#     | 1           | Week 1 - 2015-01-02 - 2015-01-08  | 2015SunW1   |
#     | 2           | Week 2 - 2015-01-09 - 2015-01-15  | 2015SunW2   |
#     | 3           | Week 3 - 2015-01-16 - 2015-01-22  | 2015SunW3   |
#     | 50          | Week 50 - 2015-12-11 - 2015-12-17 | 2015SunW50  |
#     | 51          | Week 51 - 2015-12-18 - 2015-12-24 | 2015SunW51  |
#     | 52          | Week 52 - 2015-12-25 - 2015-12-31 | 2015SunW52  |
# # Bi-weekly
# Given the calendar type is ethiopic
# When the user requests "BIWEEKLY" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel                          | periodValue |
#     | 1           | Bi-Week 1 - 2015-01-03 - 2015-01-16  | 2015BiW1    |
#     | 2           | Bi-Week 2 - 2015-01-17 - 2015-01-30  | 2015BiW2    |
#     | 3           | Bi-Week 3 - 2015-01-31 - 2015-02-13  | 2015BiW3    |
#     | 24          | Bi-Week 24 - 2015-11-21 - 2015-12-04 | 2015BiW24   |
#     | 25          | Bi-Week 25 - 2015-12-05 - 2015-12-18 | 2015BiW25   |
#     | 26          | Bi-Week 26 - 2015-12-19 - 2023-01-01 | 2015BiW26   |

# # Bi-Monthly
# Given the calendar type is ethiopic
# When the user requests "BIMONTHLY" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel              | periodValue |
#     | 1           | January - February 2015  | 201501B     |
#     | 2           | March - April 2015       | 201502B     |
#     | 3           | May - June 2015          | 201503B     |
#     | 4           | July - August 2015       | 201504B     |
#     | 5           | September - October 2015 | 201505B     |
#     | 6           | November - December 2015 | 201506B     |

# # Quarterly
# Given the calendar type is ethiopic
# When the user requests "QUARTERLY" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel             | periodValue |
#     | 1           | January - March 2015    | 2015Q1      |
#     | 2           | April - June 2015       | 2015Q2      |
#     | 3           | July - September 2015   | 2015Q3      |
#     | 4           | October - December 2015 | 2015Q4      |

# # Six-Monthly
# Given the calendar type is ethiopic
# When the user requests "SIXMONTHLY" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel          | periodValue |
#     | 1           | January - June 2015  | 2015S1      |
#     | 2           | July - December 2015 | 2015S2      |

# # Six-Monthyl starting April
# Given the calendar type is ethiopic
# When the user requests "SIXMONTHLYAPR" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel               | periodValue |
#     | 1           | April - September 2015    | 2015AprilS1 |
#     | 2           | October 2015 - March 2023 | 2015AprilS2 |

# # Yearly
# Given the calendar type is ethiopic
# When the user requests "YEARLY" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel | periodValue |
#     | 1           | 2015        | 2015        |
#     | 2           | 2021        | 2021        |
#     | 3           | 2020        | 2020        |
#     | 4           | 2019        | 2019        |
#     | 5           | 2018        | 2018        |
#     | 6           | 2017        | 2017        |
#     | 7           | 2016        | 2016        |
#     | 8           | 2015        | 2015        |
#     | 9           | 2014        | 2014        |
#     | 10          | 2013        | 2013        |

# # Financial Year starting November
# Given the calendar type is ethiopic
# When the user requests "FYNOV" periods for "2015"
# Then the dates for the period type should be generated
#     | periodIndex | periodLabel | periodValue |
#     | 1           | 2015        | 2015Nov     |
#     | 2           | 2021        | 2021Nov     |
#     | 3           | 2020        | 2020Nov     |
#     | 4           | 2019        | 2019Nov     |
#     | 5           | 2018        | 2018Nov     |
#     | 6           | 2017        | 2017Nov     |
#     | 7           | 2016        | 2016Nov     |
#     | 8           | 2015        | 2015Nov     |
#     | 9           | 2014        | 2014Nov     |
#     | 10          | 2013        | 2013Nov     |

