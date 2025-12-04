import type { Metadata } from 'next'
import { Rubik, Merriweather } from 'next/font/google'
import './globals.css'
import DarkModeToggle from '@/components/DarkModeToggle'
import Link from 'next/link'

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
})

const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shinobi - Modern Blog',
  description: 'A Next.js 15 blog application built as a Claude Code learning project',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${rubik.variable} ${merriweather.variable}`}>
      <body>
        <header className="border-b border-muted border-opacity-20 sticky top-0 bg-background bg-opacity-95 backdrop-blur-sm z-50">
          <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold font-heading">
              Shinobi
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/preview" className="hover:text-primary transition-colors">
                Preview
              </Link>
              <DarkModeToggle />
            </div>
          </nav>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-muted border-opacity-20 py-8 mt-12">
          <div className="container mx-auto px-4 text-center text-muted">
            <p>&copy; {new Date().getFullYear()} Shinobi. Built with Next.js 15 and Claude Code.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
