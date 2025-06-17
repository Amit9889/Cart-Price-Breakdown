import React from 'react';
import { CartProvider } from './context/CartContext';
import { CartPriceBreakdown } from './components/CartPriceBreakdown';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <CartPriceBreakdown />
      </div>
    </CartProvider>
  );
}

export default App;