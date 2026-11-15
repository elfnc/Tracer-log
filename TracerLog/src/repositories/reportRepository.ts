import { db } from '@/db'
import type { DailyReport } from '@/types'

export const reportRepository = {
  async getAll(): Promise<DailyReport[]> {
    return await db.dailyReports.reverse().sortBy('createdAt')
  },

  async getByDate(reportDate: string): Promise<DailyReport | undefined> {
    return await db.dailyReports.where('reportDate').equals(reportDate).first()
  },

  async save(reportDate: string, content: string): Promise<DailyReport> {
    const existing = await this.getByDate(reportDate)
    const now = new Date().toISOString()

    if (existing) {
      const updated: DailyReport = {
        ...existing,
        content,
        updatedAt: now,
      }
      await db.dailyReports.put(updated)
      return updated
    }

    const newReport: DailyReport = {
      id: crypto.randomUUID(),
      reportDate,
      content,
      createdAt: now,
      updatedAt: now,
    }

    await db.dailyReports.add(newReport)
    return newReport
  },

  async delete(id: string): Promise<boolean> {
    const count = await db.dailyReports.where('id').equals(id).delete()
    return count > 0
  },
}
