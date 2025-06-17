![image](https://github.com/user-attachments/assets/9b077a11-0274-47b5-8cbd-4523cc0b1ba8)

# Cart Price Breakdown Component

A comprehensive, production-ready ReactJS shopping cart component with detailed price breakdown, real-time calculations, and advanced features like promo codes, multiple shipping options, and persistent storage.

## 🚀 Features

### Core Features
- **Itemized Cart Display**: Complete list of cart items with product details, quantities, and individual prices
- **Real-time Calculations**: Instant updates for subtotal, taxes, shipping, and total as users modify their cart
- **Tax Management**: Support for multiple tax rates (state and federal) with configurable percentages
- **Dynamic Shipping**: Multiple shipping options with conditional free shipping thresholds
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **Quantity Controls**: Easy-to-use increment/decrement buttons with item removal functionality

### Bonus Features
- **Promo Code System**: Apply discount codes with percentage or fixed amount discounts
- **Multiple Tax Rates**: Separate state and federal tax calculations
- **Item Management**: Remove items from cart with confirmation
- **Delivery Estimates**: Display estimated delivery dates based on shipping method
- **Local Storage**: Persist cart data across browser sessions
- **Advanced Calculations**: Handle edge cases like minimum order requirements and maximum discounts

## 🛠️ Technology Stack

- **React 18** - Modern functional components with hooks
- **TypeScript** - Type-safe development with comprehensive interfaces
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful, customizable icons
- **Context API** - State management for cart functionality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/cart-price-breakdown.git
   cd cart-price-breakdown
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── CartItem.tsx         # Individual cart item with controls
│   ├── CartPriceBreakdown.tsx # Main cart component
│   ├── PriceBreakdown.tsx   # Order summary and totals
│   ├── PromoCodeInput.tsx   # Promo code application
│   └── ShippingOptions.tsx  # Shipping method selection
├── context/             # State management
│   └── CartContext.tsx      # Cart state and actions
├── data/               # Mock data
│   └── mockData.ts         # Sample cart items and configurations
├── types/              # TypeScript definitions
│   └── types.ts            # Interface definitions
├── utils/              # Utility functions
│   └── calculations.ts     # Price calculation logic
├── App.tsx             # Root component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🎯 Component Architecture

### CartContext
Centralized state management using React Context API:
- Cart items management (add, update, remove)
- Shipping option selection
- Promo code application and validation
- Real-time calculation updates
- Local storage persistence

### Key Components

**CartPriceBreakdown** - Main container component
- Orchestrates all cart functionality
- Responsive grid layout
- Empty cart state handling

**CartItem** - Individual item management
- Quantity controls with validation
- Item removal with confirmation
- Product image and details display

**PriceBreakdown** - Order summary
- Itemized cost breakdown
- Tax calculations display
- Shipping cost with free shipping indicators
- Applied discounts visualization
- Final total with checkout button

**PromoCodeInput** - Discount management
- Code validation and application
- Error handling and user feedback
- Applied code display with removal option

**ShippingOptions** - Delivery method selection
- Multiple shipping tiers
- Free shipping threshold indicators
- Estimated delivery dates

## 💰 Pricing Logic

### Calculation Flow
1. **Subtotal**: Sum of all item prices × quantities
2. **Taxes**: Applied as separate rates (state + federal)
3. **Shipping**: Based on selected method with free shipping thresholds
4. **Discounts**: Promo codes with minimum order requirements
5. **Final Total**: Subtotal + taxes + shipping - discounts

### Tax Configuration
```typescript
const taxRates = [
  { name: 'State Tax', rate: 8.25, type: 'percentage' },
  { name: 'Federal Tax', rate: 2.5, type: 'percentage' }
];
```

### Shipping Options
- **Standard Shipping**: $9.99 (FREE over $75)
- **Express Shipping**: $19.99 (2-day delivery)
- **Overnight Delivery**: $29.99 (next-day delivery)

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px - Single column layout
- **Tablet**: 768px - 1024px - Optimized spacing
- **Desktop**: > 1024px - Two-column grid layout

### Mobile Optimizations
- Touch-friendly button sizes (44px minimum)
- Simplified navigation and interactions
- Optimized image sizes and loading
- Swipe gestures for quantity controls

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```


