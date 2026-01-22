import { SECTIONS } from '../router'
import type { SectionId } from '../router'

/**
 * Smooth scroll to a section by its ID
 * @param sectionId - The ID of the section to scroll to
 * @param behavior - Scroll behavior ('smooth' or 'auto')
 */
export function scrollToSection(sectionId: SectionId, behavior: ScrollBehavior = 'smooth'): void {
  const element = document.getElementById(sectionId)
  
  if (element) {
    element.scrollIntoView({ behavior, block: 'start' })
  } else {
    // Fallback: scroll to top if section not found
    window.scrollTo({ top: 0, behavior })
  }
}

/**
 * Navigate to a section with URL update and smooth scroll
 * Updates the hash in the URL without triggering a page reload
 * @param sectionId - The ID of the section to navigate to
 */
export function navigateToSection(sectionId: SectionId): void {
  // Update URL hash without reload
  const newUrl = `#/${sectionId}`
  window.history.pushState(null, '', newUrl)
  
  // Smooth scroll to section
  scrollToSection(sectionId)
}

/**
 * Get the current section from the URL hash
 * @returns The current section ID or 'home' as default
 */
export function getCurrentSectionFromHash(): SectionId {
  const hash = window.location.hash
  
  // Remove '#/' prefix and get section name
  const section = hash.replace('#/', '').replace('/', '')
  
  // Validate section exists
  if (section && Object.values(SECTIONS).includes(section as SectionId)) {
    return section as SectionId
  }
  
  return SECTIONS.home
}

/**
 * Set up initial scroll position based on URL hash
 * Should be called on page load
 */
export function initializeScrollPosition(): void {
  const section = getCurrentSectionFromHash()
  
  // Use requestAnimationFrame to ensure DOM is ready
  requestAnimationFrame(() => {
    scrollToSection(section, 'auto')
  })
}

/**
 * Navigation link configuration
 */
export interface NavLink {
  id: SectionId
  label: string
  path: string
}

/**
 * Get navigation links configuration
 */
export function getNavLinks(): NavLink[] {
  return [
    { id: SECTIONS.home, label: 'Home', path: '#/home' },
    { id: SECTIONS.products, label: 'Products', path: '#/products' },
    // { id: SECTIONS.about, label: 'About', path: '#/about' },
    { id: SECTIONS.order, label: 'Order', path: '#/order' },
    // { id: SECTIONS.contact, label: 'Contact', path: '#/contact' },
  ]
}
