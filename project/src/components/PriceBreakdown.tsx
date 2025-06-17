import React from 'react';
import { Receipt, Tag, Truck, Calculator } from 'lucide-react';
import { CartCalculations, TaxRate, PromoCode } from '../types';
import { formatCurrency } from '../utils/calculations';

interface PriceBreakdownProps {
  calculations: CartCalculations;
  taxRates: TaxRate[];
  appliedPromoCode?: PromoCode;
  shippingName: string;
  itemCount: number;
}

export const PriceBreakdown: React.FC<PriceBreakdownProps> = ({
  calculations,
  taxRates,
  appliedPromoCode,
  shippingName,
  itemCount
}) => {
  const { subtotal, taxAmount, shippingAmount, discountAmount, total } = calculations;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        <Receipt className="w-4 h-4" />
        Order Summary
      </h3>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {taxRates.map((tax, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">
              {tax.name} ({tax.rate}%)
            </span>
            <span>{formatCurrency(subtotal * tax.rate / 100)}</span>
          </div>
        ))}

        <div className="flex justify-between">
          <span className="text-gray-600 flex items-center gap-1">
            <Truck className="w-3 h-3" />
            {shippingName}
          </span>
          <span className={shippingAmount === 0 ? 'text-green-600 font-medium' : ''}>
            {shippingAmount === 0 ? 'FREE' : formatCurrency(shippingAmount)}
          </span>
        </div>

        {appliedPromoCode && discountAmount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center gap-1">
              <Tag className="w-3 h-3" />
              {appliedPromoCode.code}
            </span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Total
          </span>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2">
        Proceed to Checkout
      </button>
    </div>
  );
};