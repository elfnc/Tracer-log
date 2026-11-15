<script setup lang="ts">
import BaseBadge from '@/components/ui/BaseBadge.vue'
import type { WorkStatus } from '@/types'

defineProps<{ status: WorkStatus }>()
</script>

<template>
  <BaseBadge :status="status" />
</template>
