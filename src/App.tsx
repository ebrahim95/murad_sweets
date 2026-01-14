import { SECTIONS } from './router'
import { navigateToSection } from './utils/navigation'
import { Navigation } from './components/Navigation'

function App() {
  const handleExploreClick = () => {
    navigateToSection(SECTIONS.products)
  }

  return (
    <div className="min-h-screen bg-pastel-cream">
      {/* Navigation Component */}
      <Navigation />

      {/* Hero Section */}
      <section id={SECTIONS.home} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pastel-pink to-pastel-cream">
        <header className="text-center p-6">
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-brand-dark mb-4">
            Murad's Sweets
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-body mb-8">
            Handcrafted sweets made with love
          </p>
          <button 
            onClick={handleExploreClick}
            className="bg-accent-coral hover:bg-accent-orange text-white font-semibold py-3 px-8 rounded-full transition-colors duration-300 text-lg"
          >
            Explore Our Sweets
          </button>
        </header>
      </section>

      {/* Products Section */}
      <section id={SECTIONS.products} className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-brand-dark text-center mb-12">
            Our Products
          </h2>
          <p className="text-center text-gray-600 font-body">
            Products section - will be implemented in task 8
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id={SECTIONS.about} className="min-h-screen py-16 bg-pastel-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-brand-dark text-center mb-12">
            About Us
          </h2>
          <p className="text-center text-gray-600 font-body">
            About section - will be implemented in task 9
          </p>
        </div>
      </section>

      {/* Order Section */}
      <section id={SECTIONS.order} className="min-h-screen py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-brand-dark text-center mb-12">
            Place an Order
          </h2>
          <p className="text-center text-gray-600 font-body">
            Order form - will be implemented in task 11
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id={SECTIONS.contact} className="min-h-screen py-16 bg-pastel-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-brand-dark text-center mb-12">
            Contact Us
          </h2>
          <p className="text-center text-gray-600 font-body">
            Contact form - will be implemented in task 10
          </p>
        </div>
      </section>

      {/* Footer placeholder */}
      <footer className="bg-brand-dark text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-body">&copy; 2024 Murad's Sweets. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
