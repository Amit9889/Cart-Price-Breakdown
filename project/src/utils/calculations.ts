import { CartItem, TaxRate, ShippingOption, PromoCode } from '../types';

export const calculateSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const calculateTaxAmount = (subtotal: number, taxRates: TaxRate[]): number => {
  return taxRates.reduce((totalTax, tax) => {
    if (tax.type === 'percentage') {
      return totalTax + (subtotal * tax.rate / 100);
    } else {
      return totalTax + tax.rate;
    }
  }, 0);
};

export const calculateShippingAmount = (
  subtotal: number, 
  shippingOption: ShippingOption
): number => {
  if (shippingOption.freeThreshold && subtotal >= shippingOption.freeThreshold) {
    return 0;
  }
  return shippingOption.price;
};

export const calculateDiscountAmount = (
  subtotal: number, 
  promoCode?: PromoCode
): number => {
  if (!promoCode) return 0;
  
  if (promoCode.minCartTotal && subtotal < promoCode.minCartTotal) {
    return 0;
  }

  let discount = 0;
  if (promoCode.type === 'percentage') {
    discount = subtotal * (promoCode.value / 100);
  } else {
    discount = promoCode.value;
  }

  if (promoCode.maxDiscount) {
    discount = Math.min(discount, promoCode.maxDiscount);
  }

  return Math.min(discount, subtotal);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getEstimatedDeliveryDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};