'use client'

import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { useChannelSearch } from '@/lib/hooks/use-youtube-data'
import { useChannelStore } from '@/lib/stores/channel-store'
import { useRouter } from 'next/navigation'

interface ChannelSearchProps {
  onChannelSelect?: (channelId: string) => void
  placeholder?: string
  autoSearch?: boolean
}

export function ChannelSearch({ 
  onChannelSelect, 
  placeholder = "Search for a YouTube channel...",
  autoSearch = false 
}: ChannelSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const { setCurrentChannel, setLoading } = useChannelStore()
  const router = useRouter()
  
  const { data: searchResult, isLoading, error } = useChannelSearch(
    autoSearch ? debouncedQuery : ''
  )

  // Debounce search for auto-search mode
  React.useEffect(() => {
    if (autoSearch) {
      const timer = setTimeout(() => {
        setDebouncedQuery(searchQuery)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [searchQuery, autoSearch])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) return

    setLoading(true)
    
    try {
      // If it looks like a channel ID (starts with UC and is 24+ chars), use it directly
      if (searchQuery.trim().toUpperCase().startsWith('UC') && searchQuery.trim().length >= 24) {
        const channelId = searchQuery.trim()
        if (onChannelSelect) {
          onChannelSelect(channelId)
        } else {
          router.push(`/?channel=${encodeURIComponent(channelId)}`)
        }
      } else {
        // Otherwise search for the channel
        if (!autoSearch) {
          setDebouncedQuery(searchQuery)
        }
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChannelSelect = (channelId: string) => {
    if (onChannelSelect) {
      onChannelSelect(channelId)
    } else {
      router.push(`/?channel=${encodeURIComponent(channelId)}`)
    }
    setSearchQuery('')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={isLoading || !searchQuery.trim()}>
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {error && (
        <Card className="mt-4 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600 text-sm">{error.message}</p>
          </CardContent>
        </Card>
      )}

      {searchResult && !autoSearch && (
        <Card className="mt-4">
          <CardContent className="p-4">
            <div 
              className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-2 rounded"
              onClick={() => handleChannelSelect(searchResult.id)}
            >
              <img 
                src={searchResult.profileUrl} 
                alt={searchResult.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{searchResult.name}</h3>
                <p className="text-sm text-gray-600">
                  {searchResult.subscribers.toLocaleString()} subscribers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}