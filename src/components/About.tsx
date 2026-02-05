/**
 * About section component with business story and mission content.
 * Implements Requirements 4.1, 4.3
 * Accessibility: Proper heading hierarchy, semantic HTML, ARIA labels
 */
export function About() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 bg-gradient-to-b from-pastel-cream/30 to-white"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="about-heading" className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Our Story
          </h2>
          <p className="font-body text-lg text-brand-dark/70 max-w-2xl mx-auto">
            A journey of passion, tradition, and the sweetest moments
          </p>
        </div>

        {/* Content grid */}
        <div className="max-w-5xl mx-auto">
          {/* Story section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
            {/* Image placeholder */}
            <div className="relative">
              <div 
                className="aspect-square rounded-2xl bg-gradient-to-br from-pastel-pink to-pastel-peach flex items-center justify-center overflow-hidden shadow-lg"
                aria-hidden="true"
              >
                <svg 
                  className="w-24 h-24 text-accent-coral/40" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              {/* Decorative element */}
              <div 
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent-gold/20 rounded-full blur-xl"
                aria-hidden="true"
              />
            </div>

            {/* Story text */}
            <div className="space-y-6">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-brand-dark">
                From Our Kitchen to Your Heart
              </h3>
              <div className="space-y-4 font-body text-brand-dark/80 leading-relaxed">
                <p>
                  Murad Sweets began as a family tradition, passed down through generations 
                  of skilled artisans who believed that every sweet tells a story. What started 
                  in a small kitchen has blossomed into a beloved destination for those seeking 
                  authentic, handcrafted treats.
                </p>
                <p>
                  Each recipe we create honors the time-tested techniques of traditional 
                  sweet-making while embracing the finest ingredients available today. We believe 
                  that the best sweets are made with patience, precision, and most importantly, love.
                </p>
              </div>
            </div>
          </div>

          {/* Mission section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Mission text */}
            <div className="space-y-6 md:order-2">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-brand-dark">
                Our Mission
              </h3>
              <div className="space-y-4 font-body text-brand-dark/80 leading-relaxed">
                <p>
                  We are dedicated to bringing joy to every celebration, big or small. 
                  Our mission is to craft sweets that create lasting memories and bring 
                  people together around the table.
                </p>
                <p>
                  Quality is at the heart of everything we do. From sourcing premium 
                  ingredients to perfecting each recipe, we ensure that every bite 
                  delivers an exceptional experience worthy of your special moments.
                </p>
              </div>
            </div>

            {/* Image placeholder */}
            <div className="relative md:order-1">
              <div 
                className="aspect-square rounded-2xl bg-gradient-to-br from-pastel-lavender to-pastel-mint flex items-center justify-center overflow-hidden shadow-lg"
                aria-hidden="true"
              >
                <svg 
                  className="w-24 h-24 text-accent-teal/40" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              {/* Decorative element */}
              <div 
                className="absolute -top-4 -left-4 w-24 h-24 bg-pastel-pink/30 rounded-full blur-xl"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Values section */}
          <div className="mt-16 md:mt-24">
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-brand-dark text-center mb-10">
              What We Stand For
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Value 1: Quality */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="w-14 h-14 bg-pastel-pink rounded-xl flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <svg className="w-7 h-7 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-xl font-semibold text-brand-dark mb-2">
                  Premium Quality
                </h4>
                <p className="font-body text-brand-dark/70 leading-relaxed">
                  We use only the finest ingredients, sourced with care to ensure every 
                  sweet meets our exacting standards.
                </p>
              </div>

              {/* Value 2: Tradition */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="w-14 h-14 bg-pastel-peach rounded-xl flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <svg className="w-7 h-7 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-xl font-semibold text-brand-dark mb-2">
                  Time-Honored Tradition
                </h4>
                <p className="font-body text-brand-dark/70 leading-relaxed">
                  Our recipes have been perfected over generations, preserving authentic 
                  flavors and techniques.
                </p>
              </div>

              {/* Value 3: Love */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
                <div 
                  className="w-14 h-14 bg-pastel-lavender rounded-xl flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  <svg className="w-7 h-7 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-xl font-semibold text-brand-dark mb-2">
                  Made with Love
                </h4>
                <p className="font-body text-brand-dark/70 leading-relaxed">
                  Every sweet is crafted with care and passion, because we believe love 
                  is the secret ingredient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
