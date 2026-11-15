
<script setup lang="ts">
defineProps<{
  label?: string
  placeholder?: string
  type?: string
  error?: string
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <label class="block space-y-1.5">
    <span v-if="label" class="text-sm font-medium">{{ label }}</span>
    <input
      v-model="model"
      :type="type ?? 'text'"
      :placeholder="placeholder"
      class="w-full rounded-lg border bg-app px-3 py-2 text-sm placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand-500 dark:[color-scheme:dark]"
      :class="error ? 'border-red-500' : 'border-line'"
    />
    <span v-if="error" class="text-xs text-red-400">{{ error }}</span>
  </label>
</template>