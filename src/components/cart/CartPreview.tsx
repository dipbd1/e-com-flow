"use client";

import { ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import Link from 'next/link';

interface CartPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartPreview({ isOpen, onClose }: CartPreviewProps) {
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state: RootState) => state.cart);

  const handleRemoveItem = (productId: string, selectedAttributes?: Record<string, string>) => {
    dispatch(removeFromCart({ productId, selectedAttributes }));
  };

  const handleQuantityChange = (productId: string, quantity: number, selectedAttributes?: Record<string, string>) => {
    dispatch(updateQuantity({ productId, quantity, selectedAttributes }));
  };

  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md">
          <div className="flex h-full flex-col bg-background shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium">Shopping Cart</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {items.length === 0 ? (
                <div className="mt-8 text-center">
                  <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-sm font-medium">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Start shopping to add items to your cart
                  </p>
                </div>
              ) : (
                <div className="mt-8">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-border">
                      {items.map((item) => (
                        <li key={`${item.product.id}-${JSON.stringify(item.selectedAttributes)}`} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                            <img
                              src={item.product.images?.[0] || '/placeholder.png'}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium">
                                <h3>{item.product.name}</h3>
                                <p className="ml-4">${item.product.price.toFixed(2)}</p>
                              </div>
                              {item.selectedAttributes && (
                                <div className="mt-1 text-sm text-muted-foreground">
                                  {Object.entries(item.selectedAttributes).map(([key, value]) => (
                                    <span key={key} className="mr-2">
                                      {key}: {value}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity - 1, item.selectedAttributes)}
                                >
                                  -
                                </Button>
                                <span className="text-muted-foreground">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item.product.id, item.quantity + 1, item.selectedAttributes)}
                                >
                                  +
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.product.id, item.selectedAttributes)}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link href="/checkout">
                    <Button className="w-full">Checkout</Button>
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-muted-foreground">
                  <p>
                    or{' '}
                    <Link
                    onClick={onClose}
                     href="/cart" className="font-medium text-primary hover:text-primary/90">
                      View Cart
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 