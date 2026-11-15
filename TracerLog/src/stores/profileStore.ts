import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Profile } from '@/types'
import { profileRepository, DEFAULT_PROFILE } from '@/repositories/profileRepository'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Profile>({ ...DEFAULT_PROFILE })
  const isLoading = ref<boolean>(false)

  async function fetchProfile() {
    isLoading.value = true
    try {
      profile.value = await profileRepository.getProfile()
    } finally {
      isLoading.value = false
    }
  }

  async function updateProfile(data: Partial<Omit<Profile, 'id'>>) {
    isLoading.value = true
    try {
      profile.value = await profileRepository.updateProfile(data)
    } finally {
      isLoading.value = false
    }
  }

  return {
    profile,
    isLoading,
    fetchProfile,
    updateProfile,
  }
})
