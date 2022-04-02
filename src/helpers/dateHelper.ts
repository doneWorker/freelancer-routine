import { intervalToDuration } from 'date-fns'

// Time constants
export const MS_IN_SEC: number = 1_000
export const SEC_IN_MIN: number = 60
export const MIN_IN_HOUR: number = 60
export const HOUR_IN_DAY: number = 24

// Date patterns
export const stdDatePattern: string = 'MM/dd/yyyy hh:mm a'

export const formatDate = () => {}

export const getDuration = (timeInSeconds: number): string => {
  const { days, hours, minutes, seconds } = intervalToDuration({
    start: 0,
    end: timeInSeconds * MS_IN_SEC,
  })

  const d = days && days > 0 ? `${days} days` : ''
  const h = hours && hours > 0 ? `${hours} hours` : ''
  const m = minutes && minutes > 0 ? `${minutes} min` : ''
  const s = seconds && seconds > 0 ? `${seconds} sec` : ''
  return `${d} ${h} ${m} ${s}`
}
