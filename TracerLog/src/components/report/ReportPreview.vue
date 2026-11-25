<script setup lang="ts">
import { Copy, Check, RefreshCw, BookmarkCheck } from '@lucide/vue'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps<{
  content: string
  workCount: number
  isCopied: boolean
  isSaved?: boolean
}>()

const emit = defineEmits<{
  (e: 'copy'): void
  (e: 'save'): void
  (e: 'regenerate'): void
}>()
</script>

<template>
  <div class="glass-card rounded-[10px] overflow-hidden">
    <!-- Header Preview Card -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-app/50 px-4 py-3">
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold uppercase tracking-wider text-ink">Pratinjau WhatsApp</span>
        <span class="inline-flex items-center justify-center rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-medium text-primary">
          {{ workCount }} pekerjaan
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          title="Regenerate format dari data pekerjaan terbaru"
          class="flex items-center gap-1.5 rounded-[6px] border border-line bg-panel px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-primary-light hover:text-ink transition-colors cursor-pointer"
          @click="emit('regenerate')"
        >
          <RefreshCw class="size-3.5" />
          <span>Perbarui Format</span>
        </button>

        <button
          type="button"
          title="Simpan rekap laporan ini ke riwayat"
          class="flex items-center gap-1.5 rounded-[6px] border border-line bg-panel px-2.5 py-1.5 text-xs font-medium text-ink-secondary hover:bg-primary-light hover:text-ink transition-colors cursor-pointer"
          @click="emit('save')"
        >
          <BookmarkCheck class="size-3.5" :class="isSaved ? 'text-primary' : ''" />
          <span>{{ isSaved ? 'Tersimpan' : 'Simpan Laporan' }}</span>
        </button>
      </div>
    </div>

    <!-- Optional Controls Slot (e.g. Time-Slot 24h) -->
    <div v-if="$slots.controls" class="border-b border-line/70 bg-app/25 px-4 py-2.5">
      <slot name="controls" />
    </div>

    <!-- WhatsApp Styled Monospace Content Box -->
    <div class="p-4 sm:p-6 bg-app/30">
      <div class="relative rounded-[8px] border border-line/80 bg-panel p-4 sm:p-5 font-mono text-xs sm:text-sm leading-relaxed text-ink shadow-2xs whitespace-pre-wrap select-text">
        <pre class="font-mono">{{ content }}</pre>
      </div>
    </div>

    <!-- Bottom Action Bar with Primary Copy CTA -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-line/70 px-4 py-3">
      <p class="text-xs text-muted">
        Siap disalin ke WhatsApp grup kantor (catatan internal otomatis dikecualikan).
      </p>

      <BaseButton
        size="md"
        variant="primary"
        class="w-full sm:w-auto min-w-[140px]"
        @click="emit('copy')"
      >
        <component :is="isCopied ? Check : Copy" class="size-4 mr-1.5" />
        <span>{{ isCopied ? 'Berhasil Disalin!' : 'Salin Laporan' }}</span>
      </BaseButton>
    </div>
  </div>
</template>
