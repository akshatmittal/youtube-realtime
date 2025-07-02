import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";

export const metadata: Metadata = {
  title: "Live YouTube Subscriber Count — YouTube Realtime",
  description: "YouTube Realtime is the easiest way to view the live subscriber count for any YouTuber on the planet! Simply enter the channel name, or ID and you are good to go!",
  keywords: "youtube, realtime, subscriber count, live count, youtube api, subscriber tracker",
  authors: [{ name: "Akshat Mittal", url: "https://akshatmittal.com" }],
  openGraph: {
    title: "Live YouTube Subscriber Count — YouTube Realtime",
    description: "YouTube Realtime is the easiest way to view the live subscriber count for any YouTuber on the planet! Simply enter the channel name, or ID and you are good to go!",
    url: "https://gh.akshatmittal.com/youtube-realtime/",
    siteName: "YouTube Realtime",
    images: [
      {
        url: "https://gh.akshatmittal.com/youtube-realtime/assets/images/sharing.png",
        width: 1200,
        height: 630,
        alt: "YouTube Realtime",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live YouTube Subscriber Count — YouTube Realtime",
    description: "YouTube Realtime is the easiest way to view the live subscriber count for any YouTuber on the planet!",
    creator: "@iakshatmittal",
    images: ["https://gh.akshatmittal.com/youtube-realtime/assets/images/sharing.png"],
  },
  icons: {
    icon: "https://gh.akshatmittal.com/youtube-realtime/assets/images/icon.png",
    shortcut: "https://gh.akshatmittal.com/youtube-realtime/assets/images/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
