import Dexie, { type EntityTable } from 'dexie'
import type { Work, Profile, DailyReport } from '@/types'

export class TracerLogDatabase extends Dexie {
  works!: EntityTable<Work, 'id'>
  profiles!: EntityTable<Profile, 'id'>
  dailyReports!: EntityTable<DailyReport, 'id'>

  constructor() {
    super('tracerlog_db')
    this.version(1).stores({
      works: 'id, rNumber, customer, status, workDate, createdAt, updatedAt',
      profiles: 'id',
      dailyReports: 'id, reportDate, createdAt',
    })
  }
}

export const db = new TracerLogDatabase()
