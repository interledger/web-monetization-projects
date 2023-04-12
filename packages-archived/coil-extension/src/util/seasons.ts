/**
 * @param month - 1 based, **NOT 0** as returned by Date#getMonth
 * @param dayOfMonth - as returned by Date#getDate
 */
export function isXMASPeriod(month: number, dayOfMonth: number) {
  return month === 12 && dayOfMonth <= 27
}

/**
 * @param month - 1 based, **NOT 0** as returned by Date#getMonth
 * @param dayOfMonth - as returned by Date#getDate
 * @param date - date from which month/dayOfMonth derived
 */
export function isNewYears(month: number, dayOfMonth: number, date: Date) {
  return (
    month === 12 &&
    dayOfMonth === 31 &&
    date.getHours() == 23 &&
    date.getMinutes() >= 55
  )
}

export function getMonthAndDay(): [number, number, Date] {
  const now = new Date()
  // getMonth() returns 0 based numbers, e.g. it will return 11 for December
  return [now.getMonth() + 1, now.getDate(), now]
}
