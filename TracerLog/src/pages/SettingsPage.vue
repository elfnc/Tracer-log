<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import {
  User,
  ShieldCheck,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Database,
  Info,
  Download,
  Upload,
  HardDriveDownload,
  AlertTriangle,
} from '@lucide/vue'
import { format, parseISO } from 'date-fns'
import { id as idLocale } from 'date-fns/locale'
import { useProfileStore } from '@/stores/profileStore'
import { useWorkStore } from '@/stores/workStore'
import { useReportStore } from '@/stores/reportStore'
import { DEFAULT_PROFILE } from '@/repositories/profileRepository'
import { useTheme } from '@/composables/useTheme'
import {
  createBackupPayload,
  downloadBackupJson,
  parseAndValidateBackup,
  restoreBackup,
  type BackupPayload,
  type RestoreMode,
} from '@/utils/backupRestore'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseModal from '@/components/ui/BaseModal.vue'

const profileStore = useProfileStore()
const workStore = useWorkStore()
const reportStore = useReportStore()
const { isDark, toggle } = useTheme()

const form = reactive({
  name: '',
  division: '',
  position: '',
})

const errors = reactive<{
  name?: string
  division?: string
  position?: string
}>({})

const isSaving = ref(false)
const toastMessage = ref<string | null>(null)
let toastTimeout: ReturnType<typeof setTimeout> | null = null

function showToast(msg: string) {
  toastMessage.value = msg
  if (toastTimeout) clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toastMessage.value = null
  }, 2500)
}

function initForm() {
  form.name = profileStore.profile.name || ''
  form.division = profileStore.profile.division || ''
  form.position = profileStore.profile.position || ''
}

onMounted(async () => {
  await Promise.all([
    profileStore.fetchProfile(),
    workStore.fetchWorks(),
    reportStore.fetchSavedReports(),
  ])
  initForm()
})

watch(() => profileStore.profile, initForm)

const sampleDateStr = format(new Date(), 'EEEE d - MM - yyyy', { locale: idLocale })

function validate(): boolean {
  let valid = true
  errors.name = undefined
  errors.division = undefined
  errors.position = undefined

  if (!form.name.trim()) {
    errors.name = 'Nama karyawan wajib diisi'
    valid = false
  }

  if (!form.division.trim()) {
    errors.division = 'Nama divisi wajib diisi'
    valid = false
  }

  if (!form.position.trim()) {
    errors.position = 'Bagian / jabatan wajib diisi'
    valid = false
  }

  return valid
}

async function handleSave() {
  if (!validate()) return

  isSaving.value = true
  try {
    await profileStore.updateProfile({
      name: form.name.trim(),
      division: form.division.trim(),
      position: form.position.trim(),
    })
    showToast('Profil berhasil diperbarui dan diterapkan ke laporan harian!')
  } finally {
    isSaving.value = false
  }
}

function handleResetDefault() {
  form.name = DEFAULT_PROFILE.name
  form.division = DEFAULT_PROFILE.division
  form.position = DEFAULT_PROFILE.position
  showToast('Form diisi dengan data default.')
}

// Backup & Restore JSON state
const fileInputRef = ref<HTMLInputElement | null>(null)
const isExporting = ref(false)
const isRestoring = ref(false)
const restoreError = ref<string | null>(null)
const isRestoreModalOpen = ref(false)
const pendingBackup = ref<BackupPayload | null>(null)
const pendingFileName = ref('')
const restoreMode = ref<RestoreMode>('merge')

async function handleDownloadBackup() {
  isExporting.value = true
  restoreError.value = null
  try {
    const payload = await createBackupPayload()
    const filename = downloadBackupJson(payload)
    showToast(`Backup berhasil diunduh (${filename})`)
  } finally {
    isExporting.value = false
  }
}

function triggerRestoreFilePicker() {
  restoreError.value = null
  fileInputRef.value?.click()
}

