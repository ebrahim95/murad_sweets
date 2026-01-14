import { useState } from 'react'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

/**
 * ProductCard component displays individual product with image, name, description, and price.
 * Implements lazy loading for images.
 * Implements Requirements 3.1, 3.2
 */
export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(true)
  }

  // Format price to display with 2 decimal places
  const formattedPrice = `$${product.price.toFixed(2)}`

  return (
    <article
      className="
        group
        bg-white rounded-2xl overflow-hidden
        shadow-md hover:shadow-xl
        transform hover:-translate-y-1
        transition-all duration-300 ease-in-out
        flex flex-col
      "
      aria-label={`${product.name} - ${formattedPrice}`}
    >
      {/* Image container with lazy loading */}
      <div className="relative aspect-square overflow-hidden bg-pastel-cream">
        {/* Placeholder while loading */}
        {!imageLoaded && (
          <div 
            className="absolute inset-0 flex items-center justify-center bg-pastel-cream animate-pulse"
            aria-hidden="true"
          >
            <svg 
              className="w-12 h-12 text-pastel-pink" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
        )}
        
        {/* Product image with lazy loading */}
        {!imageError ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={`
              w-full h-full object-cover
              group-hover:scale-105
              transition-transform duration-300 ease-in-out
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}
            `}
          />
        ) : (
          /* Fallback for failed images */
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center bg-pastel-cream"
            aria-label={`Image for ${product.name}`}
          >
            <svg 
              className="w-16 h-16 text-pastel-pink mb-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
            <span className="text-sm text-brand-dark/60 font-body">{product.name}</span>
          </div>
        )}

        {/* Category badge */}
        <span 
          className="
            absolute top-3 left-3
            px-3 py-1
            bg-white/90 backdrop-blur-sm
            text-xs font-body font-medium text-brand-dark
            rounded-full
          "
        >
          {product.category}
        </span>

        {/* Availability indicator */}
        {!product.available && (
          <div 
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
            aria-label="Currently unavailable"
          >
            <span className="px-4 py-2 bg-white/90 rounded-full text-sm font-body font-medium text-brand-dark">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Product name */}
        <h3 className="font-heading text-lg font-semibold text-brand-dark mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        {/* Description */}
        <p className="font-body text-sm text-brand-dark/70 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          <span className="font-heading text-xl font-bold text-accent-coral">
            {formattedPrice}
          </span>
          
          {product.available && (
            <span className="text-xs font-body text-accent-teal font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-accent-teal rounded-full" aria-hidden="true" />
              In Stock
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProductCard
