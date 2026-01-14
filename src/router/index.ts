import { createRouter, createHashHistory, createRootRoute, createRoute } from '@tanstack/react-router'
import App from '../App'

// Define section IDs for navigation
export const SECTIONS = {
  home: 'home',
  products: 'products',
  about: 'about',
  order: 'order',
  contact: 'contact',
} as const

export type SectionId = typeof SECTIONS[keyof typeof SECTIONS]

// Root route with App component
const rootRoute = createRootRoute({
  component: App,
})

// Index route (home)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
})

// Section routes for hash-based navigation
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/home',
})

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
})

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
})

const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/order',
})

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
})

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  homeRoute,
  productsRoute,
  aboutRoute,
  orderRoute,
  contactRoute,
])

// Create hash history for single-page navigation
const hashHistory = createHashHistory()

// Create router instance
export const router = createRouter({
  routeTree,
  history: hashHistory,
})

// Type declaration for router
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
