'use client'

import Link from 'next/link'
import { Youtube, BarChart3, Eye, Users } from 'lucide-react'
import { Button } from './ui/button'

export function Navigation() {
  return (
    <header className="bg-red-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-xl font-bold">
            <Youtube className="h-6 w-6" />
            <span>YouTube Realtime</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-red-700">
                <Users className="h-4 w-4 mr-2" />
                Subscriber Count
              </Button>
            </Link>
            
            <Link href="/compare">
              <Button variant="ghost" className="text-white hover:bg-red-700">
                <BarChart3 className="h-4 w-4 mr-2" />
                Compare
              </Button>
            </Link>
            
            <Link href="/live-view-count">
              <Button variant="ghost" className="text-white hover:bg-red-700">
                <Eye className="h-4 w-4 mr-2" />
                Live Views
              </Button>
            </Link>
            
            <Link href="/pewdiepie-vs-cocomelon">
              <Button variant="ghost" className="text-white hover:bg-red-700">
                PewDiePie vs Cocomelon
              </Button>
            </Link>
            
            <Link href="/pewdiepie-vs-mrbeast">
              <Button variant="ghost" className="text-white hover:bg-red-700">
                PewDiePie vs MrBeast
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}