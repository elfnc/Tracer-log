<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@lucide/vue'
import type { Work, WorkStatus } from '@/types'
import WorkCard from '@/components/work/WorkCard.vue'

const props = defineProps<{
  status: WorkStatus
  works: Work[]
}>()

const emit = defineEmits<{
  (e: 'cardClick', work: Work): void
  (e: 'cardDrop', workId: string, targetStatus: WorkStatus): void
  (e: 'quickAdd', status: WorkStatus): void
}>()

const isDragOver = ref(false)

const columnTheme: Record<WorkStatus, { dot: string; border: string }> = {
  PROGRESS: {
    dot: 'bg-amber-500',
    border: 'border-t-amber-500',
  },
  SELESAI: {
    dot: 'bg-emerald-500',
    border: 'border-t-emerald-500',
  },
  'REVISI PROGRESS': {
    dot: 'bg-rose-500',
    border: 'border-t-rose-500',
  },
  'REVISI SELESAI': {
    dot: 'bg-sky-500',
    border: 'border-t-sky-500',
  },
}

function onDragStart(e: DragEvent, work: Work) {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', work.id)
  }
}

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
  isDragOver.value = true
}

function onDragLeave(e: DragEvent) {
  const currentTarget = e.currentTarget as HTMLElement
  const relatedTarget = e.relatedTarget as HTMLElement
  if (!currentTarget.contains(relatedTarget)) {
    isDragOver.value = false
  }
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  isDragOver.value = false
  const workId = e.dataTransfer?.getData('text/plain')
  if (workId) {
    emit('cardDrop', workId, props.status)
  }
}
</script>

<template>
  <div
    class="flex flex-col min-w-[280px] max-w-[340px] flex-1 rounded-[10px] border border-line bg-panel/70 shadow-2xs transition-all duration-150 border-t-4"
    :class="[
      columnTheme[status].border,
      isDragOver ? 'ring-2 ring-primary bg-primary-light/20 border-primary' : '',
    ]"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <!-- Column Header -->
    <div class="flex items-center justify-between px-3.5 py-3 border-b border-line/70">
      <div class="flex items-center gap-2">
        <span class="size-2 rounded-full" :class="columnTheme[status].dot" />
        <h3 class="text-xs font-bold tracking-wider text-ink uppercase">
          {{ status }}
        </h3>
        <span class="inline-flex items-center justify-center rounded-full bg-app px-2 py-0.5 text-[11px] font-semibold text-muted">
          {{ works.length }}
        </span>
      </div>

      <button
        type="button"
        title="Tambah pekerjaan di status ini"
        class="flex size-6 items-center justify-center rounded-[4px] text-muted hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
        @click="emit('quickAdd', status)"
      >
        <Plus class="size-4" />
      </button>
    </div>

    <!-- Droppable Cards List -->
    <div class="flex-1 p-2.5 space-y-2.5 overflow-y-auto max-h-[calc(100vh-270px)] min-h-[140px]">
      <!-- Empty State -->
      <div
        v-if="works.length === 0"
        class="flex h-32 flex-col items-center justify-center rounded-[8px] border border-dashed border-line/80 p-4 text-center transition-colors"
        :class="isDragOver ? 'bg-primary-light/30 border-primary text-primary' : 'text-muted'"
      >
        <p class="text-xs font-medium">
          {{ isDragOver ? 'Lepaskan kartu di sini' : 'Belum ada pekerjaan' }}
        </p>
        <p class="mt-0.5 text-[11px] opacity-75">
          {{ isDragOver ? 'Status otomatis diperbarui' : 'Tarik kartu ke kolom ini' }}
        </p>
      </div>

      <!-- Work Cards -->
      <WorkCard
        v-for="work in works"
        :key="work.id"
        :work="work"
        draggable
        @click="emit('cardClick', work)"
        @dragstart="onDragStart"
      />
    </div>

    <!-- Bottom Action -->
    <div class="p-2 border-t border-line/60">
      <button
        type="button"
        class="flex w-full items-center justify-center gap-1.5 rounded-[6px] py-1.5 text-xs font-medium text-muted hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
        @click="emit('quickAdd', status)"
      >
        <Plus class="size-3.5" />
        <span>Tambah Pekerjaan</span>
      </button>
    </div>
  </div>
</template>
