# YouTube Realtime - React/Next.js Version

This is a modern React/Next.js upgrade of the original YouTube Realtime application. It provides real-time subscriber count tracking for YouTube channels with a clean, responsive interface.

## Features

- ✅ **Real-time subscriber counting** with automatic updates every 2 seconds
- ✅ **Channel search** by name or channel ID 
- ✅ **Hash-based routing** for shareable channel links
- ✅ **Responsive design** that works on mobile and desktop
- ✅ **Modern React architecture** with TypeScript
- ✅ **Static export** for easy deployment to GitHub Pages
- ✅ **Shadcn UI components** for consistent styling
- ✅ **TanStack Query** for efficient data management

## Technology Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Data Fetching**: TanStack Query
- **Deployment**: Static export for GitHub Pages

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Export static files
npm run export
```

## Usage

1. Visit the application
2. Search for a YouTube channel by name or paste a Channel ID
3. View real-time subscriber count, total views, and video count
4. Share the channel page using the hash URL (e.g., `#UCHkj014U2CQ2Nv0UZeYpE_A`)

## API Integration

The application uses the mixerno.space API for YouTube data. In case of API restrictions or CORS issues, it falls back to mock data for demonstration purposes.

## Original Project

This is an upgrade of the original YouTube Realtime project. The original static HTML/jQuery version has been moved to the `old-app/` directory.

## License

YouTube Realtime Copyright (C) 2019-2024 [Akshat Mittal](https://akshatmittal.com/)

You may freely modify the code for personal use. You are not allowed to redistribute the project without attribution and credits or prior permission. Commercial use without permission is prohibited.