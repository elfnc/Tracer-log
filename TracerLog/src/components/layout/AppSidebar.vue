<script setup lang="ts">
import { onMounted } from 'vue'
import {
  ClipboardList,
  Columns3,
  FileText,
  History,
  LayoutDashboard,
  Moon,
  Settings,
  Sun,
  User,
} from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'
import { useProfileStore } from '@/stores/profileStore'

const { isDark, toggle } = useTheme()
const profileStore = useProfileStore()

onMounted(async () => {
  await profileStore.fetchProfile()
})

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
    <!-- Logo & Brand Header -->
    <div class="flex h-16 items-center gap-2.5 px-4">
      <div class="flex size-8 items-center justify-center rounded-[6px] bg-primary text-white shadow-xs">
        <ClipboardList class="size-4.5" />
      </div>
      <div class="hidden flex-col md:flex">
        <span class="text-base font-semibold leading-tight tracking-tight text-ink">TracerLog</span>
        <span class="text-[11px] leading-none text-muted">Daily Worklog</span>
      </div>
    </div>

    <!-- Navigation Menu (Titles in English per rule) -->
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

    <!-- Bottom Section: Profile Preview & Theme Toggle -->
    <div class="border-t border-line p-2.5 space-y-1.5">
      <!-- User Profile Pill -->
      <RouterLink
        to="/settings"
        title="Lihat pengaturan profil"
        class="hidden md:flex items-center gap-2.5 rounded-[6px] px-2.5 py-2 transition-colors hover:bg-primary-light/50 cursor-pointer"
      >
        <div class="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary font-bold text-xs">
          <User class="size-3.5" />
        </div>
        <div class="min-w-0 flex-1">
          <p class="truncate text-xs font-semibold text-ink leading-tight">
            {{ profileStore.profile.name || 'Profil Karyawan' }}
          </p>
          <p class="truncate text-[10px] text-muted leading-tight">
            {{ profileStore.profile.position || 'Designer' }}
          </p>
        </div>
      </RouterLink>

      <!-- Theme Switch Button -->
      <button
        type="button"
        class="flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-sm font-medium text-ink-secondary transition-colors duration-150 hover:bg-primary-light hover:text-ink cursor-pointer"
        @click="toggle"
      >
        <component :is="isDark ? Sun : Moon" class="size-4.5 shrink-0" />
        <span class="hidden md:inline">{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
      </button>
    </div>
  </aside>
</template>
