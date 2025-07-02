// YouTube API types
export interface YouTubeChannelData {
  user: [string, string, string][] // name, profile, cover
  counts: Array<{
    count: string
    pretty: string
  }>
}

export interface YouTubeSearchResult {
  list: Array<[string, string, string]> // [name, profile_url, channel_id]
}

// API functions
export async function fetchChannelData(channelId: string): Promise<YouTubeChannelData> {
  const response = await fetch(`https://mixerno.space/api/youtube-channel-counter/user/${encodeURIComponent(channelId)}`)
  if (!response.ok) {
    throw new Error('Failed to fetch channel data')
  }
  return response.json()
}

export async function searchChannel(query: string): Promise<YouTubeSearchResult> {
  const response = await fetch(`https://mixerno.space/api/youtube-channel-counter/search/${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error('Failed to search channel')
  }
  return response.json()
}