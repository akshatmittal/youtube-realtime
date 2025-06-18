'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { ChannelSearch } from '@/components/channel-search'
import { AnimatedCounter } from '@/components/animated-counter'
import { useChannelData, useChannelLiveUpdate } from '@/lib/hooks/use-youtube-data'

function LiveViewContent() {
  const searchParams = useSearchParams()
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)

  useEffect(() => {
    const channelParam = searchParams.get('channel')
    if (channelParam) {
      setSelectedChannelId(channelParam)
    }
  }, [searchParams])

  const { data: channelData, isLoading, error } = useChannelData(selectedChannelId)
  useChannelLiveUpdate(selectedChannelId)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          Live <span className="text-blue-600">View Count</span>
        </h1>
        <p className="text-xl text-gray-600">
          Track live view counts for any YouTube channel in real-time.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <ChannelSearch 
            onChannelSelect={(channelId) => {
              setSelectedChannelId(channelId)
              window.history.pushState({}, '', `?channel=${encodeURIComponent(channelId)}`)
            }}
            placeholder="Search for a channel to track views..."
          />
        </CardContent>
      </Card>

      {isLoading && selectedChannelId && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading channel data...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600 text-center">Error: {error.message}</p>
          </CardContent>
        </Card>
      )}

      {channelData && !isLoading && (
        <Card>
          <CardContent className="p-8">
            <div className="text-center">
              <img 
                src={channelData.profileUrl} 
                alt={channelData.name}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-bold mb-6">{channelData.name}</h2>
              
              <div className="bg-blue-50 rounded-lg p-8 mb-6">
                <div className="text-6xl md:text-8xl font-bold text-blue-600 mb-2">
                  <AnimatedCounter value={channelData.views} />
                </div>
                <p className="text-xl text-gray-600">Total Views</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-gray-900">
                    <AnimatedCounter value={channelData.subscribers} />
                  </div>
                  <p className="text-gray-600">Subscribers</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="text-3xl font-bold text-gray-900">
                    <AnimatedCounter value={channelData.videos} />
                  </div>
                  <p className="text-gray-600">Videos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function LiveViewCountPage() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    }>
      <LiveViewContent />
    </Suspense>
  )
}