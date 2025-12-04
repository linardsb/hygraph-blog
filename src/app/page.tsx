import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading">
          Welcome to Shinobi
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          A modern blog application built with Next.js 15, React 19, and Tailwind CSS v4.
          Powered by Hygraph CMS and built as a Claude Code learning project.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/blog">
            <Button variant="primary" size="lg">
              Read the Blog
            </Button>
          </Link>
          <Link href="/preview">
            <Button variant="outline" size="lg">
              View Components
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          <div className="p-6 rounded-lg border border-muted border-opacity-30">
            <h3 className="text-xl font-semibold mb-3 font-heading">Next.js 15</h3>
            <p className="text-muted">
              Built with the latest Next.js featuring App Router and Turbopack for blazing fast development.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-muted border-opacity-30">
            <h3 className="text-xl font-semibold mb-3 font-heading">React 19</h3>
            <p className="text-muted">
              Leveraging the newest React features with TypeScript for type-safe development.
            </p>
          </div>
          <div className="p-6 rounded-lg border border-muted border-opacity-30">
            <h3 className="text-xl font-semibold mb-3 font-heading">Hygraph CMS</h3>
            <p className="text-muted">
              Content managed through GraphQL with secure HTML sanitization using DOMPurify.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
