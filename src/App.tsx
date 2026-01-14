import { Navigation, Hero, Products, About, ContactForm, OrderForm } from './components'
import { products } from './data/products'

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
      <About />

      {/* Order Section */}
      <OrderForm products={products} />

      {/* Contact Section */}
      <ContactForm />

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
