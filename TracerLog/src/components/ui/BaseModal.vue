<script setup lang="ts">
import { X } from '@lucide/vue';
import { onMounted, onUnmounted } from 'vue'


defineProps<{ title: string }>()
const open = defineModel<boolean>({ required: true })

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/60" @click="open = false" />
      <div
        role="dialog"
        aria-modal="true"
        class="relative w-full max-w-lg rounded-xl border border-line bg-panel shadow-2xl"
      >
        <header class="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 class="text-base font-bold">{{ title }}</h2>
          <button type="button" class="text-muted hover:text-ink" @click="open = false">
            <X class="size-5" />
          </button>
        </header>
        <div class="p-5"><slot /></div>
        <footer v-if="$slots.footer" class="flex justify-end gap-2 border-t border-line px-5 py-4">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>