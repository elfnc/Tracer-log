export type DesignType = 'R' | 'S' | 'D'

export const DESIGN_TYPES: { label: string; value: DesignType; desc: string }[] = [
  { label: 'R (Rotary)', value: 'R', desc: 'Rotary Printing' },
  { label: 'S (Sublim)', value: 'S', desc: 'Sublimation' },
  { label: 'D (Digital)', value: 'D', desc: 'Digital Printing' },
]

export type WorkStatus = 'PROGRESS' | 'SELESAI' | 'REVISI PROGRESS' | 'REVISI SELESAI'

export const WORK_STATUSES: WorkStatus[] = [
  'PROGRESS',
  'SELESAI',
  'REVISI PROGRESS',
  'REVISI SELESAI',
]

export interface Work {
  id: string
  designType?: DesignType // 'R' | 'S' | 'D' (default 'R' untuk data lama)
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
