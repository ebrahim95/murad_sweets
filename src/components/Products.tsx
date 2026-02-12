import { useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { products } from '../data/products'
import type { Product, ProductCategory } from '../types'

interface ProductsProps {
  products?: Product[]
}

/**
 * Products section component with responsive grid layout.
 * Displays products grouped by category.
 * Implements Requirements 3.1, 3.2, 3.4
 * Accessibility: Proper heading hierarchy, semantic HTML, ARIA labels
 */
export function Products({ products: productsProp }: ProductsProps) {
  // Use provided products or default to imported products
  const productList = productsProp ?? products

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped = productList.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    }, {} as Record<ProductCategory, Product[]>)

    // Define category order
    const categoryOrder: ProductCategory[] = ['Mishti', 'Desserts', 'Pithas']
    
    return categoryOrder
      .filter(category => grouped[category]?.length > 0)
      .map(category => ({
        category,
        products: grouped[category],
      }))
  }, [productList])

  // Category descriptions for better UX
  const categoryDescriptions: Record<ProductCategory, string> = {
    'Mishti': 'Traditional Bengali sweets made with love and authentic recipes',
    'Desserts': 'Creamy, rich desserts perfect for any occasion',
    'Pithas': 'Traditional rice cakes and seasonal delicacies',
  }

  return (
    <section
      id="products"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-pastel-cream/30"
      aria-labelledby="products-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="products-heading" className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Our Sweets
          </h2>
          <p className="font-body text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Explore our collection of authentic Bangladeshi mishti and pithas, handcrafted using traditional recipes and premium ingredients — perfect for celebrations, gifting, and large gatherings.
          </p>
        </div>

        {/* Products by category */}
        {productsByCategory.map(({ category, products: categoryProducts }) => (
          <div key={category} className="mb-16 last:mb-0">
            {/* Category header */}
            <div className="mb-8">
              <h3 className="font-heading text-2xl md:text-3xl font-semibold text-brand-dark mb-2">
                {category}
              </h3>
              <p className="font-body text-brand-dark/60">
                {categoryDescriptions[category]}
              </p>
              <div className="mt-3 w-20 h-1 bg-accent-coral rounded-full" aria-hidden="true" />
            </div>

            {/* Responsive product grid */}
            <div 
              className="
                grid gap-6
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
              role="list"
              aria-label={`${category} products`}
            >
              {categoryProducts.map((product) => (
                <div key={product.id} role="listitem">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {productsByCategory.length === 0 && (
          <div className="text-center py-16">
            <svg 
              className="w-16 h-16 text-pastel-pink mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
              />
            </svg>
            <p className="font-body text-lg text-brand-dark/60">
              No products available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
      
      {/* Contact Info Card - Centered */}
      <div className="flex justify-center mt-8">
        <div
          className="
            bg-white rounded-2xl overflow-hidden
            shadow-md hover:shadow-xl
            transform hover:-translate-y-1
            transition-all duration-300 ease-in-out
            p-6 sm:p-8
            max-w-md w-full mx-4
          "
        >
          <h3 className="font-heading text-xl font-semibold text-brand-dark mb-4 text-center">
            Contact Information
          </h3>
          <div className="space-y-3 font-body text-brand-dark/80">
            <p className="flex items-start justify-center gap-2">
              <svg className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:346-368-4831" className="hover:text-accent-coral transition-colors break-all">
                346-368-4831
              </a>
            </p>
            <p className="flex items-start justify-center gap-2">
              <svg className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:muradsweets1999@gmail.com" className="hover:text-accent-coral transition-colors break-all">
                muradsweets1999@gmail.com
              </a>
            </p>
          </div>
          
          {/* Social Media Links */}
          <div className="mt-6 pt-6 border-t border-brand-dark/10">
            <h4 className="font-heading text-lg font-semibold text-brand-dark mb-4 text-center">
              Follow Us
            </h4>
            <div className="space-y-3 font-body text-brand-dark/80">
              <p className="flex items-start justify-center gap-2">
                <svg className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <a href="https://instagram.com/Murad_Sweets_USA" target="_blank" rel="noopener noreferrer" className="hover:text-accent-coral transition-colors break-all">
                  @Murad_Sweets_USA
                </a>
              </p>
              <p className="flex items-start justify-center gap-2">
                <svg className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
                <a href="https://www.tiktok.com/@murad.sweets?_r=1&_t=ZT-93pK0U4VLsT" target="_blank" rel="noopener noreferrer" className="hover:text-accent-coral transition-colors break-all">
                  @Murad.Sweets
                </a>
              </p>
              <p className="flex items-start justify-center gap-2">
                <svg className="w-5 h-5 text-accent-coral flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <a href="https://www.facebook.com/share/1AdQxRCywW/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-accent-coral transition-colors break-all">
                  Murad Sweets
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
