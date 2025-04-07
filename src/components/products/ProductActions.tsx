'use client';

import { useState } from 'react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

interface ProductActionsProps {
  product: Product;
}

export default function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(
    product.variants?.[0]?.id || null
  );
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const variant = product.variants?.find(v => v.id === selectedVariant);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      quantity,
      image: product.images[0],
      attributes: variant ? {
        size: variant.size,
        color: variant.color
      } : undefined
    });
  };

  return (
    <div className="space-y-4">
      {product.variants && product.variants.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Select Variant</h3>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant.id)}
                className={cn(
                  'px-3 py-2 border rounded-md text-sm',
                  selectedVariant === variant.id
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                {variant.size} - {variant.color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <div className="flex items-center border rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-3 py-2">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-3 py-2 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        <span className="text-sm text-gray-500">
          {product.stock} in stock
        </span>
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-full"
        disabled={product.stock === 0 || (product.variants && !selectedVariant)}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
} 