# Shinobi - Next.js 15 Blog Application

A modern blog application built with Next.js 15, React 19, and Tailwind CSS v4. Features a headless CMS integration with Hygraph via GraphQL, custom theming with dark mode support, and comprehensive testing with Vitest.

## Features

- **Next.js 15** with App Router and Turbopack for fast development
- **React 19** with TypeScript for type-safe development
- **Tailwind CSS v4** with custom CSS variables for theming
- **Dark Mode** toggle with localStorage persistence
- **Hygraph CMS** integration via GraphQL for content management
- **DOMPurify** for secure HTML content sanitization
- **Vitest** with React Testing Library for component testing
- **Responsive Design** with mobile-first approach

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Hygraph endpoint to `.env.local`:
```env
HYGRAPH_ENDPOINT=your-hygraph-graphql-endpoint-here
```

### Development

Start the development server with Turbopack:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Building for Production

```bash
npm run build
npm run start
```

### Testing

Run tests:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

### Linting

```bash
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with header and dark mode toggle
│   ├── page.tsx           # Homepage with navigation
│   ├── blog/              # Blog listing and individual posts
│   │   ├── page.tsx       # Blog listing page
│   │   └── [slug]/        # Dynamic blog post pages
│   │       └── page.tsx
│   └── preview/           # Component preview page
│       └── page.tsx
├── components/            # Reusable React components
│   ├── ui/Button/         # Button component with variants
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── BlogSidebar.tsx    # Blog page sidebar
│   └── DarkModeToggle.tsx # Theme switching component
├── hooks/                 # Custom React hooks (future)
├── lib/                   # Utility functions and types
│   ├── queries.ts         # GraphQL queries for blog data
│   ├── types.ts           # TypeScript type definitions
│   └── sanitize.ts        # HTML sanitization utilities
└── test/                  # Test configuration
    ├── setup.ts           # Vitest setup file
    └── vitest.d.ts        # Vitest type definitions
```

## Technology Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **CMS**: Hygraph (GraphQL)
- **Testing**: Vitest + React Testing Library
- **Fonts**: Rubik (headings), Merriweather (body)

## Development Notes

- Uses `@/*` path alias for imports from the `src` directory
- Blog posts require GraphQL endpoint configuration
- Dark mode state is managed via CSS classes on the root element
- HTML content from CMS is sanitized using DOMPurify with strict allowlists
- Server-side rendering with 1-hour revalidation for blog content

## Contributing

This is a learning project built with Claude Code. Feel free to explore and adapt the code for your own projects.

## License

MIT
