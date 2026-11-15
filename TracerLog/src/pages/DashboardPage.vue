<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, ArrowRight, FileText, CheckCircle2, Clock3, AlertCircle, Layers } from '@lucide/vue'
import { useRouter } from 'vue-router'
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

async function handleUpdateWork(id: string, data: Parameters<typeof workStore.updateWork>[1]) {
  await workStore.updateWork(id, data)
}

async function handleDeleteWork(id: string) {
  await workStore.deleteWork(id)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-ink md:text-2xl">Dashboard</h1>
        <p class="text-xs text-ink-secondary md:text-sm">Ringkasan pekerjaan dan pelaporan hari ini</p>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton variant="primary" @click="isAddModalOpen = true">
          <Plus class="size-4 mr-1" />
          Add Work
        </BaseButton>
      </div>
    </div>

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      <div class="rounded-[8px] border border-line bg-panel p-4 shadow-xs">
        <div class="flex items-center justify-between text-muted">
          <span class="text-xs font-medium text-ink-secondary">Total Hari Ini</span>
          <Layers class="size-4" />
        </div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-ink">
          {{ workStore.todayStats.total }}
        </p>
      </div>

      <div class="rounded-[8px] border border-line bg-panel p-4 shadow-xs">
        <div class="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
          <span class="text-xs font-medium text-ink-secondary">Selesai</span>
          <CheckCircle2 class="size-4" />
        </div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-ink">
          {{ workStore.todayStats.selesai }}
        </p>
      </div>

      <div class="rounded-[8px] border border-line bg-panel p-4 shadow-xs">
        <div class="flex items-center justify-between text-amber-600 dark:text-amber-400">
          <span class="text-xs font-medium text-ink-secondary">Progress</span>
          <Clock3 class="size-4" />
        </div>
        <p class="mt-2 text-2xl font-bold tracking-tight text-ink">
          {{ workStore.todayStats.progress }}
        </p>
      </div>

      <div class="rounded-[8px] border border-line bg-panel p-4 shadow-xs">
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
      <!-- Recent Work List (2 cols) -->
      <div class="rounded-[8px] border border-line bg-panel p-5 shadow-xs lg:col-span-2">
        <div class="flex items-center justify-between pb-3 border-b border-line">
          <div>
            <h2 class="text-sm font-semibold text-ink">Recent Work</h2>
            <p class="text-xs text-muted">Pekerjaan terakhir yang ditambahkan</p>
          </div>
          <button
            type="button"
            class="flex items-center gap-1 text-xs font-medium text-primary hover:underline cursor-pointer"
            @click="router.push('/kanban')"
          >
            Kanban Board
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
          <p class="text-sm font-medium text-ink">Belum ada pekerjaan tercatat</p>
          <p class="mt-0.5 text-xs text-muted">Mulai dengan mencatat pekerjaan pertama Anda hari ini</p>
          <BaseButton size="sm" variant="primary" class="mt-3.5" @click="isAddModalOpen = true">
            Tambah Work
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
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-ink">R# {{ work.rNumber }}</span>
              <span class="text-xs text-muted">/</span>
              <span class="text-xs font-medium text-ink-secondary">{{ work.customer }}</span>
              <span
                v-if="work.notes"
                title="Memiliki catatan internal"
                class="flex size-4.5 items-center justify-center rounded-[4px] bg-primary-light text-primary"
              >
                <FileText class="size-2.5" />
              </span>
            </div>

            <div class="flex items-center gap-3">
              <span class="hidden text-xs text-muted sm:inline">{{ work.workDate }}</span>
              <WorkStatusBadge :status="work.status" />
            </div>
          </div>
        </div>
      </div>

      <!-- Daily Report Quick Card (1 col) -->
      <div class="flex flex-col justify-between rounded-[8px] border border-line bg-panel p-5 shadow-xs">
        <div class="space-y-3">
          <div class="flex size-9 items-center justify-center rounded-[6px] bg-primary-light text-primary">
            <FileText class="size-5" />
          </div>
          <div>
            <h2 class="text-sm font-semibold text-ink">Daily Report</h2>
            <p class="mt-1 text-xs text-ink-secondary leading-relaxed">
              Generate format laporan harian siap kirim ke WhatsApp grup kantor.
            </p>
          </div>
          <div class="rounded-[6px] bg-app p-3 text-xs text-ink-secondary border border-line">
            <span class="font-medium text-ink">Status Hari Ini:</span>
            <p class="mt-1 text-muted">
              {{ workStore.todayWorks.length }} pekerjaan siap dicatat pada laporan harian.
            </p>
          </div>
        </div>

        <div class="pt-4">
          <BaseButton
            variant="secondary"
            class="w-full justify-between"
            @click="router.push('/report')"
          >
            <span>Buka Daily Report</span>
            <ArrowRight class="size-4" />
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Modal Add Work -->
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
