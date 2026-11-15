<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
</script>

<template>
  <div class="flex h-screen bg-app text-ink">
    <AppSidebar />
    <main class="flex-1 overflow-y-auto">
      <div class="mx-auto max-w-7xl p-4 md:p-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>