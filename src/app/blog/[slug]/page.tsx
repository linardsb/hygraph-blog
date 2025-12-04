import { GraphQLClient } from 'graphql-request'
import { GET_POST_BY_SLUG, GET_ALL_POSTS } from '@/lib/queries'
import { BlogPostResponse, BlogPostsResponse } from '@/lib/types'
import { createSafeHtml } from '@/lib/sanitize'
import BlogSidebar from '@/components/BlogSidebar'
import Image from 'next/image'
import { notFound } from 'next/navigation'

const endpoint = process.env.HYGRAPH_ENDPOINT || ''

async function getPost(slug: string) {
  if (!endpoint) {
    return null
  }

  try {
    const client = new GraphQLClient(endpoint)
    const data = await client.request<BlogPostResponse>(GET_POST_BY_SLUG, { slug })
    return data.post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

async function getAllPosts() {
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

export async function generateStaticParams() {
  const { posts } = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const { posts } = await getAllPosts()
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  )
  const recentPosts = posts
    .filter((p) => p.slug !== slug)
    .slice(0, 5)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
    }))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <article className="flex-1 max-w-3xl">
          {post.coverImage && (
            <div className="mb-6 relative h-96 w-full rounded-lg overflow-hidden">
              <Image
                src={post.coverImage.url}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-muted border-opacity-30">
            <div className="flex items-center gap-3">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar.url}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <time dateTime={post.publishedAt} className="text-sm text-muted">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm rounded-full bg-primary bg-opacity-10 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={createSafeHtml(post.content.html)}
          />

          {post.author.bio && (
            <div className="mt-12 p-6 rounded-lg border border-muted border-opacity-30">
              <h3 className="text-xl font-semibold mb-3 font-heading">
                About {post.author.name}
              </h3>
              <p className="text-muted">{post.author.bio}</p>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <BlogSidebar tags={allTags} recentPosts={recentPosts} />
      </div>
    </div>
  )
}
