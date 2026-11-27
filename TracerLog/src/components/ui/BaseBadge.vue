<script setup lang="ts">
import type { WorkStatus } from '@/types'

defineProps<{ status: WorkStatus }>()

const styles: Record<WorkStatus, string> = {
  PROGRESS:
    'bg-amber-500/12 text-amber-700 border border-amber-500/25 dark:bg-amber-400/15 dark:text-amber-300 dark:border-amber-400/25',
  SELESAI:
    'bg-emerald-500/12 text-emerald-700 border border-emerald-500/25 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/25',
  'REVISI PROGRESS':
    'bg-rose-500/12 text-rose-700 border border-rose-500/25 dark:bg-rose-400/15 dark:text-rose-300 dark:border-rose-400/25',
  'REVISI SELESAI':
    'bg-cyan-500/12 text-cyan-800 border border-cyan-500/25 dark:bg-cyan-400/15 dark:text-cyan-200 dark:border-cyan-400/25',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-[4px] px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase select-none"
    :class="styles[status]"
  >
    {{ status }}
  </span>
</template>
