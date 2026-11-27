<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  Search,
  Calendar,
  X,
  RotateCcw,
  FileText,
  Plus,
  Check,
  SlidersHorizontal,
  ChevronRight,
  Clock,
} from '@lucide/vue'
import { format, parseISO, isWithinInterval, subDays, startOfMonth, endOfMonth } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { useWorkStore } from '@/stores/workStore'
import type { Work } from '@/types'
import { WORK_STATUSES } from '@/types'
import type { CreateWorkDto } from '@/repositories/workRepository'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import WorkForm from '@/components/work/WorkForm.vue'
import WorkDetailModal from '@/components/work/WorkDetailModal.vue'
import WorkStatusBadge from '@/components/work/WorkStatusBadge.vue'

const workStore = useWorkStore()

const searchQuery = ref('')
const selectedStatus = ref<string>('ALL')
const selectedDateFilter = ref<string>('ALL_TIME') // 'ALL_TIME' | 'TODAY' | 'LAST_7_DAYS' | 'THIS_MONTH' | 'CUSTOM'
const customDate = ref<string>('')

const isAddModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const activeWork = ref<Work | null>(null)

const toastMessage = ref<string | null>(null)
let toastTimeout: ReturnType<typeof setTimeout> | null = null

function showToast(msg: string) {
  toastMessage.value = msg
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toastMessage.value = null
  }, 2500)
}

onMounted(async () => {
  await workStore.fetchWorks()
})

const todayStr = format(new Date(), 'yyyy-MM-dd')

// Filtered Works based on Search, Status, and Date
const filteredWorks = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  const now = new Date()

  return workStore.works.filter((w) => {
    // 1. Search Query filter (No. Design or Customer)
    if (q) {
      const prefix = (w.designType || 'R').toLowerCase()
      const matchR =
        w.rNumber.toLowerCase().includes(q) ||
        `${prefix}-${w.rNumber}`.toLowerCase().includes(q) ||
        `r#${w.rNumber}`.toLowerCase().includes(q)
      const matchCustomer = w.customer.toLowerCase().includes(q)
      if (!matchR && !matchCustomer) return false
    }

    // 2. Status Filter
    if (selectedStatus.value !== 'ALL' && w.status !== selectedStatus.value) {
      return false
    }

    // 3. Date Filter
    if (selectedDateFilter.value === 'TODAY') {
      if (w.workDate !== todayStr) return false
    } else if (selectedDateFilter.value === 'LAST_7_DAYS') {
      try {
        const itemDate = parseISO(w.workDate)
        const sevenDaysAgo = subDays(now, 7)
        if (!isWithinInterval(itemDate, { start: sevenDaysAgo, end: now })) return false
      } catch {
        return false
      }
    } else if (selectedDateFilter.value === 'THIS_MONTH') {
      try {
        const itemDate = parseISO(w.workDate)
        const start = startOfMonth(now)
        const end = endOfMonth(now)
        if (!isWithinInterval(itemDate, { start, end })) return false
      } catch {
        return false
      }
    } else if (selectedDateFilter.value === 'CUSTOM') {
      if (customDate.value && w.workDate !== customDate.value) return false
    }

    return true
  })
})

const isFilterActive = computed(() => {
  return (
    searchQuery.value !== '' ||
    selectedStatus.value !== 'ALL' ||
    selectedDateFilter.value !== 'ALL_TIME' ||
    customDate.value !== ''
  )
})

function resetFilters() {
  searchQuery.value = ''
  selectedStatus.value = 'ALL'
  selectedDateFilter.value = 'ALL_TIME'
  customDate.value = ''
}

function openDetail(work: Work) {
  activeWork.value = work
  isDetailModalOpen.value = true
}

async function handleCreateWork(dto: CreateWorkDto) {
  await workStore.addWork(dto)
  isAddModalOpen.value = false
  showToast(`Pekerjaan ${dto.designType || 'R'}-${dto.rNumber} berhasil ditambahkan.`)
}

async function handleUpdateWork(id: string, data: Parameters<typeof workStore.updateWork>[1]) {
  await workStore.updateWork(id, data)
  showToast('Pekerjaan berhasil diperbarui.')
}

async function handleDeleteWork(id: string) {
  await workStore.deleteWork(id)
  showToast('Pekerjaan berhasil dihapus dari riwayat.')
}

function formatDateDisplay(dateStr: string) {
  try {
    return format(parseISO(dateStr), 'd MMM yyyy', { locale: idLocale })
  } catch {
    return dateStr
  }
}

