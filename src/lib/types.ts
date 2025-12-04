export interface Author {
  name: string
  avatar?: {
    url: string
  }
  bio?: string
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: {
    html: string
  }
  coverImage?: {
    url: string
  }
  author: Author
  publishedAt: string
  tags?: string[]
}

export interface BlogPostsResponse {
  posts: BlogPost[]
}

export interface BlogPostResponse {
  post: BlogPost
}
