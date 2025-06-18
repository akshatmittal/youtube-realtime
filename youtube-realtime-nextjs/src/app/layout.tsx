import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Navigation } from "@/components/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "YouTube Realtime - Live Subscriber Count",
  description: "View live subscriber counts for any YouTube channel. Real-time updates, comparisons, and more.",
  keywords: "YouTube, subscribers, live count, real-time, analytics",
  openGraph: {
    title: "YouTube Realtime - Live Subscriber Count",
    description: "View live subscriber counts for any YouTube channel. Real-time updates, comparisons, and more.",
    type: "website",
    url: "https://youtube-realtime.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "YouTube Realtime - Live Subscriber Count",
    description: "View live subscriber counts for any YouTube channel. Real-time updates, comparisons, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50`}
      >
        <Providers>
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-gray-800 text-white text-center py-4 mt-16">
            <p>&copy; 2024 YouTube Realtime. YouTube is a registered trademark of Google.</p>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
