<script setup lang="ts">
import type { WorkStatus } from '@/types'

defineProps<{ status: WorkStatus }>()

const styles: Record<WorkStatus, string> = {
  PROGRESS: 'bg-amber-500/15 text-amber-400',
  SELESAI: 'bg-brand-500/15 text-brand-400',
  'REVISI PROGRESS': 'bg-orange-500/15 text-orange-400',
  'REVISI SELESAI': 'bg-sky-500/15 text-sky-400',
}
</script>

<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
    :class="styles[status]"
  >
    {{ status }}
  </span>
</template>