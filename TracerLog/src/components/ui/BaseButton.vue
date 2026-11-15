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
  primary: 'bg-primary text-white hover:bg-primary-hover shadow-xs',
  secondary: 'border border-line bg-panel text-ink hover:bg-primary-light hover:text-primary hover:border-primary/40',
  ghost: 'text-ink-secondary hover:bg-primary-light hover:text-ink',
  danger: 'bg-red-600 text-white hover:bg-red-700 shadow-xs',
}
const sizes = {
  sm: 'px-2.5 py-1 text-xs',
  md: 'px-3.5 py-2 text-sm',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center gap-2 rounded-[6px] font-medium transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </button>
</template>
