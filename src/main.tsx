import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import { router } from './router'
import { initializeScrollPosition } from './utils/navigation'

// Initialize scroll position based on URL hash after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  initializeScrollPosition()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
