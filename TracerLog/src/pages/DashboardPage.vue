<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, ArrowRight, FileText, CheckCircle2, Clock3, AlertCircle, Layers, Calendar } from '@lucide/vue'
import { useRouter } from 'vue-router'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { useWorkStore } from '@/stores/workStore'
import type { Work } from '@/types'
import type { CreateWorkDto } from '@/repositories/workRepository'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import WorkForm from '@/components/work/WorkForm.vue'
import WorkDetailModal from '@/components/work/WorkDetailModal.vue'
import WorkStatusBadge from '@/components/work/WorkStatusBadge.vue'

const router = useRouter()
const workStore = useWorkStore()

const isAddModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const activeWork = ref<Work | null>(null)

const todayFormatted = format(new Date(), 'EEEE, d MMMM yyyy', { locale: id })

onMounted(async () => {
  await workStore.fetchWorks()
})

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

function formatDisplayDate(dateStr: string) {
  try {
    return format(parseISO(dateStr), 'd MMM yyyy', { locale: id })
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header (Title: Dashboard in English, Subtitle in Indonesian) -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div class="flex items-center gap-2">
          <h1 class="text-xl font-semibold tracking-tight text-ink md:text-2xl">Dashboard</h1>
          <div class="flex items-center gap-1.5 rounded-full bg-primary-light/60 px-2.5 py-0.5 text-[11px] font-medium text-primary">
            <Calendar class="size-3" />
            <span>{{ todayFormatted }}</span>
          </div>
        </div>
        <p class="mt-0.5 text-xs text-ink-secondary md:text-sm">
          Ringkasan aktivitas pekerjaan dan pelaporan hari ini
        </p>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton variant="primary" @click="isAddModalOpen = true">
          <Plus class="size-4 mr-1.5" />
          Tambah Pekerjaan
        </BaseButton>
      </div>
    </div>

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <div class="glass-card rounded-[10px] p-4">
        <div class="flex items-center justify-between text-muted">
          <span class="text-xs font-medium text-ink-secondary">Total Hari Ini</span>
          <Layers class="size-4" />
        </div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-ink">
          {{ workStore.todayStats.total }}
        </p>
      </div>

      <div class="glass-card rounded-[10px] p-4">
        <div class="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
          <span class="text-xs font-medium text-ink-secondary">Selesai</span>
          <CheckCircle2 class="size-4" />
        </div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-ink">
          {{ workStore.todayStats.selesai }}
        </p>
      </div>

      <div class="glass-card rounded-[10px] p-4">
        <div class="flex items-center justify-between text-amber-600 dark:text-amber-400">
          <span class="text-xs font-medium text-ink-secondary">Dalam Proses</span>
          <Clock3 class="size-4" />
        </div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-ink">
          {{ workStore.todayStats.progress }}
        </p>
      </div>

      <div class="glass-card rounded-[10px] p-4">
        <div class="flex items-center justify-between text-rose-600 dark:text-rose-400">
          <span class="text-xs font-medium text-ink-secondary">Revisi</span>
          <AlertCircle class="size-4" />
        </div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-ink">
          {{ workStore.todayStats.revisi }}
        </p>
      </div>
    </div>

    <!-- Recent Work & Daily Report Quick Card -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- Recent Work List (2 Cols) -->
      <div class="glass-card rounded-[10px] p-5 lg:col-span-2">
        <div class="flex items-center justify-between pb-3 border-b border-line">
          <div>
            <h2 class="text-sm font-semibold text-ink">Pekerjaan Terbaru</h2>
            <p class="text-xs text-muted">Pekerjaan yang baru saja Anda catat</p>
          </div>
          <button
            type="button"
            class="flex items-center gap-1 text-xs font-medium text-primary hover:underline cursor-pointer"
            @click="router.push('/kanban')"
          >
            Buka Papan Kanban
            <ArrowRight class="size-3.5" />
          </button>
        </div>

        <!-- Empty state -->
        <div
          v-if="workStore.works.length === 0"
          class="flex flex-col items-center justify-center py-10 text-center"
        >
          <div class="flex size-10 items-center justify-center rounded-full bg-primary-light text-primary mb-2">
            <Plus class="size-5" />
          </div>
          <p class="text-sm font-medium text-ink">Belum ada pekerjaan yang dicatat</p>
          <p class="mt-0.5 text-xs text-muted">Mulai catat pekerjaan pertama Anda hari ini agar tertata rapi!</p>
          <BaseButton size="sm" variant="primary" class="mt-3.5" @click="isAddModalOpen = true">
            Tambah Pekerjaan Baru
          </BaseButton>
        </div>

        <!-- Recent list -->
        <div v-else class="divide-y divide-line/60 pt-1">
          <div
            v-for="work in workStore.recentWorks"
            :key="work.id"
            role="button"
            tabindex="0"
            class="flex items-center justify-between py-3 transition-colors hover:bg-primary-light/40 px-2 rounded-[6px] cursor-pointer"
            @click="openDetail(work)"
          >
            <div class="flex items-center gap-2.5">
              <span class="text-sm font-semibold text-ink">{{ work.designType || 'R' }}-{{ work.rNumber }}</span>
              <span class="text-xs text-muted">/</span>
              <span class="text-xs font-medium text-ink-secondary">{{ work.customer }}</span>
              <span
                v-if="work.notes"
                title="Tersedia catatan internal"
                class="flex size-4.5 items-center justify-center rounded-[4px] bg-primary-light text-primary"
              >
                <FileText class="size-2.5" />
              </span>
            </div>

            <div class="flex items-center gap-3">
              <span class="hidden text-xs text-muted sm:inline">{{ formatDisplayDate(work.workDate) }}</span>
              <WorkStatusBadge :status="work.status" />
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Report Quick Card (1 Col) -->
      <div class="glass-card flex flex-col justify-between rounded-[10px] p-5">
        <div class="space-y-3">
          <div class="flex size-9 items-center justify-center rounded-[6px] bg-primary-light text-primary">
            <FileText class="size-5" />
          </div>
          <div>
            <h2 class="text-sm font-semibold text-ink">Laporan Harian</h2>
            <p class="mt-1 text-xs text-ink-secondary leading-relaxed">
              Buat rekap format laporan harian siap salin ke WhatsApp grup kantor secara otomatis.
            </p>
          </div>
          <div class="rounded-[6px] bg-app p-3 text-xs text-ink-secondary border border-line">
            <span class="font-medium text-ink">Status Hari Ini:</span>
            <p class="mt-1 text-muted">
              {{ workStore.todayWorks.length }} pekerjaan siap dimasukkan ke dalam format rekap.
            </p>
          </div>
        </div>

        <div class="pt-4">
          <BaseButton
            variant="secondary"
            class="w-full justify-between"
            @click="router.push('/report')"
          >
            <span>Buka Laporan Harian</span>
            <ArrowRight class="size-4" />
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Pekerjaan -->
    <BaseModal v-model="isAddModalOpen" title="Tambah Pekerjaan Baru">
      <WorkForm
        submit-label="Tambah Pekerjaan"
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
