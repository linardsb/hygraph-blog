import { gql } from 'graphql-request'

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts(orderBy: publishedAt_DESC) {
      id
      slug
      title
      excerpt
      coverImage {
        url
      }
      author {
        name
        avatar {
          url
        }
      }
      publishedAt
      tags
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: String!) {
    post(where: { slug: $slug }) {
      id
      slug
      title
      excerpt
      content {
        html
      }
      coverImage {
        url
      }
      author {
        name
        avatar {
          url
        }
        bio
      }
      publishedAt
      tags
    }
  }
`
