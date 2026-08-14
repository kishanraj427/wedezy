const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** `"₹2,800"` → `2800`. Catalogue prices are display strings. */
export function parsePrice(price: string): number {
  const digits = price.replace(/[^\d]/g, '')
  return digits ? Number.parseInt(digits, 10) : 0
}

export function formatINR(amount: number): string {
  return INR.format(amount)
}
