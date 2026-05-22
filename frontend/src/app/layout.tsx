import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CookLens | AI Cooking Assistant",
  description:
    "Upload any food image and get instant AI-powered cooking insights. Identify ingredients, analyze cooking stages, discover recipes, and get personalized guidance — all powered by advanced computer vision.",
  keywords: [
    "AI cooking",
    "food recognition",
    "recipe finder",
    "ingredient detection",
    "cooking assistant",
    "food AI",
    "CookLens",
  ],
  authors: [{ name: "CookLens Team" }],
  openGraph: {
    title: "CookLens | AI Cooking Assistant",
    description:
      "Your AI-powered kitchen companion. Upload food photos for instant insights.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CookLens | AI Cooking Assistant",
    description:
      "Your AI-powered kitchen companion. Upload food photos for instant insights.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased">
        <main className="relative">{children}</main>
      </body>
    </html>
  );
}
