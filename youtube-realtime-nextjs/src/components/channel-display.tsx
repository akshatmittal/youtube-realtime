'use client'

import { Card, CardContent } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { AnimatedCounter } from './animated-counter'
import { Youtube, Twitter, Share } from 'lucide-react'
import { ChannelData } from '@/lib/stores/channel-store'

interface ChannelDisplayProps {
  channel: ChannelData
  showCompareButton?: boolean
  onCompareClick?: () => void
}

export function ChannelDisplay({ 
  channel, 
  showCompareButton = true, 
  onCompareClick 
}: ChannelDisplayProps) {
  const handleYouTubeClick = () => {
    window.open(`https://youtube.com/channel/${channel.id}`, '_blank')
  }

  const handleTwitterShare = () => {
    const text = `${channel.name} has ${channel.subscribers.toLocaleString()} subscribers on YouTube! 🔥`
    const url = `${window.location.origin}/?channel=${encodeURIComponent(channel.id)}`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, '_blank')
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/?channel=${encodeURIComponent(channel.id)}`
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${channel.name} - Live Subscriber Count`,
          text: `Check out ${channel.name}'s live subscriber count!`,
          url: url,
        })
      } catch (error) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(url)
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(url)
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Channel Card */}
      <Card className="overflow-hidden">
        {/* Cover Image */}
        <div className="h-48 relative overflow-hidden">
          <img 
            src={channel.coverUrl} 
            alt={`${channel.name} cover`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
        
        <CardContent className="p-6 -mt-12 relative z-10">
          {/* Profile Section */}
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg mb-4">
              <AvatarImage src={channel.profileUrl} alt={channel.name} />
              <AvatarFallback>{channel.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <h1 className="text-2xl font-bold text-white mb-2">{channel.name}</h1>
            
            {/* Live Badge */}
            <Badge variant="destructive" className="mb-4">
              🔴 LIVE
            </Badge>
          </div>
          
          {/* Subscriber Count */}
          <div className="text-center mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-6xl md:text-8xl font-bold text-gray-900 mb-2">
                <AnimatedCounter value={channel.subscribers} />
              </div>
              <p className="text-xl text-gray-600">Subscribers</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={handleYouTubeClick}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          <Youtube className="h-4 w-4 mr-2" />
          Visit Channel
        </Button>
        
        {showCompareButton && (
          <Button 
            onClick={onCompareClick}
            variant="outline"
          >
            <Share className="h-4 w-4 mr-2" />
            Compare
          </Button>
        )}
        
        <Button 
          onClick={handleTwitterShare}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Twitter className="h-4 w-4 mr-2" />
          Tweet
        </Button>
        
        <Button 
          onClick={handleShare}
          variant="outline"
        >
          <Share className="h-4 w-4 mr-2" />
          Share
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <AnimatedCounter value={channel.views} />
              </div>
              <p className="text-gray-600">Total Views</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                <AnimatedCounter value={channel.videos} />
              </div>
              <p className="text-gray-600">Videos</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Embed Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Embed This Counter</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Small Embed</label>
              <input
                type="text"
                readOnly
                value={`<iframe style="height:80px;width:300px;border:none;" frameborder="0" src="${window.location.origin}/embed/${channel.id}/small" />`}
                className="w-full p-2 text-sm bg-gray-100 border rounded"
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Large Embed</label>
              <input
                type="text"
                readOnly
                value={`<iframe style="height:350px;width:320px;border:none;" frameborder="0" src="${window.location.origin}/embed/${channel.id}/large" />`}
                className="w-full p-2 text-sm bg-gray-100 border rounded"
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}