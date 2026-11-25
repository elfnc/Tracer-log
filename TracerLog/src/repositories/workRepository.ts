import { db } from '@/db'
import type { Work, WorkStatus } from '@/types'

export interface CreateWorkDto {
  rNumber: string
  customer: string
  status: WorkStatus
  workDate: string
  description?: string
  notes?: string
}

export interface UpdateWorkDto {
  rNumber?: string
  customer?: string
  status?: WorkStatus
  workDate?: string
  description?: string
  notes?: string
}

export const workRepository = {
  async getAll(): Promise<Work[]> {
    return await db.works.reverse().sortBy('createdAt')
  },

  async getById(id: string): Promise<Work | undefined> {
    return await db.works.get(id)
  },

  async getByDate(date: string): Promise<Work[]> {
    return await db.works.where('workDate').equals(date).sortBy('createdAt')
  },

  async create(dto: CreateWorkDto): Promise<Work> {
    const now = new Date().toISOString()
    const cleanRNumber = dto.rNumber.trim().replace(/^R#\s*/i, '')

    const newWork: Work = {
      id: crypto.randomUUID(),
      rNumber: cleanRNumber,
      customer: dto.customer.trim(),
      status: dto.status,
      description: (dto.description || '').trim(),
      notes: (dto.notes || '').trim(),
      workDate: dto.workDate,
      createdAt: now,
      updatedAt: now,
    }

    await db.works.add(newWork)
    return newWork
  },

  async update(id: string, dto: UpdateWorkDto): Promise<Work | undefined> {
    const existing = await db.works.get(id)
    if (!existing) return undefined

    const now = new Date().toISOString()
    const cleanRNumber = dto.rNumber !== undefined ? dto.rNumber.trim().replace(/^R#\s*/i, '') : existing.rNumber

    const updatedWork: Work = {
      ...existing,
      rNumber: cleanRNumber,
      customer: dto.customer !== undefined ? dto.customer.trim() : existing.customer,
      status: dto.status ?? existing.status,
      description: dto.description !== undefined ? dto.description.trim() : (existing.description ?? ''),
      notes: dto.notes !== undefined ? dto.notes.trim() : existing.notes,
      workDate: dto.workDate ?? existing.workDate,
      updatedAt: now,
    }

    await db.works.put(updatedWork)
    return updatedWork
  },

  async delete(id: string): Promise<boolean> {
    const count = await db.works.where('id').equals(id).delete()
    return count > 0
  },

  async search(query: string, date?: string): Promise<Work[]> {
    const q = query.trim().toLowerCase()
    let collection = db.works.toCollection()

    if (date) {
      collection = db.works.where('workDate').equals(date)
    }

    const items = await collection.toArray()
    if (!q) return items

    return items.filter(
      (item) =>
        item.rNumber.toLowerCase().includes(q) ||
        item.customer.toLowerCase().includes(q) ||
        `r#${item.rNumber}`.toLowerCase().includes(q) ||
        `r# ${item.rNumber}`.toLowerCase().includes(q),
    )
  },
}
