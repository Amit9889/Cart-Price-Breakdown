export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface TaxRate {
  name: string;
  rate: number;
  type: 'percentage' | 'fixed';
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
  freeThreshold?: number;
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
  minCartTotal?: number;
  maxDiscount?: number;
}

export interface CartState {
  items: CartItem[];
  selectedShipping: string;
  appliedPromoCode?: PromoCode;
  taxRates: TaxRate[];
  shippingOptions: ShippingOption[];
  availablePromoCodes: PromoCode[];
}

export interface CartCalculations {
  subtotal: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  total: number;
}