// Mock data for development/demo purposes
const mockChannelData = {
  user: [
    ["Justin Bieber", "", ""],
    ["https://yt3.ggpht.com/ytc/AGIKgqNRr7IEdQ6Y5idwtdChyWYNsL9JQ4YQBJeGfOBw=s88-c-k-c0x00ffffff-no-rj", "", ""],
    ["https://yt3.ggpht.com/BnEsZZhqFDczR7-h-dv2C1Zz4Eo6CmFmWKGC6JEVXV4w2GE_Xz_Ej-Y9_lU-qH0xsQgF=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj", "", ""]
  ],
  counts: [
    { count: "0", pretty: "0" },
    { count: "0", pretty: "0" },
    { count: "115000000", pretty: "115M" }, // subscribers
    { count: "31500000000", pretty: "31.5B" }, // views
    { count: "0", pretty: "0" },
    { count: "347", pretty: "347" } // videos
  ]
}

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
  try {
    const response = await fetch(`https://mixerno.space/api/youtube-channel-counter/user/${encodeURIComponent(channelId)}`)
    if (!response.ok) {
      throw new Error('Failed to fetch channel data')
    }
    return response.json()
  } catch (error) {
    console.warn('Using mock data due to API error:', error)
    // Return mock data for demonstration
    return {
      ...mockChannelData,
      user: [
        [`Channel ${channelId.slice(-8)}`, "", ""],
        [mockChannelData.user[1][0], "", ""],
        [mockChannelData.user[2][0], "", ""]
      ]
    }
  }
}

export async function searchChannel(query: string): Promise<YouTubeSearchResult> {
  try {
    const response = await fetch(`https://mixerno.space/api/youtube-channel-counter/search/${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error('Failed to search channel')
    }
    return response.json()
  } catch (error) {
    console.warn('Using mock data due to API error:', error)
    // Return mock search result
    return {
      list: [
        [`${query} (Demo)`, mockChannelData.user[1][0], 'UCHkj014U2CQ2Nv0UZeYpE_A']
      ]
    }
  }
}