import React from 'react'

interface BlogSidebarProps {
  tags?: string[]
  recentPosts?: Array<{
    slug: string
    title: string
  }>
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ tags, recentPosts }) => {
  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Search Section */}
      <div className="p-4 rounded-lg border border-muted border-opacity-30">
        <h3 className="text-lg font-semibold mb-3">Search</h3>
        <input
          type="text"
          placeholder="Search posts..."
          className="w-full px-3 py-2 rounded-md border border-muted border-opacity-30 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Tags Section */}
      {tags && tags.length > 0 && (
        <div className="p-4 rounded-lg border border-muted border-opacity-30">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded-full bg-primary bg-opacity-10 text-primary hover:bg-opacity-20 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent Posts Section */}
      {recentPosts && recentPosts.length > 0 && (
        <div className="p-4 rounded-lg border border-muted border-opacity-30">
          <h3 className="text-lg font-semibold mb-3">Recent Posts</h3>
          <ul className="space-y-2">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <a
                  href={`/blog/${post.slug}`}
                  className="text-sm hover:text-primary transition-colors line-clamp-2"
                >
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* About Section */}
      <div className="p-4 rounded-lg border border-muted border-opacity-30">
        <h3 className="text-lg font-semibold mb-3">About</h3>
        <p className="text-sm text-muted">
          Welcome to Shinobi, a modern blog built with Next.js 15 and powered by Hygraph CMS.
        </p>
      </div>
    </aside>
  )
}

export default BlogSidebar
