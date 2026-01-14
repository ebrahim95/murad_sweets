/**
 * Validation utility functions for forms
 * Requirements: 5.5, 6.6
 */

/**
 * Validates email format
 * Accepts properly formatted email addresses and rejects improperly formatted ones
 * @param email - The email string to validate
 * @returns true if the email format is valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates phone number format
 * Accepts phone numbers with digits, spaces, dashes, plus signs, and parentheses
 * Requires at least 10 digits
 * @param phone - The phone string to validate
 * @returns true if the phone format is valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') {
    return false;
  }
  const phoneRegex = /^[\d\s\-+()]+$/;
  const digitsOnly = phone.replace(/\D/g, '');
  return phoneRegex.test(phone) && digitsOnly.length >= 10;
}

/**
 * Validates that a required field is not empty
 * @param value - The value to check
 * @returns true if the field has a non-empty value, false otherwise
 */
export function isRequiredFieldValid(value: string | undefined | null): boolean {
  if (value === undefined || value === null) {
    return false;
  }
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates minimum length for a string field
 * @param value - The string to check
 * @param minLength - The minimum required length
 * @returns true if the string meets the minimum length, false otherwise
 */
export function hasMinLength(value: string, minLength: number): boolean {
  if (!value || typeof value !== 'string') {
    return false;
  }
  return value.trim().length >= minLength;
}
