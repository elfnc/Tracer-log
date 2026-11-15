<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { Trash2, AlertTriangle, Clock } from '@lucide/vue'
import { format } from 'date-fns'
import type { Work, WorkStatus } from '@/types'
import { WORK_STATUSES } from '@/types'
import BaseModal from '@/components/ui/BaseModal.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'

const props = defineProps<{
  work: Work | null
}>()

const open = defineModel<boolean>({ required: true })

const emit = defineEmits<{
  (e: 'update', id: string, data: { rNumber: string; customer: string; status: WorkStatus; workDate: string; notes: string }): void
  (e: 'delete', id: string): void
}>()

const form = reactive<{
  rNumber: string
  customer: string
  status: WorkStatus
  workDate: string
  notes: string
}>({
  rNumber: '',
  customer: '',
  status: 'PROGRESS',
  workDate: '',
  notes: '',
})

const errors = reactive<{
  rNumber?: string
  customer?: string
  workDate?: string
}>({})

const isConfirmingDelete = ref(false)
const isSaving = ref(false)

watch(
  () => props.work,
  (w) => {
    isConfirmingDelete.value = false
    if (w) {
      form.rNumber = w.rNumber
      form.customer = w.customer
      form.status = w.status
      form.workDate = w.workDate
      form.notes = w.notes || ''
    }
  },
  { immediate: true },
)

function validate(): boolean {
  let valid = true
  errors.rNumber = undefined
  errors.customer = undefined
  errors.workDate = undefined

  if (!form.rNumber.trim()) {
    errors.rNumber = 'Nomor R# wajib diisi'
    valid = false
  }

  if (!form.customer.trim()) {
    errors.customer = 'Nama customer wajib diisi'
    valid = false
  }

  if (!form.workDate) {
    errors.workDate = 'Tanggal pekerjaan wajib dipilih'
    valid = false
  }

  return valid
}

function handleSave() {
  if (!props.work) return
  if (!validate()) return

  isSaving.value = true
  emit('update', props.work.id, {
    rNumber: form.rNumber.trim(),
    customer: form.customer.trim(),
    status: form.status,
    workDate: form.workDate,
    notes: form.notes.trim(),
  })
  isSaving.value = false
  open.value = false
}

function handleDelete() {
  if (!props.work) return
  emit('delete', props.work.id)
  isConfirmingDelete.value = false
  open.value = false
}

function formatDate(isoString?: string) {
  if (!isoString) return '-'
  try {
    return format(new Date(isoString), 'dd/MM/yyyy HH:mm')
  } catch {
    return isoString
  }
}
</script>

<template>
  <BaseModal v-model="open" :title="`Detail Pekerjaan — R# ${work?.rNumber ?? ''}`">
    <div v-if="work" class="space-y-4">
      <!-- Delete confirmation alert -->
      <div
        v-if="isConfirmingDelete"
        class="rounded-[8px] border border-red-300/60 bg-red-50/70 p-3.5 text-xs text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
      >
        <div class="flex items-start gap-2.5">
          <AlertTriangle class="size-4 shrink-0 text-red-600 dark:text-red-400 mt-0.5" />
          <div class="flex-1 space-y-1">
            <p class="font-semibold">Hapus pekerjaan R# {{ work.rNumber }}?</p>
            <p class="text-muted dark:text-red-300/80">
              Tindakan ini tidak dapat dibatalkan. Data pekerjaan dan catatan internal akan dihapus permanen.
            </p>
            <div class="flex items-center gap-2 pt-2">
              <BaseButton size="sm" variant="danger" @click="handleDelete">
                Ya, Hapus
              </BaseButton>
              <BaseButton size="sm" variant="ghost" @click="isConfirmingDelete = false">
                Batal
              </BaseButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Main form -->
      <div v-if="!isConfirmingDelete" class="space-y-4">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <BaseInput
            v-model="form.rNumber"
            label="R# (Nomor Pekerjaan)"
            placeholder="2610240"
            :error="errors.rNumber"
            required
          />

          <BaseInput
            v-model="form.customer"
            label="Customer"
            placeholder="GIS"
            :error="errors.customer"
            required
          />
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <BaseSelect
            v-model="form.status"
            label="Status Pekerjaan"
            :options="WORK_STATUSES"
            required
          />

          <BaseInput
            v-model="form.workDate"
            label="Tanggal Pekerjaan"
            type="date"
            :error="errors.workDate"
            required
          />
        </div>

        <BaseTextarea
          v-model="form.notes"
          label="Catatan Internal"
          placeholder="Area SO, detail revisi, instruksi cetak..."
          hint="Internal only — tidak muncul di WhatsApp report"
          :rows="4"
        />

        <!-- Metadata footer -->
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-muted border-t border-line/60">
          <div class="flex items-center gap-1">
            <Clock class="size-3" />
            <span>Dibuat: {{ formatDate(work.createdAt) }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span>Diperbarui: {{ formatDate(work.updatedAt) }}</span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex w-full items-center justify-between">
        <BaseButton
          v-if="!isConfirmingDelete"
          type="button"
          variant="ghost"
          class="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/40"
          @click="isConfirmingDelete = true"
        >
          <Trash2 class="size-4 mr-1.5" />
          Hapus
        </BaseButton>
        <div v-else />

        <div class="flex items-center gap-2">
          <BaseButton type="button" variant="ghost" @click="open = false">
            Tutup
          </BaseButton>
          <BaseButton
            v-if="!isConfirmingDelete"
            type="button"
            variant="primary"
            :disabled="isSaving"
            @click="handleSave"
          >
            {{ isSaving ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </BaseButton>
        </div>
      </div>
    </template>
  </BaseModal>
</template>
