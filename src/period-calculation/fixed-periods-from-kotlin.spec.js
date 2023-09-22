import generateFixedPeriods from './fixed-periods'

it('should generate daily fixed periods', () => {
    const result = generateFixedPeriods({
        year: 2015,
        calendar: 'gregory',
        locale: 'en',
        periodType: 'DAILY',
    })

    expect(result[0]).toEqual({
        endDate: '2015-1-1[u-ca=gregorian]',
        id: '20150101',
        iso: '20150101',
        name: '2015/1/1',
        startDate: '2015-1-1[u-ca=gregorian]',
    })
    expect(result[result.length - 1]).toEqual({
        endDate: '2015-12-31[u-ca=gregorian]',
        id: '20151231',
        iso: '20151231',
        name: '2015/12/31',
        startDate: '2015-12-31[u-ca=gregorian]',
    })
})
it('should generate daily fixed periods for Ethiopian', () => {
    const result = generateFixedPeriods({
        year: 2015,
        calendar: 'ethiopic',
        locale: 'en',
        periodType: 'DAILY',
    })

    expect(result[0]).toEqual({
        endDate: '2022-9-11[u-ca=gregorian]',
        id: '20150101',
        iso: '20150101',
        name: 'መስከረም, 1, 2015',
        startDate: '2022-9-11[u-ca=gregorian]',
    })
    expect(result[result.length - 1]).toEqual({
        endDate: '2023-9-10[u-ca=gregorian]',
        id: '20151305',
        iso: '20151305',
        name: 'ጳጐሜን/ጳጉሜ, 5, 2015',
        startDate: '2023-9-10[u-ca=gregorian]',
    })
})
