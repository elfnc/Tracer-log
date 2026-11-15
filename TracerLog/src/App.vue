<script setup lang="ts">
import { onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useProfileStore } from '@/stores/profileStore'
import { useWorkStore } from '@/stores/workStore'

const profileStore = useProfileStore()
const workStore = useWorkStore()

onMounted(async () => {
  await Promise.all([
    profileStore.fetchProfile(),
    workStore.fetchWorks(),
  ])
})
</script>

<template>
  <AppLayout />
</template>
