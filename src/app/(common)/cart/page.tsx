'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/cartSlice';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartSkeleton } from '@/components/cart/CartSkeleton';

export default function CartPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const total = items.reduce(
    (sum, item) => sum + (item.product.salePrice || item.product.price) * item.quantity,
    0
  );

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={`${item.product.id}-${JSON.stringify(item.selectedAttributes)}`} className="flex gap-4 p-4 border rounded-lg">
              <div className="relative w-24 h-24">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              
              <div className="flex-1">
                <Link href={`/product/${item.product.slug}`} className="font-medium hover:text-primary">
                  {item.product.name}
                </Link>
                {item.selectedAttributes && (
                  <div className="text-sm text-gray-600 mt-1">
                    {Object.entries(item.selectedAttributes).map(([key, value]) => (
                      <span key={key} className="mr-2">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity - 1, selectedAttributes: item.selectedAttributes }))}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity + 1, selectedAttributes: item.selectedAttributes }))}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch(removeFromCart({ 
                      productId: item.product.id,
                      selectedAttributes: item.selectedAttributes 
                    }))}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">
                  ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
                </div>
                {item.product.salePrice && (
                  <div className="text-sm text-gray-500 line-through">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
            
            <Link href="/" className="block text-center text-sm text-gray-600 hover:text-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 