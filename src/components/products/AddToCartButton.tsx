'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cart/cartSlice';

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    attributes?: Record<string, string>;
  };
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function AddToCartButton({
  product,
  variant = 'default',
  size = 'default',
  className = '',
}: AddToCartButtonProps) {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      attributes: product.attributes,
    }));

    setIsAdded(true);
    toast.success('Added to cart!', {
      description: `${product.name} has been added to your cart.`,
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={isAdded}
    >
      {isAdded ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
} 