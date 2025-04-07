'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';

interface AddToCartButtonProps {
  product: Product;
  selectedAttributes?: Record<string, string>;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  product,
  selectedAttributes = {},
  quantity = 1,
  className = '',
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(
      addToCart({
        product,
        quantity,
        selectedAttributes,
      })
    );
    setIsAdding(false);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={className}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
} 