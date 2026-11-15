import { defineStore } from 'pinia'
import { ref } from 'vue'
import { format } from 'date-fns'
import type { DailyReport } from '@/types'
import { reportRepository } from '@/repositories/reportRepository'

export const useReportStore = defineStore('report', () => {
  const selectedDate = ref<string>(format(new Date(), 'yyyy-MM-dd'))
  const savedReports = ref<DailyReport[]>([])
  const isLoading = ref<boolean>(false)
  const isCopied = ref<boolean>(false)
  let copyTimeout: ReturnType<typeof setTimeout> | null = null

  async function fetchSavedReports() {
    isLoading.value = true
    try {
      savedReports.value = await reportRepository.getAll()
    } finally {
      isLoading.value = false
    }
  }

  async function saveReport(date: string, content: string): Promise<DailyReport> {
    isLoading.value = true
    try {
      const saved = await reportRepository.save(date, content)
      await fetchSavedReports()
      return saved
    } finally {
      isLoading.value = false
    }
  }

  async function deleteReport(id: string): Promise<boolean> {
    isLoading.value = true
    try {
      const ok = await reportRepository.delete(id)
      if (ok) {
        savedReports.value = savedReports.value.filter((r) => r.id !== id)
      }
      return ok
    } finally {
      isLoading.value = false
    }
  }

  async function copyToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = text
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      }

      isCopied.value = true
      if (copyTimeout) clearTimeout(copyTimeout)
      copyTimeout = setTimeout(() => {
        isCopied.value = false
      }, 2500)
      return true
    } catch {
      return false
    }
  }

  return {
    selectedDate,
    savedReports,
    isLoading,
    isCopied,
    fetchSavedReports,
    saveReport,
    deleteReport,
    copyToClipboard,
  }
})
