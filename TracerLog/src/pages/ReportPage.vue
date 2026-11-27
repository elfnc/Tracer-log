<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import {
  Calendar,
  Clock,
  Plus,
  Trash2,
  Check,
  Copy,
  History,
  AlertCircle,
  FileText,
  X,
} from '@lucide/vue'
import { format, subDays, parseISO } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { useWorkStore } from '@/stores/workStore'
import { useProfileStore } from '@/stores/profileStore'
import { useReportStore } from '@/stores/reportStore'
import { generateDailyReportContent, type ReportTimeSlot } from '@/utils/reportGenerator'
import type { Work, DailyReport } from '@/types'
import type { CreateWorkDto } from '@/repositories/workRepository'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import WorkForm from '@/components/work/WorkForm.vue'
import WorkDetailModal from '@/components/work/WorkDetailModal.vue'
import WorkStatusBadge from '@/components/work/WorkStatusBadge.vue'
import ReportPreview from '@/components/report/ReportPreview.vue'

const workStore = useWorkStore()
const profileStore = useProfileStore()
const reportStore = useReportStore()

const todayStr = format(new Date(), 'yyyy-MM-dd')
const selectedDate = ref<string>(todayStr)

const isAddModalOpen = ref(false)
const isDetailModalOpen = ref(false)
const activeWork = ref<Work | null>(null)
const saveSuccess = ref(false)
const toastMessage = ref<string | null>(null)
let toastTimeout: ReturnType<typeof setTimeout> | null = null

// Time-slot state (24-hour HH:mm)
const slotStart = ref('')
const slotEnd = ref('')
const TIME_24H_REGEX = /^([01]\d|2[0-3]):[0-5]\d$/

function normalize24hTime(raw: string): string {
  const trimmed = raw.trim()
  if (!trimmed) return ''
  const digits = trimmed.replace(/\D/g, '')
  let candidate = trimmed
  if (/^\d{3,4}$/.test(digits) && !trimmed.includes(':')) {
    const padded = digits.padStart(4, '0')
    candidate = `${padded.slice(0, 2)}:${padded.slice(2, 4)}`
  } else if (/^\d{1,2}:\d{1,2}$/.test(trimmed)) {
    const [h, m] = trimmed.split(':')
    candidate = `${h.padStart(2, '0')}:${m.padStart(2, '0')}`
  }
  return TIME_24H_REGEX.test(candidate) ? candidate : trimmed
}

function handleTimeInput(target: 'start' | 'end', event: Event) {
  const input = event.target as HTMLInputElement
  let val = input.value.replace(/[^\d:]/g, '')
  if (val.length === 2 && !val.includes(':') && (target === 'start' ? slotStart.value : slotEnd.value).length < 2) {
    val = `${val}:`
  }
  if (val.length > 5) val = val.slice(0, 5)
  if (target === 'start') slotStart.value = val
  else slotEnd.value = val
}

function handleTimeBlur(target: 'start' | 'end') {
  if (target === 'start') slotStart.value = normalize24hTime(slotStart.value)
  else slotEnd.value = normalize24hTime(slotEnd.value)
}

const isTimeSlotInvalid = computed(() => {
  const hasStart = slotStart.value.trim().length > 0
  const hasEnd = slotEnd.value.trim().length > 0
  if (hasStart && !TIME_24H_REGEX.test(slotStart.value.trim())) return true
  if (hasEnd && !TIME_24H_REGEX.test(slotEnd.value.trim())) return true
  return false
})

const timeSlot = computed<ReportTimeSlot | undefined>(() => {
  const start = slotStart.value.trim()
  const end = slotEnd.value.trim()
  if (TIME_24H_REGEX.test(start) && TIME_24H_REGEX.test(end)) {
    return { start, end }
  }
  return undefined
})

function clearTimeSlot() {
  slotStart.value = ''
  slotEnd.value = ''
}

function showToast(msg: string) {
  toastMessage.value = msg
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toastMessage.value = null
  }, 2500)
}

onMounted(async () => {
  await Promise.all([
    workStore.fetchWorks(),
    profileStore.fetchProfile(),
    reportStore.fetchSavedReports(),
  ])
})

// Works specifically for the selected date, sorted by creation time
const dateWorks = computed(() => {
  return workStore.works
    .filter((w) => w.workDate === selectedDate.value)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
})

// Generated report string based on current works, profile, and optional time-slot
const generatedReportText = computed(() => {
  return generateDailyReportContent(
    selectedDate.value,
    dateWorks.value,
    profileStore.profile,
    timeSlot.value,
  )
})