async function handleRestoreFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  restoreError.value = null
  try {
    const text = await file.text()
    const result = parseAndValidateBackup(text)
    if (!result.valid || !result.payload) {
      restoreError.value = result.error || 'File backup tidak valid.'
      return
    }
    pendingBackup.value = result.payload
    pendingFileName.value = file.name
    restoreMode.value = 'merge'
    isRestoreModalOpen.value = true
  } catch {
    restoreError.value = 'Gagal membaca file backup. Pastikan file dapat diakses.'
  }
}

async function handleConfirmRestore() {
  if (!pendingBackup.value) return
  isRestoring.value = true
  try {
    await restoreBackup(pendingBackup.value, restoreMode.value)
    await Promise.all([
      workStore.fetchWorks(),
      profileStore.fetchProfile(),
      reportStore.fetchSavedReports(),
    ])
    initForm()
    isRestoreModalOpen.value = false
    pendingBackup.value = null
    showToast('Data berhasil dipulihkan dari file backup!')
  } catch {
    restoreError.value = 'Terjadi kesalahan saat memulihkan data ke database lokal.'
    isRestoreModalOpen.value = false
  } finally {
    isRestoring.value = false
  }
}

function formatBackupDate(isoStr: string): string {
  try {
    return format(parseISO(isoStr), 'd MMM yyyy, HH:mm', { locale: idLocale })
  } catch {
    return isoStr
  }
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <!-- Toast Feedback Popup -->
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

    <!-- Page Header (Title: Settings in English per rule) -->
    <div>
      <h1 class="text-xl font-semibold tracking-tight text-ink md:text-2xl">Settings</h1>
      <p class="text-xs text-ink-secondary md:text-sm">
        Atur identitas profil Anda dan preferensi aplikasi
      </p>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <!-- Profile Form Section (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <div class="glass-card rounded-[10px] p-5 space-y-4">
          <div class="flex items-center gap-2.5 pb-3 border-b border-line">
            <div class="flex size-8 items-center justify-center rounded-[6px] bg-primary-light text-primary">
              <User class="size-4.5" />
            </div>
            <div>
              <h2 class="text-sm font-semibold text-ink">Profil Karyawan</h2>
              <p class="text-xs text-muted">Data ini dicantumkan pada header laporan WhatsApp kantor</p>
            </div>
          </div>

          <form class="space-y-4" @submit.prevent="handleSave">
            <BaseInput
              v-model="form.name"
              label="Nama Lengkap Karyawan"
              placeholder="Contoh: Elfrian T. Setiawan"
              :error="errors.name"
              required
            />

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <BaseInput
                v-model="form.division"
                label="Divisi"
                placeholder="Contoh: digital printing"
                :error="errors.division"
                required
              />

              <BaseInput
                v-model="form.position"
                label="Bagian"
                placeholder="Contoh: designer junior"
                :error="errors.position"
                required
              />
            </div>

            <!-- Action buttons -->
            <div class="flex items-center justify-between pt-3 border-t border-line">
              <button
                type="button"
                class="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-ink transition-colors cursor-pointer"
                @click="handleResetDefault"
              >
                <RotateCcw class="size-3.5" />
                <span>Reset ke Default</span>
              </button>

              <BaseButton type="submit" variant="primary" :disabled="isSaving">
                <Check class="size-4 mr-1.5" />
                <span>{{ isSaving ? 'Menyimpan...' : 'Simpan Profil' }}</span>
              </BaseButton>
            </div>
          </form>
        </div>

        <!-- Appearance & Theme Card -->
        <div class="glass-card rounded-[10px] p-5 space-y-4">
          <div class="flex items-center gap-2.5 pb-3 border-b border-line">
            <div class="flex size-8 items-center justify-center rounded-[6px] bg-primary-light text-primary">
              <Sun class="size-4.5" />
            </div>
            <div>
              <h2 class="text-sm font-semibold text-ink">Tema & Tampilan</h2>
              <p class="text-xs text-muted">Sesuaikan kenyamanan visual sesuai preferensi Anda</p>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <p class="text-xs font-semibold text-ink">Mode Gelap (Dark Mode)</p>
              <p class="text-xs text-muted">
                {{ isDark ? 'Tema gelap aktif (nyaman untuk pencahayaan rendah)' : 'Tema terang aktif (bersih dan minimalis)' }}
              </p>
            </div>

            <BaseButton size="sm" variant="secondary" @click="toggle">
              <component :is="isDark ? Sun : Moon" class="size-3.5 mr-1.5" />
              <span>{{ isDark ? 'Beralih ke Terang' : 'Beralih ke Gelap' }}</span>
            </BaseButton>
          </div>
        </div>

        <!-- Backup & Restore Data JSON Card -->
        <div class="glass-card rounded-[10px] p-5 space-y-4">
          <div class="flex items-center gap-2.5 pb-3 border-b border-line">
            <div class="flex size-8 items-center justify-center rounded-[6px] bg-primary-light text-primary">
              <HardDriveDownload class="size-4.5" />
            </div>
            <div>
              <h2 class="text-sm font-semibold text-ink">Backup &amp; Restore Data</h2>
              <p class="text-xs text-muted">
                Ekspor seluruh pekerjaan, profil, dan riwayat laporan ke file JSON atau pulihkan kembali
              </p>
            </div>
          </div>

          <div class="rounded-[8px] border border-line/80 bg-app/70 px-3.5 py-2.5 text-xs text-ink-secondary flex flex-wrap items-center justify-between gap-2">
            <span>Data tersimpan saat ini:</span>
            <span class="font-semibold text-ink">
              {{ workStore.works.length }} pekerjaan • {{ reportStore.savedReports.length }} laporan tersimpan
            </span>
          </div>

          <div
            v-if="restoreError"
            class="rounded-[8px] border border-red-300/60 bg-red-50/70 px-3.5 py-2.5 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          >
            {{ restoreError }}
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <BaseButton
              size="sm"
              variant="primary"
              :disabled="isExporting"
              @click="handleDownloadBackup"
            >
              <Download class="size-3.5 mr-1.5" />
              <span>{{ isExporting ? 'Menyiapkan...' : 'Download Backup (.json)' }}</span>
            </BaseButton>

            <BaseButton
              size="sm"
              variant="secondary"
              :disabled="isRestoring"
              @click="triggerRestoreFilePicker"
            >
              <Upload class="size-3.5 mr-1.5" />
              <span>Restore dari (.json)</span>
            </BaseButton>

            <input
              ref="fileInputRef"
              type="file"
              accept="application/json,.json"
              class="hidden"
              @change="handleRestoreFileChange"
            />
          </div>
        </div>
      </div>

      <!-- Live Header Preview & Data Info (5 cols) -->
      <div class="lg:col-span-5 space-y-6">
        <!-- Live Preview of Header -->
        <div class="glass-card rounded-[10px] p-5 space-y-3">
          <div class="flex items-center justify-between pb-2 border-b border-line">
            <h2 class="text-xs font-semibold uppercase tracking-wider text-ink">
              Pratinjau Header WhatsApp
            </h2>
            <span class="text-[10px] text-muted">Live Preview</span>
          </div>

          <p class="text-xs text-muted leading-relaxed">
            Beginilah tampilan 4 baris pertama rekap laporan harian Anda:
          </p>

          <div class="rounded-[8px] border border-line/80 bg-app p-3.5 font-mono text-xs leading-relaxed text-ink select-text">
            <p>Rekap laporan, {{ sampleDateStr }}</p>
            <p>Nama : {{ form.name || '...' }}</p>
            <p>Divisi : {{ form.division || '...' }}</p>
            <p>Bagian : {{ form.position || '...' }}</p>
            <p class="text-muted mt-2">...</p>
          </div>
        </div>

        <!-- Local-First Privacy Notice -->
        <div class="glass-card rounded-[10px] p-5 space-y-3">
          <div class="flex items-center gap-2 text-primary font-semibold text-xs">
            <ShieldCheck class="size-4" />
            <span>Penyimpanan Lokal & Privasi (Local-First)</span>
          </div>

          <p class="text-xs text-muted leading-relaxed">
            DailyLog beroperasi secara <strong>100% lokal</strong> di peramban Anda menggunakan IndexedDB. Tidak ada akun, kata sandi, maupun sinkronisasi cloud yang dibutuhkan.
          </p>

          <div class="space-y-1.5 text-xs text-ink-secondary pt-1 border-t border-line/60">
            <div class="flex items-center gap-2">
              <Database class="size-3.5 text-muted shrink-0" />
              <span>Database: <strong>IndexedDB (Dexie.js)</strong></span>
            </div>
            <div class="flex items-center gap-2">
              <Info class="size-3.5 text-muted shrink-0" />
              <span>Versi: <strong>MVP 1.0 (Week 1)</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Konfirmasi Restore Backup -->
    <BaseModal v-model="isRestoreModalOpen" title="Konfirmasi Restore Data">
      <div v-if="pendingBackup" class="space-y-4">
        <div class="rounded-[8px] border border-line bg-app/70 p-3.5 text-xs space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-muted">Nama File:</span>
            <span class="font-semibold text-ink truncate max-w-[240px]">{{ pendingFileName }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-muted">Waktu Backup:</span>
            <span class="font-medium text-ink">{{ formatBackupDate(pendingBackup.exportedAt) }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-muted">Isi Data:</span>
            <span class="font-semibold text-primary">
              {{ pendingBackup.data.works.length }} pekerjaan • {{ pendingBackup.data.dailyReports.length }} laporan
            </span>
          </div>
          <div v-if="pendingBackup.data.profiles[0]" class="flex items-center justify-between">
            <span class="text-muted">Profil:</span>
            <span class="font-medium text-ink">{{ pendingBackup.data.profiles[0].name }}</span>
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-semibold text-ink">Pilih Mode Pemulihan:</p>

          <label
            class="flex items-start gap-2.5 rounded-[8px] border p-3 cursor-pointer transition-colors"
            :class="restoreMode === 'merge' ? 'border-primary bg-primary-light/40' : 'border-line bg-panel'"
          >
            <input
              v-model="restoreMode"
              type="radio"
              value="merge"
              class="mt-0.5 size-4 accent-primary cursor-pointer"
            />
            <div class="text-xs">
              <p class="font-semibold text-ink">Gabungkan Data (Merge) — Direkomendasikan</p>
              <p class="text-muted mt-0.5">
                Menambahkan data baru dan memperbarui data yang sama tanpa menghapus pekerjaan lain yang sudah ada.
              </p>
            </div>
          </label>

          <label
            class="flex items-start gap-2.5 rounded-[8px] border p-3 cursor-pointer transition-colors"
            :class="restoreMode === 'replace' ? 'border-red-500/70 bg-red-50/50 dark:bg-red-950/20' : 'border-line bg-panel'"
          >
            <input
              v-model="restoreMode"
              type="radio"
              value="replace"
              class="mt-0.5 size-4 accent-red-600 cursor-pointer"
            />
            <div class="text-xs">
              <p class="font-semibold text-ink">Timpa Semua Data (Replace)</p>
              <p class="text-muted mt-0.5">
                Menghapus seluruh data saat ini dan menggantinya sepenuhnya dengan isi file backup.
              </p>
            </div>
          </label>
        </div>

        <div
          v-if="restoreMode === 'replace'"
          class="flex items-start gap-2 rounded-[8px] border border-red-300/60 bg-red-50/70 p-3 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
        >
          <AlertTriangle class="size-4 shrink-0 mt-0.5" />
          <span>Data lama yang tidak ada di dalam file backup akan terhapus permanen.</span>
        </div>
      </div>

      <template #footer>
        <BaseButton type="button" variant="ghost" @click="isRestoreModalOpen = false">
          Batal
        </BaseButton>
        <BaseButton
          type="button"
          :variant="restoreMode === 'replace' ? 'danger' : 'primary'"
          :disabled="isRestoring"
          @click="handleConfirmRestore"
        >
          {{ isRestoring ? 'Memulihkan...' : 'Pulihkan Data' }}
        </BaseButton>
      </template>
    </BaseModal>
  </div>
</template>
