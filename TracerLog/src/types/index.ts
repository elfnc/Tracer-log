export type WorkStatus = 'PROGRESS' | 'SELESAI' | 'REVISI PROGRESS' | 'REVISI SELESAI'

export const WORK_STATUSES: WorkStatus[] = [
  'PROGRESS',
  'SELESAI',
  'REVISI PROGRESS',
  'REVISI SELESAI',
]

export interface Work {
  id: string
  rNumber: string
  customer: string
  status: WorkStatus
  description: string // keterangan pekerjaan — masuk laporan, menggantikan status jika diisi
  notes: string // catatan internal — tidak masuk laporan
  workDate: string // YYYY-MM-DD
  createdAt: string // ISO
  updatedAt: string // ISO
}

export interface Profile {
  id: string
  name: string
  division: string
  position: string
}

export interface DailyReport {
  id: string
  reportDate: string
  content: string
  createdAt: string
  updatedAt: string
}
