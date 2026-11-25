<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Plus, Search, Calendar, X, RotateCcw } from '@lucide/vue'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { useWorkStore } from '@/stores/workStore'
import type { Work, WorkStatus } from '@/types'
import { WORK_STATUSES } from '@/types'
import type { CreateWorkDto } from '@/repositories/workRepository'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import WorkForm from '@/components/work/WorkForm.vue'
import WorkDetailModal from '@/components/work/WorkDetailModal.vue'
import KanbanColumn from '@/components/kanban/KanbanColumn.vue'

const workStore = useWorkStore()

const isAddModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const activeWork = ref<Work | null>(null)
const defaultStatusForAdd = ref<WorkStatus>('PROGRESS')

onMounted(async () => {
  await workStore.fetchWorks()
})

const isFilterActive = computed(() => {
  return workStore.searchQuery !== '' || workStore.selectedDate !== workStore.todayStr
})

function setTodayFilter() {
  workStore.setSelectedDate(workStore.todayStr)
}

function setAllDatesFilter() {
  workStore.setSelectedDate('')
}

function resetFilters() {
  workStore.setSearchQuery('')
  workStore.setSelectedDate(workStore.todayStr)
}

function openAddModal(status: WorkStatus = 'PROGRESS') {
  defaultStatusForAdd.value = status
  isAddModalOpen.value = true
}

async function handleCreateWork(data: CreateWorkDto) {
  await workStore.addWork(data)
  isAddModalOpen.value = false
}

function openDetail(work: Work) {
  activeWork.value = work
  isDetailModalOpen.value = true
}

async function handleUpdateWork(workId: string, data: Parameters<typeof workStore.updateWork>[1]) {
  await workStore.updateWork(workId, data)
}

async function handleDeleteWork(workId: string) {
  await workStore.deleteWork(workId)
}

async function handleCardDrop(workId: string, targetStatus: WorkStatus) {
  const currentWork = workStore.works.find((w) => w.id === workId)
  if (!currentWork || currentWork.status === targetStatus) return

  await workStore.updateStatus(workId, targetStatus)
}

function formatDateLabel(dateStr: string) {
  if (!dateStr) return 'Semua Tanggal'
  if (dateStr === workStore.todayStr) return 'Hari Ini'
  try {
    return format(parseISO(dateStr), 'd MMMM yyyy', { locale: id })
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div class="space-y-5">
    <!-- Page Header (Title: Kanban Board in English, Subtitle in Indonesian) -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-ink md:text-2xl">Kanban Board</h1>
        <p class="text-xs text-ink-secondary md:text-sm">
          Kelola alur pekerjaan dan geser kartu antar status secara langsung
        </p>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton variant="primary" @click="openAddModal('PROGRESS')">
          <Plus class="size-4 mr-1.5" />
          Tambah Pekerjaan
        </BaseButton>
      </div>
    </div>

    <!-- Filter & Search Toolbar -->
    <div class="glass-card flex flex-col gap-3 rounded-[10px] p-3.5 sm:flex-row sm:items-center sm:justify-between">
      <!-- Search Input -->
      <div class="relative flex-1 max-w-md">
        <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          :value="workStore.searchQuery"
          type="text"
          placeholder="Cari nomor R# atau nama customer..."
          class="w-full rounded-[6px] border border-line bg-app pl-9 pr-8 py-1.5 text-xs text-ink placeholder:text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
          @input="workStore.setSearchQuery(($event.target as HTMLInputElement).value)"
        />
        <button
          v-if="workStore.searchQuery"
          type="button"
          class="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink cursor-pointer"
          @click="workStore.setSearchQuery('')"
        >
          <X class="size-3.5" />
        </button>
      </div>

      <!-- Date Filters -->
      <div class="flex flex-wrap items-center gap-2">
        <!-- Preset: Hari Ini -->
        <button
          type="button"
          class="rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
          :class="
            workStore.selectedDate === workStore.todayStr
              ? 'bg-primary text-white shadow-2xs'
              : 'border border-line bg-app text-ink-secondary hover:bg-primary-light hover:text-ink'
          "
          @click="setTodayFilter"
        >
          Hari Ini
        </button>

        <!-- Preset: Semua Tanggal -->
        <button
          type="button"
          class="rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
          :class="
            workStore.selectedDate === ''
              ? 'bg-primary text-white shadow-2xs'
              : 'border border-line bg-app text-ink-secondary hover:bg-primary-light hover:text-ink'
          "
          @click="setAllDatesFilter"
        >
          Semua Tanggal
        </button>

        <!-- Custom Date Input -->
        <div class="relative flex items-center">
          <Calendar class="pointer-events-none absolute left-2.5 size-3.5 text-muted" />
          <input
            :value="workStore.selectedDate"
            type="date"
            class="rounded-[6px] border border-line bg-app pl-8 pr-2.5 py-1.5 text-xs text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:[color-scheme:dark]"
            @input="workStore.setSelectedDate(($event.target as HTMLInputElement).value)"
          />
        </div>

        <!-- Reset Button -->
        <button
          v-if="isFilterActive"
          type="button"
          title="Kembalikan ke filter hari ini"
          class="flex items-center gap-1 rounded-[6px] border border-line bg-app px-2.5 py-1.5 text-xs font-medium text-muted hover:bg-primary-light hover:text-ink transition-colors cursor-pointer"
          @click="resetFilters"
        >
          <RotateCcw class="size-3" />
          <span class="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>

    <!-- Filter Summary -->
    <div class="flex items-center justify-between text-xs text-muted px-1">
      <div class="flex items-center gap-2">
        <span>Menampilkan pekerjaan:</span>
        <span class="font-semibold text-ink">{{ formatDateLabel(workStore.selectedDate) }}</span>
        <span v-if="workStore.searchQuery" class="text-ink-secondary">
          • Hasil pencarian "{{ workStore.searchQuery }}"
        </span>
      </div>
      <span>Total: <strong class="text-ink">{{ workStore.filteredWorks.length }}</strong> pekerjaan</span>
    </div>

    <!-- Kanban Columns Grid -->
    <div class="flex items-start gap-4 overflow-x-auto pb-6 scrollbar-thin">
      <KanbanColumn
        v-for="status in WORK_STATUSES"
        :key="status"
        :status="status"
        :works="workStore.worksByStatus[status]"
        @card-click="openDetail"
        @card-drop="handleCardDrop"
        @quick-add="openAddModal"
      />
    </div>

    <!-- Modal Tambah Pekerjaan -->
    <BaseModal v-model="isAddModalOpen" title="Tambah Pekerjaan Baru">
      <WorkForm
        :initial-data="{ status: defaultStatusForAdd, workDate: workStore.selectedDate || workStore.todayStr }"
        submit-label="Tambah ke Papan"
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
