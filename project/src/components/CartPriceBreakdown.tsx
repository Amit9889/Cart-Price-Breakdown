import React from 'react';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItem } from './CartItem';
import { PromoCodeInput } from './PromoCodeInput';
import { ShippingOptions } from './ShippingOptions';
import { PriceBreakdown } from './PriceBreakdown';

export const CartPriceBreakdown: React.FC = () => {
  const {
    items,
    selectedShipping,
    appliedPromoCode,
    taxRates,
    shippingOptions,
    updateQuantity,
    removeItem,
    setShipping,
    applyPromoCode,
    removePromoCode,
    calculations
  } = useCart();

  const selectedShippingOption = shippingOptions.find(
    option => option.id === selectedShipping
  )!;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
          <p className="text-gray-500">Add some items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          Shopping Cart
        </h1>
        <p className="text-gray-600 mt-2">
          Review your items and complete your purchase
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Items ({items.length})
            </h2>
            
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Promo Code */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Promo Code</h3>
            <PromoCodeInput
              onApply={applyPromoCode}
              onRemove={removePromoCode}
              appliedCode={appliedPromoCode ? {
                code: appliedPromoCode.code,
                description: appliedPromoCode.description
              } : undefined}
            />
          </div>

          {/* Shipping Options */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <ShippingOptions
              options={shippingOptions}
              selectedId={selectedShipping}
              subtotal={calculations.subtotal}
              onSelect={setShipping}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <PriceBreakdown
              calculations={calculations}
              taxRates={taxRates}
              appliedPromoCode={appliedPromoCode}
              shippingName={selectedShippingOption.name}
              itemCount={items.reduce((sum, item) => sum + item.quantity, 0)}
            />
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium">Secure Checkout</p>
                  <p>Your payment information is encrypted and secure.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};