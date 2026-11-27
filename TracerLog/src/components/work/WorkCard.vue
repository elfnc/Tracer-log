<script setup lang="ts">
import { FileText, Calendar } from '@lucide/vue'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import type { Work } from '@/types'
import WorkStatusBadge from './WorkStatusBadge.vue'

withDefaults(
  defineProps<{
    work: Work
    showStatus?: boolean
    draggable?: boolean
  }>(),
  {
    showStatus: false,
    draggable: false,
  },
)

defineEmits<{
  (e: 'click', work: Work): void
  (e: 'dragstart', event: DragEvent, work: Work): void
  (e: 'dragend', event: DragEvent, work: Work): void
}>()

function formatDisplayDate(dateStr: string) {
  try {
    const d = parseISO(dateStr)
    return format(d, 'd MMM yyyy', { locale: id })
  } catch {
    return dateStr
  }
}
</script>

<template>
  <div
    role="button"
    tabindex="0"
    :draggable="draggable"
    class="glass-card group flex flex-col gap-2 rounded-[8px] p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md active:scale-[0.99] focus:border-primary focus:outline-none"
    :class="draggable ? 'cursor-grab active:cursor-grabbing select-none' : 'cursor-pointer'"
    @click="$emit('click', work)"
    @keydown.enter="$emit('click', work)"
    @keydown.space.prevent="$emit('click', work)"
    @dragstart="$emit('dragstart', $event, work)"
    @dragend="$emit('dragend', $event, work)"
  >
    <div class="flex items-start justify-between gap-2">
      <div class="min-w-0 flex-1">
        <span class="text-sm font-semibold tracking-tight text-ink group-hover:text-primary transition-colors">
          {{ work.designType || 'R' }}-{{ work.rNumber }}
        </span>
        <p class="text-xs font-medium text-ink-secondary truncate">
          {{ work.customer }}
        </p>
        <p
          v-if="work.description && work.description.trim()"
          class="text-[11px] text-muted truncate mt-0.5"
          :title="work.description"
        >
          {{ work.description }}
        </p>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <!-- Indikator catatan internal jika ada catatan -->
        <span
          v-if="work.notes && work.notes.trim().length > 0"
          title="Tersedia catatan internal"
          class="flex size-5 items-center justify-center rounded-[4px] bg-primary-light text-primary"
        >
          <FileText class="size-3" />
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between pt-1 border-t border-line/60 text-[11px] text-muted">
      <div class="flex items-center gap-1.5">
        <Calendar class="size-3 shrink-0" />
        <span>{{ formatDisplayDate(work.workDate) }}</span>
      </div>

      <WorkStatusBadge v-if="showStatus" :status="work.status" />
    </div>
  </div>
</template>
