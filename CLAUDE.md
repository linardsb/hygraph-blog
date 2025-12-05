# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (port 3000 by default)
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting
- `npm run test` - Run Vitest tests in watch mode
- `npm run test:ui` - Run tests with interactive UI interface

## Architecture Overview

**Shinobi** is a Next.js 15 blog application with Hygraph CMS integration. The architecture follows Next.js App Router patterns with server-side rendering.

### Key Technologies

- **Next.js 15** with App Router and Turbopack
- **React 19** with TypeScript
- **Tailwind CSS v4** with custom CSS variables for theming
- **Hygraph CMS** via GraphQL for content management
- **DOMPurify** for HTML sanitization
- **Vitest** with React Testing Library

### Critical Configuration

#### Environment Variables
- `HYGRAPH_ENDPOINT` - Required for GraphQL API (set in `.env.local`)
- Blog will show "No posts found" message if endpoint is not configured

#### Image Configuration
Remote images from Hygraph are configured in `next.config.js`:
```javascript
images: {
  remotePatterns: [{
    hostname: 'eu-west-2.graphassets.com'
  }]
}
```
**Important**: When adding new Hygraph regions, update this configuration to allow images from those domains.

### Data Flow Architecture

#### Hygraph CMS Schema
The blog expects the following Hygraph content models:

**Post Model** (API ID: `Post`):
- `author` - Single reference to Author (NOT multiple)
- `title`, `slug`, `excerpt` - Required strings
- `content` - Rich text with HTML output
- `coverImage` - Asset reference
- `publishedAt` - DateTime
- `tags` - Array of strings

**Author Model** (API ID: `Author`):
- `name` - Required string
- `avatar` - Asset reference
- `bio` - Optional string

**Critical**: The `author` field in Post must be a single reference, not multiple. If you see GraphQL errors about arrays, check this configuration in Hygraph.

#### Server-Side Rendering
- Blog data is fetched server-side in `src/app/blog/page.tsx` and `src/app/blog/[slug]/page.tsx`
- 1-hour revalidation (`export const revalidate = 3600`)
- Error handling returns empty arrays on failure, showing no-posts message to user

### Styling System

#### Theme Implementation
- Dark/light mode managed via `dark` class on root `<html>` element
- CSS variables defined in `src/app/globals.css` with color-scheme specific values
- State persisted to localStorage, initialized on client-side
- Tailwind configured to use CSS variables (e.g., `bg-background`, `text-foreground`)

#### Typography
- Headings: Rubik font, accessed via `.font-heading` class
- Body: Merriweather font (default)
- Both loaded from Google Fonts in root layout

### Security Considerations

#### HTML Sanitization
All rich text content from Hygraph is sanitized using DOMPurify before rendering:
```typescript
// src/lib/sanitize.ts exports createSafeHtml()
// Used with dangerouslySetInnerHTML for blog post content
```
The allowlist is intentionally strict - only permits basic formatting tags. Extend carefully if needed.

## Project Structure

``` 
src/
├── app/                    # Next.js App Router pages
│   ├── blog/              # Blog listing and post pages
│   │   └── [slug]/        # Dynamic blog post routes
│   ├── preview/           # Preview page
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles and CSS variables
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   │   └── Button/        # Button component with tests
│   ├── BlogSidebar.tsx    # Blog sidebar component
│   └── DarkModeToggle.tsx # Dark/light mode toggle
├── hooks/                 # Reusable React hooks
│   └── (custom hooks go here)
├── lib/                   # Utility functions and shared logic
│   ├── queries.ts         # Hygraph GraphQL queries
│   ├── types.ts           # TypeScript type definitions
│   └── sanitize.ts        # HTML sanitization utilities
└── test/                  # Test configuration
    ├── setup.ts           # Vitest setup file
    └── vitest.d.ts        # Vitest type definitions
```

### Directory Conventions

- **`src/app/`** - Next.js pages following App Router conventions. Each `page.tsx` is a route.
- **`src/components/`** - Reusable React components. UI components go in `ui/` subfolder.
- **`src/hooks/`** - Custom React hooks for shared stateful logic (e.g., `useTheme`, `useFetch`).
- **`src/lib/`** - Non-React utilities, API clients, type definitions, and helper functions.
- **`src/test/`** - Testing configuration and global test utilities.

## Development Patterns

### Adding New Pages
When creating new page routes in `src/app/`, add a navigation link to the header in `src/app/layout.tsx`. This applies to page components only, not UI components.

### GraphQL Queries
All Hygraph queries are centralized in `src/lib/queries.ts`. Type definitions are in `src/lib/types.ts`. When modifying queries:
1. Update the GraphQL query in `queries.ts`
2. Update corresponding TypeScript interface in `types.ts`
3. Test in Hygraph API Playground before deploying

### Path Aliases
The codebase uses `@/*` to import from `src/` directory:
```typescript
import { createSafeHtml } from '@/lib/sanitize'
```

### Testing
Component tests use React Testing Library. Setup file at `src/test/setup.ts` configures JSDOM environment and testing library matchers.
- when making a new page components, always add the link to that page in the header