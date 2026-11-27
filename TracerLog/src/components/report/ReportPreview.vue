<script setup lang="ts">
import { Copy, Check, RefreshCw, BookmarkCheck } from '@lucide/vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = defineProps<{
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

function handleShareWhatsApp() {
  emit('copy')
  const encodedText = encodeURIComponent(props.content)
  window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank', 'noopener,noreferrer')
}
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

      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        <BaseButton
          size="md"
          variant="secondary"
          class="border-emerald-500/40 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-500/60 dark:text-emerald-400 dark:hover:bg-emerald-950/40"
          @click="handleShareWhatsApp"
        >
          <svg class="size-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.82 14.13c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.15.11-1.85-.11-.43-.14-.98-.32-1.69-.62-2.98-1.29-4.92-4.29-5.07-4.49-.15-.2-1.21-1.61-1.21-3.07 0-1.46.76-2.18 1.03-2.48.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.31.32-.13.62.17.3.77 1.27 1.66 2.06 1.14 1.02 2.1 1.34 2.4 1.49.3.15.47.12.65-.08.17-.2.74-.87.94-1.17.2-.3.4-.25.67-.15.27.1 1.74.82 2.04.97.3.15.5.22.57.35.07.12.07.72-.17 1.4z" />
          </svg>
          <span>Kirim ke WhatsApp</span>
        </BaseButton>

        <BaseButton
          size="md"
          variant="primary"
          class="min-w-[140px]"
          @click="emit('copy')"
        >
          <component :is="isCopied ? Check : Copy" class="size-4 mr-1.5" />
          <span>{{ isCopied ? 'Berhasil Disalin!' : 'Salin Laporan' }}</span>
        </BaseButton>
      </div>
    </div>
  </div>
</template>
