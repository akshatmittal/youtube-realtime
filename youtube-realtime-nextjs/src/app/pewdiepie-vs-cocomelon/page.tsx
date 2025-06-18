'use client'

import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedCounter } from '@/components/animated-counter'
import { useChannelData, useChannelLiveUpdate } from '@/lib/hooks/use-youtube-data'
import { Trophy, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

// PewDiePie: UCX6OQ3DkcsbYNE6H8uQQuVA
// Cocomelon: UCbCmjCuTUZos6Inko4u57UQ

const PEWDIEPIE_ID = 'UCX6OQ3DkcsbYNE6H8uQQuVA'
const COCOMELON_ID = 'UCbCmjCuTUZos6Inko4u57UQ'

export default function PewDiePieVsCocomelonPage() {
  const { data: pewdiepie, isLoading: pewdieLoading } = useChannelData(PEWDIEPIE_ID)
  const { data: cocomelon, isLoading: cocomelonLoading } = useChannelData(COCOMELON_ID)

  useChannelLiveUpdate(PEWDIEPIE_ID)
  useChannelLiveUpdate(COCOMELON_ID)

  const pewdieWinning = pewdiepie && cocomelon && pewdiepie.subscribers > cocomelon.subscribers
  const subscriberDifference = pewdiepie && cocomelon 
    ? Math.abs(pewdiepie.subscribers - cocomelon.subscribers)
    : 0

  const handleTwitterShare = (channel: 'pewdiepie' | 'cocomelon') => {
    const channelData = channel === 'pewdiepie' ? pewdiepie : cocomelon
    if (channelData) {
      const text = `I support ${channelData.name}! They have ${channelData.subscribers.toLocaleString()} subscribers! 🔥 #${channel === 'pewdiepie' ? 'PewDiePie' : 'Cocomelon'}`
      const url = window.location.href
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
      window.open(twitterUrl, '_blank')
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          <span className="text-red-600">PewDiePie</span> vs <span className="text-purple-600">Cocomelon</span>
        </h1>
        <p className="text-xl text-gray-600">
          The ultimate battle for YouTube supremacy! Live subscriber count comparison.
        </p>
        <Badge variant="destructive" className="text-lg px-4 py-2">
          🔴 LIVE BATTLE
        </Badge>
      </div>

      {/* Battle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PewDiePie Card */}
        <Card className={`relative overflow-hidden ${pewdieWinning ? 'ring-4 ring-yellow-500' : ''}`}>
          {pewdieWinning && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-yellow-500 text-yellow-900 text-lg px-3 py-1">
                <Trophy className="h-4 w-4 mr-1" />
                WINNING
              </Badge>
            </div>
          )}
          
          <div className="h-48 bg-gradient-to-br from-red-500 to-red-700 relative">
            <div className="absolute inset-0 bg-red-400 opacity-30" />
          </div>
          
          <CardContent className="p-6 -mt-16 relative z-10">
            <div className="flex flex-col items-center text-center mb-6">
              {pewdiepie ? (
                <Avatar className="w-24 h-24 border-4 border-white shadow-xl mb-4">
                  <AvatarImage src={pewdiepie.profileUrl} alt="PewDiePie" />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-24 h-24 border-4 border-white shadow-xl mb-4 rounded-full bg-gray-300 animate-pulse" />
              )}
              
              <h2 className="text-2xl font-bold text-white mb-2">PewDiePie</h2>
              <p className="text-red-100 text-sm">Felix Kjellberg</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center mb-4">
              <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                {pewdiepie ? (
                  <AnimatedCounter value={pewdiepie.subscribers} />
                ) : (
                  <div className="h-12 bg-gray-300 rounded animate-pulse" />
                )}
              </div>
              <p className="text-gray-600 font-semibold">Subscribers</p>
            </div>

            {pewdiepie && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-red-800">
                    <AnimatedCounter value={pewdiepie.views} />
                  </div>
                  <p className="text-red-600 text-xs">Views</p>
                </div>
                <div className="bg-red-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-red-800">
                    <AnimatedCounter value={pewdiepie.videos} />
                  </div>
                  <p className="text-red-600 text-xs">Videos</p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-red-600 hover:bg-red-700"
                onClick={() => window.open(`https://youtube.com/channel/${PEWDIEPIE_ID}`, '_blank')}
              >
                <Youtube className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleTwitterShare('pewdiepie')}
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Cocomelon Card */}
        <Card className={`relative overflow-hidden ${!pewdieWinning && cocomelon && pewdiepie ? 'ring-4 ring-yellow-500' : ''}`}>
          {!pewdieWinning && cocomelon && pewdiepie && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-yellow-500 text-yellow-900 text-lg px-3 py-1">
                <Trophy className="h-4 w-4 mr-1" />
                WINNING
              </Badge>
            </div>
          )}
          
          <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative">
            <div className="absolute inset-0 bg-purple-400 opacity-30" />
          </div>
          
          <CardContent className="p-6 -mt-16 relative z-10">
            <div className="flex flex-col items-center text-center mb-6">
              {cocomelon ? (
                <Avatar className="w-24 h-24 border-4 border-white shadow-xl mb-4">
                  <AvatarImage src={cocomelon.profileUrl} alt="Cocomelon" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-24 h-24 border-4 border-white shadow-xl mb-4 rounded-full bg-gray-300 animate-pulse" />
              )}
              
              <h2 className="text-2xl font-bold text-white mb-2">Cocomelon</h2>
              <p className="text-purple-100 text-sm">Nursery Rhymes</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center mb-4">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                {cocomelon ? (
                  <AnimatedCounter value={cocomelon.subscribers} />
                ) : (
                  <div className="h-12 bg-gray-300 rounded animate-pulse" />
                )}
              </div>
              <p className="text-gray-600 font-semibold">Subscribers</p>
            </div>

            {cocomelon && (
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-purple-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-800">
                    <AnimatedCounter value={cocomelon.views} />
                  </div>
                  <p className="text-purple-600 text-xs">Views</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-purple-800">
                    <AnimatedCounter value={cocomelon.videos} />
                  </div>
                  <p className="text-purple-600 text-xs">Videos</p>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700"
                onClick={() => window.open(`https://youtube.com/channel/${COCOMELON_ID}`, '_blank')}
              >
                <Youtube className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleTwitterShare('cocomelon')}
                className="border-purple-600 text-purple-600 hover:bg-purple-50"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Battle Stats */}
      {pewdiepie && cocomelon && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Subscriber Gap</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                <AnimatedCounter value={subscriberDifference} />
              </div>
              <p className="text-gray-600 text-sm">
                {pewdieWinning ? 'PewDiePie' : 'Cocomelon'} is ahead
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Total Views Battle</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">PewDiePie</span>
                  <span className="text-sm font-bold">
                    <AnimatedCounter value={pewdiepie.views} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-semibold">Cocomelon</span>
                  <span className="text-sm font-bold">
                    <AnimatedCounter value={cocomelon.views} />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">Video Count</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-red-600 font-semibold">PewDiePie</span>
                  <span className="text-sm font-bold">
                    <AnimatedCounter value={pewdiepie.videos} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-600 font-semibold">Cocomelon</span>
                  <span className="text-sm font-bold">
                    <AnimatedCounter value={cocomelon.videos} />
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Historical Context */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">The Battle for YouTube's Crown</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              This epic battle between PewDiePie (Felix Kjellberg) and Cocomelon represents one of 
              the most interesting dynamics on YouTube. PewDiePie, the Swedish gaming and commentary 
              YouTuber, held the #1 spot for individual creators for years, while Cocomelon, a 
              children's nursery rhyme channel, has been rapidly growing.
            </p>
            <p>
              The competition showcases the contrast between traditional gaming/entertainment content 
              and the massive appeal of children's educational content on the platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}