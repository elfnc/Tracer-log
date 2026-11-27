import type { DailyReport, Profile, Work } from '@/types'

export type RestoreMode = 'merge' | 'replace'

export interface BackupPayload {
  version: number
  exportedAt: string
  app: string
  data: {
    works: Work[]
    profiles: Profile[]
    dailyReports: DailyReport[]
  }
}

export interface BackupValidationResult {
  valid: boolean
  payload?: BackupPayload
  error?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidWork(item: unknown): item is Work {
  if (!isRecord(item)) return false
  return (
    typeof item.id === 'string' &&
    typeof item.rNumber === 'string' &&
    typeof item.customer === 'string' &&
    typeof item.status === 'string' &&
    typeof item.workDate === 'string'
  )
}

function isValidProfile(item: unknown): item is Profile {
  if (!isRecord(item)) return false
  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.division === 'string' &&
    typeof item.position === 'string'
  )
}

function isValidDailyReport(item: unknown): item is DailyReport {
  if (!isRecord(item)) return false
  return (
    typeof item.id === 'string' &&
    typeof item.reportDate === 'string' &&
    typeof item.content === 'string'
  )
}

/**
 * Mem-parsing teks JSON hasil backup dan memvalidasi strukturnya
 * sebelum menyentuh database IndexedDB.
 */
export function parseAndValidateBackup(rawText: string): BackupValidationResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(rawText)
  } catch {
    return {
      valid: false,
      error: 'File bukan format JSON yang valid.',
    }
  }

  if (!isRecord(parsed) || !isRecord(parsed.data)) {
    return {
      valid: false,
      error: 'Struktur file backup tidak dikenali.',
    }
  }

  const { works, profiles, dailyReports } = parsed.data

  if (!Array.isArray(works) || !Array.isArray(profiles) || !Array.isArray(dailyReports)) {
    return {
      valid: false,
      error: 'Data backup tidak lengkap (works, profiles, atau dailyReports hilang).',
    }
  }

  if (!works.every(isValidWork)) {
    return {
      valid: false,
      error: 'Sebagian data pekerjaan pada file backup tidak valid.',
    }
  }

  if (!profiles.every(isValidProfile)) {
    return {
      valid: false,
      error: 'Data profil pada file backup tidak valid.',
    }
  }

  if (!dailyReports.every(isValidDailyReport)) {
    return {
      valid: false,
      error: 'Sebagian data riwayat laporan pada file backup tidak valid.',
    }
  }

  // Normalisasi field opsional agar backward-compatible dengan data lama
  const normalizedWorks: Work[] = works.map((w) => ({
    ...w,
    description: typeof w.description === 'string' ? w.description : '',
    notes: typeof w.notes === 'string' ? w.notes : '',
    createdAt: typeof w.createdAt === 'string' ? w.createdAt : new Date().toISOString(),
    updatedAt: typeof w.updatedAt === 'string' ? w.updatedAt : new Date().toISOString(),
  }))

  return {
    valid: true,
    payload: {
      version: typeof parsed.version === 'number' ? parsed.version : 1,
      exportedAt: typeof parsed.exportedAt === 'string' ? parsed.exportedAt : new Date().toISOString(),
      app: typeof parsed.app === 'string' ? parsed.app : 'TracerLog',
      data: {
        works: normalizedWorks,
        profiles,
        dailyReports,
      },
    },
  }
}
