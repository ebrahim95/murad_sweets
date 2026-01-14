import { useState, useCallback } from 'react'
import { useScrollSpy } from '../hooks/useScrollSpy'
import { navigateToSection, getNavLinks } from '../utils/navigation'
import type { SectionId } from '../router'

/**
 * Navigation component with sticky header, smooth scrolling, and mobile hamburger menu.
 * Implements Requirements 2.1, 2.2, 2.3, 2.4
 */
export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const activeSection = useScrollSpy({ offset: 100 })
  const navLinks = getNavLinks()

  const handleNavClick = useCallback((sectionId: SectionId) => {
    navigateToSection(sectionId)
    setIsMobileMenuOpen(false)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  return (
    <nav 
      className="sticky top-0 z-50 bg-white shadow-md transition-shadow duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-xl font-heading font-bold text-brand-primary hover:text-accent-coral transition-colors duration-300"
            aria-label="Go to home"
          >
            Murad's Sweets
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`
                  font-body font-medium transition-colors duration-300
                  ${activeSection === link.id 
                    ? 'text-brand-primary border-b-2 border-brand-primary' 
                    : 'text-brand-dark hover:text-brand-primary'
                  }
                `}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-pastel-pink transition-colors duration-300"
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span 
              className={`
                block w-6 h-0.5 bg-brand-dark transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}
              `}
            />
            <span 
              className={`
                block w-6 h-0.5 bg-brand-dark my-1 transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? 'opacity-0' : ''}
              `}
            />
            <span 
              className={`
                block w-6 h-0.5 bg-brand-dark transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}
              `}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'max-h-80 opacity-100 mt-4' : 'max-h-0 opacity-0'}
          `}
        >
          <div className="flex flex-col space-y-2 py-2 border-t border-pastel-pink">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`
                  w-full text-left py-3 px-4 rounded-lg font-body font-medium transition-all duration-300
                  ${activeSection === link.id 
                    ? 'bg-pastel-pink text-brand-primary' 
                    : 'text-brand-dark hover:bg-pastel-cream hover:text-brand-primary'
                  }
                `}
                aria-current={activeSection === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
