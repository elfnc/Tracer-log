<script setup lang="ts">
defineProps<{
  label?: string
  options: { label: string; value: string }[] | string[]
  error?: string
  required?: boolean
  disabled?: boolean
}>()

const model = defineModel<string>({ default: '' })
</script>

<template>
  <label class="block space-y-1.5">
    <span v-if="label" class="block text-xs font-medium text-ink-secondary">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
    <div class="relative">
      <select
        v-model="model"
        :disabled="disabled"
        class="w-full appearance-none rounded-[6px] border bg-panel px-3 py-2 pr-8 text-sm text-ink transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60 dark:[color-scheme:dark]"
        :class="error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-line'"
      >
        <option
          v-for="opt in options"
          :key="typeof opt === 'string' ? opt : opt.value"
          :value="typeof opt === 'string' ? opt : opt.value"
        >
          {{ typeof opt === 'string' ? opt : opt.label }}
        </option>
      </select>
      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-muted">
        <svg class="size-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    <span v-if="error" class="block text-xs text-red-500">{{ error }}</span>
  </label>
</template>
