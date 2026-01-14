/**
 * Calculation utility functions for orders
 * Requirements: 6.5
 */

import type { OrderItem } from '../types/Order';

/**
 * Calculates the total price for an order
 * The total equals the sum of (price × quantity) for all items
 * @param items - Array of order items with price and quantity
 * @returns The total price as a number
 */
export function calculateTotal(items: OrderItem[]): number {
  if (!items || !Array.isArray(items) || items.length === 0) {
    return 0;
  }
  
  return items.reduce((sum, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 0;
    return sum + (price * quantity);
  }, 0);
}

/**
 * Formats a price value for display
 * @param price - The price to format
 * @returns Formatted price string with currency symbol
 */
export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}
