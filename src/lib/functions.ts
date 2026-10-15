export const formatPrice = (amount: number, currency = "EUR") => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0, // <-- This removes the cents/decimals completely
  }).format(amount);
};
export const formatMileage = (num: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    useGrouping: true,
    maximumFractionDigits: 0,
  }).format(num);
};