const isCurrentDateSaved = computed(() => {
  return reportStore.savedReports.some((r) => r.reportDate === selectedDate.value)
})

watch(selectedDate, () => {
  saveSuccess.value = false
})

function setToday() {
  selectedDate.value = todayStr
}

function setYesterday() {
  selectedDate.value = format(subDays(new Date(), 1), 'yyyy-MM-dd')
}

function formattedSelectedDate(dateStr: string) {
  try {
    return format(parseISO(dateStr), 'EEEE, d MMMM yyyy', { locale: idLocale })
  } catch {
    return dateStr
  }
}

async function handleCopy() {
  const ok = await reportStore.copyToClipboard(generatedReportText.value)
  if (ok) {
    showToast('Laporan berhasil disalin ke clipboard! Siap dipaste ke WhatsApp.')
  }
}

async function handleSave() {
  await reportStore.saveReport(selectedDate.value, generatedReportText.value)
  saveSuccess.value = true
  showToast('Laporan harian berhasil disimpan ke riwayat.')
}

async function handleCreateWork(dto: CreateWorkDto) {
  await workStore.addWork(dto)
  isAddModalOpen.value = false
  showToast(`Pekerjaan ${dto.designType || 'R'}-${dto.rNumber} berhasil ditambahkan.`)
}

function openDetail(work: Work) {
  activeWork.value = work
  isDetailModalOpen.value = true
}

async function handleUpdateWork(id: string, data: Parameters<typeof workStore.updateWork>[1]) {
  await workStore.updateWork(id, data)
  showToast('Pekerjaan berhasil diperbarui.')
}

async function handleDeleteWork(id: string) {
  await workStore.deleteWork(id)
  showToast('Pekerjaan berhasil dihapus.')
}

async function handleDeleteHistoryReport(id: string) {
  await reportStore.deleteReport(id)
  showToast('Riwayat laporan berhasil dihapus.')
}

