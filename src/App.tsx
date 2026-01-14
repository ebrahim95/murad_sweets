function App() {
  return (
    <div className="min-h-screen bg-pastel-cream">
      <header className="bg-brand-primary text-white p-6">
        <h1 className="text-4xl font-heading font-bold text-center">
          Sweet Delights
        </h1>
        <p className="text-center mt-2 font-body">
          Handcrafted sweets made with love
        </p>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-heading text-brand-dark mb-4">
            Welcome to our sweet shop!
          </h2>
          <p className="text-gray-600 font-body">
            Project setup complete. Ready for development.
          </p>
          <button className="mt-6 bg-accent-coral hover:bg-accent-orange text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300">
            Explore Our Sweets
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
