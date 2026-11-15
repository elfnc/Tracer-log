<script setup lang="ts">
import { ref } from 'vue'
import { WORK_STATUSES } from '@/types'
import BaseBadge from '@/components/ui/BaseBadge.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const open = ref(false)
const rNumber = ref('')
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Dashboard</h1>

    <div class="flex flex-wrap gap-2">
      <BaseBadge v-for="s in WORK_STATUSES" :key="s" :status="s" />
    </div>

    <div class="flex gap-2">
      <BaseButton @click="open = true">Buka Modal</BaseButton>
      <BaseButton variant="secondary">Secondary</BaseButton>
      <BaseButton variant="ghost">Ghost</BaseButton>
      <BaseButton variant="danger">Danger</BaseButton>
    </div>

    <BaseModal v-model="open" title="Test Modal">
      <BaseInput v-model="rNumber" label="R#" placeholder="2610240" />
      <template #footer>
        <BaseButton variant="ghost" @click="open = false">Batal</BaseButton>
        <BaseButton @click="open = false">Simpan</BaseButton>
      </template>
    </BaseModal>
  </div>
</template>