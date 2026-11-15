<script setup lang="ts">
import type { WorkStatus } from '@/types'

defineProps<{ status: WorkStatus }>()

const styles: Record<WorkStatus, string> = {
  PROGRESS: 'bg-[#FFF4DB] text-[#946200] dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/40',
  SELESAI: 'bg-[#E5F4EA] text-[#286A43] dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40',
  'REVISI PROGRESS': 'bg-[#FCE8E6] text-[#B54736] dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200/50 dark:border-rose-800/40',
  'REVISI SELESAI': 'bg-[#E6F0FA] text-[#315F91] dark:bg-sky-950/50 dark:text-sky-300 border border-sky-200/50 dark:border-sky-800/40',
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
