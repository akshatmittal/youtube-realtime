'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { ChannelSearch } from '@/components/channel-search'
import { ChannelDisplay } from '@/components/channel-display'
import { Card, CardContent } from '@/components/ui/card'
import { useChannelData, useChannelLiveUpdate } from '@/lib/hooks/use-youtube-data'
import { useChannelStore } from '@/lib/stores/channel-store'

function HomeContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null)
  const { currentChannel, setCurrentChannel } = useChannelStore()

  // Get channel ID from URL params
  useEffect(() => {
    const channelParam = searchParams.get('channel')
    if (channelParam) {
      setSelectedChannelId(channelParam)
    }
  }, [searchParams])

  // Fetch channel data
  const { 
    data: channelData, 
    isLoading, 
    error 
  } = useChannelData(selectedChannelId)

  // Set up live updates
  useChannelLiveUpdate(selectedChannelId)

  // Update store when channel data loads
  useEffect(() => {
    if (channelData) {
      setCurrentChannel(channelData)
    }
  }, [channelData, setCurrentChannel])

  const handleChannelSelect = (channelId: string) => {
    setSelectedChannelId(channelId)
    router.push(`/?channel=${encodeURIComponent(channelId)}`)
  }

  const handleCompareClick = () => {
    if (currentChannel) {
      router.push(`/compare?channel1=${encodeURIComponent(currentChannel.id)}`)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          YouTube <span className="text-red-600">Realtime</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          View live subscriber counts for any YouTube channel. Real-time updates every 2 seconds, 
          guaranteed to be accurate.
        </p>
      </div>

      {/* Search Section */}
      <Card>
        <CardContent className="p-6">
          <ChannelSearch onChannelSelect={handleChannelSelect} />
        </CardContent>
      </Card>

      {/* Loading State */}
      {isLoading && selectedChannelId && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading channel data...</p>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <p className="text-red-600 text-center">
              Error loading channel: {error.message}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Channel Display */}
      {currentChannel && !isLoading && (
        <ChannelDisplay 
          channel={currentChannel} 
          onCompareClick={handleCompareClick}
        />
      )}

      {/* Default Content - Show when no channel selected */}
      {!selectedChannelId && !isLoading && (
        <div className="space-y-8">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🔴</div>
                <h3 className="text-lg font-semibold mb-2">Live Updates</h3>
                <p className="text-gray-600">
                  Real-time subscriber counts updated every 2 seconds
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Compare Channels</h3>
                <p className="text-gray-600">
                  Side-by-side comparisons of multiple YouTube channels
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">📱</div>
                <h3 className="text-lg font-semibold mb-2">Embeddable</h3>
                <p className="text-gray-600">
                  Embed live counters on your own website
                </p>
              </CardContent>
            </Card>
          </div>

          {/* About Section */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">About YouTube Realtime</h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  YouTube Realtime shows the live subscriber count of any user on YouTube as 
                  accurately as possible. YouTube often doesn't update the subscriber count on 
                  the website in real time, making it hard to track when you'll hit a new milestone. 
                  This tool eases the pressure and allows you to see subscribers change live!
                </p>
                <p>
                  The subscriber count, view count, video count are all taken directly from 
                  YouTube's infrastructure via the API. The counts are updated every 2 seconds 
                  and are guaranteed to be accurate.
                </p>
                <h3 className="text-lg font-semibold mt-4 mb-2">Supported Input Formats:</h3>
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>Channel Username:</strong> MKBHD</li>
                  <li><strong>Channel ID:</strong> UCK8sQmJBp8GCxrOtXWBpyEA</li>
                  <li><strong>Channel Name:</strong> Fine Brothers Entertainment</li>
                  <li><strong>YouTube URL:</strong> youtube.com/mkbhd</li>
                  <li><strong>Search Terms:</strong> Justin Bieber</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
