import { Navigation, Hero, Products, About, ContactForm, OrderForm, Footer } from './components'
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

      {/* Footer Component */}
      <Footer />
    </div>
  )
}

export default App
