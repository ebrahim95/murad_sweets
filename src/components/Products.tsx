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
    </section>
  )
}

export default Products
