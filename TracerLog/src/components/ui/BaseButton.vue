<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
    size?: 'sm' | 'md'
    type?: 'button' | 'submit'
    disabled?: boolean
  }>(),
  { variant: 'primary', size: 'md', type: 'button', disabled: false },
)

const variants = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  secondary: 'border border-line bg-panel text-ink hover:bg-brand-500/10',
  ghost: 'text-muted hover:bg-brand-500/10 hover:text-ink',
  danger: 'bg-red-500 text-white hover:bg-red-600',
}
const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </button>
</template>