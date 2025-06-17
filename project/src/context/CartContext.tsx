import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartState, CartItem, PromoCode, CartCalculations } from '../types';
import { mockCartItems, mockTaxRates, mockShippingOptions, mockPromoCodes } from '../data/mockData';
import { 
  calculateSubtotal, 
  calculateTaxAmount, 
  calculateShippingAmount, 
  calculateDiscountAmount 
} from '../utils/calculations';

interface CartContextType extends CartState {
  updateQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  setShipping: (shippingId: string) => void;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
  calculations: CartCalculations;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'SET_SHIPPING'; payload: { shippingId: string } }
  | { type: 'APPLY_PROMO_CODE'; payload: { promoCode: PromoCode } }
  | { type: 'REMOVE_PROMO_CODE' }
  | { type: 'LOAD_FROM_STORAGE'; payload: { state: Partial<CartState> } };

const initialState: CartState = {
  items: mockCartItems,
  selectedShipping: 'standard',
  taxRates: mockTaxRates,
  shippingOptions: mockShippingOptions,
  availablePromoCodes: mockPromoCodes,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.itemId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        ).filter(item => item.quantity > 0)
      };
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId)
      };
    
    case 'SET_SHIPPING':
      return {
        ...state,
        selectedShipping: action.payload.shippingId
      };
    
    case 'APPLY_PROMO_CODE':
      return {
        ...state,
        appliedPromoCode: action.payload.promoCode
      };
    
    case 'REMOVE_PROMO_CODE':
      return {
        ...state,
        appliedPromoCode: undefined
      };
    
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        ...action.payload.state
      };
    
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('cartState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: { state: parsedState } });
      } catch (error) {
        console.error('Error loading cart state from localStorage:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('cartState', JSON.stringify({
      items: state.items,
      selectedShipping: state.selectedShipping,
      appliedPromoCode: state.appliedPromoCode
    }));
  }, [state.items, state.selectedShipping, state.appliedPromoCode]);

  const updateQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const setShipping = (shippingId: string) => {
    dispatch({ type: 'SET_SHIPPING', payload: { shippingId } });
  };

  const applyPromoCode = async (code: string): Promise<boolean> => {
    const promoCode = state.availablePromoCodes.find(
      promo => promo.code.toLowerCase() === code.toLowerCase()
    );
    
    if (!promoCode) {
      return false;
    }

    const subtotal = calculateSubtotal(state.items);
    if (promoCode.minCartTotal && subtotal < promoCode.minCartTotal) {
      return false;
    }

    dispatch({ type: 'APPLY_PROMO_CODE', payload: { promoCode } });
    return true;
  };

  const removePromoCode = () => {
    dispatch({ type: 'REMOVE_PROMO_CODE' });
  };

  // Calculate totals
  const subtotal = calculateSubtotal(state.items);
  const selectedShippingOption = state.shippingOptions.find(
    option => option.id === state.selectedShipping
  )!;
  const taxAmount = calculateTaxAmount(subtotal, state.taxRates);
  const shippingAmount = calculateShippingAmount(subtotal, selectedShippingOption);
  const discountAmount = calculateDiscountAmount(subtotal, state.appliedPromoCode);
  const total = subtotal + taxAmount + shippingAmount - discountAmount;

  const calculations: CartCalculations = {
    subtotal,
    taxAmount,
    shippingAmount,
    discountAmount,
    total
  };

  const contextValue: CartContextType = {
    ...state,
    updateQuantity,
    removeItem,
    setShipping,
    applyPromoCode,
    removePromoCode,
    calculations
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};