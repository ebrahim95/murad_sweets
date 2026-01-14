import { describe, it, expect } from 'vitest'
import * as fc from 'fast-check'

describe('fast-check setup verification', () => {
  it('property-based testing is configured correctly', () => {
    fc.assert(
      fc.property(fc.integer(), fc.integer(), (a, b) => {
        return a + b === b + a // commutative property
      }),
      { numRuns: 100 }
    )
    expect(true).toBe(true)
  })
})
