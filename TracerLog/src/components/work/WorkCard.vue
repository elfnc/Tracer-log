<script setup lang="ts">
import { FileText, Calendar } from '@lucide/vue'
import type { Work } from '@/types'
import WorkStatusBadge from './WorkStatusBadge.vue'

defineProps<{
  work: Work
  showStatus?: boolean
}>()

defineEmits<{
  (e: 'click', work: Work): void
}>()
</script>

<template>
  <div
    role="button"
    tabindex="0"
    class="group flex flex-col gap-2 rounded-[8px] border border-line bg-panel p-3 text-left transition-all duration-150 hover:border-primary/60 hover:shadow-sm focus:border-primary focus:outline-none cursor-pointer"
    @click="$emit('click', work)"
    @keydown.enter="$emit('click', work)"
    @keydown.space.prevent="$emit('click', work)"
  >
    <div class="flex items-start justify-between gap-2">
      <div>
        <span class="text-sm font-semibold tracking-tight text-ink group-hover:text-primary transition-colors">
          R# {{ work.rNumber }}
        </span>
        <p class="text-xs font-medium text-ink-secondary truncate max-w-[180px]">
          {{ work.customer }}
        </p>
      </div>

      <div class="flex items-center gap-1.5 shrink-0">
        <!-- Notes indicator icon if work has internal notes -->
        <span
          v-if="work.notes && work.notes.trim().length > 0"
          title="Terdapat catatan internal"
          class="flex size-5 items-center justify-center rounded-[4px] bg-primary-light text-primary"
        >
          <FileText class="size-3" />
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between pt-1 border-t border-line/60 text-[11px] text-muted">
      <div class="flex items-center gap-1">
        <Calendar class="size-3 shrink-0" />
        <span>{{ work.workDate }}</span>
      </div>

      <WorkStatusBadge v-if="showStatus" :status="work.status" />
    </div>
  </div>
</template>
