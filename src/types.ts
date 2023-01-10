import { calendars } from './constants/calendars'
import { numberingSystems } from './constants/numberingSystems'

export type SupportedCalendar = typeof calendars[number]
export type SupportedNumberingSystem = typeof numberingSystems[number]
