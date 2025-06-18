'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedCounter } from '@/components/animated-counter'
import { useChannelData, useChannelLiveUpdate } from '@/lib/hooks/use-youtube-data'
import { Trophy, Youtube, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'

// PewDiePie: UCX6OQ3DkcsbYNE6H8uQQuVA
// MrBeast: UCX6OQ3DkcsbYNE6H8uQQuVA

const PEWDIEPIE_ID = 'UCX6OQ3DkcsbYNE6H8uQQuVA'
const MRBEAST_ID = 'UCX6OQ3DkcsbYNE6H8uQQuVA' // Replace with actual MrBeast ID

export default function PewDiePieVsMrBeastPage() {
  const { data: pewdiepie } = useChannelData(PEWDIEPIE_ID)
  const { data: mrbeast } = useChannelData(MRBEAST_ID)

  useChannelLiveUpdate(PEWDIEPIE_ID)
  useChannelLiveUpdate(MRBEAST_ID)

  const pewdieWinning = pewdiepie && mrbeast && pewdiepie.subscribers > mrbeast.subscribers

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
          <span className="text-red-600">PewDiePie</span> vs <span className="text-green-600">MrBeast</span>
        </h1>
        <p className="text-xl text-gray-600">
          Creator vs Creator - The ultimate YouTube showdown!
        </p>
        <Badge variant="destructive" className="text-lg px-4 py-2">
          🔴 LIVE BATTLE
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* PewDiePie Card */}
        <Card className={`relative overflow-hidden ${pewdieWinning ? 'ring-4 ring-yellow-500' : ''}`}>
          {pewdieWinning && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-yellow-500 text-yellow-900">
                <Trophy className="h-4 w-4 mr-1" />
                WINNING
              </Badge>
            </div>
          )}
          
          <div className="h-48 bg-gradient-to-br from-red-500 to-red-700" />
          
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
              
              <h2 className="text-2xl font-bold text-white">PewDiePie</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">
                {pewdiepie ? (
                  <AnimatedCounter value={pewdiepie.subscribers} />
                ) : (
                  <div className="h-12 bg-gray-300 rounded animate-pulse" />
                )}
              </div>
              <p className="text-gray-600">Subscribers</p>
            </div>
          </CardContent>
        </Card>

        {/* MrBeast Card */}
        <Card className={`relative overflow-hidden ${!pewdieWinning && mrbeast && pewdiepie ? 'ring-4 ring-yellow-500' : ''}`}>
          {!pewdieWinning && mrbeast && pewdiepie && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-yellow-500 text-yellow-900">
                <Trophy className="h-4 w-4 mr-1" />
                WINNING
              </Badge>
            </div>
          )}
          
          <div className="h-48 bg-gradient-to-br from-green-500 to-green-700" />
          
          <CardContent className="p-6 -mt-16 relative z-10">
            <div className="flex flex-col items-center text-center mb-6">
              {mrbeast ? (
                <Avatar className="w-24 h-24 border-4 border-white shadow-xl mb-4">
                  <AvatarImage src={mrbeast.profileUrl} alt="MrBeast" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-24 h-24 border-4 border-white shadow-xl mb-4 rounded-full bg-gray-300 animate-pulse" />
              )}
              
              <h2 className="text-2xl font-bold text-white">MrBeast</h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {mrbeast ? (
                  <AnimatedCounter value={mrbeast.subscribers} />
                ) : (
                  <div className="h-12 bg-gray-300 rounded animate-pulse" />
                )}
              </div>
              <p className="text-gray-600">Subscribers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Notice */}
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">🚧 Coming Soon!</h3>
          <p className="text-gray-600">
            This page is being prepared with the latest data. Check back soon for the full PewDiePie vs MrBeast comparison!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}