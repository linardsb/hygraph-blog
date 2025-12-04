import Button from '@/components/ui/Button'

export default function PreviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 font-heading">Component Preview</h1>

      <div className="space-y-12">
        {/* Button Variants */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-heading">Button Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
        </section>

        {/* Button Sizes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-heading">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm">Small Button</Button>
            <Button size="md">Medium Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </section>

        {/* Disabled State */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-heading">Disabled State</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="secondary" disabled>
              Disabled Secondary
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-heading">Typography</h2>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold font-heading">Heading 1 - Rubik Font</h1>
            <h2 className="text-4xl font-bold font-heading">Heading 2 - Rubik Font</h2>
            <h3 className="text-3xl font-semibold font-heading">Heading 3 - Rubik Font</h3>
            <h4 className="text-2xl font-semibold font-heading">Heading 4 - Rubik Font</h4>
            <p className="text-lg">
              This is body text using Merriweather serif font. It provides excellent readability
              for long-form content and creates a classic, elegant feel for the blog.
            </p>
            <p className="text-base text-muted">
              This is muted text that can be used for secondary information or less important details.
            </p>
          </div>
        </section>

        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-heading">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg bg-background border-2 border-foreground"></div>
              <p className="text-sm font-semibold">Background</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg bg-foreground"></div>
              <p className="text-sm font-semibold">Foreground</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg" style={{ backgroundColor: 'var(--primary)' }}></div>
              <p className="text-sm font-semibold">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg" style={{ backgroundColor: 'var(--secondary)' }}></div>
              <p className="text-sm font-semibold">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="w-full h-24 rounded-lg" style={{ backgroundColor: 'var(--accent)' }}></div>
              <p className="text-sm font-semibold">Accent</p>
            </div>
          </div>
        </section>

        {/* Card Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 font-heading">Card Components</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg border border-muted border-opacity-30 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold mb-2 font-heading">Card Title</h3>
              <p className="text-muted mb-4">
                This is a sample card component with hover effects and proper spacing.
              </p>
              <Button size="sm">Learn More</Button>
            </div>
            <div className="p-6 rounded-lg border border-muted border-opacity-30 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold mb-2 font-heading">Another Card</h3>
              <p className="text-muted mb-4">
                Cards can be used for blog posts, features, or any content grouping.
              </p>
              <Button size="sm" variant="outline">
                Read More
              </Button>
            </div>
            <div className="p-6 rounded-lg border border-muted border-opacity-30 hover:border-primary transition-colors">
              <h3 className="text-xl font-semibold mb-2 font-heading">Third Card</h3>
              <p className="text-muted mb-4">
                Consistent styling makes the UI feel cohesive and professional.
              </p>
              <Button size="sm" variant="secondary">
                Explore
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
