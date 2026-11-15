import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { format } from 'date-fns'
import type { Work, WorkStatus } from '@/types'
import { workRepository, type CreateWorkDto, type UpdateWorkDto } from '@/repositories/workRepository'

export const useWorkStore = defineStore('work', () => {
  const works = ref<Work[]>([])
  const selectedWork = ref<Work | null>(null)
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const todayStr = format(new Date(), 'yyyy-MM-dd')
  const selectedDate = ref<string>(todayStr)
  const searchQuery = ref<string>('')

  // Computed / Getters
  const todayWorks = computed(() => {
    return works.value.filter((w) => w.workDate === todayStr)
  })

  const dateWorks = computed(() => {
    return works.value.filter((w) => w.workDate === selectedDate.value)
  })

  const filteredWorks = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    return works.value.filter((w) => {
      const matchDate = selectedDate.value ? w.workDate === selectedDate.value : true
      if (!matchDate) return false
      if (!q) return true
      return (
        w.rNumber.toLowerCase().includes(q) ||
        w.customer.toLowerCase().includes(q) ||
        `r# ${w.rNumber}`.toLowerCase().includes(q)
      )
    })
  })

  const worksByStatus = computed(() => {
    const groups: Record<WorkStatus, Work[]> = {
      PROGRESS: [],
      SELESAI: [],
      'REVISI PROGRESS': [],
      'REVISI SELESAI': [],
    }

    filteredWorks.value.forEach((w) => {
      if (groups[w.status]) {
        groups[w.status].push(w)
      }
    })

    return groups
  })

  const todayStats = computed(() => {
    const list = todayWorks.value
    const total = list.length
    const selesai = list.filter((w) => w.status === 'SELESAI').length
    const progress = list.filter((w) => w.status === 'PROGRESS').length
    const revisi = list.filter(
      (w) => w.status === 'REVISI PROGRESS' || w.status === 'REVISI SELESAI',
    ).length

    return {
      total,
      selesai,
      progress,
      revisi,
    }
  })

  const recentWorks = computed(() => {
    return [...works.value]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  })

  // Actions
  async function fetchWorks() {
    isLoading.value = true
    error.value = null
    try {
      works.value = await workRepository.getAll()
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Gagal memuat data pekerjaan'
    } finally {
      isLoading.value = false
    }
  }

  async function addWork(dto: CreateWorkDto): Promise<Work> {
    isLoading.value = true
    error.value = null
    try {
      const created = await workRepository.create(dto)
      works.value.unshift(created)
      return created
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Gagal menambahkan pekerjaan'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateWork(id: string, dto: UpdateWorkDto): Promise<Work | undefined> {
    isLoading.value = true
    error.value = null
    try {
      const updated = await workRepository.update(id, dto)
      if (updated) {
        const index = works.value.findIndex((w) => w.id === id)
        if (index !== -1) {
          works.value[index] = updated
        }
        if (selectedWork.value?.id === id) {
          selectedWork.value = updated
        }
      }
      return updated
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Gagal memperbarui pekerjaan'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function updateStatus(id: string, status: WorkStatus): Promise<Work | undefined> {
    return await updateWork(id, { status })
  }

  async function deleteWork(id: string): Promise<boolean> {
    isLoading.value = true
    error.value = null
    try {
      const ok = await workRepository.delete(id)
      if (ok) {
        works.value = works.value.filter((w) => w.id !== id)
        if (selectedWork.value?.id === id) {
          selectedWork.value = null
        }
      }
      return ok
    } catch (err: unknown) {
      error.value = err instanceof Error ? err.message : 'Gagal menghapus pekerjaan'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function selectWork(work: Work | null) {
    selectedWork.value = work
  }

  function setSelectedDate(date: string) {
    selectedDate.value = date
  }

  function setSearchQuery(q: string) {
    searchQuery.value = q
  }

  return {
    works,
    selectedWork,
    isLoading,
    error,
    selectedDate,
    searchQuery,
    todayStr,
    todayWorks,
    dateWorks,
    filteredWorks,
    worksByStatus,
    todayStats,
    recentWorks,
    fetchWorks,
    addWork,
    updateWork,
    updateStatus,
    deleteWork,
    selectWork,
    setSelectedDate,
    setSearchQuery,
  }
})
