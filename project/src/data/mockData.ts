import { CartItem, TaxRate, ShippingOption, PromoCode } from '../types';

export const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    quantity: 1,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    price: 39.99,
    quantity: 2,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Clothing'
  },
  {
    id: '3',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    quantity: 1,
    image: 'https://images.pexels.com/photos/3766111/pexels-photo-3766111.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Accessories'
  },
  {
    id: '4',
    name: 'Bluetooth Wireless Speaker',
    price: 149.99,
    quantity: 1,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Electronics'
  }
];

export const mockTaxRates: TaxRate[] = [
  {
    name: 'State Tax',
    rate: 8.25,
    type: 'percentage'
  },
  {
    name: 'Federal Tax',
    rate: 2.5,
    type: 'percentage'
  }
];

export const mockShippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 9.99,
    estimatedDays: 5,
    freeThreshold: 75
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 19.99,
    estimatedDays: 2
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    price: 29.99,
    estimatedDays: 1
  }
];

export const mockPromoCodes: PromoCode[] = [
  {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    description: '10% off your entire order',
    minCartTotal: 50
  },
  {
    code: 'WELCOME20',
    type: 'fixed',
    value: 20,
    description: '$20 off your first order',
    minCartTotal: 100
  },
  {
    code: 'FREESHIP',
    type: 'percentage',
    value: 5,
    description: '5% off with free shipping',
    maxDiscount: 15
  }
];