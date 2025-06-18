'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ChannelSearch } from '@/components/channel-search'
import { AnimatedCounter } from '@/components/animated-counter'
import { useChannelData, useChannelLiveUpdate } from '@/lib/hooks/use-youtube-data'
import { ChannelData } from '@/lib/stores/channel-store'
import { Twitter, Youtube, Users, Eye, Video, Trophy } from 'lucide-react'

interface ChannelCompareCardProps {
  channel: ChannelData | null
  isLoading: boolean
  error: any
  onChangeChannel: () => void
  position: 'left' | 'right'
  isWinner?: boolean
}

function ChannelCompareCard({ 
  channel, 
  isLoading, 
  error, 
  onChangeChannel, 
  position,
  isWinner = false 
}: ChannelCompareCardProps) {
  const handleYouTubeClick = () => {
    if (channel) {
      window.open(`https://youtube.com/channel/${channel.id}`, '_blank')
    }
  }

  const handleTwitterShare = () => {
    if (channel) {
      const text = `I support ${channel.name}! They have ${channel.subscribers.toLocaleString()} subscribers! 🔥`
      const url = `${window.location.origin}/compare?channel1=${encodeURIComponent(channel.id)}`
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      window.open(twitterUrl, '_blank')
    }
  }

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-full border-red-200 bg-red-50">
        <CardContent className="p-6">
          <p className="text-red-600 text-center mb-4">Error loading channel</p>
          <Button onClick={onChangeChannel} className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!channel) {
    return (
      <Card className="h-full border-dashed border-2 border-gray-300">
        <CardContent className="p-6 flex flex-col items-center justify-center min-h-[400px]">
          <Users className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-center mb-4">
            Select a channel to compare
          </p>
          <Button onClick={onChangeChannel}>
            Choose Channel
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={`h-full ${isWinner ? 'ring-2 ring-yellow-500' : ''}`}>
      {/* Cover Image */}
      <div className="h-32 relative overflow-hidden rounded-t-lg">
        <img 
          src={channel.coverUrl} 
          alt={`${channel.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {isWinner && (
          <div className={`absolute top-2 ${position === 'left' ? 'left-2' : 'right-2'}`}>
            <Badge className="bg-yellow-500 text-yellow-900">
              <Trophy className="h-3 w-3 mr-1" />
              Leading
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4 -mt-8 relative z-10">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="w-16 h-16 border-4 border-white shadow-lg mb-2">
            <AvatarImage src={channel.profileUrl} alt={channel.name} />
            <AvatarFallback>{channel.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <h2 className="text-lg font-bold text-white mb-1">{channel.name}</h2>
          
          <Badge variant="destructive" className="mb-2">
            🔴 LIVE
          </Badge>
        </div>
        
        {/* Subscriber Count */}
        <div className="text-center mb-4">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              <AnimatedCounter value={channel.subscribers} />
            </div>
            <p className="text-sm text-gray-600">Subscribers</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-gray-100 rounded p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Eye className="h-4 w-4 mr-1 text-gray-600" />
              <span className="text-xs text-gray-600">Views</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              <AnimatedCounter value={channel.views} />
            </div>
          </div>
          
          <div className="bg-gray-100 rounded p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <Video className="h-4 w-4 mr-1 text-gray-600" />
              <span className="text-xs text-gray-600">Videos</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              <AnimatedCounter value={channel.videos} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button 
            size="sm"
            onClick={handleYouTubeClick}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Youtube className="h-3 w-3" />
          </Button>
          
          <Button 
            size="sm"
            onClick={handleTwitterShare}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <Twitter className="h-3 w-3" />
          </Button>
          
          <Button 
            size="sm"
            variant="outline"
            onClick={onChangeChannel}
          >
            Change
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function CompareContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [channel1Id, setChannel1Id] = useState<string | null>(null)
  const [channel2Id, setChannel2Id] = useState<string | null>(null)
  const [showSearch, setShowSearch] = useState<'channel1' | 'channel2' | null>(null)

  // Get channel IDs from URL params
  useEffect(() => {
    const channel1Param = searchParams.get('channel1')
    const channel2Param = searchParams.get('channel2')
    
    if (channel1Param) setChannel1Id(channel1Param)
    if (channel2Param) setChannel2Id(channel2Param)
  }, [searchParams])

  // Fetch channel data
  const { 
    data: channel1Data, 
    isLoading: isLoading1, 
    error: error1 
  } = useChannelData(channel1Id)
  
  const { 
    data: channel2Data, 
    isLoading: isLoading2, 
    error: error2 
  } = useChannelData(channel2Id)

  // Set up live updates
  useChannelLiveUpdate(channel1Id)
  useChannelLiveUpdate(channel2Id)

  const handleChannelSelect = (channelId: string) => {
    if (showSearch === 'channel1') {
      setChannel1Id(channelId)
      updateUrl(channelId, channel2Id)
    } else if (showSearch === 'channel2') {
      setChannel2Id(channelId)
      updateUrl(channel1Id, channelId)
    }
    setShowSearch(null)
  }

  const updateUrl = (ch1: string | null, ch2: string | null) => {
    const params = new URLSearchParams()
    if (ch1) params.set('channel1', ch1)
    if (ch2) params.set('channel2', ch2)
    router.push(`/compare?${params.toString()}`)
  }

  // Calculate difference and winner
  const subscriberDifference = channel1Data && channel2Data 
    ? Math.abs(channel1Data.subscribers - channel2Data.subscribers)
    : 0

  const channel1IsWinner = channel1Data && channel2Data 
    ? channel1Data.subscribers > channel2Data.subscribers
    : false

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Channel <span className="text-red-600">Comparison</span>
        </h1>
        <p className="text-xl text-gray-600">
          Compare live subscriber counts between two YouTube channels
        </p>
      </div>

      {/* Search Section */}
      {showSearch && (
        <Card>
          <CardHeader>
            <CardTitle>
              Select {showSearch === 'channel1' ? 'First' : 'Second'} Channel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChannelSearch 
              onChannelSelect={handleChannelSelect}
              placeholder={`Search for ${showSearch === 'channel1' ? 'first' : 'second'} channel...`}
            />
            <Button 
              variant="outline" 
              onClick={() => setShowSearch(null)}
              className="mt-4"
            >
              Cancel
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChannelCompareCard
          channel={channel1Data || null}
          isLoading={isLoading1}
          error={error1}
          onChangeChannel={() => setShowSearch('channel1')}
          position="left"
          isWinner={channel1IsWinner && !!channel2Data}
        />
        
        <ChannelCompareCard
          channel={channel2Data || null}
          isLoading={isLoading2}
          error={error2}
          onChangeChannel={() => setShowSearch('channel2')}
          position="right"
          isWinner={!channel1IsWinner && !!channel1Data}
        />
      </div>

      {/* Difference Display */}
      {channel1Data && channel2Data && (
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Subscriber Difference</h3>
            <div className="text-4xl font-bold text-gray-900 mb-2">
              <AnimatedCounter value={subscriberDifference} />
            </div>
            <p className="text-gray-600">
              {channel1IsWinner ? channel1Data.name : channel2Data.name} is leading
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="max-w-6xl mx-auto">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-300 rounded"></div>
            <div className="h-64 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    }>
      <CompareContent />
    </Suspense>
  )
}