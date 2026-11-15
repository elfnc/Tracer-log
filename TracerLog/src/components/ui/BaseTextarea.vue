<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    placeholder?: string
    error?: string
    rows?: number
    disabled?: boolean
    hint?: string
  }>(),
  {
    label: undefined,
    placeholder: undefined,
    error: undefined,
    rows: 3,
    disabled: false,
    hint: undefined,
  },
)

const model = defineModel<string>({ default: '' })
</script>

<template>
  <label class="block space-y-1.5">
    <div class="flex items-center justify-between">
      <span v-if="label" class="block text-xs font-medium text-ink-secondary">{{ label }}</span>
      <span v-if="hint" class="block text-[11px] text-muted">{{ hint }}</span>
    </div>
    <textarea
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full resize-y rounded-[6px] border bg-panel px-3 py-2 text-sm text-ink placeholder:text-muted transition-colors duration-150 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60 dark:[color-scheme:dark]"
      :class="error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-line'"
    />
    <span v-if="error" class="block text-xs text-red-500">{{ error }}</span>
  </label>
</template>
