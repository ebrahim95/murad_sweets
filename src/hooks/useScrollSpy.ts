import { useState, useEffect, useCallback } from 'react'
import { SECTIONS } from '../router'
import type { SectionId } from '../router'

interface UseScrollSpyOptions {
  /** Offset from top of viewport to consider a section as active (default: 100) */
  offset?: number
  /** Throttle delay in ms for scroll events (default: 100) */
  throttleMs?: number
}

/**
 * Hook for detecting which section is currently in view based on scroll position.
 * Used for highlighting the active navigation item.
 * 
 * @param options - Configuration options
 * @returns The ID of the currently active section
 */
export function useScrollSpy(options: UseScrollSpyOptions = {}): SectionId {
  const { offset = 100, throttleMs = 100 } = options
  const [activeSection, setActiveSection] = useState<SectionId>(SECTIONS.home)

  const getSectionPositions = useCallback(() => {
    const sections = Object.values(SECTIONS)
    const positions: { id: SectionId; top: number; bottom: number }[] = []

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        positions.push({
          id: sectionId,
          top: rect.top + window.scrollY,
          bottom: rect.bottom + window.scrollY,
        })
      }
    })

    return positions
  }, [])

  const determineActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + offset
    const positions = getSectionPositions()

    // Find the section that contains the current scroll position
    for (let i = positions.length - 1; i >= 0; i--) {
      const section = positions[i]
      if (scrollPosition >= section.top) {
        return section.id
      }
    }

    // Default to first section if scroll is at the very top
    return positions.length > 0 ? positions[0].id : SECTIONS.home
  }, [getSectionPositions, offset])

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null
    let lastScrollTime = 0

    const handleScroll = () => {
      const now = Date.now()

      // Throttle scroll events
      if (now - lastScrollTime < throttleMs) {
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        timeoutId = setTimeout(() => {
          const newActiveSection = determineActiveSection()
          setActiveSection(newActiveSection)
        }, throttleMs)
        return
      }

      lastScrollTime = now
      const newActiveSection = determineActiveSection()
      setActiveSection(newActiveSection)
    }

    // Set initial active section
    const initialSection = determineActiveSection()
    setActiveSection(initialSection)

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [determineActiveSection, throttleMs])

  return activeSection
}

export default useScrollSpy
