<script setup lang="ts">
import { reactive, watch } from 'vue'
import { format } from 'date-fns'
import type { Work, WorkStatus } from '@/types'
import { WORK_STATUSES } from '@/types'
import type { CreateWorkDto } from '@/repositories/workRepository'
import BaseInput from '@/components/ui/BaseInput.vue'
import BaseSelect from '@/components/ui/BaseSelect.vue'
import BaseTextarea from '@/components/ui/BaseTextarea.vue'
import BaseButton from '@/components/ui/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    initialData?: Partial<Work>
    submitLabel?: string
    isSubmitting?: boolean
  }>(),
  {
    initialData: undefined,
    submitLabel: 'Simpan Pekerjaan',
    isSubmitting: false,
  },
)

const emit = defineEmits<{
  (e: 'submit', data: CreateWorkDto): void
  (e: 'cancel'): void
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
  workDate: format(new Date(), 'yyyy-MM-dd'),
  notes: '',
})

const errors = reactive<{
  rNumber?: string
  customer?: string
  workDate?: string
}>({})

function initForm() {
  if (props.initialData) {
    form.rNumber = props.initialData.rNumber || ''
    form.customer = props.initialData.customer || ''
    form.status = props.initialData.status || 'PROGRESS'
    form.workDate = props.initialData.workDate || format(new Date(), 'yyyy-MM-dd')
    form.notes = props.initialData.notes || ''
  } else {
    form.rNumber = ''
    form.customer = ''
    form.status = 'PROGRESS'
    form.workDate = format(new Date(), 'yyyy-MM-dd')
    form.notes = ''
  }
  errors.rNumber = undefined
  errors.customer = undefined
  errors.workDate = undefined
}

watch(() => props.initialData, initForm, { immediate: true })

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
    errors.workDate = 'Tanggal pekerjaan harus dipilih'
    valid = false
  }

  return valid
}

function handleSubmit() {
  if (!validate()) return

  emit('submit', {
    rNumber: form.rNumber.trim(),
    customer: form.customer.trim(),
    status: form.status,
    workDate: form.workDate,
    notes: form.notes.trim(),
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <BaseInput
        v-model="form.rNumber"
        label="Nomor Pekerjaan (R#)"
        placeholder="Contoh: 2610240"
        :error="errors.rNumber"
        required
      />

      <BaseInput
        v-model="form.customer"
        label="Nama Pelanggan (Customer)"
        placeholder="Contoh: GIS"
        :error="errors.customer"
        required
      />
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <BaseSelect
        v-model="form.status"
        label="Status Pengerjaan"
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
      label="Catatan Internal (Opsional)"
      placeholder="Catatan nomor area SO, instruksi cetak, detail revisi, dll..."
      hint="Internal only — aman dan tidak akan dikirim ke laporan WhatsApp"
      :rows="4"
    />

    <div class="flex items-center justify-end gap-2 pt-2">
      <BaseButton type="button" variant="ghost" @click="emit('cancel')">
        Batal
      </BaseButton>
      <BaseButton type="submit" variant="primary" :disabled="isSubmitting">
        {{ isSubmitting ? 'Menyimpan...' : submitLabel }}
      </BaseButton>
    </div>
  </form>
</template>
