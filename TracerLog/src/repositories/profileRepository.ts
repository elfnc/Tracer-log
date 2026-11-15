import { db } from '@/db'
import type { Profile } from '@/types'

export const DEFAULT_PROFILE: Profile = {
  id: 'default',
  name: 'Elfrian T. Setiawan',
  division: 'digital printing',
  position: 'designer junior',
}

export const profileRepository = {
  async getProfile(): Promise<Profile> {
    const profile = await db.profiles.get('default')
    if (!profile) {
      await db.profiles.put(DEFAULT_PROFILE)
      return DEFAULT_PROFILE
    }
    return profile
  },

  async updateProfile(updates: Partial<Omit<Profile, 'id'>>): Promise<Profile> {
    const current = await this.getProfile()
    const updated: Profile = {
      ...current,
      ...updates,
      id: 'default',
    }
    await db.profiles.put(updated)
    return updated
  },
}
