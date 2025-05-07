import { Geist, Geist_Mono } from "next/font/google"
import "@ensvolution/ui/globals.css"
import { Providers } from "@/providers/providers"
import Navbar from "@/components/Navbar";
import {Footer} from "@/components/Footer";
import ENSSidebar from "@/components/ENSSidebar";
import {Suspense} from "react";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
            <main className={"w-full flex flex-col"}>
                <Suspense fallback={null} >
                    <Navbar />
                    {children}
                    <Footer />
                </Suspense>
            </main>
            <ENSSidebar />
        </Providers>
      </body>
    </html>
  )
}
