import { lazy, Suspense } from 'react'
import { Navigation, Hero, Products, About, Footer } from './components'
import { products } from './data/products'

// Lazy load heavy form components for better initial load performance
// These components are below the fold and can be loaded on demand
// Requirements: 8.2, 8.3
const OrderForm = lazy(() => import('./components/OrderForm'))
const ContactForm = lazy(() => import('./components/ContactForm'))

/**
 * Loading fallback component for lazy-loaded sections
 * Accessibility: Announces loading state to screen readers
 */
function SectionLoader() {
  return (
    <div
      className="py-16 md:py-24 flex items-center justify-center"
      role="status"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 border-4 border-pastel-pink border-t-accent-coral rounded-full animate-spin"
          aria-hidden="true"
        />
        <p className="font-body text-brand-dark/60">Loading...</p>
        <span className="sr-only">Please wait while content is loading</span>
      </div>
    </div>
  )
}

/**
 * Main App component that composes all section components.
 * Implements the single-page website structure with:
 * - Sticky navigation with smooth scrolling
 * - Hero section with business branding
 * - Products gallery
 * - About section with business story
 * - Order form for placing orders (lazy loaded)
 * - Contact form for inquiries (lazy loaded)
 * - Footer with additional links
 * 
 * Performance optimizations:
 * - Code splitting with React.lazy() for heavy components
 * - Suspense boundaries for graceful loading states
 * 
 * Accessibility features:
 * - Skip to main content link
 * - Proper heading hierarchy
 * - ARIA landmarks
 * - Focus management
 * 
 * Requirements: All sections (1-9), 8.2, 8.3
 */
function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility - visible on focus */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
          bg-accent-coral text-white px-4 py-2 rounded-lg z-[100] font-body font-semibold
          focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-accent-coral"
      >
        Skip to main content
      </a>

      {/* Live region for screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="announcements"
      />

      {/* Navigation Component - Sticky header with smooth scroll links */}
      <header>
        <Navigation />
      </header>

      {/* Main content wrapper */}
      <main id="main-content">
        {/* Hero Section - Business name, tagline, and CTA */}
        <Hero />

        {/* Products Section - Grid gallery of sweets */}
        <Products />

        {/* About Section - Business story and mission */}
        {/* <About /> */}

        {/* Order Section - Product selection and order form (lazy loaded) */}
        {/*   <Suspense fallback={<SectionLoader />}>
          <OrderForm products={products} />
        </Suspense>
       */}
        {/* Contact Section - Contact form and business info (lazy loaded) */}
        {/* <Suspense fallback={<SectionLoader />}> */}
        {/*   <ContactForm /> */}
        {/* </Suspense> */}
      </main>

      {/* Footer Component - Copyright and additional links */}
      <Footer />
    </div>
  )
}

export default App
