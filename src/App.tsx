import { Navigation, Hero, Products, About, ContactForm, OrderForm, Footer } from './components'
import { products } from './data/products'

/**
 * Main App component that composes all section components.
 * Implements the single-page website structure with:
 * - Sticky navigation with smooth scrolling
 * - Hero section with business branding
 * - Products gallery
 * - About section with business story
 * - Order form for placing orders
 * - Contact form for inquiries
 * - Footer with additional links
 * 
 * Requirements: All sections (1-9)
 */
function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
          bg-accent-coral text-white px-4 py-2 rounded-lg z-[100] font-body font-semibold"
      >
        Skip to main content
      </a>

      {/* Navigation Component - Sticky header with smooth scroll links */}
      <Navigation />

      {/* Main content wrapper */}
      <main id="main-content">
        {/* Hero Section - Business name, tagline, and CTA */}
        <Hero />

        {/* Products Section - Grid gallery of sweets */}
        <Products />

        {/* About Section - Business story and mission */}
        <About />

        {/* Order Section - Product selection and order form */}
        <OrderForm products={products} />

        {/* Contact Section - Contact form and business info */}
        <ContactForm />
      </main>

      {/* Footer Component - Copyright and additional links */}
      <Footer />
    </div>
  )
}

export default App
