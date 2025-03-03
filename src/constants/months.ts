export interface Month {
    label: string
    value: number
}

export interface CalendarMonths {
    [key: string]: Month[]
}

export const months: CalendarMonths = {
    gregory: [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ],

    iso8601: [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ],

    ethiopic: [
        { value: 1, label: 'Meskerem' },
        { value: 2, label: 'Tekemt' },
        { value: 3, label: 'Hedar' },
        { value: 4, label: 'Tahsas' },
        { value: 5, label: 'Ter' },
        { value: 6, label: 'Yekatit' },
        { value: 7, label: 'Megabit' },
        { value: 8, label: 'Miazia' },
        { value: 9, label: 'Genbot' },
        { value: 10, label: 'Sene' },
        { value: 11, label: 'Hamle' },
        { value: 12, label: 'Nehasse' },
        { value: 13, label: 'Pagumen' },
    ],

    coptic: [
        { value: 1, label: 'Thout' },
        { value: 2, label: 'Baba' },
        { value: 3, label: 'Hator' },
        { value: 4, label: 'Kiahk' },
        { value: 5, label: 'Toba' },
        { value: 6, label: 'Amshir' },
        { value: 7, label: 'Baramhat' },
        { value: 8, label: 'Baramouda' },
        { value: 9, label: 'Bashans' },
        { value: 10, label: 'Paona' },
        { value: 11, label: 'Epep' },
        { value: 12, label: 'Mesra' },
        { value: 13, label: 'Nasie' },
    ],

    islamic: [
        { value: 1, label: 'Muharram' },
        { value: 2, label: 'Safar' },
        { value: 3, label: 'Rabiʻ I' },
        { value: 4, label: 'Rabiʻ II' },
        { value: 5, label: 'Jumada I' },
        { value: 6, label: 'Jumada II' },
        { value: 7, label: 'Rajab' },
        { value: 8, label: 'Shaʻban' },
        { value: 9, label: 'Ramadan' },
        { value: 10, label: 'Shawwal' },
        { value: 11, label: 'Dhuʻl-Qiʻdah' },
        { value: 12, label: 'Dhuʻl-Hijjah' },
    ],

    persian: [
        { value: 1, label: 'Farvardin' },
        { value: 2, label: 'Ordibehesht' },
        { value: 3, label: 'Khordad' },
        { value: 4, label: 'Tir' },
        { value: 5, label: 'Mordad' },
        { value: 6, label: 'Shahrivar' },
        { value: 7, label: 'Mehr' },
        { value: 8, label: 'Aban' },
        { value: 9, label: 'Azar' },
        { value: 10, label: 'Dey' },
        { value: 11, label: 'Bahman' },
        { value: 12, label: 'Esfand' },
    ],

    nepali: [
        { value: 1, label: 'Baisakh' },
        { value: 2, label: 'Jestha' },
        { value: 3, label: 'Ashadh' },
        { value: 4, label: 'Shrawan' },
        { value: 5, label: 'Bhadra' },
        { value: 6, label: 'Ashwin' },
        { value: 7, label: 'Kartik' },
        { value: 8, label: 'Mangsir' },
        { value: 9, label: 'Paush' },
        { value: 10, label: 'Mangh' },
        { value: 11, label: 'Falgun' },
        { value: 12, label: 'Chaitra' },
    ],

    'islamic-civil': [
        { value: 1, label: 'Muharram' },
        { value: 2, label: 'Safar' },
        { value: 3, label: 'Rabiʻ I' },
        { value: 4, label: 'Rabiʻ II' },
        { value: 5, label: 'Jumada I' },
        { value: 6, label: 'Jumada II' },
        { value: 7, label: 'Rajab' },
        { value: 8, label: 'Shaʻban' },
        { value: 9, label: 'Ramadan' },
        { value: 10, label: 'Shawwal' },
        { value: 11, label: 'Dhuʻl-Qiʻdah' },
        { value: 12, label: 'Dhuʻl-Hijjah' },
    ],

    'islamic-umalqura': [
        { value: 1, label: 'Muharram' },
        { value: 2, label: 'Safar' },
        { value: 3, label: 'Rabiʻ I' },
        { value: 4, label: 'Rabiʻ II' },
        { value: 5, label: 'Jumada I' },
        { value: 6, label: 'Jumada II' },
        { value: 7, label: 'Rajab' },
        { value: 8, label: 'Shaʻban' },
        { value: 9, label: 'Ramadan' },
        { value: 10, label: 'Shawwal' },
        { value: 11, label: 'Dhuʻl-Qiʻdah' },
        { value: 12, label: 'Dhuʻl-Hijjah' },
    ],

    'islamic-tbla': [
        { value: 1, label: 'Muharram' },
        { value: 2, label: 'Safar' },
        { value: 3, label: 'Rabiʻ I' },
        { value: 4, label: 'Rabiʻ II' },
        { value: 5, label: 'Jumada I' },
        { value: 6, label: 'Jumada II' },
        { value: 7, label: 'Rajab' },
        { value: 8, label: 'Shaʻban' },
        { value: 9, label: 'Ramadan' },
        { value: 10, label: 'Shawwal' },
        { value: 11, label: 'Dhuʻl-Qiʻdah' },
        { value: 12, label: 'Dhuʻl-Hijjah' },
    ],

    'islamic-rgsa': [
        { value: 1, label: 'Muharram' },
        { value: 2, label: 'Safar' },
        { value: 3, label: 'Rabiʻ I' },
        { value: 4, label: 'Rabiʻ II' },
        { value: 5, label: 'Jumada I' },
        { value: 6, label: 'Jumada II' },
        { value: 7, label: 'Rajab' },
        { value: 8, label: 'Shaʻban' },
        { value: 9, label: 'Ramadan' },
        { value: 10, label: 'Shawwal' },
        { value: 11, label: 'Dhuʻl-Qiʻdah' },
        { value: 12, label: 'Dhuʻl-Hijjah' },
    ],

    hebrew: [
        { value: 1, label: 'Tishri' },
        { value: 2, label: 'Heshvan' },
        { value: 3, label: 'Kislev' },
        { value: 4, label: 'Tevet' },
        { value: 5, label: 'Shevat' },
        { value: 6, label: 'Adar I' },
        { value: 7, label: 'Adar II' },
        { value: 8, label: 'Nisan' },
        { value: 9, label: 'Iyar' },
        { value: 10, label: 'Sivan' },
        { value: 11, label: 'Tammuz' },
        { value: 12, label: 'Av' },
        { value: 13, label: 'Elul' },
    ],

    ethioaa: [
        { value: 1, label: 'Meskerem' },
        { value: 2, label: 'Tekemt' },
        { value: 3, label: 'Hedar' },
        { value: 4, label: 'Tahsas' },
        { value: 5, label: 'Ter' },
        { value: 6, label: 'Yekatit' },
        { value: 7, label: 'Megabit' },
        { value: 8, label: 'Miazia' },
        { value: 9, label: 'Genbot' },
        { value: 10, label: 'Sene' },
        { value: 11, label: 'Hamle' },
        { value: 12, label: 'Nehasse' },
        { value: 13, label: 'Pagumen' },
    ],

    indian: [
        { value: 1, label: 'Chaitra' },
        { value: 2, label: 'Vaisakha' },
        { value: 3, label: 'Jyaistha' },
        { value: 4, label: 'Asadha' },
        { value: 5, label: 'Sravana' },
        { value: 6, label: 'Bhadra' },
        { value: 7, label: 'Asvina' },
        { value: 8, label: 'Kartika' },
        { value: 9, label: 'Agrahayana' },
        { value: 10, label: 'Pausa' },
        { value: 11, label: 'Magha' },
        { value: 12, label: 'Phalguna' },
    ],

    /*     japanese: [
        { value: 1, label: 'Ichigatsu' },
        { value: 2, label: 'Nigatsu' },
        { value: 3, label: 'Sangatsu' },
        { value: 4, label: 'Shigatsu' },
        { value: 5, label: 'Gogatsu' },
        { value: 6, label: 'Rokugatsu' },
        { value: 7, label: 'Shichigatsu' },
        { value: 8, label: 'Hachigatsu' },
        { value: 9, label: 'Kugatsu' },
        { value: 10, label: 'Jūgatsu' },
        { value: 11, label: 'Jūichigatsu' },
        { value: 12, label: 'Jūnigatsu' },
    ], 
    
    chinese: [
        { value: 1, label: 'M01' },
        { value: 2, label: 'M02' },
        { value: 3, label: 'M03' },
        { value: 4, label: 'M04' },
        { value: 5, label: 'M05' },
        { value: 6, label: 'M06' },
        { value: 7, label: 'M07' },
        { value: 8, label: 'M08' },
        { value: 9, label: 'M09' },
        { value: 10, label: 'M10' },
        { value: 11, label: 'M11' },
        { value: 12, label: 'M12' },
    ],

    dangi: [
        { value: 1, label: 'Giêng' },
        { value: 2, label: 'Hai' },
        { value: 3, label: 'Ba' },
        { value: 4, label: 'Tư' },
        { value: 5, label: 'Năm' },
        { value: 6, label: 'Sáu' },
        { value: 7, label: 'Bảy' },
        { value: 8, label: 'Tám' },
        { value: 9, label: 'Chín' },
        { value: 10, label: 'Mười' },
        { value: 11, label: 'Mười một' },
        { value: 12, label: 'Chạp' },
    ],

    buddhist: [
        { value: 1, label: 'Mueang' },
        { value: 2, label: 'Kumphiang' },
        { value: 3, label: 'Thalang' },
        { value: 4, label: 'Krabi' },
        { value: 5, label: 'Phangnga' },
        { value: 6, label: 'Phuket' },
        { value: 7, label: 'Ranong' },
        { value: 8, label: 'Takua Pa' },
        { value: 9, label: 'Phang Nga' },
        { value: 10, label: 'Kapong' },
        { value: 11, label: 'Takua Thung' },
        { value: 12, label: 'Thai Mueang' },
    ],
    */
}
