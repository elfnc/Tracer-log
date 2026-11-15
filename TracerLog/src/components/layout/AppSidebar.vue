<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
  ChevronLeft,
  ChevronRight,
} from '@lucide/vue'
import { useTheme } from '@/composables/useTheme'
import { useProfileStore } from '@/stores/profileStore'

const { isDark, toggle } = useTheme()
const profileStore = useProfileStore()

const isCollapsed = ref(false)

onMounted(async () => {
  await profileStore.fetchProfile()
  const savedCollapsed = localStorage.getItem('tracerlog_sidebar_collapsed')
  if (savedCollapsed !== null) {
    isCollapsed.value = savedCollapsed === 'true'
  }
})

function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  localStorage.setItem('tracerlog_sidebar_collapsed', String(isCollapsed.value))
}

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/kanban', label: 'Kanban Board', icon: Columns3 },
  { to: '/report', label: 'Daily Report', icon: FileText },
  { to: '/history', label: 'Work History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings },
]
</script>

<template>
  <aside
    class="flex shrink-0 flex-col border-r border-line bg-panel transition-all duration-200 select-none"
    :class="isCollapsed ? 'w-16' : 'w-60'"
  >
    <!-- Logo & Brand Header with Collapse Toggle -->
    <div
      class="flex h-16 items-center border-b border-line/60 px-3.5"
      :class="isCollapsed ? 'justify-center' : 'justify-between'"
    >
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="flex size-8 shrink-0 items-center justify-center rounded-[6px] bg-primary text-white shadow-xs">
          <ClipboardList class="size-4.5" />
        </div>
        <div v-if="!isCollapsed" class="flex flex-col min-w-0">
          <span class="truncate text-base font-semibold leading-tight tracking-tight text-ink">TracerLog</span>
          <span class="text-[11px] leading-none text-muted">Daily Worklog</span>
        </div>
      </div>

      <!-- Toggle Button (Collapse/Expand) -->
      <button
        type="button"
        :title="isCollapsed ? 'Perbesar sidebar' : 'Kecilkan sidebar'"
        class="flex size-7 items-center justify-center rounded-[6px] text-muted hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
        :class="isCollapsed ? 'mt-2 hidden' : ''"
        @click="toggleCollapse"
      >
        <ChevronLeft class="size-4" />
      </button>
    </div>

    <!-- Mini Toggle Button when collapsed at top -->
    <div v-if="isCollapsed" class="flex justify-center py-1.5 border-b border-line/40">
      <button
        type="button"
        title="Perbesar sidebar"
        class="flex size-6 items-center justify-center rounded-[4px] text-muted hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
        @click="toggleCollapse"
      >
        <ChevronRight class="size-3.5" />
      </button>
    </div>

    <!-- Navigation Menu Items -->
    <nav class="flex-1 space-y-1 p-2">
      <RouterLink
        v-for="item in nav"
        :key="item.to"
        :to="item.to"
        :title="isCollapsed ? item.label : undefined"
        class="flex items-center rounded-[6px] text-sm font-medium text-ink-secondary transition-colors duration-150 hover:bg-primary-light hover:text-ink cursor-pointer"
        :class="[
          isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2',
        ]"
        active-class="!bg-primary-light !text-primary !font-semibold"
      >
        <component :is="item.icon" class="size-4.5 shrink-0" />
        <span v-if="!isCollapsed" class="truncate">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Bottom Section: Profile Preview & Theme Toggle -->
    <div class="border-t border-line p-2 space-y-1">
      <!-- User Profile Pill -->
      <RouterLink
        to="/settings"
        :title="isCollapsed ? (profileStore.profile.name || 'Profil Karyawan') : 'Lihat pengaturan profil'"
        class="flex items-center rounded-[6px] transition-colors hover:bg-primary-light/50 cursor-pointer"
        :class="isCollapsed ? 'justify-center p-2' : 'gap-2.5 px-2.5 py-2'"
      >
        <div class="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary-light text-primary font-bold text-xs">
          <User class="size-3.5" />
        </div>
        <div v-if="!isCollapsed" class="min-w-0 flex-1">
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
        :title="isCollapsed ? (isDark ? 'Mode Terang' : 'Mode Gelap') : undefined"
        class="flex w-full items-center rounded-[6px] text-sm font-medium text-ink-secondary transition-colors duration-150 hover:bg-primary-light hover:text-ink cursor-pointer"
        :class="isCollapsed ? 'justify-center p-2' : 'gap-3 px-3 py-2'"
        @click="toggle"
      >
        <component :is="isDark ? Sun : Moon" class="size-4.5 shrink-0" />
        <span v-if="!isCollapsed">{{ isDark ? 'Light mode' : 'Dark mode' }}</span>
      </button>
    </div>
  </aside>
</template>
