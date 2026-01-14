/**
 * Order form component with customer details and product selection.
 * Implements Requirements 6.1, 6.2, 6.3, 6.4, 6.5, 6.6
 */
import { useState, useCallback, useMemo } from 'react'
import type { Product } from '../types/Product'
import type { Order, OrderItem, CustomerData } from '../types/Order'
import { orderFormValidators } from '../hooks/useFormValidation'
import { calculateTotal, formatPrice } from '../utils/calculations'

interface OrderFormProps {
  products: Product[]
  onSubmit?: (order: Order) => Promise<void>
}

type FormErrors = {
  name?: string
  email?: string
  phone?: string
  address?: string
  products?: string
}

type FormTouched = {
  name: boolean
  email: boolean
  phone: boolean
  address: boolean
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

// Track quantities for each product by ID
type ProductQuantities = Record<string, number>

export function OrderForm({ products, onSubmit }: OrderFormProps) {
  // Customer data state
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    email: '',
    phone: '',
    address: '',
  })

  // Product quantities state
  const [quantities, setQuantities] = useState<ProductQuantities>({})

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({})

  // Track which fields have been touched
  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    phone: false,
    address: false,
  })

  // Submission state
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [submissionError, setSubmissionError] = useState<string>('')


  // Calculate order items from quantities
  const orderItems = useMemo((): OrderItem[] => {
    return products
      .filter(product => (quantities[product.id] || 0) > 0)
      .map(product => ({
        productId: product.id,
        quantity: quantities[product.id] || 0,
        price: product.price,
      }))
  }, [products, quantities])

  // Calculate total using the utility function
  const total = useMemo(() => calculateTotal(orderItems), [orderItems])

  // Check if at least one product is selected
  const hasProductsSelected = orderItems.length > 0

  // Validate a single customer field
  const validateField = useCallback((field: keyof CustomerData, value: string): string | undefined => {
    const validator = orderFormValidators[field]
    return validator(value)
  }, [])

  // Validate all fields including product selection
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}
    
    const nameError = validateField('name', customerData.name)
    if (nameError) newErrors.name = nameError
    
    const emailError = validateField('email', customerData.email)
    if (emailError) newErrors.email = emailError
    
    const phoneError = validateField('phone', customerData.phone)
    if (phoneError) newErrors.phone = phoneError
    
    const addressError = validateField('address', customerData.address)
    if (addressError) newErrors.address = addressError
    
    // Validate at least one product is selected
    if (!hasProductsSelected) {
      newErrors.products = 'Please select at least one product'
    }
    
    return newErrors
  }, [customerData, validateField, hasProductsSelected])

  // Handle customer field change with real-time validation
  const handleCustomerChange = useCallback((field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }))
    
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }, [touched, validateField])

  // Handle field blur
  const handleBlur = useCallback((field: keyof CustomerData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, customerData[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [customerData, validateField])

  // Handle quantity change for a product
  const handleQuantityChange = useCallback((productId: string, value: number) => {
    const newQuantity = Math.max(0, Math.floor(value))
    setQuantities(prev => ({ ...prev, [productId]: newQuantity }))
    
    // Clear product error if we now have products selected
    if (errors.products) {
      setErrors(prev => ({ ...prev, products: undefined }))
    }
  }, [errors.products])

  // Increment quantity
  const incrementQuantity = useCallback((productId: string) => {
    setQuantities(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }))
    if (errors.products) {
      setErrors(prev => ({ ...prev, products: undefined }))
    }
  }, [errors.products])

  // Decrement quantity
  const decrementQuantity = useCallback((productId: string) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1),
    }))
  }, [])


  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, phone: true, address: true })
    
    // Validate all fields
    const formErrors = validateForm()
    setErrors(formErrors)
    
    // If there are errors, don't submit
    if (Object.keys(formErrors).length > 0) {
      return
    }
    
    // Start submission
    setSubmissionStatus('submitting')
    setSubmissionError('')
    
    try {
      const order: Order = {
        customer: customerData,
        items: orderItems,
        total,
        timestamp: new Date().toISOString(),
      }
      
      if (onSubmit) {
        await onSubmit(order)
      } else {
        // Simulate API call if no onSubmit provided
        await new Promise(resolve => setTimeout(resolve, 1500))
      }
      
      setSubmissionStatus('success')
      // Reset form on success
      setCustomerData({ name: '', email: '', phone: '', address: '' })
      setQuantities({})
      setTouched({ name: false, email: false, phone: false, address: false })
      setErrors({})
    } catch (error) {
      setSubmissionStatus('error')
      setSubmissionError(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again later.'
      )
    }
  }, [customerData, orderItems, total, validateForm, onSubmit])

  // Dismiss success message
  const handleDismissSuccess = useCallback(() => {
    setSubmissionStatus('idle')
  }, [])

  const isSubmitting = submissionStatus === 'submitting'

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, Product[]> = {}
    products.filter(p => p.available).forEach(product => {
      if (!grouped[product.category]) {
        grouped[product.category] = []
      }
      grouped[product.category].push(product)
    })
    return grouped
  }, [products])

  return (
    <section
      id="order"
      className="py-16 md:py-24 bg-gradient-to-b from-pastel-cream/30 to-white"
      aria-label="Order section"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Place Your Order
          </h2>
          <p className="font-body text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Select your favorite sweets and we'll have them ready for you!
          </p>
        </div>


        {/* Success Message */}
        {submissionStatus === 'success' && (
          <div 
            className="max-w-4xl mx-auto mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-4"
            role="alert"
            aria-live="polite"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-heading text-xl font-semibold text-green-800">Order Placed Successfully!</p>
              <p className="font-body text-green-700 mt-1">
                Thank you for your order! We'll contact you shortly to confirm the details.
              </p>
            </div>
            <button
              onClick={handleDismissSuccess}
              className="text-green-600 hover:text-green-800 transition-colors p-2"
              aria-label="Dismiss success message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}

        {/* Error Message */}
        {submissionStatus === 'error' && (
          <div 
            className="max-w-4xl mx-auto mb-8 p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-4"
            role="alert"
            aria-live="polite"
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-heading text-xl font-semibold text-red-800">Order Failed</p>
              <p className="font-body text-red-700 mt-1">{submissionError}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Product Selection - Takes 2 columns on large screens */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-pastel-pink rounded-full flex items-center justify-center text-accent-coral font-bold text-sm">1</span>
                  Select Your Sweets
                </h3>
                
                {errors.products && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl" role="alert">
                    <p className="text-red-600 font-body flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.products}
                    </p>
                  </div>
                )}


                {/* Products by Category */}
                {Object.entries(productsByCategory).map(([category, categoryProducts]) => (
                  <div key={category} className="mb-8 last:mb-0">
                    <h4 className="font-heading text-lg font-semibold text-brand-dark mb-4 pb-2 border-b border-gray-100">
                      {category}
                    </h4>
                    <div className="space-y-3">
                      {categoryProducts.map(product => (
                        <div 
                          key={product.id}
                          className="flex items-center gap-4 p-4 rounded-xl bg-pastel-cream/30 hover:bg-pastel-cream/50 transition-colors"
                        >
                          {/* Product Image */}
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = '/images/placeholder.jpg'
                              }}
                            />
                          </div>
                          
                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h5 className="font-heading font-semibold text-brand-dark truncate">
                              {product.name}
                            </h5>
                            <p className="font-body text-sm text-brand-dark/60 truncate">
                              {product.description}
                            </p>
                            <p className="font-heading font-bold text-accent-coral mt-1">
                              ${formatPrice(product.price)}
                            </p>
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => decrementQuantity(product.id)}
                              disabled={isSubmitting || (quantities[product.id] || 0) === 0}
                              className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 
                                flex items-center justify-center text-brand-dark
                                hover:border-accent-coral hover:text-accent-coral
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-colors"
                              aria-label={`Decrease quantity of ${product.name}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <input
                              type="number"
                              min="0"
                              value={quantities[product.id] || 0}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                              disabled={isSubmitting}
                              className="w-16 h-10 text-center rounded-lg border-2 border-gray-200 
                                font-heading font-semibold text-brand-dark
                                focus:outline-none focus:border-accent-coral
                                disabled:bg-gray-100 disabled:cursor-not-allowed"
                              aria-label={`Quantity of ${product.name}`}
                            />
                            
                            <button
                              type="button"
                              onClick={() => incrementQuantity(product.id)}
                              disabled={isSubmitting}
                              className="w-10 h-10 rounded-lg bg-accent-coral text-white
                                flex items-center justify-center
                                hover:bg-accent-coral/90
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-colors"
                              aria-label={`Increase quantity of ${product.name}`}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Customer Details & Order Summary - Takes 1 column */}
            <div className="space-y-6">
              {/* Customer Details */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-pastel-peach rounded-full flex items-center justify-center text-accent-gold font-bold text-sm">2</span>
                  Your Details
                </h3>

                {/* Name Field */}
                <div className="mb-5">
                  <label 
                    htmlFor="order-name" 
                    className="block font-heading font-semibold text-brand-dark mb-2"
                  >
                    Name <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="order-name"
                    name="name"
                    value={customerData.name}
                    onChange={(e) => handleCustomerChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-body text-brand-dark 
                      placeholder:text-brand-dark/40 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-accent-coral/20
                      disabled:bg-gray-100 disabled:cursor-not-allowed
                      ${errors.name && touched.name
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-gray-200 focus:border-accent-coral'
                      }`}
                    placeholder="Your full name"
                    aria-required="true"
                    aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                    aria-describedby={errors.name && touched.name ? 'order-name-error' : undefined}
                  />
                  {errors.name && touched.name && (
                    <p id="order-name-error" className="mt-2 text-sm text-red-600 font-body" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-5">
                  <label 
                    htmlFor="order-email" 
                    className="block font-heading font-semibold text-brand-dark mb-2"
                  >
                    Email <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="email"
                    id="order-email"
                    name="email"
                    value={customerData.email}
                    onChange={(e) => handleCustomerChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-body text-brand-dark 
                      placeholder:text-brand-dark/40 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-accent-coral/20
                      disabled:bg-gray-100 disabled:cursor-not-allowed
                      ${errors.email && touched.email
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-gray-200 focus:border-accent-coral'
                      }`}
                    placeholder="your.email@example.com"
                    aria-required="true"
                    aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                    aria-describedby={errors.email && touched.email ? 'order-email-error' : undefined}
                  />
                  {errors.email && touched.email && (
                    <p id="order-email-error" className="mt-2 text-sm text-red-600 font-body" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="mb-5">
                  <label 
                    htmlFor="order-phone" 
                    className="block font-heading font-semibold text-brand-dark mb-2"
                  >
                    Phone <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="tel"
                    id="order-phone"
                    name="phone"
                    value={customerData.phone}
                    onChange={(e) => handleCustomerChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-body text-brand-dark 
                      placeholder:text-brand-dark/40 transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-accent-coral/20
                      disabled:bg-gray-100 disabled:cursor-not-allowed
                      ${errors.phone && touched.phone
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-gray-200 focus:border-accent-coral'
                      }`}
                    placeholder="(123) 456-7890"
                    aria-required="true"
                    aria-invalid={errors.phone && touched.phone ? 'true' : 'false'}
                    aria-describedby={errors.phone && touched.phone ? 'order-phone-error' : undefined}
                  />
                  {errors.phone && touched.phone && (
                    <p id="order-phone-error" className="mt-2 text-sm text-red-600 font-body" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Address Field */}
                <div>
                  <label 
                    htmlFor="order-address" 
                    className="block font-heading font-semibold text-brand-dark mb-2"
                  >
                    Delivery Address <span className="text-accent-coral">*</span>
                  </label>
                  <textarea
                    id="order-address"
                    name="address"
                    value={customerData.address}
                    onChange={(e) => handleCustomerChange('address', e.target.value)}
                    onBlur={() => handleBlur('address')}
                    disabled={isSubmitting}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-body text-brand-dark 
                      placeholder:text-brand-dark/40 transition-all duration-200 resize-none
                      focus:outline-none focus:ring-2 focus:ring-accent-coral/20
                      disabled:bg-gray-100 disabled:cursor-not-allowed
                      ${errors.address && touched.address
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-gray-200 focus:border-accent-coral'
                      }`}
                    placeholder="Enter your full delivery address"
                    aria-required="true"
                    aria-invalid={errors.address && touched.address ? 'true' : 'false'}
                    aria-describedby={errors.address && touched.address ? 'order-address-error' : undefined}
                  />
                  {errors.address && touched.address && (
                    <p id="order-address-error" className="mt-2 text-sm text-red-600 font-body" role="alert">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>


              {/* Order Summary */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 bg-pastel-lavender rounded-full flex items-center justify-center text-accent-teal font-bold text-sm">3</span>
                  Order Summary
                </h3>

                {orderItems.length === 0 ? (
                  <p className="font-body text-brand-dark/60 text-center py-4">
                    No items selected yet
                  </p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {orderItems.map(item => {
                        const product = products.find(p => p.id === item.productId)
                        if (!product) return null
                        return (
                          <div key={item.productId} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                            <div className="flex-1 min-w-0">
                              <p className="font-heading font-medium text-brand-dark truncate">
                                {product.name}
                              </p>
                              <p className="font-body text-sm text-brand-dark/60">
                                ${formatPrice(item.price)} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-heading font-semibold text-brand-dark ml-4">
                              ${formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        )
                      })}
                    </div>

                    <div className="pt-4 border-t-2 border-gray-200">
                      <div className="flex justify-between items-center">
                        <p className="font-heading text-xl font-bold text-brand-dark">Total</p>
                        <p className="font-heading text-2xl font-bold text-accent-coral">
                          ${formatPrice(total)}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-accent-coral text-black font-heading font-semibold text-lg
                  rounded-xl shadow-lg hover:bg-accent-coral/90 hover:shadow-xl
                  focus:outline-none focus:ring-2 focus:ring-accent-coral focus:ring-offset-2
                  disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none
                  transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg 
                      className="animate-spin h-5 w-5 text-black" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default OrderForm
