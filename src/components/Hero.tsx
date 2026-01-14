import { useCallback } from 'react'
import { navigateToSection } from '../utils/navigation'

/**
 * Hero section component with business name, tagline, and CTA button.
 * Implements Requirements 1.1, 1.3, 9.1, 9.2
 */
export function Hero() {
  const handleCtaClick = useCallback(() => {
    navigateToSection('products')
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background gradient with sweet-themed colors */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-pastel-pink via-pastel-peach to-pastel-cream"
        aria-hidden="true"
      />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Floating circles for visual interest */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-coral/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-accent-gold/20 rounded-full blur-xl animate-pulse delay-300" />
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pastel-lavender/40 rounded-full blur-xl animate-pulse delay-500" />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-accent-teal/20 rounded-full blur-xl animate-pulse delay-700" />
      </div>

      {/* Content container */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Business name */}
        <h1 
          className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-brand-dark mb-6 animate-fade-in"
        >
          Murad's Sweets
        </h1>
        
        {/* Tagline */}
        <p 
          className="font-body text-xl md:text-2xl lg:text-3xl text-brand-dark/80 mb-8 max-w-2xl mx-auto animate-fade-in-delay"
        >
          Handcrafted treats made with love, bringing sweetness to every moment
        </p>
        
        {/* CTA Button */}
        <button
          onClick={handleCtaClick}
          className="
            inline-flex items-center gap-2
            px-8 py-4 
            bg-accent-coral hover:bg-accent-coral/90
            text-black font-body font-semibold text-lg
            rounded-full
            shadow-lg hover:shadow-xl
            transform hover:scale-105
            transition-all duration-300 ease-in-out
            focus:outline-none focus:ring-4 focus:ring-accent-coral/50
            animate-fade-in-delay-2
          "
          aria-label="Explore our products"
        >
          Explore Our Treats
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-hidden="true"
      >
        <svg 
          className="w-8 h-8 text-brand-dark/50" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
      </div>
    </section>
  )
}

export default Hero
