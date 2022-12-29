Feature: Ethiopic Calendar fixed periods
    Background: Set Calendar
        Given the calendar type is "ethiopic"

    Scenario: Number of generated periods
        When a year is provided along a period
            | year | periodType    | periodCount |
            | 2015 | MONTHLY       | 12          |
            | 2015 | DAILY         | 366         |
            | 2014 | DAILY         | 365         |
            | 2014 | WEEKLY        | 52          |
            | 2015 | WEEKLY        | 52          |
            | 2015 | BIWEEKLY      | 26          |
            | 2015 | BIMONTHLY     | 6           |
            | 2015 | QUARTERLY     | 4           |
            | 2015 | SIXMONTHLY    | 2           |
            | 2015 | SIXMONTHLYAPR | 2           |
            | 2015 | YEARLY        | 10          |
            | 2015 | FYNOV         | 10          |
        Then the correct number of periods should be generated

    Scenario: Special cases for Ethiopic calendar
        When the user requests a period longer than bi-weekly
        Then the 13th month of the calendar should be ignored
            | year | periodType    | periodCount |
            | 2015 | MONTHLY       | 12          |
            | 2015 | BIMONTHLY     | 6           |
            | 2015 | QUARTERLY     | 4           |
            | 2015 | SIXMONTHLY    | 2           |
            | 2015 | SIXMONTHLYAPR | 2           |

        When the user requests a monthly period
        Then the 13th month (Pagumen) should not be returned

        When the user requests a daily period
        Then the 13th month (Pagumen) should be returned

    Scenario: Generate monthly Periods
        When the user requests "monthly" periods for "2015"
        Then the dates for the period type should be generated
            # Monthly
            | year | periodType | periodIndex | periodLabel   | periodValue |
            | 2015 | MONTHLY    | 1           | Meskerem 2015 | 201501      |
            | 2015 | MONTHLY    | 2           | Tekemt 2015   | 201502      |
            | 2015 | MONTHLY    | 11          | Hamle 2015    | 201511      |
            | 2015 | MONTHLY    | 12          | Nehasse 2015  | 201512      |

    Scenario: Generate daily Periods
        When the user requests "daily" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 1           | 2015-01-01  | 20150101    |
            | 2           | 2015-01-02  | 20150102    |
            | 3           | 2015-01-03  | 20150103    |
            | 364         | 2015-13-04  | 20151304    |
            | 365         | 2015-13-05  | 20151305    |
            | 366         | 2015-13-06  | 20151306    |

        # non-leap year
        When the user requests "daily" periods for "2014"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 365         | 2014-13-05  | 20141305    |

    Scenario: Generate Weekly Periods (no start day provided - means starting Monday)
        When the user requests "weekly" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2015-01-03 - 2015-01-09  | 2015W1      |
            | 2           | Week 2 - 2015-01-10 - 2015-01-16  | 2015W2      |
            | 3           | Week 3 - 2015-01-17 - 2015-01-23  | 2015W3      |
            | 51          | Week 51 - 2015-12-23 - 2015-12-29 | 2015W51     |
            | 52          | Week 52 - 2015-12-30 - 2015-13-06 | 2015W52     |

    Scenario: Generate Weekly Periods (Starting Wednesday)
        When the user requests "WEEKLYWED" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2014-13-03 - 2015-01-04  | 2015WedW1   |
            | 2           | Week 2 - 2015-01-05 - 2015-01-11  | 2015WedW2   |
            | 3           | Week 3 - 2015-01-12 - 2015-01-18  | 2015WedW3   |
            | 51          | Week 51 - 2015-12-18 - 2015-12-24 | 2015WedW51  |
            | 52          | Week 52 - 2015-12-25 - 2015-13-01 | 2015WedW52  |
            | 53          | Week 53 - 2015-13-02 - 2016-01-02 | 2015WedW53  |

    Scenario: Generate Weekly Periods (Starting Thursday)
        When the user requests "WEEKLYTHU" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2014-13-04 - 2015-01-05  | 2015ThuW1   |
            | 2           | Week 2 - 2015-01-06 - 2015-01-12  | 2015ThuW2   |
            | 3           | Week 3 - 2015-01-13 - 2015-01-19  | 2015ThuW3   |
            | 50          | Week 50 - 2015-12-12 - 2015-12-18 | 2015ThuW50  |
            | 51          | Week 51 - 2015-12-19 - 2015-12-25 | 2015ThuW51  |
            | 52          | Week 52 - 2015-12-26 - 2015-13-02 | 2015ThuW52  |
            | 53          | Week 53 - 2015-13-03 - 2016-01-03 | 2015ThuW53  |

    @abyot # should the last week here be added or not? (most of it is in the next year)
    Scenario: Generate Weekly Periods (Starting Saturday)
        When the user requests "WEEKLYSAT" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2015-01-01 - 2015-01-07  | 2015SatW1   |
            | 2           | Week 2 - 2015-01-08 - 2015-01-14  | 2015SatW2   |
            | 3           | Week 3 - 2015-01-15 - 2015-01-21  | 2015SatW3   |
            | 50          | Week 50 - 2015-12-14 - 2015-12-20 | 2015SatW50  |
            | 51          | Week 51 - 2015-12-21 - 2015-12-27 | 2015SatW51  |
            | 52          | Week 52 - 2015-12-28 - 2015-13-04 | 2015SatW52  |

    @abyot # same - should the last week here be added or not?
    Scenario: Generate Weekly Periods (Starting Sunday)
        When the user requests "WEEKLYSUN" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                       | periodValue |
            | 1           | Week 1 - 2015-01-02 - 2015-01-08  | 2015SunW1   |
            | 2           | Week 2 - 2015-01-09 - 2015-01-15  | 2015SunW2   |
            | 3           | Week 3 - 2015-01-16 - 2015-01-22  | 2015SunW3   |
            | 50          | Week 50 - 2015-12-15 - 2015-12-21 | 2015SunW50  |
            | 51          | Week 51 - 2015-12-22 - 2015-12-28 | 2015SunW51  |
            | 52          | Week 52 - 2015-12-29 - 2015-13-05 | 2015SunW52  |

    @abyot # could you confirm what we want to do with the 13th month in bi-weekly? does the last item here period#26 look correct to you?
    Scenario: Generate Bi-Weekly Periods
        When the user requests "BIWEEKLY" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel                          | periodValue |
            | 1           | Bi-Week 1 - 2015-01-03 - 2015-01-16  | 2015BiW1    |
            | 2           | Bi-Week 2 - 2015-01-17 - 2015-01-30  | 2015BiW2    |
            | 3           | Bi-Week 3 - 2015-02-01 - 2015-02-14  | 2015BiW3    |
            | 24          | Bi-Week 24 - 2015-11-25 - 2015-12-08 | 2015BiW24   |
            | 25          | Bi-Week 25 - 2015-12-09 - 2015-12-22 | 2015BiW25   |
            | 26          | Bi-Week 26 - 2015-12-23 - 2015-13-06 | 2015BiW26   |

    Scenario: Generate Bi-Monthly Periods
        When the user requests "BIMONTHLY" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel            | periodValue |
            | 1           | Meskerem - Tekemt 2015 | 201501B     |
            | 2           | Hedar - Tahsas 2015    | 201502B     |
            | 3           | Ter - Yekatit 2015     | 201503B     |
            | 4           | Megabit - Miazia 2015  | 201504B     |
            | 5           | Genbot - Sene 2015     | 201505B     |
            | 6           | Hamle - Nehasse 2015   | 201506B     |

    Scenario: Generate Quarterly Periods
        When the user requests "QUARTERLY" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel           | periodValue |
            | 1           | Meskerem - Hedar 2015 | 2015Q1      |
            | 2           | Tahsas - Yekatit 2015 | 2015Q2      |
            | 3           | Megabit - Genbot 2015 | 2015Q3      |
            | 4           | Sene - Nehasse 2015   | 2015Q4      |

    @abyot # do we still ignore Pagumen in this case? and the value is 2015NovemberQ1 not 2015HamleQ1?
    Scenario: Generate Quarterly Periods starting 11th month
        When the user requests "QUARTERLYNOV" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel           | periodValue    |
            | 1           | Hamle - Pagumen 2015  | 2015NovemberQ1 |
            | 2           | Meskerem - Hedar 2016 | 2015NovemberQ2 |
            | 3           | Tahsas - Yekatit 2016 | 2015NovemberQ3 |
            | 4           | Megabit - Genbot 2016 | 2015NovemberQ4 |

    Scenario: Generate Six-Monthly Periods
        When the user requests "SIXMONTHLY" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel             | periodValue |
            | 1           | Meskerem - Yekatit 2015 | 2015S1      |
            | 2           | Megabit - Nehasse 2015  | 2015S2      |

    @abyot # are these periods correct? i.e. start with Tahsas? and the values should have "April" instead of "Tehsas"?
    Scenario: Generate Six-Monthly Periods (starting 4th month)
        When the user requests "SIXMONTHLYAPR" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel             | periodValue |
            | 1           | Tahsas - Genbot 2015    | 2015AprilS1 |
            | 2           | Sene 2015 - Tekemt 2016 | 2015AprilS2 |

    @abyot # are these periods correct? i.e. start with Hamle? and the values should have "November" instead of "Hamle"?
    @EthiopiaSpecificPeriod
    Scenario: Generate Six-Monthly Periods (starting 11th month - Hamle)
        When the user requests "SIXMONTHLYNOV" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel             | periodValue    |
            | 1           | Hamle 2015 - Hedar 2016 | 2015NovemberS1 |
            | 2           | Tahsas - Genbot 2016    | 2015NovemberS2 |

    Scenario: Generate Yearly Periods
        When the user requests "YEARLY" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel | periodValue |
            | 1           | 2015        | 2015        |
            | 2           | 2014        | 2014        |
            | 3           | 2013        | 2013        |
            | 4           | 2012        | 2012        |
            | 5           | 2011        | 2011        |
            | 6           | 2010        | 2010        |
            | 7           | 2009        | 2009        |
            | 8           | 2008        | 2008        |
            | 9           | 2007        | 2007        |
            | 10          | 2006        | 2006        |

    Scenario: Generate periods for Financial Year starting the 11th Month
        When the user requests "FYNOV" periods for "2015"
        Then the dates for the period type should be generated
            | periodIndex | periodLabel            | periodValue |
            | 1           | Hamle 2015 - Sene 2016 | 2015Nov     |
            | 2           | Hamle 2014 - Sene 2015 | 2014Nov     |
            | 3           | Hamle 2013 - Sene 2014 | 2013Nov     |
            | 4           | Hamle 2012 - Sene 2013 | 2012Nov     |
            | 5           | Hamle 2011 - Sene 2012 | 2011Nov     |
            | 6           | Hamle 2010 - Sene 2011 | 2010Nov     |
            | 7           | Hamle 2009 - Sene 2010 | 2009Nov     |
            | 8           | Hamle 2008 - Sene 2009 | 2008Nov     |
            | 9           | Hamle 2007 - Sene 2008 | 2007Nov     |
            | 10          | Hamle 2006 - Sene 2007 | 2006Nov     |

