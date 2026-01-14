/**
 * Image optimization utilities for WebP format with fallbacks.
 * Implements Requirements 7.4, 8.2
 */

/**
 * Checks if the browser supports WebP format
 * Uses a cached result for performance
 */
let webpSupportCached: boolean | null = null

export async function supportsWebP(): Promise<boolean> {
  if (webpSupportCached !== null) {
    return webpSupportCached
  }

  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    webpSupportCached = false
    return false
  }

  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      webpSupportCached = img.width > 0 && img.height > 0
      resolve(webpSupportCached)
    }
    img.onerror = () => {
      webpSupportCached = false
      resolve(false)
    }
    // Smallest WebP image (1x1 pixel)
    img.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
  })
}

/**
 * Synchronous check for WebP support (uses cached value)
 * Returns false if not yet determined
 */
export function supportsWebPSync(): boolean {
  return webpSupportCached ?? false
}

/**
 * Generates an optimized image source with WebP fallback
 * @param basePath - Base path to the image (without extension)
 * @param fallbackExt - Fallback extension (default: 'jpg')
 * @returns Object with webp and fallback sources
 */
export function getOptimizedImageSources(
  basePath: string,
  fallbackExt: 'jpg' | 'png' = 'jpg'
): { webp: string; fallback: string } {
  // Remove any existing extension
  const pathWithoutExt = basePath.replace(/\.(jpg|jpeg|png|webp)$/i, '')
  
  return {
    webp: `${pathWithoutExt}.webp`,
    fallback: `${pathWithoutExt}.${fallbackExt}`,
  }
}

/**
 * Generates srcset for responsive images
 * @param basePath - Base image path
 * @param widths - Array of widths to generate
 * @param format - Image format
 * @returns srcset string
 */
export function generateResponsiveSrcSet(
  basePath: string,
  widths: number[] = [200, 400, 600, 800],
  format?: 'webp' | 'jpg' | 'png'
): string {
  // For external URLs or placeholder images, return empty string
  if (!basePath || basePath.startsWith('http') || basePath.includes('placeholder')) {
    return ''
  }

  const ext = format || getImageExtension(basePath)
  const pathWithoutExt = basePath.replace(/\.(jpg|jpeg|png|webp)$/i, '')

  return widths
    .map(w => `${pathWithoutExt}-${w}w.${ext} ${w}w`)
    .join(', ')
}

/**
 * Gets the extension from an image path
 */
function getImageExtension(path: string): string {
  const match = path.match(/\.(jpg|jpeg|png|webp)$/i)
  return match ? match[1].toLowerCase() : 'jpg'
}

/**
 * Props for the OptimizedImage component
 */
export interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  sizes?: string
  onLoad?: () => void
  onError?: () => void
}

/**
 * Generates picture element sources for WebP with fallback
 * Use this to create a <picture> element with proper sources
 */
export function getPictureSources(src: string): {
  webpSrc: string | null
  fallbackSrc: string
  type: string
} {
  // For external URLs, just return the original
  if (src.startsWith('http') || src.includes('placeholder')) {
    return {
      webpSrc: null,
      fallbackSrc: src,
      type: 'image/jpeg',
    }
  }

  const sources = getOptimizedImageSources(src)
  
  return {
    webpSrc: sources.webp,
    fallbackSrc: sources.fallback,
    type: 'image/webp',
  }
}

/**
 * Preloads critical images for better LCP (Largest Contentful Paint)
 * Call this for above-the-fold images
 */
export function preloadImage(src: string): void {
  if (typeof document === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  document.head.appendChild(link)
}

/**
 * Creates an intersection observer for lazy loading images
 * Returns a function to observe an element
 */
export function createLazyLoadObserver(
  onIntersect: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') {
    return null
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          onIntersect(entry)
        }
      })
    },
    {
      rootMargin: '50px 0px', // Start loading 50px before entering viewport
      threshold: 0.01,
      ...options,
    }
  )
}
