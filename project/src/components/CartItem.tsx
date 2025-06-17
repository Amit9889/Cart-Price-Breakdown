import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { formatCurrency } from '../utils/calculations';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors duration-200">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.category}</p>
        <p className="text-lg font-bold text-gray-900 mt-1">
          {formatCurrency(item.price)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-2 hover:bg-gray-100 transition-colors duration-150 rounded-l-lg"
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          
          <span className="px-4 py-2 font-semibold text-gray-900 min-w-[3rem] text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-2 hover:bg-gray-100 transition-colors duration-150 rounded-r-lg"
          >
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="text-right">
        <p className="text-lg font-bold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
};