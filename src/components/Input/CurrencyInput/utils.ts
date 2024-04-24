export function removeCurrencySymbolAndParse(value: string): number {
  // Remove non-digit characters
  const cleanedValue = value.replace(/[^\d,.-]/g, "");

  // Replace dot separator with empty string
  const numberValue = cleanedValue.replace(/\./g, "");

  // Replace comma separator with dot
  const dotValue = numberValue.replace(/,/g, ".");

  // Parse the string to a number
  return parseFloat(dotValue) || 0;
}
