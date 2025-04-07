"use client"

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
  selectedAttributes?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
}

// Load cart from localStorage
const loadCartFromStorage = (): CartState => {
  if (typeof window === 'undefined') {
    return { items: [] };
  }

  try {
    const savedCart = localStorage.getItem('cart');
    if (!savedCart) return { items: [] };

    const parsed = JSON.parse(savedCart);
    
    // Validate the parsed data structure
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.items)) {
      console.warn('Invalid cart data structure, resetting to empty cart');
      return { items: [] };
    }

    // Validate each item in the cart
    const validItems = parsed.items.filter((item: unknown) => {
      if (!item || typeof item !== 'object') return false;
      const cartItem = item as CartItem;
      return (
        'product' in cartItem &&
        'quantity' in cartItem &&
        typeof cartItem.quantity === 'number' &&
        cartItem.quantity > 0
      );
    }) as CartItem[];

    return { items: validItems };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [] };
  }
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { product, quantity, selectedAttributes } = action.payload;
      const existingItem = state.items.find(
        (item) => 
          item.product.id === product.id && 
          JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      ) || null;

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedAttributes,
        });
      }

      // Save to localStorage
      try {
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string; selectedAttributes?: Record<string, string> }>) => {
      if (!state) {
        state = { items: [] };
      }
      if (!state.items) {
        state.items = [];
      }
      
      const { productId, selectedAttributes } = action.payload;
      state.items = state.items.filter(
        (item) => 
          item.product.id !== productId || 
          JSON.stringify(item.selectedAttributes) !== JSON.stringify(selectedAttributes)
      );
      
      try {
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ productId: string; quantity: number; selectedAttributes?: Record<string, string> }>) => {
      if (!state) {
        state = { items: [] };
      }
      if (!state.items) {
        state.items = [];
      }
      
      const { productId, quantity, selectedAttributes } = action.payload;
      const item = state.items.find(
        (item) => 
          item.product.id === productId && 
          JSON.stringify(item.selectedAttributes) === JSON.stringify(selectedAttributes)
      );
      if (item) {
        item.quantity = quantity;
        try {
          localStorage.setItem('cart', JSON.stringify(state));
        } catch (error) {
          console.error('Error saving cart to localStorage:', error);
        }
      }
    },
    clearCart: (state) => {
      if (!state) {
        state = { items: [] };
      }
      state.items = [];
      try {
        localStorage.setItem('cart', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    },
  },
});

console.log(loadCartFromStorage());

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 