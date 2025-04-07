import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { Toaster } from 'sonner';
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import "../globals.css";
import { ThemeProvider } from '@/components/providers/theme-provider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | E-Commerce X1",
    default: "E-Commerce X1 - Premium Online Shopping",
  },
  description: "Discover premium products with fast shipping and secure checkout",
  keywords: ["e-commerce", "online shopping", "premium products"],
  authors: [{ name: "Your Company" }],
  creator: "Your Company",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <CartProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow px-4 md:px-6 lg:px-8 py-6 md:py-8">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster position="top-right" />
            </CartProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}