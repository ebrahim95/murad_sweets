import { SECTIONS } from './router'
import { Navigation, Hero, Products } from './components'

function App() {
  return (
    <div className="min-h-screen bg-pastel-cream">
      {/* Navigation Component */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* Products Section */}
      <Products />

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