function formatTimeDisplay(isoStr?: string) {
  if (!isoStr) return '-'
  try {
    return format(parseISO(isoStr), 'HH:mm')
  } catch {
    return '-'
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Toast Feedback Popup -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="toastMessage"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-[8px] border border-primary/40 bg-panel px-4 py-3 text-xs font-medium text-ink shadow-lg dark:bg-panel-elevated"
        >
          <div class="flex size-5 items-center justify-center rounded-full bg-primary text-white">
            <Check class="size-3" />
          </div>
          <span>{{ toastMessage }}</span>
        </div>
      </Transition>
    </Teleport>

    <!-- Page Header (Title: Work History in English per rule) -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-ink md:text-2xl">Work History</h1>
        <p class="text-xs text-ink-secondary md:text-sm">
          Arsip seluruh catatan pekerjaan dan riwayat laporan harian Anda
        </p>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton variant="primary" @click="isAddModalOpen = true">
          <Plus class="size-4 mr-1.5" />
          Tambah Pekerjaan
        </BaseButton>
      </div>
    </div>

    <!-- Filter & Toolbar -->
    <div class="glass-card rounded-[10px] p-4 space-y-3.5">
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-12">
        <!-- Search Input (5 cols on lg) -->
        <div class="relative lg:col-span-5">
          <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari no. design atau nama customer..."
            class="w-full rounded-[6px] border border-line bg-app pl-9 pr-8 py-2 text-xs text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
            @click="searchQuery = ''"
          >
            <X class="size-3.5" />
          </button>
        </div>

        <!-- Status Filter Select (3 cols on lg) -->
        <div class="relative lg:col-span-3">
          <select
            v-model="selectedStatus"
            class="w-full appearance-none rounded-[6px] border border-line bg-app px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors cursor-pointer dark:[color-scheme:dark]"
          >
            <option value="ALL">Semua Status</option>
            <option v-for="s in WORK_STATUSES" :key="s" :value="s">{{ s }}</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted">
            <SlidersHorizontal class="size-3.5" />
          </div>
        </div>

        <!-- Date Filter Period (4 cols on lg) -->
        <div class="flex items-center gap-2 lg:col-span-4">
          <select
            v-model="selectedDateFilter"
            class="w-full appearance-none rounded-[6px] border border-line bg-app px-3 py-2 text-xs text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors cursor-pointer dark:[color-scheme:dark]"
          >
            <option value="ALL_TIME">Semua Waktu</option>
            <option value="TODAY">Hari Ini</option>
            <option value="LAST_7_DAYS">7 Hari Terakhir</option>
            <option value="THIS_MONTH">Bulan Ini</option>
            <option value="CUSTOM">Pilih Tanggal...</option>
          </select>

          <!-- Custom Date Input if selected -->
          <div v-if="selectedDateFilter === 'CUSTOM'" class="relative flex items-center min-w-[130px]">
            <Calendar class="pointer-events-none absolute left-2.5 size-3.5 text-muted" />
            <input
              v-model="customDate"
              type="date"
              class="w-full rounded-[6px] border border-line bg-app pl-8 pr-2 py-1.5 text-xs text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:[color-scheme:dark]"
            />
          </div>

          <!-- Reset Filter Button -->
          <button
            v-if="isFilterActive"
            type="button"
            title="Reset semua filter"
            class="flex shrink-0 items-center gap-1 rounded-[6px] border border-line bg-app px-2.5 py-2 text-xs font-medium text-muted hover:bg-primary-light hover:text-ink transition-colors cursor-pointer"
            @click="resetFilters"
          >
            <RotateCcw class="size-3.5" />
            <span class="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      <!-- Result Counter -->
      <div class="flex items-center justify-between text-xs text-muted pt-2 border-t border-line/60">
        <div>
          <span>Menampilkan </span>
          <strong class="text-ink">{{ filteredWorks.length }}</strong>
          <span> dari total </span>
          <strong class="text-ink">{{ workStore.works.length }}</strong>
          <span> pekerjaan</span>
        </div>
        <div v-if="isFilterActive" class="text-primary font-medium text-[11px]">
          Filter aktif
        </div>
      </div>
    </div>

    <!-- History Works List (Solid Clean Surface for Data Table) -->
    <div class="rounded-[10px] border border-line bg-panel shadow-xs overflow-hidden">
      <!-- Empty State -->
      <div
        v-if="filteredWorks.length === 0"
        class="flex flex-col items-center justify-center py-16 text-center px-4"
      >
        <div class="flex size-12 items-center justify-center rounded-full bg-primary-light text-primary mb-3">
          <Search class="size-5" />
        </div>
        <h3 class="text-sm font-semibold text-ink">Tidak ada pekerjaan yang ditemukan</h3>
        <p class="mt-1 text-xs text-muted max-w-sm">
          {{ isFilterActive ? 'Coba ubah kata kunci pencarian atau reset filter untuk melihat data lainnya.' : 'Belum ada catatan pekerjaan di riwayat. Mulai dengan mencatat pekerjaan hari ini!' }}
        </p>
        <div class="mt-4 flex items-center gap-2">
          <BaseButton v-if="isFilterActive" size="sm" variant="secondary" @click="resetFilters">
            Reset Filter
          </BaseButton>
          <BaseButton size="sm" variant="primary" @click="isAddModalOpen = true">
            Tambah Pekerjaan
          </BaseButton>
        </div>
      </div>

      <!-- Works Table / List -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left text-xs min-w-[760px]">
          <thead class="border-b border-line/70 bg-app/60 text-[11px] font-semibold uppercase tracking-wider text-muted">
            <tr>
              <th scope="col" class="py-3 px-4">No. Design</th>
              <th scope="col" class="py-3 px-4">Customer</th>
              <th scope="col" class="py-3 px-4">Deskripsi Pekerjaan</th>
              <th scope="col" class="py-3 px-4">Catatan</th>
              <th scope="col" class="py-3 px-4">Tanggal</th>
              <th scope="col" class="py-3 px-4">Status</th>
              <th scope="col" class="py-3 px-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-line/60">
            <tr
              v-for="work in filteredWorks"
              :key="work.id"
              class="group transition-colors hover:bg-primary-light/25 cursor-pointer"
              @click="openDetail(work)"
            >
              <!-- 1. No. Design -->
              <td class="py-3.5 px-4 font-semibold text-ink group-hover:text-primary transition-colors whitespace-nowrap">
                {{ work.designType || 'R' }}-{{ work.rNumber }}
              </td>

              <!-- 2. Customer -->
              <td class="py-3.5 px-4 font-medium text-ink-secondary whitespace-nowrap">
                {{ work.customer }}
              </td>

              <!-- 3. Deskripsi Pekerjaan -->
              <td class="py-3.5 px-4 max-w-[200px]">
                <span
                  v-if="work.description && work.description.trim()"
                  class="text-ink line-clamp-2"
                  :title="work.description"
                >
                  {{ work.description }}
                </span>
                <span v-else class="text-muted/60">—</span>
              </td>

              <!-- 4. Catatan Internal -->
              <td class="py-3.5 px-4 max-w-[180px]">
                <div v-if="work.notes && work.notes.trim()" class="flex items-center gap-1.5" :title="work.notes">
                  <span class="flex size-4 shrink-0 items-center justify-center rounded-[3px] bg-primary-light text-primary">
                    <FileText class="size-2.5" />
                  </span>
                  <span class="text-muted truncate italic line-clamp-1">
                    {{ work.notes }}
                  </span>
                </div>
                <span v-else class="text-muted/60">—</span>
              </td>

              <!-- 5. Tanggal & Jam Input -->
              <td class="py-3.5 px-4 whitespace-nowrap">
                <div class="text-ink font-medium">
                  {{ formatDateDisplay(work.workDate) }}
                </div>
                <div class="text-[10px] text-muted flex items-center gap-1 mt-0.5">
                  <Clock class="size-2.5" />
                  <span>{{ formatTimeDisplay(work.createdAt) }}</span>
                </div>
              </td>

              <!-- 6. Status -->
              <td class="py-3.5 px-4 whitespace-nowrap">
                <WorkStatusBadge :status="work.status" />
              </td>

              <!-- 7. Aksi -->
              <td class="py-3.5 px-4 text-center whitespace-nowrap" @click.stop>
                <button
                  type="button"
                  title="Lihat atau edit detail pekerjaan"
                  class="inline-flex items-center gap-1 rounded-[4px] border border-line bg-app px-2.5 py-1 text-[11px] font-medium text-ink-secondary hover:border-primary/40 hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
                  @click="openDetail(work)"
                >
                  <span>Detail</span>
                  <ChevronRight class="size-3" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Tambah Pekerjaan -->
    <BaseModal v-model="isAddModalOpen" title="Tambah Pekerjaan Baru">
      <WorkForm
        submit-label="Simpan Pekerjaan"
        @submit="handleCreateWork"
        @cancel="isAddModalOpen = false"
      />
    </BaseModal>

    <!-- Modal Detail Work -->
    <WorkDetailModal
      v-model="isDetailModalOpen"
      :work="activeWork"
      @update="handleUpdateWork"
      @delete="handleDeleteWork"
    />
  </div>
</template>
