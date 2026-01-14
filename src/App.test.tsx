import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the welcome message', () => {
    render(<App />)
    // Use getAllByText since "Murad's Sweets" appears in both nav and hero
    const elements = screen.getAllByText("Murad's Sweets")
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

  it('renders section elements with correct IDs', () => {
    render(<App />)
    expect(document.getElementById('home')).toBeInTheDocument()
    expect(document.getElementById('products')).toBeInTheDocument()
    expect(document.getElementById('about')).toBeInTheDocument()
    expect(document.getElementById('order')).toBeInTheDocument()
    expect(document.getElementById('contact')).toBeInTheDocument()
  })
})
