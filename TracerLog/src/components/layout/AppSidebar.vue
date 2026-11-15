<script setup lang="ts">
import {
  ClipboardList,
  Columns3,
  FileText,
  History,
  LayoutDashboard,
  Moon,
  Settings,
  Sun,
} from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()

const nav = [
  { to: '/', label: 'Dasbor', icon: LayoutDashboard },
  { to: '/kanban', label: 'Papan Kanban', icon: Columns3 },
  { to: '/report', label: 'Laporan Harian', icon: FileText },
  { to: '/history', label: 'Riwayat Kerja', icon: History },
  { to: '/settings', label: 'Pengaturan', icon: Settings },
]
</script>

<template>
  <aside class="flex w-16 shrink-0 flex-col border-r border-line bg-panel md:w-60">
    <div class="flex h-16 items-center gap-2.5 px-4">
      <div class="flex size-8 items-center justify-center rounded-[6px] bg-primary text-white shadow-xs">
        <ClipboardList class="size-4.5" />
      </div>
      <div class="hidden flex-col md:flex">
        <span class="text-base font-semibold leading-tight tracking-tight text-ink">TracerLog</span>
        <span class="text-[11px] leading-none text-muted">Catatan Kerja Harian</span>
      </div>
    </div>

    <nav class="flex-1 space-y-1 px-2.5 py-3">
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:bg-primary-light hover:text-ink"
        active-class="!bg-primary-light !text-primary !font-semibold"
      >
        <component :is="item.icon" class="size-4.5 shrink-0" />
        <span class="hidden md:inline">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="border-t border-line p-2.5">
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:bg-primary-light hover:text-ink cursor-pointer"
        @click="toggle"
      >
        <component :is="isDark ? Sun : Moon" class="size-4.5 shrink-0" />
        <span class="hidden md:inline">{{ isDark ? 'Mode Terang' : 'Mode Gelap' }}</span>
      </button>
    </div>
  </aside>
</template>
