import { ChannelData } from '../stores/channel-store'

const API_BASE_URL = 'https://mixerno.space/api/youtube-channel-counter'

export interface YouTubeApiResponse {
  user: [
    { count: string }, // name
    { count: string }, // profile image
    { count: string }, // cover image
  ]
  counts: [
    { count: number }, // unknown
    { count: number }, // unknown  
    { count: number }, // subscribers
    { count: number }, // views
    { count: number }, // unknown
    { count: number }, // videos
  ]
}

export interface YouTubeSearchResponse {
  list: [string, string, string][] // [name, thumbnail, channelId]
}

export const youtubeApi = {
  async getChannelData(channelId: string): Promise<ChannelData> {
    const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(channelId)}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch channel data')
    }
    
    const data: YouTubeApiResponse = await response.json()
    
    return {
      id: channelId,
      name: data.user[0].count,
      profileUrl: data.user[1].count,
      coverUrl: data.user[2].count,
      subscribers: data.counts[2].count,
      views: data.counts[3].count,
      videos: data.counts[5].count,
    }
  },

  async searchChannels(query: string): Promise<ChannelData> {
    const response = await fetch(`${API_BASE_URL}/search/${encodeURIComponent(query)}`)
    
    if (!response.ok) {
      throw new Error('Failed to search channels')
    }
    
    const data: YouTubeSearchResponse = await response.json()
    
    if (!data.list || data.list.length === 0) {
      throw new Error('No channels found')
    }
    
    // Return the first result as channel data
    const firstResult = data.list[0]
    return this.getChannelData(firstResult[2]) // Use the channel ID to get full data
  },

  async getLiveData(channelId: string): Promise<Pick<ChannelData, 'subscribers' | 'views' | 'videos'>> {
    const response = await fetch(`${API_BASE_URL}/user/${encodeURIComponent(channelId)}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch live data')
    }
    
    const data: YouTubeApiResponse = await response.json()
    
    return {
      subscribers: data.counts[2].count,
      views: data.counts[3].count,
      videos: data.counts[5].count,
    }
  },
}