import { format, parseISO } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import type { Work, Profile } from '@/types'

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
): string {
  const header = formatReportDateHeader(reportDate)
  const nameLine = `Nama : ${profile.name}`
  const divisionLine = `divisi : ${profile.division}`
  const positionLine = `bagian : ${profile.position}`

  // Sort works by createdAt ascending (waktu input awal)
  const sortedWorks = [...works].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )

  const workLines = sortedWorks.map(
    (w) => `R# ${w.rNumber} / ${w.customer} / ${w.status.toUpperCase()}`,
  )

  const lines = [
    header,
    nameLine,
    divisionLine,
    positionLine,
    '', // Baris kosong pemisah
    ...workLines,
  ]

  return lines.join('\n')
}
