import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the welcome message', () => {
    render(<App />)
    // Use getAllByText since "Sweet Delights" appears in both nav and hero
    const elements = screen.getAllByText('Sweet Delights')
    expect(elements.length).toBeGreaterThan(0)
    expect(elements[0]).toBeInTheDocument()
  })

  it('renders all navigation sections', () => {
    render(<App />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Order')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
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
