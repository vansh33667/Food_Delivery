/**
 * Formats a price in Indian Rupees (INR) with proper number formatting
 * @param price - The price as a number
 * @returns Formatted price string with ₹ symbol
 */
export function formatPrice(price: number): string {
  // Use Indian number formatting (e.g., 1,00,000 for 100000)
  return `₹${price.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })}`
}

/**
 * Formats a price with decimals for detailed views
 * @param price - The price as a number
 * @returns Formatted price string with ₹ symbol and 2 decimal places
 */
export function formatPriceWithDecimals(price: number): string {
  return `₹${price.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })}`
}

/**
 * Converts USD price to INR (approximate conversion rate)
 * Note: In production, use real-time exchange rates
 * @param usdPrice - Price in USD
 * @returns Price converted to INR
 */
export function convertUsdToInr(usdPrice: number): number {
  const exchangeRate = 83 // Approximate USD to INR rate
  return Math.round(usdPrice * exchangeRate)
}
