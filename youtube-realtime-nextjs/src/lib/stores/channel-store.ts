import { create } from 'zustand'

export interface ChannelData {
  id: string
  name: string
  profileUrl: string
  coverUrl: string
  subscribers: number
  views: number
  videos: number
}

interface ChannelStore {
  currentChannel: ChannelData | null
  compareChannel: ChannelData | null
  isLoading: boolean
  error: string | null
  setCurrentChannel: (channel: ChannelData) => void
  setCompareChannel: (channel: ChannelData | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearChannels: () => void
}

export const useChannelStore = create<ChannelStore>((set) => ({
  currentChannel: null,
  compareChannel: null,
  isLoading: false,
  error: null,
  setCurrentChannel: (channel) => set({ currentChannel: channel, error: null }),
  setCompareChannel: (channel) => set({ compareChannel: channel }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearChannels: () => set({ currentChannel: null, compareChannel: null, error: null }),
}))