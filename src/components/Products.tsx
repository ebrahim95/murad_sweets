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
            Discover our handcrafted collection of traditional sweets, each made with premium ingredients and generations of expertise.
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
            <p className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:346-368-4831" className="hover:text-accent-coral transition-colors">
                346-368-4831
              </a>
            </p>
            <p className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:muradsweets1999@gmail.com" className="hover:text-accent-coral transition-colors">
                muradsweets1999@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
