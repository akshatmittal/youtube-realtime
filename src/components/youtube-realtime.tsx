'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Youtube, Twitter, Users, Eye, Video } from 'lucide-react'
import { fetchChannelData, searchChannel } from '@/lib/api'

interface ChannelDisplayProps {
  channelId: string
}

function ChannelDisplay({ channelId }: ChannelDisplayProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['channel', channelId],
    queryFn: () => fetchChannelData(channelId),
    enabled: !!channelId,
    refetchInterval: 2000, // Refetch every 2 seconds for realtime updates
    retry: 3,
    retryDelay: 1000,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Error loading channel data</p>
        <p className="text-sm text-gray-500 mt-2">
          This may be due to network restrictions. Please try refreshing the page or try a different network.
        </p>
      </div>
    )
  }

  if (!data) return null

  const subscriberCount = data.counts[2]?.count || '0'
  const viewCount = data.counts[3]?.count || '0'  
  const videoCount = data.counts[5]?.count || '0'
  const channelName = data.user[0]?.[0] || 'Channel'
  const profileImage = data.user[1]?.[0] || '/default-profile.svg'
  const coverImage = data.user[2]?.[0] || '/default-banner.svg'

  const formatNumber = (num: string) => {
    const numInt = parseInt(num)
    if (isNaN(numInt)) return '0'
    return numInt.toLocaleString()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Main Channel Card */}
      <Card className="mb-6">
        <div className="relative">
          <Image 
            src={coverImage} 
            alt={`${channelName} cover`}
            width={800}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-banner.svg'
            }}
          />
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <Image 
              src={profileImage} 
              alt={channelName}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full border-4 border-white"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/default-profile.svg'
              }}
            />
          </div>
        </div>
        <CardContent className="text-center pt-12 pb-6">
          <h1 className="text-2xl font-bold mb-4">{channelName}</h1>
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-lg mb-6">
            <div className="text-5xl font-bold mb-2">
              {formatNumber(subscriberCount)}
            </div>
            <div className="text-lg opacity-90">Subscribers</div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="destructive" 
              className="w-full bg-red-600 hover:bg-red-700"
              onClick={() => window.open(`https://youtube.com/channel/${channelId}`, '_blank')}
            >
              <Youtube className="w-4 h-4 mr-2" />
              Visit Channel
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => {
                const url = `${window.location.origin}/#${channelId}`
                const text = `Check out the live subscriber count for ${channelName}: ${formatNumber(subscriberCount)} subscribers!`
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
              }}
            >
              <Twitter className="w-4 h-4 mr-2" />
              Share on Twitter
            </Button>
            <Button variant="outline" className="w-full">
              <Users className="w-4 h-4 mr-2" />
              Compare
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600">
                  {formatNumber(viewCount)}
                </div>
                <div className="text-sm text-gray-600">Total Views</div>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">
                  {formatNumber(videoCount)}
                </div>
                <div className="text-sm text-gray-600">Total Videos</div>
              </div>
              <Video className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function YouTubeRealtime() {
  const [searchQuery, setSearchQuery] = useState('')
  const [channelId, setChannelId] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Handle URL hash changes for direct channel linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) // Remove the # symbol
      if (hash) {
        setChannelId(hash)
      } else {
        // Default channel if no hash
        setChannelId('UCHkj014U2CQ2Nv0UZeYpE_A') // Justin Bieber
      }
    }

    // Set initial channel
    handleHashChange()

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const updateChannelId = (newChannelId: string) => {
    setChannelId(newChannelId)
    window.location.hash = newChannelId
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      // Check if it's a channel ID (starts with UC and is long enough)
      if (searchQuery.trim().startsWith('UC') && searchQuery.trim().length >= 24) {
        updateChannelId(searchQuery.trim())
      } else {
        // Search for the channel
        const searchResult = await searchChannel(searchQuery.trim())
        if (searchResult.list && searchResult.list.length > 0) {
          updateChannelId(searchResult.list[0][2]) // Use the first result's channel ID
        } else {
          alert('No results found!')
        }
      }
      setSearchQuery('')
    } catch (error) {
      alert('Error searching for channel')
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">YouTube Realtime</h1>
              <p className="text-sm text-gray-600">Live Subscriber Count</p>
            </div>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
              <Input
                type="text"
                placeholder="Search channel or paste Channel ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64"
                disabled={isSearching}
              />
              <Button type="submit" disabled={isSearching}>
                <Search className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {channelId && <ChannelDisplay channelId={channelId} />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-4">
              Thank you for using YouTube Realtime. You can find more information about the project on{' '}
              <a 
                href="https://github.com/akshatmittal/youtube-realtime" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
              {' '}including license and contributors.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="https://www.facebook.com/itsreallyakshat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Facebook
              </a>
              <a 
                href="https://twitter.com/iakshatmittal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Twitter
              </a>
              <a 
                href="mailto:ytlive@akshatmittal.com"
                className="text-blue-600 hover:underline"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}