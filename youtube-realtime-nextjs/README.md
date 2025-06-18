# YouTube Realtime - Next.js Edition

A modern, real-time YouTube subscriber count tracking application built with Next.js, React, and TypeScript. This is a complete rewrite of the original YouTube Realtime project using modern web technologies.

## 🚀 Features

- **Real-time Updates**: Live subscriber counts updated every 2 seconds
- **Channel Search**: Support for channel names, IDs, usernames, and URLs
- **Channel Comparisons**: Side-by-side comparison of multiple channels
- **Special Battles**: Pre-configured battles (PewDiePie vs Cocomelon, etc.)
- **Live View Count**: Track total view counts in real-time
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Animated Counters**: Smooth animations for number updates
- **Social Sharing**: Share counts on Twitter and other platforms
- **Embeddable**: Generate iframe codes for embedding on other sites

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd youtube-realtime-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### Home Page
- Search for any YouTube channel by name, username, or channel ID
- View live subscriber counts with real-time updates
- See additional stats like total views and video count
- Generate embed codes for your website

### Channel Comparison
- Navigate to `/compare` to compare two channels
- Search and select channels to compare side-by-side
- See live subscriber differences and stats
- Share your support for your favorite channels

### Special Battles
- **PewDiePie vs Cocomelon**: `/pewdiepie-vs-cocomelon`
- **PewDiePie vs MrBeast**: `/pewdiepie-vs-mrbeast`
- Pre-configured battles with enhanced visualizations

### Live View Count
- Navigate to `/live-view-count` to track view counts specifically
- Focus on total views rather than subscribers

## 🔧 Configuration

The app uses the Mixerno API for YouTube data. No API keys are required for basic usage.

### Environment Variables (Optional)
```env
# Add any environment variables here if needed
NEXT_PUBLIC_API_BASE_URL=https://mixerno.space/api/youtube-channel-counter
```

## 🎨 Customization

### Adding New Comparison Pages
Create a new page in `src/app/your-comparison/page.tsx`:

```tsx
'use client'

import { useChannelData, useChannelLiveUpdate } from '@/lib/hooks/use-youtube-data'

const CHANNEL1_ID = 'your-channel-id-1'
const CHANNEL2_ID = 'your-channel-id-2'

export default function YourComparisonPage() {
  const { data: channel1 } = useChannelData(CHANNEL1_ID)
  const { data: channel2 } = useChannelData(CHANNEL2_ID)

  useChannelLiveUpdate(CHANNEL1_ID)
  useChannelLiveUpdate(CHANNEL2_ID)

  // Your comparison UI here
}
```

### Modifying Update Intervals
Edit the refetch intervals in `src/lib/hooks/use-youtube-data.ts`:

```tsx
// For live data (every 2 seconds)
refetchInterval: 2000

// For channel data (every 30 seconds)
refetchInterval: 30000
```

## 📱 Mobile Responsiveness

The app is fully responsive and works great on:
- Desktop computers
- Tablets
- Mobile phones
- Touch devices

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- AWS Amplify
- DigitalOcean App Platform

Build the app for production:
```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 API Information

This app uses the Mixerno YouTube API for data:
- **Endpoint**: `https://mixerno.space/api/youtube-channel-counter`
- **Rate Limiting**: Handled automatically by TanStack Query
- **Data Accuracy**: Updates every 2 seconds, directly from YouTube's infrastructure

### Supported Input Formats
- **Channel Username**: `MKBHD`
- **Channel ID**: `UCK8sQmJBp8GCxrOtXWBpyEA`
- **Channel Name**: `Marques Brownlee`
- **YouTube URL**: `youtube.com/mkbhd`
- **Search Terms**: `Justin Bieber`

## 🎯 Performance

- **Initial Load**: Optimized with Next.js App Router
- **Real-time Updates**: Efficient WebSocket-like polling
- **Memory Usage**: Optimized with proper cleanup
- **Bundle Size**: Tree-shaken and optimized
- **Caching**: Smart caching with TanStack Query

## 🐛 Troubleshooting

### Common Issues

**Channel not found**: 
- Verify the channel ID or name is correct
- Some channels may have restricted API access

**Slow loading**:
- Check your internet connection
- The API may be experiencing high traffic

**Counter not updating**:
- The API updates every 2 seconds, some changes may be minimal
- Refresh the page to reset the connection

## 📊 Features Comparison

| Feature | Original | Next.js Version |
|---------|----------|-----------------|
| Real-time updates | ✅ | ✅ |
| Modern UI | ❌ | ✅ |
| Mobile responsive | ⚠️ | ✅ |
| Type safety | ❌ | ✅ |
| Component reusability | ❌ | ✅ |
| State management | ❌ | ✅ |
| Animations | Basic | Advanced |
| SEO | Basic | Optimized |

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Original YouTube Realtime by [Akshat Mittal](https://github.com/akshatmittal/youtube-realtime)
- Mixerno API for providing YouTube data
- shadcn/ui for the beautiful component system
- The React and Next.js communities

## 🔮 Future Enhancements

- [ ] Dark mode support
- [ ] Historical data charts
- [ ] Email notifications for milestones
- [ ] Custom comparison templates
- [ ] API rate limiting visualization
- [ ] Offline support
- [ ] PWA capabilities
- [ ] Multiple language support

---

Made with ❤️ using Next.js, React, and modern web technologies.
