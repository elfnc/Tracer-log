import { format, parseISO } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import type { Work, Profile } from '@/types'

export interface ReportTimeSlot {
  start: string // HH:mm
  end: string // HH:mm
}

export function formatReportDateHeader(dateStr: string): string {
  try {
    const d = parseISO(dateStr)
    const dayName = format(d, 'EEEE', { locale: idLocale })
    const dateFormatted = format(d, 'dd - MM - yyyy')
    return `Rekap laporan, ${dayName} ${dateFormatted}`
  } catch {
    return `Rekap laporan, ${dateStr}`
  }
}

export function generateDailyReportContent(
  reportDate: string,
  works: Work[],
  profile: Profile,
  timeSlot?: ReportTimeSlot,
): string {
  const header = formatReportDateHeader(reportDate)
  const nameLine = `Nama : ${profile.name}`
  const divisionLine = `Divisi : ${profile.division}`
  const positionLine = `Bagian : ${profile.position}`

  // Sort works by createdAt ascending (waktu input awal)
  const sortedWorks = [...works].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  // Satu baris per work:
  // Ada description → PREFIX-Nomor / Customer / description (status tidak ditampilkan)
  // Tanpa description → PREFIX-Nomor / Customer / STATUS (format standar)
  const workLines = sortedWorks.map((w) => {
    const prefix = w.designType || 'R'
    const desc = (w.description ?? '').trim()
    const suffix = desc ? desc : w.status.toUpperCase()
    return `${prefix}-${w.rNumber} / ${w.customer} / ${suffix}`
  })

  const lines = [header]

  // Sisipkan slot waktu jika diisi
  if (timeSlot?.start && timeSlot?.end) {
    lines.push(`${timeSlot.start} - ${timeSlot.end}`)
  }

  lines.push(nameLine, divisionLine, positionLine, '', ...workLines)

  return lines.join('\n')
}
