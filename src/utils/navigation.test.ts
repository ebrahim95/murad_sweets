import { describe, it, expect, beforeEach, vi } from 'vitest'
import { SECTIONS } from '../router'
import { 
  getCurrentSectionFromHash, 
  getNavLinks,
  scrollToSection,
  navigateToSection
} from './navigation'

describe('navigation utilities', () => {
  describe('getCurrentSectionFromHash', () => {
    beforeEach(() => {
      // Reset location hash before each test
      window.location.hash = ''
    })

    it('returns home when hash is empty', () => {
      window.location.hash = ''
      expect(getCurrentSectionFromHash()).toBe(SECTIONS.home)
    })

    it('returns home when hash is just #/', () => {
      window.location.hash = '#/'
      expect(getCurrentSectionFromHash()).toBe(SECTIONS.home)
    })

    it('returns products when hash is #/products', () => {
      window.location.hash = '#/products'
      expect(getCurrentSectionFromHash()).toBe(SECTIONS.products)
    })

    it('returns about when hash is #/about', () => {
      window.location.hash = '#/about'
      expect(getCurrentSectionFromHash()).toBe(SECTIONS.about)
    })

    it('returns order when hash is #/order', () => {
      window.location.hash = '#/order'
      expect(getCurrentSectionFromHash()).toBe(SECTIONS.order)
    })

    it('returns contact when hash is #/contact', () => {
      window.location.hash = '#/contact'
      expect(getCurrentSectionFromHash()).toBe(SECTIONS.contact)
    })

    it('returns home for invalid section', () => {
      window.location.hash = '#/invalid-section'
      expect(getCurrentSectionFromHash()).toBe(SECTIONS.home)
    })
  })

  describe('getNavLinks', () => {
    it('returns all navigation links', () => {
      const links = getNavLinks()
      expect(links).toHaveLength(5)
    })

    it('includes all section IDs', () => {
      const links = getNavLinks()
      const ids = links.map(link => link.id)
      expect(ids).toContain(SECTIONS.home)
      expect(ids).toContain(SECTIONS.products)
      expect(ids).toContain(SECTIONS.about)
      expect(ids).toContain(SECTIONS.order)
      expect(ids).toContain(SECTIONS.contact)
    })

    it('has correct path format for each link', () => {
      const links = getNavLinks()
      links.forEach(link => {
        expect(link.path).toBe(`#/${link.id}`)
      })
    })

    it('has labels for each link', () => {
      const links = getNavLinks()
      links.forEach(link => {
        expect(link.label).toBeTruthy()
        expect(typeof link.label).toBe('string')
      })
    })
  })

  describe('scrollToSection', () => {
    beforeEach(() => {
      // Create mock elements for each section
      Object.values(SECTIONS).forEach(sectionId => {
        const element = document.createElement('section')
        element.id = sectionId
        document.body.appendChild(element)
      })
    })

    it('calls scrollIntoView on the target element', () => {
      const element = document.getElementById(SECTIONS.products)!
      const scrollIntoViewMock = vi.fn()
      element.scrollIntoView = scrollIntoViewMock

      scrollToSection(SECTIONS.products)

      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' })
    })

    it('uses auto behavior when specified', () => {
      const element = document.getElementById(SECTIONS.about)!
      const scrollIntoViewMock = vi.fn()
      element.scrollIntoView = scrollIntoViewMock

      scrollToSection(SECTIONS.about, 'auto')

      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' })
    })
  })

  describe('navigateToSection', () => {
    beforeEach(() => {
      // Create mock elements for each section with scrollIntoView mocked
      Object.values(SECTIONS).forEach(sectionId => {
        const existingElement = document.getElementById(sectionId)
        if (!existingElement) {
          const element = document.createElement('section')
          element.id = sectionId
          element.scrollIntoView = vi.fn()
          document.body.appendChild(element)
        } else {
          existingElement.scrollIntoView = vi.fn()
        }
      })
      // Reset hash
      window.location.hash = ''
    })

    it('updates the URL hash', () => {
      navigateToSection(SECTIONS.products)
      expect(window.location.hash).toBe('#/products')
    })

    it('updates hash for different sections', () => {
      navigateToSection(SECTIONS.contact)
      expect(window.location.hash).toBe('#/contact')
    })
  })
})
