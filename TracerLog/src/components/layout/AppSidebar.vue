<script setup lang="ts">
import { ClipboardList, Columns3, FileText, History, LayoutDashboard, Moon, Settings, Sun } from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/kanban', label: 'Kanban Board', icon: Columns3 },
  { to: '/report', label: 'Daily Report', icon: FileText },
  { to: '/history', label: 'Work History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
]
</script>

<template>
  <aside class="flex w-16 shrink-0 flex-col border-r border-line bg-panel md:w-60">
    <div class="flex h-16 items-center gap-2 px-4">
      <div class="flex size-8 items-center justify-center rounded-lg bg-brand-500 text-white">
        <ClipboardList class="size-5" />
      </div>
      <span class="hidden text-lg font-bold md:inline">TracerLog</span>
    </div>

    <nav class="flex-1 space-y-1 px-2 py-2">
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-brand-500/10 hover:text-ink"
        active-class="!bg-brand-500/15 !text-brand-400"
      >
        <component :is="item.icon" class="size-5 shrink-0" />
        <span class="hidden md:inline">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="border-t border-line p-2">
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-brand-500/10 hover:text-ink"
        @click="toggle"
      >
        <component :is="isDark ? Sun : Moon" class="size-5 shrink-0" />
        <span class="hidden md:inline">{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
      </button>
    </div>
  </aside>
</template>