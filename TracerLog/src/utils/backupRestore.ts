import { format } from 'date-fns'
import { db } from '@/db'
import type { BackupPayload, RestoreMode } from './backupParser'

export { parseAndValidateBackup } from './backupParser'
export type { BackupPayload, BackupValidationResult, RestoreMode } from './backupParser'

/**
 * Mengambil seluruh data aplikasi dari IndexedDB untuk dibackup.
 */
export async function createBackupPayload(): Promise<BackupPayload> {
  const [works, profiles, dailyReports] = await Promise.all([
    db.works.toArray(),
    db.profiles.toArray(),
    db.dailyReports.toArray(),
  ])

  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    app: 'TracerLog',
    data: {
      works,
      profiles,
      dailyReports,
    },
  }
}

/**
 * Mengunduh payload backup sebagai file JSON terformat.
 */
export function downloadBackupJson(payload: BackupPayload): string {
  const filename = `tracerlog-backup-${format(new Date(), 'yyyy-MM-dd')}.json`
  const json = JSON.stringify(payload, null, 2)
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)

  return filename
}

/**
 * Memulihkan data backup ke IndexedDB secara atomik dalam satu transaksi.
 */
export async function restoreBackup(payload: BackupPayload, mode: RestoreMode): Promise<void> {
  await db.transaction('rw', db.works, db.profiles, db.dailyReports, async () => {
    if (mode === 'replace') {
      await Promise.all([
        db.works.clear(),
        db.profiles.clear(),
        db.dailyReports.clear(),
      ])
    }

    if (payload.data.works.length > 0) {
      await db.works.bulkPut(payload.data.works)
    }
    if (payload.data.profiles.length > 0) {
      await db.profiles.bulkPut(payload.data.profiles)
    }
    if (payload.data.dailyReports.length > 0) {
      await db.dailyReports.bulkPut(payload.data.dailyReports)
    }
  })
}
