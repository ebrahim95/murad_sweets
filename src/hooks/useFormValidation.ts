/**
 * Form validation utilities for use with TanStack Forms.
 * These validators can be used with TanStack Form's built-in validation system.
 */

import { isValidEmail, isValidPhone, isRequiredFieldValid } from '../utils/validation'

/**
 * Validator function type compatible with TanStack Forms
 */
export type ValidatorFn<T> = (value: T) => string | undefined

/**
 * Creates a required field validator
 * @param message - Custom error message (default: 'This field is required')
 */
export function requiredValidator(message = 'This field is required'): ValidatorFn<string> {
  return (value: string) => {
    if (!isRequiredFieldValid(value)) {
      return message
    }
    return undefined
  }
}

/**
 * Creates an email format validator
 * @param message - Custom error message (default: 'Please enter a valid email address')
 */
export function emailValidator(message = 'Please enter a valid email address'): ValidatorFn<string> {
  return (value: string) => {
    if (value && !isValidEmail(value)) {
      return message
    }
    return undefined
  }
}

/**
 * Creates a phone number format validator
 * @param message - Custom error message (default: 'Please enter a valid phone number')
 */
export function phoneValidator(message = 'Please enter a valid phone number'): ValidatorFn<string> {
  return (value: string) => {
    if (value && !isValidPhone(value)) {
      return message
    }
    return undefined
  }
}

/**
 * Creates a minimum length validator
 * @param minLength - Minimum required length
 * @param message - Custom error message
 */
export function minLengthValidator(
  minLength: number,
  message?: string
): ValidatorFn<string> {
  return (value: string) => {
    if (value && value.trim().length < minLength) {
      return message || `Must be at least ${minLength} characters`
    }
    return undefined
  }
}

/**
 * Creates a maximum length validator
 * @param maxLength - Maximum allowed length
 * @param message - Custom error message
 */
export function maxLengthValidator(
  maxLength: number,
  message?: string
): ValidatorFn<string> {
  return (value: string) => {
    if (value && value.length > maxLength) {
      return message || `Must be no more than ${maxLength} characters`
    }
    return undefined
  }
}

/**
 * Creates a minimum value validator for numbers
 * @param min - Minimum value
 * @param message - Custom error message
 */
export function minValueValidator(
  min: number,
  message?: string
): ValidatorFn<number> {
  return (value: number) => {
    if (value < min) {
      return message || `Must be at least ${min}`
    }
    return undefined
  }
}

/**
 * Combines multiple validators into one
 * Returns the first error found, or undefined if all pass
 */
export function combineValidators<T>(
  ...validators: ValidatorFn<T>[]
): ValidatorFn<T> {
  return (value: T) => {
    for (const validator of validators) {
      const error = validator(value)
      if (error) {
        return error
      }
    }
    return undefined
  }
}

/**
 * Common field validators for contact form
 */
export const contactFormValidators = {
  name: combineValidators(
    requiredValidator('Name is required'),
    minLengthValidator(2, 'Name must be at least 2 characters')
  ),
  email: combineValidators(
    requiredValidator('Email is required'),
    emailValidator()
  ),
  message: combineValidators(
    requiredValidator('Message is required'),
    minLengthValidator(10, 'Message must be at least 10 characters')
  ),
}

/**
 * Common field validators for order form
 */
export const orderFormValidators = {
  name: combineValidators(
    requiredValidator('Name is required'),
    minLengthValidator(2, 'Name must be at least 2 characters')
  ),
  email: combineValidators(
    requiredValidator('Email is required'),
    emailValidator()
  ),
  phone: combineValidators(
    requiredValidator('Phone number is required'),
    phoneValidator()
  ),
  address: combineValidators(
    requiredValidator('Address is required'),
    minLengthValidator(10, 'Please enter a complete address')
  ),
}
