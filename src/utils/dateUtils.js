// src/utils/dateUtils.js

/**
 * 날짜 문자열을 YYYY-MM-DD HH:mm:ss 형식으로 변환
 * @param {string|null} dateStr
 * @returns {string}
 */
export function formatDateTime(dateStr) {
  if (dateStr === null || dateStr === undefined || dateStr === '') {
    return '-'
  }

  try {
    // T를 기준으로 날짜와 시간을 분리 (2026-05-14T14:12:52.2642489)
    const parts = dateStr.split('T')
    const datePart = parts[0] // 2026-05-14
    let timePart = parts[1] // 14:12:52.2642489

    if (timePart) {
      // 소수점(밀리초) 이하 절삭
      timePart = timePart.split('.')[0]
      return datePart + ' ' + timePart
    }

    return datePart
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateStr
  }
}