async function copyFromHistory(report: DailyReport) {
  const ok = await reportStore.copyToClipboard(report.content)
  if (ok) {
    showToast(`Laporan tanggal ${report.reportDate} berhasil disalin!`)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Toast Notification Popup -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div
          v-if="toastMessage"
          class="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-[8px] border border-primary/40 bg-panel px-4 py-3 text-xs font-medium text-ink shadow-lg dark:bg-panel-elevated"
        >
          <div class="flex size-5 items-center justify-center rounded-full bg-primary text-white">
            <Check class="size-3" />
          </div>
          <span>{{ toastMessage }}</span>
        </div>
      </Transition>
    </Teleport>

    <!-- Page Header (Title: Daily Report in English, Subtitle in Indonesian) -->
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-ink md:text-2xl">Daily Report</h1>
        <p class="text-xs text-ink-secondary md:text-sm">
          Generate dan salin rekap pekerjaan harian siap kirim ke WhatsApp grup kantor
        </p>
      </div>

      <div class="flex items-center gap-2">
        <BaseButton variant="primary" @click="handleCopy">
          <Copy class="size-4 mr-1.5" />
          Salin Laporan
        </BaseButton>
      </div>
    </div>

    <!-- Date Selection Controls -->
    <div class="glass-card rounded-[10px] p-4">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <label class="block text-xs font-medium text-ink-secondary">Tanggal Laporan</label>
          <div class="flex flex-wrap items-center gap-2">
            <div class="relative flex items-center">
              <Calendar class="pointer-events-none absolute left-3 size-4 text-muted" />
              <input
                v-model="selectedDate"
                type="date"
                class="rounded-[6px] border border-line bg-app pl-9 pr-3 py-1.5 text-xs text-ink font-medium focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:[color-scheme:dark]"
              />
            </div>

            <button
              type="button"
              class="rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer"
              :class="
                selectedDate === todayStr
                  ? 'bg-primary text-white shadow-2xs'
                  : 'border border-line bg-app text-ink-secondary hover:bg-primary-light hover:text-ink'
              "
              @click="setToday"
            >
              Hari Ini
            </button>

            <button
              type="button"
              class="rounded-[6px] border border-line bg-app px-3 py-1.5 text-xs font-medium text-ink-secondary hover:bg-primary-light hover:text-ink transition-colors cursor-pointer"
              @click="setYesterday"
            >
              Kemarin
            </button>
          </div>
        </div>

        <!-- Date Info Badge -->
        <div class="rounded-[6px] bg-app border border-line px-3.5 py-2 text-xs">
          <span class="text-muted block text-[11px]">Tanggal Laporan Terpilih:</span>
          <span class="font-semibold text-ink">{{ formattedSelectedDate(selectedDate) }}</span>
          <span v-if="timeSlot" class="text-muted ml-2">• {{ timeSlot.start }} - {{ timeSlot.end }}</span>
        </div>
      </div>
    </div>

    <!-- Main Content Grid: Preview & Work Items -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <!-- Report Preview (7 cols on lg) -->
      <div class="lg:col-span-7 space-y-4">
        <ReportPreview
          :content="generatedReportText"
          :work-count="dateWorks.length"
          :is-copied="reportStore.isCopied"
          :is-saved="isCurrentDateSaved || saveSuccess"
          @copy="handleCopy"
          @save="handleSave"
          @regenerate="() => showToast('Format laporan telah diperbarui ulang.')"
        >
          <template #controls>
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="flex items-center gap-1.5 text-xs font-medium text-ink-secondary">
                <Clock class="size-3.5 text-primary" />
                <span>Slot Waktu 24 Jam (Opsional)</span>
              </div>

              <div class="flex items-center gap-2">
                <input
                  :value="slotStart"
                  type="text"
                  inputmode="numeric"
                  maxlength="5"
                  placeholder="08:00"
                  aria-label="Jam mulai (format 24 jam)"
                  class="rounded-[6px] border border-line bg-app px-2.5 py-1 text-xs text-ink font-medium font-mono text-center focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[72px]"
                  @input="handleTimeInput('start', $event)"
                  @blur="handleTimeBlur('start')"
                />
                <span class="text-xs text-muted font-medium">—</span>
                <input
                  :value="slotEnd"
                  type="text"
                  inputmode="numeric"
                  maxlength="5"
                  placeholder="10:00"
                  aria-label="Jam selesai (format 24 jam)"
                  class="rounded-[6px] border border-line bg-app px-2.5 py-1 text-xs text-ink font-medium font-mono text-center focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 w-[72px]"
                  @input="handleTimeInput('end', $event)"
                  @blur="handleTimeBlur('end')"
                />
                <button
                  v-if="slotStart || slotEnd"
                  type="button"
                  title="Hapus slot waktu"
                  class="flex size-6 items-center justify-center rounded-[4px] border border-line bg-app text-muted hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer dark:hover:bg-red-950/40 dark:hover:border-red-900/60"
                  @click="clearTimeSlot"
                >
                  <X class="size-3" />
                </button>
              </div>
            </div>
            <p v-if="isTimeSlotInvalid" class="mt-1 text-[11px] text-red-500 text-right">
              Gunakan format 24 jam HH:mm (00:00 – 23:59)
            </p>
          </template>
        </ReportPreview>

        <!-- Format Rules Callout -->
        <div class="glass-card rounded-[10px] p-4 text-xs text-ink-secondary space-y-1.5">
          <div class="flex items-center gap-1.5 font-semibold text-ink">
            <AlertCircle class="size-4 text-primary" />
            <span>Ketentuan Format Laporan:</span>
          </div>
          <ul class="list-disc list-inside space-y-1 text-muted text-[11px] leading-relaxed">
            <li>Hanya mencakup pekerjaan pada tanggal yang dipilih.</li>
            <li>Jika keterangan pekerjaan diisi → menggantikan status di output laporan.</li>
            <li>Jika keterangan kosong → status ditampilkan (UPPERCASE, format standar).</li>
            <li>Catatan internal (notes) <strong>tidak pernah disertakan</strong> ke dalam laporan WhatsApp.</li>
            <li>Slot waktu opsional — input jam mulai &amp; selesai secara bebas.</li>
          </ul>
        </div>
      </div>

      <!-- Works on Selected Date (5 cols on lg) -->
      <div class="lg:col-span-5 space-y-4">
        <div class="glass-card rounded-[10px] p-4 space-y-3">
          <div class="flex items-center justify-between pb-2.5 border-b border-line">
            <div>
              <h2 class="text-xs font-semibold uppercase tracking-wider text-ink">
                Pekerjaan di Tanggal Ini
              </h2>
              <p class="text-[11px] text-muted">
                {{ dateWorks.length }} pekerjaan tercatat
              </p>
            </div>

            <BaseButton size="sm" variant="secondary" @click="isAddModalOpen = true">
              <Plus class="size-3.5 mr-1" />
              Tambah Pekerjaan
            </BaseButton>
          </div>

          <!-- Empty State -->
          <div
            v-if="dateWorks.length === 0"
            class="flex flex-col items-center justify-center py-8 text-center"
          >
            <div class="flex size-9 items-center justify-center rounded-full bg-primary-light text-primary mb-2">
              <FileText class="size-4.5" />
            </div>
            <p class="text-xs font-medium text-ink">Belum ada pekerjaan di tanggal ini</p>
            <p class="mt-0.5 text-[11px] text-muted">
              Tambahkan pekerjaan terlebih dahulu agar format rekap terisi.
            </p>
            <BaseButton size="sm" variant="primary" class="mt-3" @click="isAddModalOpen = true">
              Tambah Pekerjaan
            </BaseButton>
          </div>

          <!-- Works list with click to edit -->
          <div v-else class="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            <div
              v-for="work in dateWorks"
              :key="work.id"
              role="button"
              tabindex="0"
              class="group flex items-center justify-between rounded-[6px] border border-line bg-app/50 p-2.5 transition-colors hover:border-primary/50 hover:bg-primary-light/20 cursor-pointer"
              @click="openDetail(work)"
            >
              <div class="min-w-0 flex-1">
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-semibold text-ink group-hover:text-primary transition-colors">
                    {{ work.designType || 'R' }}-{{ work.rNumber }}
                  </span>
                  <span class="text-[11px] text-muted">/</span>
                  <span class="text-xs font-medium text-ink-secondary truncate">
                    {{ work.customer }}
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-0.5 text-[10px] text-muted">
                  <span v-if="work.notes" class="text-primary font-medium">• Ada catatan internal</span>
                </div>
              </div>

              <WorkStatusBadge :status="work.status" />
            </div>
          </div>
        </div>

        <!-- Saved Reports History Section -->
        <div class="glass-card rounded-[10px] p-4 space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-line">
            <div class="flex items-center gap-2">
              <History class="size-4 text-muted" />
              <h2 class="text-xs font-semibold uppercase tracking-wider text-ink">
                Riwayat Laporan
              </h2>
            </div>
            <span class="text-[11px] text-muted">{{ reportStore.savedReports.length }} tersimpan</span>
          </div>

          <!-- History empty -->
          <div v-if="reportStore.savedReports.length === 0" class="py-4 text-center text-xs text-muted">
            Belum ada laporan yang disimpan ke riwayat.
          </div>

          <!-- History items -->
          <div v-else class="space-y-2 max-h-[220px] overflow-y-auto pr-1">
            <div
              v-for="report in reportStore.savedReports"
              :key="report.id"
              class="flex items-center justify-between rounded-[6px] border border-line bg-app/50 p-2.5 text-xs"
            >
              <div class="space-y-0.5 min-w-0 flex-1">
                <p class="font-semibold text-ink">{{ report.reportDate }}</p>
                <div class="flex items-center gap-1 text-[10px] text-muted">
                  <Clock class="size-3" />
                  <span>Disimpan: {{ format(parseISO(report.createdAt), 'dd/MM/yyyy HH:mm') }}</span>
                </div>
              </div>

              <div class="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  title="Salin isi laporan ini"
                  class="flex size-7 items-center justify-center rounded-[4px] border border-line bg-panel text-muted hover:bg-primary-light hover:text-primary transition-colors cursor-pointer"
                  @click="copyFromHistory(report)"
                >
                  <Copy class="size-3.5" />
                </button>

                <button
                  type="button"
                  title="Hapus riwayat laporan ini"
                  class="flex size-7 items-center justify-center rounded-[4px] border border-line bg-panel text-muted hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer dark:hover:bg-red-950/40"
                  @click="handleDeleteHistoryReport(report.id)"
                >
                  <Trash2 class="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Tambah Pekerjaan -->
    <BaseModal v-model="isAddModalOpen" title="Tambah Pekerjaan Baru">
      <WorkForm
        :initial-data="{ workDate: selectedDate }"
        submit-label="Simpan Pekerjaan"
        @submit="handleCreateWork"
        @cancel="isAddModalOpen = false"
      />
    </BaseModal>

    <!-- Modal Detail Work -->
    <WorkDetailModal
      v-model="isDetailModalOpen"
      :work="activeWork"
      @update="handleUpdateWork"
      @delete="handleDeleteWork"
    />
  </div>
</template>
