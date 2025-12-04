import { GraphQLClient } from 'graphql-request'
import { GET_ALL_POSTS } from '@/lib/queries'
import { BlogPostsResponse } from '@/lib/types'
import BlogSidebar from '@/components/BlogSidebar'
import Link from 'next/link'
import Image from 'next/image'

const endpoint = process.env.HYGRAPH_ENDPOINT || ''

async function getPosts() {
  if (!endpoint) {
    return { posts: [] }
  }

  try {
    const client = new GraphQLClient(endpoint)
    const data = await client.request<BlogPostsResponse>(GET_ALL_POSTS)
    return data
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { posts: [] }
  }
}

export const revalidate = 3600 // Revalidate every hour

export default async function BlogPage() {
  const { posts } = await getPosts()

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags || []))
  )

  // Get recent posts for sidebar
  const recentPosts = posts.slice(0, 5).map((post) => ({
    slug: post.slug,
    title: post.title,
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-8 font-heading">Blog Posts</h1>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted mb-4">
                No blog posts found. Please configure your HYGRAPH_ENDPOINT environment variable.
              </p>
              <p className="text-sm text-muted">
                Check the .env.example file for setup instructions.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="p-6 rounded-lg border border-muted border-opacity-30 hover:border-primary transition-colors"
                >
                  {post.coverImage && (
                    <div className="mb-4 relative h-64 w-full rounded-md overflow-hidden">
                      <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <Link href={`/blog/${post.slug}`}>
                    <h2 className="text-2xl font-bold mb-2 font-heading hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-3 mb-3 text-sm text-muted">
                    {post.author.avatar && (
                      <Image
                        src={post.author.avatar.url}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    )}
                    <span>{post.author.name}</span>
                    <span>•</span>
                    <time dateTime={post.publishedAt}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                  <p className="text-muted mb-4">{post.excerpt}</p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-primary bg-opacity-10 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <BlogSidebar tags={allTags} recentPosts={recentPosts} />
      </div>
    </div>
  )
}
