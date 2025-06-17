import React from 'react';
import { Truck, Clock } from 'lucide-react';
import { ShippingOption } from '../types';
import { formatCurrency, getEstimatedDeliveryDate } from '../utils/calculations';

interface ShippingOptionsProps {
  options: ShippingOption[];
  selectedId: string;
  subtotal: number;
  onSelect: (id: string) => void;
}

export const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  options,
  selectedId,
  subtotal,
  onSelect
}) => {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
        <Truck className="w-4 h-4" />
        Shipping Options
      </h3>
      
      <div className="space-y-2">
        {options.map((option) => {
          const isFree = option.freeThreshold && subtotal >= option.freeThreshold;
          const isSelected = option.id === selectedId;
          
          return (
            <label
              key={option.id}
              className={`block p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="shipping"
                value={option.id}
                checked={isSelected}
                onChange={() => onSelect(option.id)}
                className="sr-only"
              />
              
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{option.name}</span>
                    {isFree && (
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        FREE
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>Arrives by {getEstimatedDeliveryDate(option.estimatedDays)}</span>
                  </div>
                  
                  {option.freeThreshold && !isFree && (
                    <p className="text-xs text-gray-500 mt-1">
                      Free shipping on orders over {formatCurrency(option.freeThreshold)}
                    </p>
                  )}
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${isFree ? 'text-green-600' : 'text-gray-900'}`}>
                    {isFree ? 'FREE' : formatCurrency(option.price)}
                  </p>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};