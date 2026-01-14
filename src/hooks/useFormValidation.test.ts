import { describe, it, expect } from 'vitest'
import {
  requiredValidator,
  emailValidator,
  phoneValidator,
  minLengthValidator,
  maxLengthValidator,
  minValueValidator,
  combineValidators,
  contactFormValidators,
  orderFormValidators,
} from './useFormValidation'

describe('Form Validation Utilities', () => {
  describe('requiredValidator', () => {
    const validator = requiredValidator()

    it('returns undefined for non-empty string', () => {
      expect(validator('hello')).toBeUndefined()
    })

    it('returns error for empty string', () => {
      expect(validator('')).toBe('This field is required')
    })

    it('returns error for whitespace-only string', () => {
      expect(validator('   ')).toBe('This field is required')
    })

    it('uses custom error message', () => {
      const customValidator = requiredValidator('Custom message')
      expect(customValidator('')).toBe('Custom message')
    })
  })

  describe('emailValidator', () => {
    const validator = emailValidator()

    it('returns undefined for valid email', () => {
      expect(validator('test@example.com')).toBeUndefined()
    })

    it('returns undefined for empty string (not required)', () => {
      expect(validator('')).toBeUndefined()
    })

    it('returns error for invalid email', () => {
      expect(validator('invalid')).toBe('Please enter a valid email address')
    })

    it('returns error for email without domain', () => {
      expect(validator('test@')).toBe('Please enter a valid email address')
    })

    it('uses custom error message', () => {
      const customValidator = emailValidator('Bad email')
      expect(customValidator('invalid')).toBe('Bad email')
    })
  })

  describe('phoneValidator', () => {
    const validator = phoneValidator()

    it('returns undefined for valid phone number', () => {
      expect(validator('1234567890')).toBeUndefined()
    })

    it('returns undefined for phone with formatting', () => {
      expect(validator('(123) 456-7890')).toBeUndefined()
    })

    it('returns undefined for empty string (not required)', () => {
      expect(validator('')).toBeUndefined()
    })

    it('returns error for invalid phone', () => {
      expect(validator('123')).toBe('Please enter a valid phone number')
    })

    it('uses custom error message', () => {
      const customValidator = phoneValidator('Bad phone')
      expect(customValidator('123')).toBe('Bad phone')
    })
  })

  describe('minLengthValidator', () => {
    const validator = minLengthValidator(5)

    it('returns undefined for string meeting minimum', () => {
      expect(validator('hello')).toBeUndefined()
    })

    it('returns undefined for string exceeding minimum', () => {
      expect(validator('hello world')).toBeUndefined()
    })

    it('returns error for string below minimum', () => {
      expect(validator('hi')).toBe('Must be at least 5 characters')
    })

    it('returns undefined for empty string (not required)', () => {
      expect(validator('')).toBeUndefined()
    })

    it('uses custom error message', () => {
      const customValidator = minLengthValidator(5, 'Too short')
      expect(customValidator('hi')).toBe('Too short')
    })
  })

  describe('maxLengthValidator', () => {
    const validator = maxLengthValidator(10)

    it('returns undefined for string within limit', () => {
      expect(validator('hello')).toBeUndefined()
    })

    it('returns undefined for string at limit', () => {
      expect(validator('helloworld')).toBeUndefined()
    })

    it('returns error for string exceeding limit', () => {
      expect(validator('hello world!')).toBe('Must be no more than 10 characters')
    })

    it('uses custom error message', () => {
      const customValidator = maxLengthValidator(5, 'Too long')
      expect(customValidator('hello world')).toBe('Too long')
    })
  })

  describe('minValueValidator', () => {
    const validator = minValueValidator(0)

    it('returns undefined for value at minimum', () => {
      expect(validator(0)).toBeUndefined()
    })

    it('returns undefined for value above minimum', () => {
      expect(validator(5)).toBeUndefined()
    })

    it('returns error for value below minimum', () => {
      expect(validator(-1)).toBe('Must be at least 0')
    })

    it('uses custom error message', () => {
      const customValidator = minValueValidator(1, 'Must be positive')
      expect(customValidator(0)).toBe('Must be positive')
    })
  })

  describe('combineValidators', () => {
    it('returns undefined when all validators pass', () => {
      const combined = combineValidators(
        requiredValidator(),
        minLengthValidator(3)
      )
      expect(combined('hello')).toBeUndefined()
    })

    it('returns first error when first validator fails', () => {
      const combined = combineValidators(
        requiredValidator('Required'),
        minLengthValidator(3, 'Too short')
      )
      expect(combined('')).toBe('Required')
    })

    it('returns second error when first passes but second fails', () => {
      const combined = combineValidators(
        requiredValidator('Required'),
        minLengthValidator(10, 'Too short')
      )
      expect(combined('hi')).toBe('Too short')
    })
  })

  describe('contactFormValidators', () => {
    it('validates name correctly', () => {
      expect(contactFormValidators.name('John')).toBeUndefined()
      expect(contactFormValidators.name('')).toBe('Name is required')
      expect(contactFormValidators.name('J')).toBe('Name must be at least 2 characters')
    })

    it('validates email correctly', () => {
      expect(contactFormValidators.email('test@example.com')).toBeUndefined()
      expect(contactFormValidators.email('')).toBe('Email is required')
      expect(contactFormValidators.email('invalid')).toBe('Please enter a valid email address')
    })

    it('validates message correctly', () => {
      expect(contactFormValidators.message('This is a valid message')).toBeUndefined()
      expect(contactFormValidators.message('')).toBe('Message is required')
      expect(contactFormValidators.message('Short')).toBe('Message must be at least 10 characters')
    })
  })

  describe('orderFormValidators', () => {
    it('validates name correctly', () => {
      expect(orderFormValidators.name('John')).toBeUndefined()
      expect(orderFormValidators.name('')).toBe('Name is required')
    })

    it('validates email correctly', () => {
      expect(orderFormValidators.email('test@example.com')).toBeUndefined()
      expect(orderFormValidators.email('')).toBe('Email is required')
    })

    it('validates phone correctly', () => {
      expect(orderFormValidators.phone('1234567890')).toBeUndefined()
      expect(orderFormValidators.phone('')).toBe('Phone number is required')
      expect(orderFormValidators.phone('123')).toBe('Please enter a valid phone number')
    })

    it('validates address correctly', () => {
      expect(orderFormValidators.address('123 Main St, City, State 12345')).toBeUndefined()
      expect(orderFormValidators.address('')).toBe('Address is required')
      expect(orderFormValidators.address('Short')).toBe('Please enter a complete address')
    })
  })
})
