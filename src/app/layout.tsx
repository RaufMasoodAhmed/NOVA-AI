import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/ui/GrainOverlay";
import SmoothScroll from "@/components/layout/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "NOVA AI — The Intelligent Workspace for Modern Teams",
  description:
    "Your entire AI workflow in one place. Create, think, analyze, and automate with a powerful AI workspace designed to move at the speed of your ideas.",
  keywords: [
    "AI workspace",
    "intelligent workflows",
    "AI SaaS",
    "autonomous agents",
    "modern productivity",
    "NOVA AI",
  ],
  authors: [{ name: "NOVA AI Inc." }],
  openGraph: {
    title: "NOVA AI — The Intelligent Workspace for Modern Teams",
    description:
      "Your entire AI workflow in one place. Create, think, analyze, and automate with a powerful AI workspace designed to move at the speed of your ideas.",
    url: "https://nova.ai",
    siteName: "NOVA AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NOVA AI — The Intelligent Workspace for Modern Teams",
    description:
      "Your entire AI workflow in one place. Create, think, analyze, and automate with a powerful AI workspace.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="relative min-h-screen bg-[#050505] text-[#F5F5F5] font-sans selection:bg-blue-500/25 selection:text-white">
        <SmoothScroll>
          <GrainOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
