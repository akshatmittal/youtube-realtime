import { useQuery, useQueryClient } from '@tanstack/react-query'
import { youtubeApi } from '../api/youtube-api'
import { useChannelStore } from '../stores/channel-store'
import { useEffect } from 'react'

export const useChannelData = (channelId: string | null) => {
  return useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => youtubeApi.getChannelData(channelId!),
    enabled: !!channelId,
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
  })
}

export const useChannelSearch = (query: string) => {
  return useQuery({
    queryKey: ['channel-search', query],
    queryFn: () => youtubeApi.searchChannels(query),
    enabled: !!query && query.length > 2,
    staleTime: 300000, // 5 minutes for search results
  })
}

export const useLiveData = (channelId: string | null) => {
  const queryClient = useQueryClient()
  
  const query = useQuery({
    queryKey: ['live-data', channelId],
    queryFn: () => youtubeApi.getLiveData(channelId!),
    enabled: !!channelId,
    refetchInterval: 2000, // Update every 2 seconds like the original
    staleTime: 0, // Always consider stale for live data
  })

  // Update the main channel data cache when live data changes
  useEffect(() => {
    if (query.data && channelId) {
      queryClient.setQueryData(['channel', channelId], (oldData: any) => {
        if (oldData) {
          return {
            ...oldData,
            subscribers: query.data.subscribers,
            views: query.data.views,
            videos: query.data.videos,
          }
        }
        return oldData
      })
    }
  }, [query.data, channelId, queryClient])

  return query
}

export const useChannelLiveUpdate = (channelId: string | null) => {
  const { setCurrentChannel } = useChannelStore()
  const queryClient = useQueryClient()
  
  const { data: liveData } = useLiveData(channelId)
  
  useEffect(() => {
    if (liveData && channelId) {
      // Update the store with live data
      const currentChannel = queryClient.getQueryData(['channel', channelId])
      if (currentChannel) {
        setCurrentChannel({
          ...currentChannel as any,
          subscribers: liveData.subscribers,
          views: liveData.views,
          videos: liveData.videos,
        })
      }
    }
  }, [liveData, channelId, setCurrentChannel, queryClient])
}