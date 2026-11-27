<script setup lang="ts">
import { X } from '@lucide/vue'
import { onMounted, onUnmounted, watch } from 'vue'

withDefaults(
  defineProps<{
    title: string
    maxWidthClass?: string
  }>(),
  { maxWidthClass: 'max-w-[520px]' },
)

const open = defineModel<boolean>({ required: true })

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/40 backdrop-blur-[3px]" @click="open = false" />

        <!-- Modal Box -->
        <div
          role="dialog"
          aria-modal="true"
          class="glass-card animate-modal-pop relative w-full rounded-[12px] shadow-xl transition-all duration-200"
          :class="maxWidthClass"
        >
          <header class="flex items-center justify-between border-b border-line px-5 py-3.5">
            <h2 class="text-base font-semibold text-ink">{{ title }}</h2>
            <button
              type="button"
              class="flex size-7 items-center justify-center rounded-[6px] text-muted transition-colors hover:bg-primary-light hover:text-ink cursor-pointer"
              aria-label="Tutup modal"
              @click="open = false"
            >
              <X class="size-4" />
            </button>
          </header>

          <div class="p-5">
            <slot />
          </div>

          <footer
            v-if="$slots.footer"
            class="flex items-center justify-end gap-2 border-t border-line/70 px-5 py-3.5 rounded-b-[12px]"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
