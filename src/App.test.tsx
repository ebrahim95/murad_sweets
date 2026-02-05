import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the welcome message', () => {
    render(<App />)
    // Use getAllByText since "Murad Sweets" appears in both nav and hero
    const elements = screen.getAllByText("Murad Sweets")
    expect(elements.length).toBeGreaterThan(0)
    expect(elements[0]).toBeInTheDocument()
  })

  it('renders all navigation sections', () => {
    render(<App />)
    // Use getAllByText since navigation links appear in both desktop and mobile menus
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Products').length).toBeGreaterThan(0)
    expect(screen.getAllByText('About').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Order').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0)
  })

  it('renders section elements with correct IDs', async () => {
    render(<App />)
    // Non-lazy sections should be immediately available
    expect(document.getElementById('home')).toBeInTheDocument()
    expect(document.getElementById('products')).toBeInTheDocument()
    expect(document.getElementById('about')).toBeInTheDocument()
    
    // Lazy-loaded sections need to wait for Suspense to resolve
    await waitFor(() => {
      expect(document.getElementById('order')).toBeInTheDocument()
    })
    await waitFor(() => {
      expect(document.getElementById('contact')).toBeInTheDocument()
    })
  })

  it('renders main content wrapper for accessibility', () => {
    render(<App />)
    const mainContent = document.getElementById('main-content')
    expect(mainContent).toBeInTheDocument()
    expect(mainContent?.tagName.toLowerCase()).toBe('main')
  })

  it('renders skip to main content link for accessibility', () => {
    render(<App />)
    const skipLink = screen.getByText('Skip to main content')
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })
})
