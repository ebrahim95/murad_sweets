/**
 * Contact form component with name, email, and message fields.
 * Implements Requirements 5.1, 5.2, 5.3, 5.4, 5.5
 */
import { useState, useCallback } from 'react'
import type { ContactFormData } from '../types/Form'
import { contactFormValidators } from '../hooks/useFormValidation'

interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => Promise<void>
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

type FormTouched = {
  name: boolean
  email: boolean
  message: boolean
}

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm({ onSubmit }: ContactFormProps) {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({})

  // Track which fields have been touched for real-time validation
  const [touched, setTouched] = useState<FormTouched>({
    name: false,
    email: false,
    message: false,
  })

  // Submission state
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [submissionError, setSubmissionError] = useState<string>('')

  // Validate a single field
  const validateField = useCallback((field: keyof ContactFormData, value: string): string | undefined => {
    const validator = contactFormValidators[field]
    return validator(value)
  }, [])

  // Validate all fields
  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}
    
    const nameError = validateField('name', formData.name)
    if (nameError) newErrors.name = nameError
    
    const emailError = validateField('email', formData.email)
    if (emailError) newErrors.email = emailError
    
    const messageError = validateField('message', formData.message)
    if (messageError) newErrors.message = messageError
    
    return newErrors
  }, [formData, validateField])

  // Handle input change with real-time validation for touched fields
  const handleChange = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Only validate if field has been touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }, [touched, validateField])

  // Handle field blur - mark as touched and validate
  const handleBlur = useCallback((field: keyof ContactFormData) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [formData, validateField])


  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true })
    
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
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        // Simulate API call if no onSubmit provided
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      
      setSubmissionStatus('success')
      // Reset form on success
      setFormData({ name: '', email: '', message: '' })
      setTouched({ name: false, email: false, message: false })
      setErrors({})
    } catch (error) {
      setSubmissionStatus('error')
      setSubmissionError(
        error instanceof Error 
          ? error.message 
          : 'Something went wrong. Please try again later.'
      )
    }
  }, [formData, validateForm, onSubmit])

  // Reset success message after some time
  const handleDismissSuccess = useCallback(() => {
    setSubmissionStatus('idle')
  }, [])

  const isSubmitting = submissionStatus === 'submitting'

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-gradient-to-b from-white to-pastel-cream/30"
      aria-labelledby="contact-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 id="contact-heading" className="font-heading text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Get in Touch
          </h2>
          <p className="font-body text-lg text-brand-dark/70 max-w-2xl mx-auto">
            Have a question or want to place a special order? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-semibold text-brand-dark mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {/* Email - 44px minimum touch target */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 min-w-[44px] min-h-[44px] bg-pastel-pink rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brand-dark">Email</p>
                      <a href="mailto:hello@muradssweets.com" className="font-body text-brand-dark/70 hover:text-accent-coral transition-colors min-h-[44px] inline-flex items-center">
                        hello@muradssweets.com
                      </a>
                    </div>
                  </div>


                  {/* Phone - 44px minimum touch target */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 min-w-[44px] min-h-[44px] bg-pastel-peach rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brand-dark">Phone</p>
                      <a href="tel:+1234567890" className="font-body text-brand-dark/70 hover:text-accent-coral transition-colors min-h-[44px] inline-flex items-center">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  {/* Location - 44px minimum touch target */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 min-w-[44px] min-h-[44px] bg-pastel-lavender rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-brand-dark">Location</p>
                      <p className="font-body text-brand-dark/70">
                        123 Sweet Street<br />
                        Bakery Town, BT 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h4 className="font-heading text-lg font-semibold text-brand-dark mb-3">
                  Business Hours
                </h4>
                <div className="font-body text-brand-dark/70 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              {/* Success Message */}
              {submissionStatus === 'success' && (
                <div 
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3"
                  role="alert"
                  aria-live="polite"
                >
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-heading font-semibold text-green-800">Message sent successfully!</p>
                    <p className="font-body text-green-700 text-sm">We'll get back to you as soon as possible.</p>
                  </div>
                  <button
                    onClick={handleDismissSuccess}
                    className="text-green-600 hover:text-green-800 transition-colors"
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
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3"
                  role="alert"
                  aria-live="polite"
                >
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-heading font-semibold text-red-800">Failed to send message</p>
                    <p className="font-body text-red-700 text-sm">{submissionError}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Name Field */}
                <div className="mb-5">
                  <label 
                    htmlFor="contact-name" 
                    className="block font-heading font-semibold text-brand-dark mb-2"
                  >
                    Name <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
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
                    placeholder="Your name"
                    aria-required="true"
                    aria-invalid={errors.name && touched.name ? 'true' : 'false'}
                    aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-600 font-body" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="mb-5">
                  <label 
                    htmlFor="contact-email" 
                    className="block font-heading font-semibold text-brand-dark mb-2"
                  >
                    Email <span className="text-accent-coral">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
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
                    aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600 font-body" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>


                {/* Message Field */}
                <div className="mb-6">
                  <label 
                    htmlFor="contact-message" 
                    className="block font-heading font-semibold text-brand-dark mb-2"
                  >
                    Message <span className="text-accent-coral">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    disabled={isSubmitting}
                    rows={5}
                    className={`w-full px-4 py-3 rounded-xl border-2 font-body text-brand-dark 
                      placeholder:text-brand-dark/40 transition-all duration-200 resize-none
                      focus:outline-none focus:ring-2 focus:ring-accent-coral/20
                      disabled:bg-gray-100 disabled:cursor-not-allowed
                      ${errors.message && touched.message
                        ? 'border-red-400 focus:border-red-400'
                        : 'border-gray-200 focus:border-accent-coral'
                      }`}
                    placeholder="How can we help you? (minimum 10 characters)"
                    aria-required="true"
                    aria-invalid={errors.message && touched.message ? 'true' : 'false'}
                    aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
                  />
                  {errors.message && touched.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-600 font-body" role="alert">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button - 44px minimum touch target height */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 min-h-[44px] bg-accent-coral text-white font-heading font-semibold 
                    rounded-xl shadow-md hover:bg-accent-coral/90 hover:shadow-lg
                    focus:outline-none focus:ring-2 focus:ring-accent-coral focus:ring-offset-2
                    disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none
                    transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg 
                        className="animate-spin h-5 w-5 text-white" 
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm
