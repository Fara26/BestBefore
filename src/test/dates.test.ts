import { formatDate, todayIsoDate } from '../lib/dates'

describe('dates', () => {
  it('formats an ISO date for display', () => {
    expect(formatDate('2026-11-29')).toBe('Nov 29, 2026')
    expect(formatDate('2024-02-29')).toBe('Feb 29, 2024')
  })

  it("returns today's local date as an ISO string", () => {
    const now = new Date()
    const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

    expect(todayIsoDate()).toBe(expected)
  })
})
